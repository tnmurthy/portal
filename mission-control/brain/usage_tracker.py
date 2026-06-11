import psycopg2
import os

class UsageTracker:
    """
    Tracks token consumption and estimated costs for missions.
    Handles both cloud (OpenAI) and local (Ollama) usage mapping.
    """

    # Estimated costs per 1M tokens (GPT-4o rates as of 2026)
    COST_MAP = {
        "gpt-4o": {"prompt": 5.00, "completion": 15.00},
        "gpt-4o-mini": {"prompt": 0.15, "completion": 0.60},
        "qwen2.5-coder:7b": {"prompt": 0.0, "completion": 0.0}, # Local is free (marginal hardware cost)
        "default": {"prompt": 1.0, "completion": 2.0}
    }

    def __init__(self):
        self.conn = psycopg2.connect(
            dbname="sync_platform",
            user="admin",
            password="password",
            host="localhost",
            port="5432"
        )
        self.conn.autocommit = True

    def log_usage(self, mission_id: str, agent_name: str, model: str, prompt_tokens: int, completion_tokens: int):
        """
        Calculates estimated cost and saves to mc_usage_logs.
        """
        costs = self.COST_MAP.get(model, self.COST_MAP["default"])
        
        # Calculate in dollars
        est_cost = (prompt_tokens / 1_000_000 * costs["prompt"]) + \
                   (completion_tokens / 1_000_000 * costs["completion"])

        with self.conn.cursor() as cur:
            cur.execute(
                """
                INSERT INTO mc_usage_logs (mission_id, agent_name, model_name, prompt_tokens, completion_tokens, estimated_cost)
                VALUES (%s, %s, %s, %s, %s, %s)
                """,
                (mission_id, agent_name, model, prompt_tokens, completion_tokens, est_cost)
            )
        
        print(f"[Usage] {agent_name} used {prompt_tokens + completion_tokens} tokens on {model}. Est Cost: ${est_cost:.4f}")

    def get_mission_total_cost(self, mission_id: str) -> float:
        with self.conn.cursor() as cur:
            cur.execute("SELECT SUM(estimated_cost) FROM mc_usage_logs WHERE mission_id = %s", (mission_id,))
            res = cur.fetchone()
            return float(res[0] or 0.0)
