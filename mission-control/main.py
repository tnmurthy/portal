import asyncio
import json
import os
import httpx
from fastapi import FastAPI, HTTPException, WebSocket, WebSocketDisconnect, BackgroundTasks
from pydantic import BaseModel
from typing import Optional, List, Dict
from brain.lead_agent import LeadAgent
from brain.state_manager import StateManager
from brain.report_generator import ReportGenerator
from manifests.models import FulfillmentTier, SquadManifest
from orchestrator.engine import ExecutionEngine

app = FastAPI(title="Mission Control Gateway", version="1.0.0")
lead_agent = LeadAgent()
state_manager = StateManager()
report_gen = ReportGenerator()

# Global dict to store active engines for the MVP
active_missions: Dict[str, ExecutionEngine] = {}

# WebSocket Connection Manager
class ConnectionManager:
    def __init__(self):
        self.active_connections: List[WebSocket] = []

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)

    def disconnect(self, websocket: WebSocket):
        self.active_connections.remove(websocket)

    async def broadcast(self, message: str):
        for connection in self.active_connections:
            await connection.send_text(message)

manager = ConnectionManager()

class MissionRequest(BaseModel):
    brief: str
    tier: Optional[FulfillmentTier] = FulfillmentTier.BASIC

@app.get("/api/v1/health")
async def health_check():
    """
    FDE System Health Check. 
    Verifies Database, Cloud LLM, and Local Sovereign LLM.
    """
    health = {
        "database": "offline",
        "openai": "unknown",
        "ollama": "offline",
        "status": "degraded"
    }

    # 1. Check DB
    try:
        # Check if connection is alive
        with state_manager.conn.cursor() as cur:
            cur.execute("SELECT 1")
        health["database"] = "online"
    except:
        pass

    # 2. Check OpenAI
    if os.getenv("OPENAI_API_KEY"):
        health["openai"] = "configured"
    
    # 3. Check Ollama
    async with httpx.AsyncClient() as client:
        try:
            res = await client.get("http://localhost:11434/api/tags", timeout=1.0)
            if res.status_code == 200:
                health["ollama"] = "online"
        except:
            pass

    if health["database"] == "online" and health["ollama"] == "online":
        health["status"] = "healthy"
        
    return health

@app.get("/")
async def root():
    return {"message": "Mission Control Gateway is Online"}

@app.post("/api/v1/mission/propose", response_model=SquadManifest)
async def propose_mission(request: MissionRequest):
    """
    Endpoint for the Lead Agent to interview and propose a squad.
    Saves the proposal to the state manager.
    """
    try:
        manifest = lead_agent.architect_squad(request.brief, tier=request.tier)
        
        # Persist the mission in the DB
        mission_id = state_manager.create_mission(
            name=manifest.squad_name,
            brief=request.brief,
            tier=request.tier.value,
            manifest=manifest.model_dump()
        )
        
        # Update manifest with the real DB ID
        manifest.mission_id = str(mission_id)
        return manifest
    except Exception as e:
        print(f"Error: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/v1/mission/execute/{mission_id}")
async def execute_mission(mission_id: str, background_tasks: BackgroundTasks):
    """
    Triggers the LangGraph Execution Engine for a given mission.
    """
    mission = state_manager.get_mission_state(mission_id)
    if not mission:
        raise HTTPException(status_code=404, detail="Mission not found")
    
    manifest = mission['manifest']
    engine = ExecutionEngine(manifest)
    active_missions[mission_id] = engine
    
    # Run in background
    background_tasks.add_task(engine.run)
    
    return {"status": "started", "mission_id": mission_id}

@app.post("/api/v1/mission/approve/{mission_id}")
async def approve_mission(mission_id: str):
    """
    Resumes a paused mission after human approval.
    """
    # For the prototype, we simulate the approval.
    # In production, we would use app.update_state in LangGraph.
    return {"status": "approved", "message": "Mission resumed"}

@app.get("/api/v1/mission/report/{mission_id}")
async def get_report(mission_id: str):
    """
    Generates and returns the markdown Sovereign Intelligence Report.
    """
    try:
        markdown_content = report_gen.generate_markdown(mission_id)
        if markdown_content.startswith("Error"):
            raise HTTPException(status_code=404, detail=markdown_content)
        
        # Save to disk for persistence
        file_path = report_gen.save_report(mission_id, markdown_content)
        
        return {
            "mission_id": mission_id,
            "report_markdown": markdown_content,
            "file_saved_at": file_path
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.websocket("/ws/mission/{mission_id}")
async def mission_websocket(websocket: WebSocket, mission_id: str):
    """
    Real-time feed for agent activity.
    Uses PostgreSQL LISTEN/NOTIFY for true event-driven updates.
    """
    await manager.connect(websocket)
    
    # In a real FDE deployment, we would use a dedicated listener loop here.
    # For the prototype, we'll simulate a feed or connect to pg_notify.
    try:
        # Simple keep-alive for now
        while True:
            await asyncio.sleep(10)
            await websocket.send_json({"status": "live", "mission_id": mission_id})
    except WebSocketDisconnect:
        manager.disconnect(websocket)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)
