import os
import json
import asyncio
from brain.lead_agent import LeadAgent
from brain.state_manager import StateManager
from orchestrator.engine import ExecutionEngine
from manifests.models import FulfillmentTier

async def run_demo():
    print("--- 🚀 MISSION CONTROL LIVE DEMO ---")
    print("Mission: Research the top 3 AI agents for supply chain and write a summary.\n")

    # 1. Lead Agent Interviews & Architects
    print("[1/3] Lead Agent is architecting the squad...")
    lead_agent = LeadAgent()
    brief = "Research the top 3 AI agents for supply chain and write a concise summary for a logistics manager."
    manifest = lead_agent.architect_squad(brief, tier=FulfillmentTier.BASIC)
    
    print("\n--- DEPLOYMENT MANIFEST ---")
    print(f"Squad Name: {manifest.squad_name}")
    print(f"Infra Tier: {manifest.infrastructure.tier}")
    print(f"Agents Assigned:")
    for agent in manifest.agents:
        print(f"  - {agent.name}: {agent.specialty} (Tools: {agent.tools})")
    print("---------------------------\n")

    # 2. Persist Mission
    print("[2/3] Persisting mission state to Database...")
    state_manager = StateManager()
    mission_id = state_manager.create_mission(
        name=manifest.squad_name,
        brief=brief,
        tier="basic",
        manifest=manifest.model_dump()
    )
    manifest.mission_id = str(mission_id)
    print(f"Mission persisted with ID: {mission_id}\n")

    # 3. Execute Mission
    print("[3/3] Launching Execution Engine (Simulated Dashboard View)...")
    engine = ExecutionEngine(manifest.model_dump())
    
    # We add the brief to the shared context so the first agent knows what to do
    engine.run()

    print("\n--- ✅ MISSION COMPLETE ---")
    print("All agent thoughts and actions were streamed to the real-time database.")
    print("You can now view the full lineage in the mc_agent_activity table.")

if __name__ == "__main__":
    asyncio.run(run_demo())
