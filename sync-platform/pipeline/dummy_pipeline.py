import os
import uuid
import psycopg2
from dotenv import load_dotenv
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_openai import OpenAIEmbeddings

# Load environment variables
load_dotenv()

# DB Configuration (Match docker-compose)
DB_CONFIG = {
    "dbname": "sync_platform",
    "user": "admin",
    "password": "password",
    "host": "localhost",
    "port": "5432"
}

def get_db_connection():
    return psycopg2.connect(**DB_CONFIG)

def process_and_store(content, document_id=None, source_url=None):
    """
    Dummy pipeline: Chunk -> Embed -> Store
    """
    print(f"Processing content: {content[:50]}...")

    # 1. Chunking
    splitter = RecursiveCharacterTextSplitter(
        chunk_size=500,
        chunk_overlap=50
    )
    chunks = splitter.split_text(content)
    print(f"Created {len(chunks)} chunks.")

    # 2. Embedding (Requires OPENAI_API_KEY in .env)
    # Using a fake embedding if key is missing for testing Phase 1.2
    api_key = os.getenv("OPENAI_API_KEY")
    embeddings_model = None
    if api_key:
        embeddings_model = OpenAIEmbeddings(model="text-embedding-3-small")
    else:
        print("WARNING: OPENAI_API_KEY not found. Using dummy zeros for embeddings.")

    # 3. Storage
    conn = get_db_connection()
    cur = conn.cursor()

    try:
        # Create a dummy connection and document if none provided
        if not document_id:
            cur.execute(
                "INSERT INTO organizations (name) VALUES (%s) RETURNING id",
                ("Test Org",)
            )
            org_id = cur.fetchone()[0]

            cur.execute(
                "INSERT INTO connections (org_id, source_type, auth_config) VALUES (%s, %s, %s) RETURNING id",
                (org_id, "dummy", "{}")
            )
            connection_id = cur.fetchone()[0]

            cur.execute(
                "INSERT INTO documents (connection_id, external_id, title, source_url) VALUES (%s, %s, %s, %s) RETURNING id",
                (connection_id, str(uuid.uuid4()), "Dummy Doc", source_url)
            )
            document_id = cur.fetchone()[0]

        # Insert chunks
        for i, chunk_text in enumerate(chunks):
            embedding = [0.0] * 1536 # Default dummy
            if embeddings_model:
                embedding = embeddings_model.embed_query(chunk_text)

            cur.execute(
                """
                INSERT INTO document_chunks (document_id, content, chunk_index, embedding)
                VALUES (%s, %s, %s, %s)
                """,
                (document_id, chunk_text, i, embedding)
            )

        conn.commit()
        print(f"Successfully stored {len(chunks)} chunks for document {document_id}.")
        return document_id

    except Exception as e:
        conn.rollback()
        print(f"Error in pipeline: {e}")
        raise e
    finally:
        cur.close()
        conn.close()

if __name__ == "__main__":
    test_content = """
    SourceSync.ai is an automated data synchronization platform designed to keep AI knowledge bases current.
    It connects to various sources like Google Drive, Notion, and web scrapers.
    It handles the cleaning, chunking, and transformation of content into AI-ready formats.
    """
    process_and_store(test_content, source_url="https://sourcesync.ai")
