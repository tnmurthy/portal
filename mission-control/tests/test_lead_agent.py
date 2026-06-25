import pytest
from unittest.mock import MagicMock, patch
from brain.lead_agent import LeadAgent
from manifests.models import FulfillmentTier, SquadManifest

@pytest.fixture
def lead_agent():
    return LeadAgent(api_key="test-key")

@pytest.mark.unit
def test_architect_squad_success(lead_agent):
    """
    Test the successful path where OpenAI returns a valid squad proposal.
    """
    mock_response = MagicMock()
    mock_response.choices = [
        MagicMock(message=MagicMock(content='{"mission_id": "m-001", "squad_name": "Test Squad", "agents": [{"name": "Agent1", "specialty": "Testing", "system_prompt": "Prompt", "tools": []}]}'))
    ]
    
    with patch.object(lead_agent.client.chat.completions, 'create', return_value=mock_response):
        manifest = lead_agent.architect_squad("Brief", tier=FulfillmentTier.BASIC)
        
        assert isinstance(manifest, SquadManifest)
        assert manifest.squad_name == "Test Squad"
        assert len(manifest.agents) == 1
        assert manifest.infrastructure.tier == FulfillmentTier.BASIC
        assert manifest.infrastructure.isolation_level == "container"

@pytest.mark.unit
@patch("httpx.post")
def test_architect_squad_openai_failure_ollama_fallback(mock_httpx_post, lead_agent):
    """
    Test the fallback path where OpenAI fails and the agent switches to local Ollama.
    """
    # 1. Mock OpenAI failure
    lead_agent.client.chat.completions.create = MagicMock(side_effect=Exception("OpenAI Quota Exceeded"))
    
    # 2. Mock Ollama success
    mock_ollama_res = MagicMock()
    mock_ollama_res.status_code = 200
    mock_ollama_res.json.return_value = {
        "response": '{"mission_id": "ollama-001", "squad_name": "Ollama Squad", "agents": [{"name": "LocalAgent", "specialty": "Local Reasoning", "system_prompt": "Local Prompt", "tools": []}]}'
    }
    mock_httpx_post.return_value = mock_ollama_res
    
    manifest = lead_agent.architect_squad("Brief", tier=FulfillmentTier.PRO)
    
    assert manifest.squad_name == "Ollama Squad"
    assert manifest.infrastructure.tier == FulfillmentTier.PRO
    assert manifest.infrastructure.isolation_level == "namespace"
    mock_httpx_post.assert_called_once()

@pytest.mark.unit
@patch("httpx.post")
def test_architect_squad_total_failure_survival_mode(mock_httpx_post, lead_agent):
    """
    Test the critical failure path where both OpenAI and Ollama fail.
    """
    # 1. Mock OpenAI failure
    lead_agent.client.chat.completions.create = MagicMock(side_effect=Exception("OpenAI Error"))
    
    # 2. Mock Ollama failure
    mock_httpx_post.side_effect = Exception("Ollama Timeout")
    
    manifest = lead_agent.architect_squad("Brief", tier=FulfillmentTier.ENTERPRISE)
    
    assert manifest.squad_name == "Resilient Survival Squad"
    assert manifest.agents[0].name == "Sentinel"
    assert manifest.infrastructure.tier == FulfillmentTier.ENTERPRISE
    assert manifest.infrastructure.isolation_level == "microvm"
