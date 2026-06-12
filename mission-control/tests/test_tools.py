import pytest
from unittest.mock import MagicMock, patch
from orchestrator.tools import web_scraper, google_search

@pytest.mark.unit
@patch("requests.get")
def test_web_scraper_success(mock_get):
    """
    Test web_scraper with a successful HTML response.
    """
    mock_response = MagicMock()
    mock_response.status_code = 200
    mock_response.text = "<html><body><nav>Menu</nav><div>Actual Content</div><footer>Footer</footer></body></html>"
    mock_get.return_value = mock_response
    
    result = web_scraper.invoke("https://example.com")
    
    assert "Actual Content" in result
    assert "Menu" not in result # Should be removed by script.extract()
    assert "Footer" not in result
    mock_get.assert_called_once_with("https://example.com", timeout=15)

@pytest.mark.unit
@patch("requests.get")
def test_web_scraper_failure(mock_get):
    """
    Test web_scraper when the request fails.
    """
    mock_get.side_effect = Exception("Network Down")
    
    result = web_scraper.invoke("https://example.com")
    assert "Error scraping" in result
    assert "Network Down" in result

@pytest.mark.unit
@patch("requests.post")
@patch("os.getenv")
def test_google_search_success(mock_getenv, mock_post):
    """
    Test google_search with a valid API key and response.
    """
    mock_getenv.return_value = "fake-api-key"
    
    mock_response = MagicMock()
    mock_response.status_code = 200
    mock_response.json.return_value = {
        "organic": [
            {"title": "Result 1", "link": "https://res1.com", "snippet": "Snippet 1"},
            {"title": "Result 2", "link": "https://res2.com", "snippet": "Snippet 2"}
        ]
    }
    mock_post.return_value = mock_response
    
    result = google_search.invoke("test query")
    
    assert "[1] Title: Result 1" in result
    assert "Link: https://res2.com" in result
    mock_post.assert_called_once()

@pytest.mark.unit
@patch("os.getenv")
def test_google_search_no_api_key(mock_getenv):
    """
    Test google_search when API key is missing.
    """
    mock_getenv.return_value = None
    
    result = google_search.invoke("test query")
    assert "Error: SERPER_API_KEY not found" in result

@pytest.mark.unit
@patch("requests.post")
@patch("os.getenv")
def test_google_search_failure(mock_getenv, mock_post):
    """
    Test google_search when the API request fails.
    """
    mock_getenv.return_value = "fake-key"
    mock_post.side_effect = Exception("API Timeout")
    
    result = google_search.invoke("test query")
    assert "Error performing search: API Timeout" in result
