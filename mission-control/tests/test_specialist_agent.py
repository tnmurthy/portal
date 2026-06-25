import pytest
from unittest.mock import MagicMock, patch
from langchain_core.messages import AIMessage, HumanMessage, ToolMessage
from orchestrator.specialist import SpecialistAgent

@pytest.fixture
def specialist():
    with patch("psycopg2.connect"):
        with patch("orchestrator.specialist.ChatOpenAI") as mock_chat:
            # Ensure bind_tools returns the mock itself (or another mock)
            mock_instance = mock_chat.return_value
            mock_instance.bind_tools.return_value = mock_instance
            agent = SpecialistAgent("TestAgent", "You are a test agent.", "m-1", tools=["search"])
            # Re-assign the mock to ensure we can control invoke
            agent.llm = mock_instance 
            yield agent

@pytest.mark.unit
def test_specialist_run_success(specialist):
    """
    Test standard agent reasoning loop.
    """
    mock_llm_response = AIMessage(content="I have processed the request.")
    specialist.llm.invoke.return_value = mock_llm_response
    
    state = {"messages": [HumanMessage(content="Hello")], "shared_context": "Initial context"}
    result = specialist.run(state)
    
    assert result["current_agent"] == "TestAgent"
    assert isinstance(result["messages"][0], AIMessage)
    assert "I have processed the request." in result["shared_context"]

@pytest.mark.unit
@patch("httpx.post")
def test_specialist_run_failover(mock_httpx_post, specialist):
    """
    Test agent failover to local model.
    """
    # 1. Force OpenAI failure
    specialist.llm.invoke.side_effect = Exception("OpenAI Down")
    
    # 2. Mock Ollama success
    mock_ollama_res = MagicMock()
    mock_ollama_res.status_code = 200
    mock_ollama_res.json.return_value = {"message": {"content": "Local response"}}
    mock_httpx_post.return_value = mock_ollama_res
    
    state = {"messages": [], "shared_context": ""}
    result = specialist.run(state)
    
    assert result["messages"][0].content == "Local response"
    mock_httpx_post.assert_called_once()

@pytest.mark.unit
def test_specialist_tool_execution(specialist):
    """
    Test agent tool calling logic.
    """
    # Mock LLM response with tool call
    mock_tool_call = {
        "name": "search",
        "args": {"query": "test query"},
        "id": "call_1"
    }
    mock_response = AIMessage(content="")
    mock_response.tool_calls = [mock_tool_call]
    specialist.llm.invoke.return_value = mock_response
    
    # Mock Tool implementation
    mock_tool_func = MagicMock()
    mock_tool_func.invoke.return_value = "Search result"
    
    with patch.dict("orchestrator.specialist.AVAILABLE_TOOLS", {"search": mock_tool_func}):
        state = {"messages": [], "shared_context": ""}
        result = specialist.run(state)
        
        assert len(result["messages"]) == 2 # AIMessage + ToolMessage
        assert isinstance(result["messages"][1], ToolMessage)
        assert result["messages"][1].content == "Search result"
        mock_tool_func.invoke.assert_called_once_with({"query": "test query"})

@pytest.mark.unit
def test_specialist_shipping_logic(specialist):
    """
    Test the 'SHIP:' logic for artifacts.
    """
    mock_llm_response = AIMessage(content="I am done. SHIP: final_report.md \n This is the report content.")
    specialist.llm.invoke.return_value = mock_llm_response
    
    with patch.object(specialist.state_manager, 'save_asset') as mock_save:
        state = {"messages": [], "shared_context": ""}
        specialist.run(state)
        
        mock_save.assert_called_once_with(
            mission_id="m-1",
            agent_name="TestAgent",
            asset_name="final_report.md",
            asset_type="document",
            content="This is the report content."
        )
