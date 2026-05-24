import os
import psycopg2
from psycopg2.extras import RealDictCursor
from datetime import datetime

def get_connection():
    db_url = os.getenv("DATABASE_URL", "").replace("?pgbouncer=true", "").replace("&pgbouncer=true", "")
    return psycopg2.connect(db_url)

def init_db():
    try:
        conn = get_connection()
        cur = conn.cursor()
        cur.execute("""
            CREATE TABLE IF NOT EXISTS chat_history (
                id SERIAL PRIMARY KEY,
                session_id VARCHAR(255) NOT NULL,
                role VARCHAR(20) NOT NULL,
                content TEXT NOT NULL,
                timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
            CREATE INDEX IF NOT EXISTS idx_session_id ON chat_history(session_id);
        """)
        conn.commit()
        cur.close()
        conn.close()
    except Exception as e:
        print(f"Warning: Database connection failed (Local Network Issue). Chatbot will run without saving history. Error: {e}")

def save_message(session_id: str, role: str, content: str):
    try:
        conn = get_connection()
        cur = conn.cursor()
        cur.execute(
            "INSERT INTO chat_history (session_id, role, content) VALUES (%s, %s, %s)",
            (session_id, role, content)
        )
        conn.commit()
        cur.close()
        conn.close()
    except Exception as e:
        print(f"Warning: Could not save message to DB. Error: {e}")

def get_history(session_id: str, limit: int = 50) -> list[dict]:
    try:
        conn = get_connection()
        cur = conn.cursor(cursor_factory=RealDictCursor)
        cur.execute(
            "SELECT role, content, timestamp FROM chat_history WHERE session_id = %s ORDER BY timestamp ASC LIMIT %s",
            (session_id, limit)
        )
        rows = cur.fetchall()
        cur.close()
        conn.close()
        return [{"role": r["role"], "content": r["content"], "timestamp": str(r["timestamp"])} for r in rows]
    except Exception as e:
        print(f"Warning: Could not get chat history. Error: {e}")
        return []
