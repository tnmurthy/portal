import psycopg2
from psycopg2.extras import RealDictCursor
import json
import os
from dotenv import load_dotenv

load_dotenv()

class StateManager:
    """
    Manages the persistence of Mission States and Agent Activity.
    Acts as the single source of truth for the Real-time Dashboard.
    """

    def __init__(self):
        self.conn = psycopg2.connect(
            dbname="sync_platform",
            user="admin",
            password="password",
            host="localhost",
            port="5432"
        )
        self.conn.autocommit = True

    def create_mission(self, name: str, brief: str, tier: str, manifest: dict) -> str:
        with self.conn.cursor() as cur:
            cur.execute(
                """
                INSERT INTO mc_missions (name, brief, tier, manifest)
                VALUES (%s, %s, %s, %s)
                RETURNING id
                """,
                (name, brief, tier, json.dumps(manifest))
            )
            return cur.fetchone()[0]

    def log_activity(self, mission_id: str, agent_name: str, activity_type: str, message: str, metadata: dict = None):
        """
        Logs agent 'thoughts' or 'actions' to the DB.
        Triggers a pg_notify for real-time WebSocket updates.
        """
        with self.conn.cursor() as cur:
            cur.execute(
                """
                INSERT INTO mc_agent_activity (mission_id, agent_name, activity_type, message, metadata)
                VALUES (%s, %s, %s, %s, %s)
                """,
                (mission_id, agent_name, activity_type, message, json.dumps(metadata or {}))
            )

    def get_mission_state(self, mission_id: str):
        with self.conn.cursor(cursor_factory=RealDictCursor) as cur:
            cur.execute("SELECT * FROM mc_missions WHERE id = %s", (mission_id,))
            return cur.fetchone()
