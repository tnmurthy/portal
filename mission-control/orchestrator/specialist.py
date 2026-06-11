import os
import httpx
from typing import Dict, Any, List
from langchain_openai import ChatOpenAI
from langchain_core.messages import AIMessage, HumanMessage, ToolMessage
from brain.state_manager import StateManager
from .tools import AVAILABLE_TOOLS

class SpecialistAgent:
    """
    A generic Specialist Agent that can be configured by the SquadManifest.
    Supports real-world tool execution and resilient failover to local LLMs.
    """

    def __init__(self, name: str, system_prompt: str, mission_id: str, tools: List[str] = None):
        self.name = name
        self.system_prompt = system_prompt
        self.mission_id = mission_id
        self.state_manager = StateManager()
        self.ollama_url = "http://localhost:11434/api/chat"
        self.ollama_model = "qwen2.5-coder:7b"
        
        # Load requested tools
        self.tools = [AVAILABLE_TOOLS[t] for t in (tools or []) if t in AVAILABLE_TOOLS]
        
        # Initialize primary LLM
        self.llm = ChatOpenAI(model="gpt-4o")
        if self.tools:
            self.llm = self.llm.bind_tools(self.tools)

    def _ollama_fallback(self, messages: List[dict]) -> str:
        """
        Local LLM fallback for specialist reasoning.
        """
        print(f"--- [RESILIENCE] {self.name} switching to Local Model ({self.ollama_model}) ---")
        try:
            response = httpx.post(
                self.ollama_url,
                json={
                    "model": self.ollama_model,
                    "messages": messages,
                    "stream": False
                },
                timeout=60.0
            )
            response.raise_for_status()
            return response.json().get("message", {}).get("content", "Error: Local model failed to respond.")
        except Exception as e:
            return f"Critical Failure: Both Cloud and Local models failed. Error: {str(e)}"

    def run(self, state: Dict[str, Any]) -> Dict[str, Any]:
        """
        Executes the agent's logic with tool support and failover.
        """
        print(f"[{self.name}] thinking...")
        
        self.state_manager.log_activity(
            mission_id=self.mission_id,
            agent_name=self.name,
            activity_type="thought",
            message=f"I am analyzing the mission context."
        )

        # 1. Prepare context
        messages = [
            {"role": "system", "content": self.system_prompt},
            {"role": "system", "content": f"Context: {state.get('shared_context', '')}"}
        ]
        
        for msg in state.get("messages", []):
            if isinstance(msg, HumanMessage):
                messages.append({"role": "user", "content": msg.content})
            elif isinstance(msg, AIMessage):
                messages.append({"role": "assistant", "content": msg.content, "tool_calls": getattr(msg, 'tool_calls', None)})
            elif isinstance(msg, ToolMessage):
                messages.append({"role": "tool", "content": msg.content, "tool_call_id": msg.tool_call_id})

        # 2. Call LLM with Fallback
        try:
            response = self.llm.invoke(messages)
            content = response.content
        except Exception as e:
            print(f"[{self.name}] Primary LLM failed: {e}")
            self.state_manager.log_activity(
                mission_id=self.mission_id,
                agent_name=self.name,
                activity_type="error",
                message=f"Primary LLM failed. Attempting local failover..."
            )
            content = self._ollama_fallback(messages)
            response = AIMessage(content=content)

        # 3. Handle Tool Calls
        if hasattr(response, "tool_calls") and response.tool_calls:
            tool_outputs = []
            for tool_call in response.tool_calls:
                tool_name = tool_call["name"]
                args = tool_call["args"]
                
                self.state_manager.log_activity(
                    mission_id=self.mission_id,
                    agent_name=self.name,
                    activity_type="action",
                    message=f"EXECUTING TOOL: {tool_name} with args: {args}"
                )
                
                tool_func = AVAILABLE_TOOLS.get(tool_name)
                if tool_func:
                    result = tool_func.invoke(args)
                    
                    self.state_manager.log_activity(
                        mission_id=self.mission_id,
                        agent_name=self.name,
                        activity_type="result",
                        message=f"TOOL RESULT ({tool_name}): {str(result)[:500]}..."
                    )
                    
                    tool_outputs.append(ToolMessage(content=str(result), tool_call_id=tool_call["id"]))

            return {
                "messages": [response] + tool_outputs,
                "shared_context": state.get("shared_context", "") + f"\n\n[{self.name} Tool Usage]: {tool_outputs[0].content[:1000]}",
                "current_agent": self.name
            }

        # 4. Finalize
        requires_approval = "APPROVE" in content.upper() or "READY FOR REVIEW" in content.upper()

        self.state_manager.log_activity(
            mission_id=self.mission_id,
            agent_name=self.name,
            activity_type="result",
            message=content[:500] + "..."
        )

        return {
            "messages": [response],
            "shared_context": state.get("shared_context", "") + f"\n\n[{self.name} Output]:\n{content}",
            "current_agent": self.name,
            "needs_approval": requires_approval,
            "last_agent_output": content
        }
