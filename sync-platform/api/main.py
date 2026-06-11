import os
import sys
from typing import List, Optional
from fastapi import FastAPI, HTTPException, Query, BackgroundTasks
from pydantic import BaseModel
import psycopg2
from psycopg2.extras import RealDictCursor
from dotenv import load_dotenv
from langchain_openai import OpenAIEmbeddings

# Add parent directory to path to allow importing orchestrator
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from orchestrator import run_sync

# Load environment variables
load_dotenv()

app = FastAPI(title="AI Data Sync API", version="1.0.0")

# DB Configuration
DB_CONFIG = {
    "dbname": "sync_platform",
    "user": "admin",
    "password": "password",
    "host": "localhost",
    "port": "5432"
}

def get_db_connection():
    return psycopg2.connect(**DB_CONFIG, cursor_factory=RealDictCursor)

# Initialize Embeddings Model
api_key = os.getenv("OPENAI_API_KEY")
embeddings_model = None
if api_key:
    embeddings_model = OpenAIEmbeddings(model="text-embedding-3-small")

class SearchResult(BaseModel):
    content: str
    source_url: Optional[str]
    title: Optional[str]
    similarity: float

class SearchResponse(BaseModel):
    query: str
    results: List[SearchResult]

class SyncRequest(BaseModel):
    urls: List[str]

@app.get("/")
async def root():
    return {"message": "AI Data Sync API is running"}

@app.post("/v1/sync")
async def trigger_sync(request: SyncRequest, background_tasks: BackgroundTasks):
    """
    Trigger a sync job for a list of URLs in the background.
    """
    if not request.urls:
        raise HTTPException(status_code=400, detail="No URLs provided")
    
    background_tasks.add_task(run_sync, request.urls)
    return {"message": "Sync job started in background", "urls": request.urls}

@app.post("/v1/search", response_model=SearchResponse)
async def search(query: str, limit: int = 5, min_similarity: float = 0.5):
    """
    Perform semantic search using pgvector
    """
    if not query:
        raise HTTPException(status_code=400, detail="Query cannot be empty")

    # 1. Generate Query Embedding
    embedding = [0.0] * 1536
    if embeddings_model:
        try:
            embedding = embeddings_model.embed_query(query)
        except Exception as e:
            print(f"Embedding error: {e}")
            raise HTTPException(status_code=500, detail="Failed to generate embedding")
    else:
        # If no API key, we return dummy results if any exist with dummy embeddings
        print("WARNING: Using dummy zeros for query embedding.")

    # 2. Query Database
    conn = get_db_connection()
    cur = conn.cursor()

    try:
        # Use cosine distance <=> for similarity search
        # 1 - (embedding <=> query_vector) as similarity
        search_sql = """
            SELECT 
                dc.content, 
                d.source_url, 
                d.title,
                1 - (dc.embedding <=> %s::vector) AS similarity
            FROM document_chunks dc
            JOIN documents d ON dc.document_id = d.id
            WHERE 1 - (dc.embedding <=> %s::vector) >= %s
            ORDER BY similarity DESC
            LIMIT %s;
        """
        
        cur.execute(search_sql, (embedding, embedding, min_similarity, limit))
        rows = cur.fetchall()

        results = [
            SearchResult(
                content=row['content'],
                source_url=row['source_url'],
                title=row['title'],
                similarity=row['similarity']
            ) for row in rows
        ]

        return SearchResponse(query=query, results=results)

    except Exception as e:
        print(f"Database error: {e}")
        raise HTTPException(status_code=500, detail="Search failed")
    finally:
        cur.close()
        conn.close()

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
