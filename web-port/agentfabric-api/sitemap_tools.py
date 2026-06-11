import requests
from bs4 import BeautifulSoup
from xml.etree import ElementTree as ET
from urllib.parse import urljoin, urlparse

def find_sitemap(url: str) -> list[str]:
    """1. Sitemap Finder & Checker: Find sitemap URLs from a given base URL or robots.txt"""
    parsed = urlparse(url)
    base_url = f"{parsed.scheme}://{parsed.netloc}"
    
    sitemaps = []
    
    # Check robots.txt
    robots_url = urljoin(base_url, "/robots.txt")
    try:
        resp = requests.get(robots_url, timeout=10)
        if resp.status_code == 200:
            for line in resp.text.splitlines():
                if line.lower().startswith("sitemap:"):
                    sitemaps.append(line.split(":", 1)[1].strip())
    except requests.RequestException:
        pass

    # Common locations if none found in robots.txt
    if not sitemaps:
        common_paths = ["/sitemap.xml", "/sitemap_index.xml", "/sitemap.php"]
        for path in common_paths:
            test_url = urljoin(base_url, path)
            try:
                r = requests.head(test_url, timeout=5)
                if r.status_code == 200:
                    sitemaps.append(test_url)
            except requests.RequestException:
                pass
                
    return list(set(sitemaps))

def validate_sitemap(sitemap_url: str) -> dict:
    """2. Sitemap Validator: Validate if a sitemap is well-formed XML and accessible"""
    result = {
        "is_valid": False,
        "status_code": None,
        "error": None,
        "url_count": 0
    }
    
    try:
        resp = requests.get(sitemap_url, timeout=10)
        result["status_code"] = resp.status_code
        
        if resp.status_code == 200:
            try:
                root = ET.fromstring(resp.content)
                # Count URLs, handling default namespace
                urls = []
                for elem in root.iter():
                    if elem.tag.endswith('loc'):
                        urls.append(elem.text)
                
                result["is_valid"] = True
                result["url_count"] = len(urls)
            except ET.ParseError as e:
                result["error"] = f"XML Parsing Error: {e}"
        else:
            result["error"] = f"HTTP Error {resp.status_code}"
            
    except requests.RequestException as e:
        result["error"] = f"Request Failed: {e}"
        
    return result

def generate_sitemap(urls: list[str]) -> str:
    """3. XML Sitemap Generator: Generate an XML sitemap string from a list of URLs"""
    from xml.dom.minidom import parseString
    
    urlset = ET.Element("urlset", xmlns="http://www.sitemaps.org/schemas/sitemap/0.9")
    
    for url in urls:
        url_elem = ET.SubElement(urlset, "url")
        loc_elem = ET.SubElement(url_elem, "loc")
        loc_elem.text = url
        
    xml_str = ET.tostring(urlset, encoding='utf-8', method='xml')
    # Prettify
    dom = parseString(xml_str)
    return dom.toprettyxml(indent="  ")

def extract_urls_from_sitemap(sitemap_url: str) -> list[str]:
    """4. Sitemap URL Extractor: Extract all URLs from a given sitemap"""
    urls = []
    try:
        resp = requests.get(sitemap_url, timeout=10)
        if resp.status_code == 200:
            root = ET.fromstring(resp.content)
            for elem in root.iter():
                if elem.tag.endswith('loc') and elem.text:
                    urls.append(elem.text.strip())
    except (requests.RequestException, ET.ParseError):
        pass
        
    return urls

def extract_urls_from_website(url: str, max_pages: int = 100) -> list[str]:
    """5. Website URL Extractor: Crawl a website to extract internal links"""
    parsed_base = urlparse(url)
    base_domain = parsed_base.netloc
    
    visited = set()
    to_visit = [url]
    extracted_urls = set()
    
    while to_visit and len(visited) < max_pages:
        current_url = to_visit.pop(0)
        if current_url in visited:
            continue
            
        visited.add(current_url)
        
        try:
            resp = requests.get(current_url, timeout=5)
            if resp.status_code != 200:
                continue
                
            soup = BeautifulSoup(resp.text, 'html.parser')
            for a_tag in soup.find_all('a', href=True):
                href = a_tag['href']
                full_url = urljoin(current_url, href)
                parsed_full = urlparse(full_url)
                
                # Keep only HTTP/HTTPS and internal links
                if parsed_full.scheme in ['http', 'https'] and parsed_full.netloc == base_domain:
                    clean_url = full_url.split('#')[0] # Remove fragments
                    extracted_urls.add(clean_url)
                    
                    if clean_url not in visited and clean_url not in to_visit:
                        to_visit.append(clean_url)
                        
        except requests.RequestException:
            pass
            
    return list(extracted_urls)
