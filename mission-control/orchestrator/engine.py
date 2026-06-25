import json
from langgraph.graph import StateGraph, END
from langgraph.checkpoint.memory import MemorySaver
from .specialist import SpecialistAgent
from .graph import AgentState

class ExecutionEngine:
    """
    Takes a SquadManifest and dynamically builds/runs the LangGraph.
    Implements FDE-grade Human-in-the-Loop (HITL) logic.
    """

    def __init__(self, manifest: dict):
        self.manifest = manifest
        self.mission_id = manifest.get("mission_id")
        self.agents_data = manifest.get("agents", [])
        self.squad_name = manifest.get("squad_name")
        self.memory = MemorySaver()

    def run(self, thread_id: str = "default"):
        """
        Builds the graph dynamically and starts execution.
        """
        print(f"Initializing Squad: {self.squad_name}")
        
        workflow = StateGraph(AgentState)
        
        # 1. Dynamically add nodes for each agent
        agent_nodes = []
        for agent_info in self.agents_data:
            name = agent_info.get("name")
            prompt = agent_info.get("system_prompt")
            tools = agent_info.get("tools", []) # Get tools from manifest
            
            specialist = SpecialistAgent(name, prompt, self.mission_id, tools=tools)
            
            def node_func(state, spec=specialist):
                return spec.run(state)
            
            workflow.add_node(name, node_func)
            agent_nodes.append(name)

        # 2. Add an 'Approval Node' (The Brake)
        def human_approval_node(state):
            print(f"--- MISSION PAUSED FOR APPROVAL ---")
            return {"needs_approval": True}
        
        workflow.add_node("human_gate", human_approval_node)

        # 3. Define Edges with HITL Logic
        workflow.set_entry_point(agent_nodes[0])
        
        def router(state):
            if state.get("needs_approval") and not state.get("approval_granted"):
                return "human_gate"
            return "continue"

        for i in range(len(agent_nodes) - 1):
            # Each agent checks if it needs approval before moving to the next
            workflow.add_conditional_edges(
                agent_nodes[i],
                router,
                {
                    "human_gate": "human_gate",
                    "continue": agent_nodes[i+1]
                }
            )
        
        # Final agent also checks for approval
        workflow.add_conditional_edges(
            agent_nodes[-1],
            router,
            {
                "human_gate": "human_gate",
                "continue": END
            }
        )

        # Re-entry from human_gate
        # If approved, move to the next logical step. 
        # (For MVP, we just loop back to let the router decide to 'continue')
        workflow.add_edge("human_gate", END) 

        # 4. Compile with Persistence
        app = workflow.compile(checkpointer=self.memory)
        
        config = {"configurable": {"thread_id": thread_id}}
        
        initial_state = {
            "messages": [],
            "shared_context": f"Mission Brief: {self.manifest.get('metadata', {}).get('brief', 'None')}",
            "mission_id": self.mission_id,
            "squad_name": self.squad_name,
            "current_agent": "system",
            "is_complete": False,
            "needs_approval": False,
            "approval_granted": False,
            "last_agent_output": ""
        }

        print(f"Starting Mission {self.mission_id}...")
        for output in app.stream(initial_state, config):
            print(f"Transition complete. State updated.")
            # If we hit the human gate, the stream will naturally finish or we can break
            if "human_gate" in output:
                print("Execution paused. Awaiting manual dashboard approval.")
                break
        
        return app
