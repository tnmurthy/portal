import requests
from bs4 import BeautifulSoup
from typing import List, Dict, Any
from .base import BaseConnector

class WebScraperConnector(BaseConnector):
    """
    Implementation of a basic Web Scraper Connector.
    """

    def __init__(self, urls: List[str]):
        self.urls = urls

    def verify_auth(self) -> bool:
        # Web scraper for public URLs doesn't usually require auth in Phase 1
        return True

    def fetch_all(self) -> List[Dict[str, Any]]:
        documents = []
        for url in self.urls:
            try:
                print(f"Scraping {url}...")
                response = requests.get(url, timeout=10)
                response.raise_for_status()

                soup = BeautifulSoup(response.text, 'lxml')

                # Remove scripts and styles
                for script in soup(["script", "style"]):
                    script.extract()

                # Basic extraction
                title = soup.title.string if soup.title else url
                content = soup.get_text(separator='\n', strip=True)

                documents.append({
                    "content": content,
                    "external_id": url, # Using URL as ID for scraper
                    "title": title,
                    "source_url": url
                })
            except Exception as e:
                print(f"Failed to scrape {url}: {e}")

        return documents

if __name__ == "__main__":
    # Test locally
    scraper = WebScraperConnector(["https://sourcesync.ai"])
    docs = scraper.fetch_all()
    for doc in docs:
        print(f"Title: {doc['title']}")
        print(f"Content Sample: {doc['content'][:100]}...")
