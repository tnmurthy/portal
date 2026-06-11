from typing import List, Dict, Any, Optional
from pydantic import BaseModel, Field
from enum import Enum

class FulfillmentTier(str, Enum):
    BASIC = "basic"
    PRO = "pro"
    ENTERPRISE = "enterprise"

class AgentRole(BaseModel):
    name: str
    specialty: str
    system_prompt: str
    tools: List[str]
    model_preference: Optional[str] = "gpt-4o" # Can be local-llama-3 for Ent

class InfrastructureManifest(BaseModel):
    tier: FulfillmentTier
    isolation_level: str # "namespace", "container", "microvm"
    priority: int # 1 (low) to 10 (high)
    data_retention_days: int

class SquadManifest(BaseModel):
    mission_id: str
    squad_name: str
    agents: List[AgentRole]
    infrastructure: InfrastructureManifest
    metadata: Dict[str, Any] = Field(default_factory=dict)

# Example Usage for an FDE Deployment
example_manifest = {
    "mission_id": "mission-001",
    "squad_name": "Dentist SaaS Launchpad",
    "agents": [
        {
            "name": "Fury",
            "specialty": "Market Intelligence",
            "system_prompt": "You are a research analyst...",
            "tools": ["serper_google_search", "web_scraper"]
        },
        {
            "name": "Loki",
            "specialty": "Direct Response Copywriting",
            "system_prompt": "You are a landing page specialist...",
            "tools": ["content_generator"]
        }
    ],
    "infrastructure": {
        "tier": "basic",
        "isolation_level": "container",
        "priority": 1,
        "data_retention_days": 30
    }
}
