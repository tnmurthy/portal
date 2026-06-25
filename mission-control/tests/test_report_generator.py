import pytest
from unittest.mock import MagicMock, patch
from brain.report_generator import ReportGenerator
from datetime import datetime

@pytest.fixture
def generator():
    with patch("psycopg2.connect") as mock_connect:
        yield ReportGenerator()

@pytest.mark.unit
def test_generate_markdown_success(generator):
    """
    Test markdown generation for a successful mission.
    """
    mock_mission = {
        "id": "m-1",
        "name": "Test Mission",
        "brief": "Do something",
        "tier": "basic",
        "manifest": {"agents": [{"name": "A1", "specialty": "S1", "system_prompt": "P1"}]}
    }
    
    mock_activities = [
        ("A1", "thought", "I am thinking", datetime.now()),
        ("A1", "result", "The final answer is 42", datetime.now())
    ]
    
    with patch.object(generator.state_manager, 'get_mission_state', return_value=mock_mission):
        with patch.object(generator.state_manager.conn, 'cursor') as mock_cursor:
            mock_cursor.return_value.__enter__.return_value.fetchall.return_value = mock_activities
            
            markdown = generator.generate_markdown("m-1")
            
            assert "# Sovereign Intelligence Report: Test Mission" in markdown
            assert "The final answer is 42" in markdown
            assert "| A1 | THOUGHT | I am thinking... |" in markdown

@pytest.mark.unit
def test_generate_markdown_not_found(generator):
    """
    Test report generation when mission ID doesn't exist.
    """
    with patch.object(generator.state_manager, 'get_mission_state', return_value=None):
        markdown = generator.generate_markdown("invalid-id")
        assert "Error: Mission not found." in markdown
