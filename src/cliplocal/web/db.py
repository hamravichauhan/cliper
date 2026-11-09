import sqlite3
import json
from pathlib import Path
from typing import Dict, Any, List, Optional
from src.cliplocal.config.settings import config

DB_PATH = Path(".cache/cliplocal.db")

def init_db():
    DB_PATH.parent.mkdir(parents=True, exist_ok=True)
    with sqlite3.connect(DB_PATH) as conn:
        conn.execute("""
            CREATE TABLE IF NOT EXISTS jobs (
                job_id TEXT PRIMARY KEY,
                created_at REAL,
                status TEXT,
                progress REAL,
                stage TEXT,
                source TEXT,
                options_json TEXT,
                state_json TEXT
            )
        """)
        conn.commit()

def save_job(job_id: str, created_at: float, status: str, progress: float, stage: str, source: str, options: dict, state: dict):
    init_db()
    with sqlite3.connect(DB_PATH) as conn:
        conn.execute("""
            INSERT INTO jobs (job_id, created_at, status, progress, stage, source, options_json, state_json)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
            ON CONFLICT(job_id) DO UPDATE SET
                status=excluded.status,
                progress=excluded.progress,
                stage=excluded.stage,
                state_json=excluded.state_json
        """, (
            job_id,
            created_at,
            status,
            progress,
            stage,
            source,
            json.dumps(options),
            json.dumps(state)
        ))
        conn.commit()

def get_job(job_id: str) -> Optional[Dict[str, Any]]:
    init_db()
    with sqlite3.connect(DB_PATH) as conn:
        conn.row_factory = sqlite3.Row
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM jobs WHERE job_id = ?", (job_id,))
        row = cursor.fetchone()
        if not row:
            return None
        return {
            "job_id": row["job_id"],
            "created_at": row["created_at"],
            "status": row["status"],
            "progress": row["progress"],
            "stage": row["stage"],
            "source": row["source"],
            "options": json.loads(row["options_json"]),
            "state": json.loads(row["state_json"])
        }

def list_jobs() -> List[Dict[str, Any]]:
    init_db()
    with sqlite3.connect(DB_PATH) as conn:
        conn.row_factory = sqlite3.Row
        cursor = conn.cursor()
        cursor.execute("SELECT job_id, created_at, status, progress, stage, source, state_json FROM jobs ORDER BY created_at DESC")
        rows = cursor.fetchall()
        jobs = []
        for r in rows:
            st = json.loads(r["state_json"]) if r["state_json"] else {}
            jobs.append({
                "job_id": r["job_id"],
                "created_at": r["created_at"],
                "status": r["status"],
                "progress": r["progress"],
                "stage": r["stage"],
                "source": r["source"],
                "clip_count": len(st.get("candidates", []))
            })
        return jobs
