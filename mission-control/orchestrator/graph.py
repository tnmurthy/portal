import operator
from typing import Annotated, List, TypedDict, Union
from langchain_core.messages import BaseMessage, HumanMessage, AIMessage
from langgraph.graph import StateGraph, END

class AgentState(TypedDict):
    """
    The state of the agent squad.
    Includes the cumulative messages and the current shared context.
    """
    messages: Annotated[List[BaseMessage], operator.add]
    shared_context: str
    mission_id: str
    squad_name: str
    current_agent: str
    is_complete: bool
    # HITL Fields
    needs_approval: bool
    approval_granted: bool
    last_agent_output: str

def create_mission_graph():
    """
    Initializes the LangGraph for a Mission.
    """
    workflow = StateGraph(AgentState)

    # 1. Define Nodes (We will add implementation in the next step)
    # workflow.add_node("researcher", researcher_node)
    # workflow.add_node("copywriter", copywriter_node)

    # 2. Define Edges
    # workflow.set_entry_point("researcher")
    # workflow.add_edge("researcher", "copywriter")
    # workflow.add_edge("copywriter", END)

    return workflow
