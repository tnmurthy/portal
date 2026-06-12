import pytest
from unittest.mock import MagicMock, patch
import json
from brain.state_manager import StateManager

@pytest.fixture
def state_manager():
    with patch("psycopg2.connect") as mock_connect:
        yield StateManager()

@pytest.mark.unit
def test_create_mission(state_manager):
    """
    Test mission insertion.
    """
    with patch.object(state_manager.conn, 'cursor') as mock_cursor:
        mock_cursor.return_value.__enter__.return_value.fetchone.return_value = ("mission-uuid",)
        
        m_id = state_manager.create_mission("Name", "Brief", "basic", {"key": "val"})
        
        assert m_id == "mission-uuid"
        mock_cursor.return_value.__enter__.return_value.execute.assert_called_once()

@pytest.mark.unit
def test_log_activity(state_manager):
    """
    Test activity logging.
    """
    with patch.object(state_manager.conn, 'cursor') as mock_cursor:
        state_manager.log_activity("m-1", "Agent", "thought", "I think...")
        
        mock_cursor.return_value.__enter__.return_value.execute.assert_called_once()
        args = mock_cursor.return_value.__enter__.return_value.execute.call_args[0][1]
        assert args[2] == "thought"
        assert args[3] == "I think..."

@pytest.mark.unit
def test_get_mission_state(state_manager):
    """
    Test retrieval of mission state.
    """
    with patch.object(state_manager.conn, 'cursor') as mock_cursor:
        mock_row = {"id": "m-1", "name": "Mission"}
        mock_cursor.return_value.__enter__.return_value.fetchone.return_value = mock_row
        
        res = state_manager.get_mission_state("m-1")
        assert res == mock_row

@pytest.mark.unit
def test_save_asset(state_manager):
    """
    Test asset insertion.
    """
    with patch.object(state_manager.conn, 'cursor') as mock_cursor:
        mock_cursor.return_value.__enter__.return_value.fetchone.return_value = ("asset-uuid",)
        
        a_id = state_manager.save_asset("m-1", "Agent", "Report", "document", "Content")
        
        assert a_id == "asset-uuid"
        mock_cursor.return_value.__enter__.return_value.execute.assert_called_once()

@pytest.mark.unit
def test_get_mission_assets(state_manager):
    """
    Test retrieval of mission assets.
    """
    with patch.object(state_manager.conn, 'cursor') as mock_cursor:
        mock_assets = [{"id": "a-1", "name": "Report"}]
        mock_cursor.return_value.__enter__.return_value.fetchall.return_value = mock_assets
        
        res = state_manager.get_mission_assets("m-1")
        assert res == mock_assets
