import os
import shutil
import mimetypes
from pathlib import Path
from typing import Optional, List
from fastapi import FastAPI, UploadFile, File, Form, HTTPException, Request, Response
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel

from src.cliplocal.core.models import JobState, CaptionStyleName, ReframeMode, Word
from src.cliplocal.web.jobs import job_manager
from src.cliplocal.web.db import list_jobs
from src.cliplocal.render.engine import render_candidate_clip
from src.cliplocal.render.crop import build_crop_filter
from src.cliplocal.render.ffmpeg import run_ffmpeg_render
from src.cliplocal.captions.ass_generator import generate_ass_subtitles
from src.cliplocal.config.settings import config

app = FastAPI(title="ClipLocal API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
async def on_startup():
    job_manager.start_worker()

class SubmitJobRequest(BaseModel):
    source: str
    clips: int = 6
    style: str = "hormozi"
    mode: str = "auto"
    min_duration: float = 20.0
    max_duration: float = 60.0
    backend: str = "mlx"
    language: Optional[str] = None
    use_llm: bool = False
    auto_zoom: bool = True
    include_emojis: bool = True
    include_sfx: bool = True
    background_music: bool = False

@app.post("/api/jobs")
async def create_job(req: SubmitJobRequest):
    job = job_manager.submit_job(req.source, req.model_dump())
    return {"job_id": job.job_id, "status": job.status}

@app.post("/api/upload")
async def upload_file(file: UploadFile = File(...)):
    cache_dir = Path(".cache/uploads")
    cache_dir.mkdir(parents=True, exist_ok=True)
    dest_path = cache_dir / file.filename

    with open(dest_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    return {"file_path": str(dest_path.resolve()), "filename": file.filename}

@app.get("/api/jobs")
async def get_all_jobs():
    return list_jobs()

@app.get("/api/jobs/{job_id}")
async def get_job_status(job_id: str):
    job = job_manager.get_job_state(job_id)
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")
    return job.model_dump()

@app.post("/api/jobs/{job_id}/cancel")
async def cancel_job(job_id: str):
    success = job_manager.cancel_job(job_id)
    return {"cancelled": success}

class ReRenderRequest(BaseModel):
    job_id: str
    clip_id: str
    start: float
    end: float
    deleted_words: List[int] = [] # Autocut-style: indices of words to remove
    caption_style: str = "hormozi"
    reframe_mode: str = "center"
    auto_zoom: bool = True
    include_emojis: bool = True
    include_sfx: bool = True
    background_music: bool = False

@app.post("/api/clips/re-render")
async def re_render_clip(req: ReRenderRequest):
    job = job_manager.get_job_state(req.job_id)
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")

    candidate = next((c for c in job.candidates if c.clip_id == req.clip_id), None)
    if not candidate:
        raise HTTPException(status_code=404, detail="Candidate not found")

    # Update candidate boundaries
    candidate.start = req.start
    candidate.end = req.end
    candidate.duration = req.end - req.start
    candidate.caption_style = CaptionStyleName(req.caption_style)
    candidate.reframe_mode = ReframeMode(req.reframe_mode)

    # Filter words if autocut deletion was applied
    if req.deleted_words and candidate.words:
        kept_words = [w for idx, w in enumerate(candidate.words) if idx not in set(req.deleted_words)]
        candidate.words = kept_words

    output_dir = Path("output") / Path(job.metadata.file_path).stem
    out_file = render_candidate_clip(
        video_path=job.metadata.file_path,
        candidate=candidate,
        output_dir=output_dir,
        metadata=job.metadata,
        reframe_mode=candidate.reframe_mode,
        auto_zoom=req.auto_zoom,
        include_emojis=req.include_emojis,
        include_sfx=req.include_sfx,
        background_music=req.background_music
    )

    return {"output_path": str(out_file), "candidate": candidate.model_dump()}

@app.get("/api/media/stream")
async def stream_media(path: str, request: Request):
    """Stream media file with HTTP 206 Partial Content Range header support."""
    file_path = Path(path).resolve()
    if not file_path.exists():
        raise HTTPException(status_code=404, detail="Media file not found")

    file_size = file_path.stat().st_size
    range_header = request.headers.get("range")

    content_type, _ = mimetypes.guess_type(str(file_path))
    content_type = content_type or "video/mp4"

    if range_header:
        # Parse range header: e.g. bytes=0-1048576
        byte_range = range_header.replace("bytes=", "").split("-")
        start = int(byte_range[0])
        end = int(byte_range[1]) if byte_range[1] else file_size - 1
        end = min(end, file_size - 1)
        chunk_size = (end - start) + 1

        with open(file_path, "rb") as f:
            f.seek(start)
            data = f.read(chunk_size)

        headers = {
            "Content-Range": f"bytes {start}-{end}/{file_size}",
            "Accept-Ranges": "bytes",
            "Content-Length": str(chunk_size),
            "Content-Type": content_type,
        }
        return Response(data, status_code=206, headers=headers)
    else:
        with open(file_path, "rb") as f:
            data = f.read()
        return Response(data, media_type=content_type)

# Mount frontend build directory if it exists
frontend_dist = Path("web/frontend/dist")
if frontend_dist.exists():
    app.mount("/", StaticFiles(directory=str(frontend_dist), html=True), name="frontend")
