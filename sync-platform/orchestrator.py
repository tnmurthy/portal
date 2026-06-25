import os
import sys

# Add parent directory to path to allow imports from other modules
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from ingestion.scraper import WebScraperConnector
from pipeline.dummy_pipeline import process_and_store

def run_sync(urls: list):
    """
    Orchestrates the flow: Ingest -> Process -> Store
    """
    print("Starting sync job...")

    # 1. Ingest
    scraper = WebScraperConnector(urls)
    documents = scraper.fetch_all()

    # 2. Process & Store
    for doc in documents:
        print(f"Syncing document: {doc['title']}")
        process_and_store(
            content=doc['content'],
            source_url=doc['source_url']
        )

    print("Sync job completed.")

if __name__ == "__main__":
    # Test with a real URL
    target_urls = ["https://sourcesync.ai"]
    run_sync(target_urls)
