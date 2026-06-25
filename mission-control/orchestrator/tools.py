import requests
import os
from bs4 import BeautifulSoup
from langchain_core.tools import tool
from dotenv import load_dotenv

load_dotenv()

@tool
def web_scraper(url: str) -> str:
    """
    Scrapes the text content from a given URL.
    Useful for research agents needing to gather data from the live web.
    """
    try:
        print(f"[Tool: Scraper] Scraping {url}...")
        response = requests.get(url, timeout=15)
        response.raise_for_status()
        
        soup = BeautifulSoup(response.text, 'html.parser')
        
        # Remove noise
        for script in soup(["script", "style", "nav", "footer"]):
            script.extract()
            
        text = soup.get_text(separator=' ', strip=True)
        return text[:2000] # Return first 2000 chars to avoid context overflow
    except Exception as e:
        return f"Error scraping {url}: {str(e)}"

@tool
def google_search(query: str) -> str:
    """
    Performs a Google search using the Serper API.
    Returns a list of search results with titles, links, and snippets.
    Useful for finding current events or specific websites.
    """
    api_key = os.getenv("SERPER_API_KEY")
    if not api_key:
        return "Error: SERPER_API_KEY not found in environment."
    
    url = "https://google.serper.dev/search"
    payload = {"q": query}
    headers = {
        'X-API-KEY': api_key,
        'Content-Type': 'application/json'
    }

    try:
        print(f"[Tool: Search] Searching Google for '{query}'...")
        response = requests.post(url, headers=headers, json=payload, timeout=15)
        response.raise_for_status()
        
        results = response.json().get("organic", [])
        formatted_results = ""
        for i, res in enumerate(results[:5]): # Limit to top 5
            formatted_results += f"[{i+1}] Title: {res.get('title')}\nLink: {res.get('link')}\nSnippet: {res.get('snippet')}\n\n"
        
        return formatted_results if formatted_results else "No relevant search results found."
    except Exception as e:
        return f"Error performing search: {str(e)}"

# Registry of available tools for the FDE Engine
AVAILABLE_TOOLS = {
    "web_scraper": web_scraper,
    "search": google_search # Mapped as 'search' for the manifest
}
