import os
import json
from typing import List
import httpx
from openai import OpenAI
from dotenv import load_dotenv
from manifests.models import SquadManifest, FulfillmentTier, InfrastructureManifest, AgentRole

load_dotenv()

class LeadAgent:
    """
    The Lead Agent acts as the FDE Architect.
    It interviews the user and generates a Deployment Manifest (Squad).
    Includes a Resilience Fallback to local Ollama.
    """

    def __init__(self, api_key: str = None):
        self.client = OpenAI(api_key=api_key or os.getenv("OPENAI_API_KEY"))
        self.model = "gpt-4o"
        self.ollama_url = "http://localhost:11434/api/generate"
        self.ollama_model = "qwen2.5-coder:7b"

    def _ollama_fallback(self, system_prompt: str, user_prompt: str) -> dict:
        """
        Fallback logic to query a local Ollama instance.
        """
        print(f"--- [RESILIENCE] OpenAI failed. Switching to Local Model ({self.ollama_model}) ---")
        prompt = f"System: {system_prompt}\nUser: {user_prompt}\n\nOutput only a valid JSON object matching the SquadManifest schema."
        
        try:
            response = httpx.post(
                self.ollama_url,
                json={
                    "model": self.ollama_model,
                    "prompt": prompt,
                    "stream": False,
                    "format": "json"
                },
                timeout=60.0
            )
            response.raise_for_status()
            return json.loads(response.json().get("response", "{}"))
        except Exception as e:
            print(f"Ollama Fallback Failed: {e}")
            # Return a hardcoded 'Survival Squad' if everything fails
            return {
                "mission_id": "emergency-001",
                "squad_name": "Resilient Survival Squad",
                "agents": [
                    {"name": "Sentinel", "specialty": "General Intelligence", "system_prompt": "Perform the mission brief.", "tools": ["search"]}
                ]
            }

    def create_review_board_manifest(self, mission_id: str = "review-001") -> SquadManifest:
        """
        Creates the specialized 5-judge Review Board manifest.
        """
        agents = [
            AgentRole(
                name="Dr. LENA",
                specialty="LLM Systems Architect",
                system_prompt="You are an LLM Systems Architect. Focus on model selection, RAG design, and orchestration. Apply Karpathy Knowledge Graph.",
                tools=["search"]
            ),
            AgentRole(
                name="MARCUS",
                specialty="MLOps & Infrastructure",
                system_prompt="You are an MLOps Engineer. Focus on deployment, latency, and observability. Be blunt and ops-focused.",
                tools=["search"]
            ),
            AgentRole(
                name="SOFIA",
                specialty="AI Security & Ethics",
                system_prompt="You are an AI Security Auditor. Focus on prompt injection, PII leakage, and compliance (GDPR/DPDP).",
                tools=["search"]
            ),
            AgentRole(
                name="RAJAN",
                specialty="Product & UX Strategist",
                system_prompt="You are a Product Strategist. Focus on UX, trust, and user-market fit.",
                tools=["search"]
            ),
            AgentRole(
                name="PRIYA",
                specialty="AI Cost Optimizer",
                system_prompt="You are a Cost Optimizer. Focus on token economics and ROI calculations.",
                tools=["search"]
            )
        ]

        infra = InfrastructureManifest(
            tier=FulfillmentTier.PRO,
            isolation_level="namespace",
            priority=5,
            data_retention_days=90
        )

        return SquadManifest(
            mission_id=mission_id,
            squad_name="Gen AI Architecture Review Board",
            agents=agents,
            infrastructure=infra
        )

    def architect_squad(self, mission_brief: str, tier: FulfillmentTier = FulfillmentTier.BASIC) -> SquadManifest:
        """
        Takes a mission brief and generates a structured SquadManifest.
        """
        system_prompt = f"""
        You are the 'Lead Agent' for Mission Control. Your role is a Forward Deployed Engineer (FDE).
        Given a user's mission brief, you must propose a 'Squad' of autonomous AI agents.
        
        Rules:
        1. Propose 2-3 highly specialized agents.
        2. Assign each agent a 'specialty' and a 'system_prompt'.
        3. Assign relevant 'tools' (available: web_scraper, search, code_executor, image_gen).
        4. Based on the tier '{tier}', set the isolation_level.
           - basic: container
           - pro: namespace
           - enterprise: microvm
        
        Output MUST be valid JSON matching the SquadManifest schema.
        """

        user_prompt = f"User Mission: {mission_brief}"

        try:
            response = self.client.chat.completions.create(
                model=self.model,
                messages=[
                    {"role": "system", "content": system_prompt},
                    {"role": "user", "content": user_prompt}
                ],
                response_format={"type": "json_object"}
            )
            proposal_data = json.loads(response.choices[0].message.content)
        except Exception as e:
            print(f"OpenAI Error: {e}")
            proposal_data = self._ollama_fallback(system_prompt, user_prompt)
        
        # Add Infrastructure logic based on tier
        if tier == FulfillmentTier.ENTERPRISE:
            infra = InfrastructureManifest(tier=tier, isolation_level="microvm", priority=10, data_retention_days=365)
        elif tier == FulfillmentTier.PRO:
            infra = InfrastructureManifest(tier=tier, isolation_level="namespace", priority=5, data_retention_days=90)
        else:
            infra = InfrastructureManifest(tier=tier, isolation_level="container", priority=1, data_retention_days=30)

        # Map to Pydantic Model
        return SquadManifest(
            mission_id=proposal_data.get("mission_id", "mission-temp"),
            squad_name=proposal_data.get("squad_name", "Autonomous Squad"),
            agents=[AgentRole(**a) for i, a in enumerate(proposal_data.get("agents", []))],
            infrastructure=infra
        )

if __name__ == "__main__":
    # Local Test
    agent = LeadAgent()
    brief = "I want to build a content engine that scrapes tech news and writes weekly LinkedIn summaries."
    manifest = agent.architect_squad(brief, tier=FulfillmentTier.PRO)
    print(manifest.model_dump_json(indent=2))
