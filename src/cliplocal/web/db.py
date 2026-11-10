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

def delete_job(job_id: str) -> bool:
    init_db()
    with sqlite3.connect(DB_PATH) as conn:
        cursor = conn.cursor()
        cursor.execute("DELETE FROM jobs WHERE job_id = ?", (job_id,))
        conn.commit()
        return cursor.rowcount > 0

def list_jobs() -> List[Dict[str, Any]]:
    init_db()
    with sqlite3.connect(DB_PATH) as conn:
        conn.row_factory = sqlite3.Row
        cursor = conn.cursor()
        cursor.execute("SELECT job_id, created_at, status, progress, stage, source, options_json, state_json FROM jobs ORDER BY created_at DESC")
        rows = cursor.fetchall()
        jobs = []
        for r in rows:
            st = json.loads(r["state_json"]) if r["state_json"] else {}
            opts = json.loads(r["options_json"]) if r["options_json"] else {}
            candidates = st.get("candidates") or []
            scores = [c.get("score", {}).get("total_score", 0.0) for c in candidates if c.get("score")]
            avg_score = round(sum(scores) / len(scores), 1) if scores else 0.0
            meta = st.get("metadata") or {}
            title = meta.get("title") or Path(r["source"]).stem or "Untitled Video"

            jobs.append({
                "job_id": r["job_id"],
                "created_at": r["created_at"],
                "status": r["status"],
                "progress": r["progress"],
                "stage": r["stage"],
                "source": r["source"],
                "title": title,
                "duration": meta.get("duration", 0.0),
                "clip_count": len(candidates),
                "avg_virality_score": avg_score,
                "error_message": st.get("error_message"),
                "timing_report": st.get("timing_report") or {},
                "style": opts.get("style", "hormozi"),
                "options": opts
            })
        return jobs

def get_dir_size_bytes(path: Path) -> int:
    if not path.exists():
        return 0
    total = 0
    for p in path.rglob("*"):
        if p.is_file():
            try:
                total += p.stat().st_size
            except OSError:
                pass
    return total

def get_analytics_summary() -> Dict[str, Any]:
    import platform
    import shutil
    import urllib.request

    init_db()
    with sqlite3.connect(DB_PATH) as conn:
        conn.row_factory = sqlite3.Row
        cursor = conn.cursor()
        cursor.execute("SELECT status, state_json FROM jobs")
        rows = cursor.fetchall()

    total_jobs = len(rows)
    completed_jobs = sum(1 for r in rows if r["status"] == "completed")
    running_jobs = sum(1 for r in rows if r["status"] in ("queued", "ingesting", "transcribing", "segmenting", "scoring", "rendering"))
    failed_jobs = sum(1 for r in rows if r["status"] in ("failed", "cancelled"))

    total_clips = 0
    total_duration_sec = 0.0
    all_scores: List[float] = []

    for r in rows:
        st = json.loads(r["state_json"]) if r["state_json"] else {}
        cands = st.get("candidates") or []
        total_clips += len(cands)
        meta = st.get("metadata") or {}
        total_duration_sec += float(meta.get("duration") or 0.0)
        for c in cands:
            score = c.get("score", {}).get("total_score")
            if score is not None:
                all_scores.append(float(score))

    avg_score = round(sum(all_scores) / len(all_scores), 1) if all_scores else 0.0
    # Human editors take ~30 minutes per polished vertical short
    hours_saved = round(total_clips * 0.5, 1)

    # Disk usage
    output_size = get_dir_size_bytes(Path("output"))
    cache_size = get_dir_size_bytes(Path(".cache"))
    storage_mb = round((output_size + cache_size) / (1024 * 1024), 1)

    # System specs
    is_apple_silicon = platform.system() == "Darwin" and platform.machine() == "arm64"
    ollama_online = False
    try:
        req = urllib.request.urlopen("http://localhost:11434/api/tags", timeout=1.0)
        ollama_online = req.status == 200
    except Exception:
        ollama_online = False

    disk_total, disk_used, disk_free = shutil.disk_usage(".")

    return {
        "total_jobs": total_jobs,
        "completed_jobs": completed_jobs,
        "running_jobs": running_jobs,
        "failed_jobs": failed_jobs,
        "total_clips": total_clips,
        "total_minutes_processed": round(total_duration_sec / 60.0, 1),
        "estimated_hours_saved": hours_saved,
        "average_virality_score": avg_score,
        "storage_used_mb": storage_mb,
        "system": {
            "platform": f"{platform.system()} ({platform.machine()})",
            "apple_silicon": is_apple_silicon,
            "mlx_acceleration": is_apple_silicon,
            "whisper_backend": config.get("whisper_backend", "mlx"),
            "whisper_model": config.get("whisper_model", "large-v3-turbo"),
            "ollama_online": ollama_online,
            "disk_free_gb": round(disk_free / (1024**3), 1),
            "disk_total_gb": round(disk_total / (1024**3), 1)
        }
    }
