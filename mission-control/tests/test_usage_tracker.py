import pytest
from unittest.mock import MagicMock, patch
from brain.usage_tracker import UsageTracker

@pytest.fixture
def tracker():
    # Patch psycopg2.connect to avoid real DB connection during unit tests
    with patch("psycopg2.connect") as mock_connect:
        yield UsageTracker()

@pytest.mark.unit
def test_cost_calculation_gpt4o(tracker):
    """
    Test cost calculation for GPT-4o.
    Rates: $5.00/1M prompt, $15.00/1M completion
    """
    # 100,000 prompt tokens = $0.50
    # 100,000 completion tokens = $1.50
    # Total = $2.00
    
    with patch.object(tracker.conn, 'cursor') as mock_cursor:
        tracker.log_usage("m-1", "A1", "gpt-4o", 100000, 100000)
        
        # Verify the calculation passed to SQL
        args = mock_cursor.return_value.__enter__.return_value.execute.call_args[0][1]
        est_cost = args[5]
        assert est_cost == 2.0

@pytest.mark.unit
def test_cost_calculation_local_model(tracker):
    """
    Test that local models have zero cost.
    """
    with patch.object(tracker.conn, 'cursor') as mock_cursor:
        tracker.log_usage("m-1", "A1", "qwen2.5-coder:7b", 1000, 1000)
        
        args = mock_cursor.return_value.__enter__.return_value.execute.call_args[0][1]
        est_cost = args[5]
        assert est_cost == 0.0

@pytest.mark.unit
def test_get_mission_total_cost(tracker):
    """
    Test retrieval of total cost.
    """
    with patch.object(tracker.conn, 'cursor') as mock_cursor:
        mock_cursor.return_value.__enter__.return_value.fetchone.return_value = (5.75,)
        
        total = tracker.get_mission_total_cost("m-1")
        assert total == 5.75
