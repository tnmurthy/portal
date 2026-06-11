import httpx
import os
import subprocess
from typing import List, Dict, Any

# URLs for the Sync Platform services
# Assuming default ports from our build
SYNC_API_URL = "http://localhost:8000"

async def sync_url(url: str) -> Dict[str, Any]:
    """
    Trigger a sync job in the Sync Platform for a given URL.
    This can call the orchestrator script or a future sync-api endpoint.
    For Phase 1, we can execute the orchestrator.py as a subprocess or 
    if we build an API endpoint for it, call that.
    """
    try:
        # For MVP, we'll assume there's an endpoint in the Sync API for triggering syncs
        # If not yet built, we can trigger via subprocess (not recommended for production but works for sandbox)
        # Assuming we added a /v1/sync endpoint to our Sync API (Let's stick to HTTP if possible)
        async with httpx.AsyncClient() as client:
            response = await client.post(f"{SYNC_API_URL}/v1/sync", json={"urls": [url]}, timeout=60.0)
            if response.status_code == 200:
                return {"status": "success", "message": f"Successfully synced {url}"}
            else:
                return {"status": "error", "message": f"Sync failed: {response.text}"}
    except Exception as e:
        return {"status": "error", "message": str(e)}

async def search_kb(query: str, limit: int = 3) -> Dict[str, Any]:
    """
    Search the knowledge base for relevant snippets.
    """
    try:
        async with httpx.AsyncClient() as client:
            response = await client.post(
                f"{SYNC_API_URL}/v1/search", 
                params={"query": query, "limit": limit},
                timeout=10.0
            )
            response.raise_for_status()
            data = response.json()
            return {"status": "success", "results": data.get("results", [])}
    except Exception as e:
        return {"status": "error", "message": str(e)}

def format_context_for_llm(results: List[Dict[str, Any]]) -> str:
    """
    Formats vector search results into a context string for an LLM prompt.
    """
    if not results:
        return "No relevant knowledge found."
    
    context = "Here is some relevant context from the knowledge base:\n\n"
    for res in results:
        context += f"--- Source: {res.get('title')} ({res.get('source_url')}) ---\n"
        context += f"{res.get('content')}\n\n"
    return context
