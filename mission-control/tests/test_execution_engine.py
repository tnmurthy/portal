import pytest
from unittest.mock import MagicMock, patch
from orchestrator.engine import ExecutionEngine

@pytest.fixture
def engine():
    manifest = {
        "mission_id": "m-1",
        "squad_name": "Test Squad",
        "agents": [
            {"name": "Agent1", "system_prompt": "Prompt 1", "tools": []}
        ],
        "metadata": {"brief": "Test brief"}
    }
    return ExecutionEngine(manifest)

@pytest.mark.unit
def test_engine_initialization(engine):
    assert engine.mission_id == "m-1"
    assert len(engine.agents_data) == 1

@pytest.mark.unit
def test_engine_run_success(engine):
    """
    Test the engine run loop. 
    Mocks the graph compilation and streaming output.
    """
    # 1. Mock SpecialistAgent to avoid real LLM calls
    with patch("orchestrator.engine.SpecialistAgent") as mock_spec_class:
        mock_spec_instance = mock_spec_class.return_value
        mock_spec_instance.run.return_value = {"messages": [], "shared_context": "Done", "current_agent": "Agent1"}
        
        # 2. Mock StateGraph and its compile method
        with patch("orchestrator.engine.StateGraph") as mock_graph_class:
            mock_graph_instance = mock_graph_class.return_value
            mock_app = mock_graph_instance.compile.return_value
            
            # Mock the stream generator
            mock_app.stream.return_value = [{"Agent1": {"shared_context": "Updated"}}]
            
            engine.run()
            
            mock_graph_instance.compile.assert_called_once()
            mock_app.stream.assert_called_once()
            # Verify nodes were added
            mock_graph_instance.add_node.assert_called()
