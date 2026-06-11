from fastapi import FastAPI, HTTPException, Request, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional, Dict, Any
import httpx
from bs4 import BeautifulSoup
from markdownify import markdownify as md
import io
import sitemap_tools
import analysis_tools
import utility_tools
import sync_tools

app = FastAPI(title="AgentFabric API", version="1.0.0")

# Enable CORS for the Vite frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # In production, restrict this to the frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {
        "message": "AgentFabric API is running perfectly!",
        "docs_url": "http://localhost:8000/docs",
        "health_check": "http://localhost:8000/health"
    }

class ToolExecutionRequest(BaseModel):
    toolId: str
    payload: Dict[str, Any]

@app.post("/api/v1/tools/execute")
async def execute_tool(request: Request):
    content_type = request.headers.get("content-type", "")
    
    if "multipart/form-data" in content_type:
        form = await request.form()
        tool_id = form.get("toolId", "")
        payload = {"url": form.get("url", "")}
        upload_file = form.get("file")
    else:
        json_data = await request.json()
        tool_id = json_data.get("toolId", "")
        payload = json_data.get("payload", {})
        upload_file = None
        
    try:
        if tool_id.startswith("tool-chat"):
            messages = payload.get("messages", [])
            use_kb = payload.get("use_kb", False)
            
            # Fallback if old frontend passes just "message"
            if not messages:
                user_msg = payload.get("message", "")
                messages = [{"role": "user", "content": user_msg}]
            
            user_query = messages[-1]["content"] if messages else ""
            kb_context = ""
            
            # RAG Enhancement: Check knowledge base if requested
            if use_kb and user_query:
                kb_data = await sync_tools.search_kb(user_query)
                if kb_data["status"] == "success":
                    kb_context = sync_tools.format_context_for_llm(kb_data["results"])
                
            system_prompt = f"You are a helpful AI assistant operating as the {tool_id} tool. Respond concisely and professionally."
            if kb_context:
                system_prompt += f"\n\n{kb_context}"
            
            ollama_url = "http://localhost:11434/api/chat"
            async with httpx.AsyncClient() as client:
                try:
                    chat_messages = [{"role": "system", "content": system_prompt}] + messages
                    
                    ollama_response = await client.post(
                        ollama_url,
                        json={
                            "model": "qwen2.5-coder:7b",
                            "messages": chat_messages,
                            "stream": False
                        },
                        timeout=60.0
                    )
                    ollama_response.raise_for_status()
                    reply_text = ollama_response.json().get("message", {}).get("content", "")
                except Exception as ollama_error:
                    print(f"Ollama Chat Error: {ollama_error}")
                    reply_text = f"Error connecting to local LLM chat: {str(ollama_error)}"

            return {
                "status": "success", 
                "data": {"reply": reply_text}
            }
            
        elif tool_id.startswith("tool-sync"):
            url = payload.get("url", "")
            if not url:
                return {"status": "error", "data": {"message": "URL required for sync."}}
            
            result = await sync_tools.sync_url(url)
            return result

        elif tool_id.startswith("tool-search"):
            query = payload.get("query", "")
            if not query:
                return {"status": "error", "data": {"message": "Query required for search."}}
            
            result = await sync_tools.search_kb(query)
            return result

        elif tool_id.startswith("tool-gen"):
            prompt = payload.get("prompt", "")
            if not prompt:
                raise HTTPException(status_code=400, detail="Prompt is required for generator tools.")
            
            # System instructions based on the specific tool
            system_prompt = f"You are a highly capable AI assistant executing the {tool_id} tool. Provide a direct, high-quality response without filler text."
            
            # Call local Ollama
            ollama_url = "http://localhost:11434/api/generate"
            async with httpx.AsyncClient() as client:
                try:
                    ollama_response = await client.post(
                        ollama_url,
                        json={
                            "model": "qwen2.5-coder:7b", # Default local model from MEMORY.md
                            "system": system_prompt,
                            "prompt": prompt,
                            "stream": False
                        },
                        timeout=60.0
                    )
                    ollama_response.raise_for_status()
                    result_text = ollama_response.json().get("response", "")
                except Exception as ollama_error:
                    # Fallback or error message if Ollama is not running/model missing
                    print(f"Ollama Error: {ollama_error}")
                    result_text = f"Error connecting to local LLM: {str(ollama_error)}. Please ensure Ollama is running on port 11434 and 'qwen2.5-coder:7b' is pulled."

            return {
                "status": "success",
                "data": {"result": result_text}
            }
            
        elif tool_id.startswith("tool-md"):
            # Handle File Upload
            if upload_file is not None and getattr(upload_file, "filename", None):
                content = await upload_file.read()
                filename = upload_file.filename.lower()
                text = ""
                
                try:
                    if filename.endswith(".pdf"):
                        import pdfplumber
                        with pdfplumber.open(io.BytesIO(content)) as pdf:
                            for page in pdf.pages:
                                page_text = page.extract_text()
                                if page_text:
                                    text += page_text + "\n"
                        return {"status": "success", "data": {"markdown": text.strip()}}
                        
                    elif filename.endswith(".docx"):
                        import docx
                        doc = docx.Document(io.BytesIO(content))
                        text = "\n".join([p.text for p in doc.paragraphs])
                        return {"status": "success", "data": {"markdown": text.strip()}}
                        
                    elif filename.endswith(".html") or filename.endswith(".htm"):
                        soup = BeautifulSoup(content, 'html.parser')
                        for script in soup(["script", "style", "nav", "footer", "header", "iframe"]):
                            script.extract()
                        text = md(str(soup.body if soup.body else soup), heading_style="ATX")
                        return {"status": "success", "data": {"markdown": text.strip()}}
                        
                    else:
                        # Fallback for csv, txt, json, xml, rtf (treat as text)
                        text = content.decode('utf-8', errors='ignore')
                        return {"status": "success", "data": {"markdown": text.strip()}}
                        
                except Exception as file_parse_error:
                    return {"status": "error", "data": {"markdown": f"Failed to parse file {filename}: {str(file_parse_error)}"}}

            # Handle URL
            url = payload.get("url", "")
            if not url:
                return {
                    "status": "error",
                    "data": {"markdown": "Please provide a valid URL or upload a file to convert to Markdown."}
                }
            
            if not url.startswith("http"):
                url = "https://" + url
                
            try:
                # Fetch URL and convert HTML to markdown
                async with httpx.AsyncClient(follow_redirects=True) as client:
                    response = await client.get(url, timeout=15.0)
                    response.raise_for_status()
                    html_content = response.text
                
                # Use beautifulsoup to extract the main content
                soup = BeautifulSoup(html_content, 'html.parser')
                
                # Remove script and style elements
                for script in soup(["script", "style", "nav", "footer", "header", "iframe"]):
                    script.extract()
                
                markdown_result = md(str(soup.body if soup.body else soup), heading_style="ATX")
                
                return {
                    "status": "success",
                    "data": {"markdown": markdown_result.strip()}
                }
            except Exception as parse_error:
                return {
                    "status": "error",
                    "data": {"markdown": f"Failed to extract content from {url}:\n{str(parse_error)}"}
                }
            
        elif tool_id.startswith("misc"):
            input_data = payload.get("text", "") or payload.get("prompt", "")
            
            if tool_id == "misc-sitemap-checker":
                result = sitemap_tools.find_sitemap(input_data)
            elif tool_id == "misc-sitemap-validator":
                result = sitemap_tools.validate_sitemap(input_data)
            elif tool_id == "misc-sitemap-url":
                result = str(sitemap_tools.extract_urls_from_sitemap(input_data))
            elif tool_id == "misc-web-url":
                result = str(sitemap_tools.extract_urls_from_website(input_data, 10))
            elif tool_id == "misc-roi":
                # Extract comma-separated values: volume, cost, deflection
                parts = [p.strip() for p in input_data.split(",")]
                if len(parts) >= 3:
                    try:
                        result = str(analysis_tools.calculate_chatbot_roi(float(parts[0]), float(parts[1]), float(parts[2])))
                    except ValueError:
                        result = "Invalid numbers. Use format: 5000, 15, 0.3"
                else:
                    result = "Please enter: Ticket Volume, Cost per Ticket, Deflection Rate (e.g. '5000, 15.0, 0.3')"
            elif tool_id == "misc-email-sig":
                parts = [p.strip() for p in input_data.split(",")]
                if len(parts) >= 5:
                    result = utility_tools.generate_email_signature(parts[0], parts[1], parts[2], parts[3], parts[4])
                else:
                    result = "Please enter: Name, Title, Company, Phone, Email separated by commas."
            elif tool_id == "misc-analysis":
                result = str(analysis_tools.analyze_conversation(input_data))
            else:
                result = f"Processed miscellaneous tool {tool_id} successfully."
                
            return {
                "status": "success",
                "data": {"result": result}
            }
            
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/health")
async def health_check():
    return {"status": "ok"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8002)
