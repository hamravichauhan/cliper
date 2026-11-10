import os
import shutil
import mimetypes
from contextlib import asynccontextmanager
from pathlib import Path
from typing import Optional, List
from fastapi import FastAPI, UploadFile, File, Form, HTTPException, Request, Response
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel

from src.cliplocal.core.models import JobState, CaptionStyleName, ReframeMode, Word
from src.cliplocal.web.jobs import job_manager
from src.cliplocal.web.db import list_jobs, get_analytics_summary, list_brand_kits, save_brand_kit, delete_brand_kit
from src.cliplocal.render.engine import render_candidate_clip
from src.cliplocal.render.crop import build_crop_filter
from src.cliplocal.render.ffmpeg import run_ffmpeg_render
from src.cliplocal.captions.ass_generator import generate_ass_subtitles
from src.cliplocal.export.delivery import create_client_delivery_bundle
from src.cliplocal.export.scheduler import export_bulk_schedule_csv
from src.cliplocal.harvest.monitor import detect_unprocessed_videos
from src.cliplocal.discovery.finder import search_viral_long_videos, CURATED_PRESETS
from src.cliplocal.config.settings import config

@asynccontextmanager
async def lifespan(app: FastAPI):
    job_manager.start_worker()
    yield

app = FastAPI(title="ClipLocal API", version="1.0.0", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

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
    multicam: bool = True
    top_banner: bool = True
    include_emojis: bool = True
    include_sfx: bool = True
    background_music: bool = False
    mute_original: bool = False
    music_track: Optional[str] = "ambient_lofi"
    music_volume: float = 0.22
    anti_copyright: bool = False
    broll: bool = False
    watermark: Optional[str] = None

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

@app.get("/api/health")
async def get_health():
    from src.cliplocal.llm.circuit_breaker import ollama_circuit_breaker
    ram_gb = 16.0
    try:
        import psutil
        ram_gb = round(psutil.virtual_memory().available / (1024**3), 2)
    except Exception:
        pass

    has_metal = False
    try:
        import mlx.core as mx
        has_metal = mx.metal.is_available()
    except Exception:
        pass

    return {
        "status": "healthy",
        "metal_accelerated": has_metal,
        "metal_device_name": "Apple M4 (Unified Memory)" if has_metal else "CPU Fallback",
        "whisper_model": "mlx-community/whisper-large-v3-turbo" if has_metal else "whisper-base",
        "ollama_available": ollama_circuit_breaker.state.value != "OPEN",
        "circuit_breaker_state": ollama_circuit_breaker.state.value,
        "ram_available_gb": ram_gb,
        "active_workers": config.get("parallel_workers", 3) if isinstance(config, dict) else getattr(config, "parallel_workers", 3)
    }

@app.get("/api/analytics")
async def get_analytics():
    return get_analytics_summary()

@app.get("/api/brand-kits")
async def get_brand_kits():
    return list_brand_kits()

@app.post("/api/brand-kits")
async def create_or_update_brand_kit(req: Request):
    data = await req.json()
    return save_brand_kit(data)

@app.put("/api/brand-kits/{kit_id}")
async def update_brand_kit_endpoint(kit_id: str, req: Request):
    data = await req.json()
    data["id"] = kit_id
    return save_brand_kit(data)

@app.delete("/api/brand-kits/{kit_id}")
async def delete_brand_kit_endpoint(kit_id: str):
    success = delete_brand_kit(kit_id)
    return {"deleted": success}

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

@app.delete("/api/jobs/{job_id}")
async def delete_job_endpoint(job_id: str):
    success = job_manager.delete_job(job_id)
    return {"deleted": success}

@app.post("/api/jobs/{job_id}/retry")
async def retry_job_endpoint(job_id: str):
    new_job = job_manager.retry_job(job_id)
    if not new_job:
        raise HTTPException(status_code=404, detail="Job could not be found to retry")
    return {"job_id": new_job.job_id, "status": new_job.status}

class ReRenderRequest(BaseModel):
    job_id: str
    clip_id: str
    start: float
    end: float
    title: Optional[str] = None
    deleted_words: List[int] = [] # Autocut-style: indices of words to remove
    caption_style: str = "hormozi"
    reframe_mode: str = "center"
    auto_zoom: bool = True
    multicam: bool = True
    top_banner: bool = True
    include_emojis: bool = True
    include_sfx: bool = True
    background_music: bool = False
    mute_original: bool = False
    music_track: Optional[str] = "ambient_lofi"
    music_volume: float = 0.22
    anti_copyright: bool = False
    broll: bool = False
    watermark: Optional[str] = None
    retention_bar: bool = False
    semantic_highlighting: bool = True
    pattern_zoom: bool = True

@app.post("/api/clips/re-render")
async def re_render_clip(req: ReRenderRequest):
    job = job_manager.get_job_state(req.job_id)
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")

    candidate = next((c for c in job.candidates if c.clip_id == req.clip_id), None)
    if not candidate:
        raise HTTPException(status_code=404, detail="Candidate not found")

    # Update candidate boundaries and context headline
    candidate.start = req.start
    candidate.end = req.end
    candidate.duration = req.end - req.start
    if req.title is not None:
        candidate.title = req.title
    candidate.caption_style = CaptionStyleName(req.caption_style) if req.caption_style in [e.value for e in CaptionStyleName] else CaptionStyleName.HORMOZI
    candidate.reframe_mode = ReframeMode(req.reframe_mode) if req.reframe_mode in [e.value for e in ReframeMode] else ReframeMode.CENTER

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
        multicam=req.multicam,
        top_banner=req.top_banner,
        include_emojis=req.include_emojis,
        include_sfx=req.include_sfx,
        background_music=req.background_music,
        mute_original=req.mute_original,
        music_track=req.music_track,
        music_volume=req.music_volume,
        anti_copyright=req.anti_copyright,
        broll=req.broll,
        extract_thumbnails=True,
        watermark=req.watermark,
        retention_bar=req.retention_bar,
        semantic_highlighting=req.semantic_highlighting,
        pattern_zoom=req.pattern_zoom
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

@app.get("/api/jobs/{job_id}/export/bundle")
async def export_job_bundle(job_id: str, client_name: str = "Valued_Client", handle: str = "@ClipLocal"):
    job = job_manager.get_job_state(job_id)
    if not job or not job.candidates:
        raise HTTPException(status_code=404, detail="Job or rendered candidates not found")

    out_bundle_dir = Path("output/bundles")
    out_bundle_dir.mkdir(parents=True, exist_ok=True)
    zip_path = create_client_delivery_bundle(
        candidates=job.candidates,
        output_bundle_dir=out_bundle_dir,
        client_name=client_name,
        brand_handle=handle,
        source_name=Path(job.source_url_or_path).stem if not job.source_url_or_path.startswith("http") else "Web Video",
        make_zip=True
    )

    return FileResponse(
        path=str(zip_path),
        filename=zip_path.name,
        media_type="application/zip"
    )

@app.get("/api/jobs/{job_id}/export/schedule")
async def export_job_schedule(job_id: str, handle: str = "@ClipLocal"):
    job = job_manager.get_job_state(job_id)
    if not job or not job.candidates:
        raise HTTPException(status_code=404, detail="Job or rendered candidates not found")

    csv_out = Path("output/schedules") / f"schedule_{job_id}.csv"
    csv_file = export_bulk_schedule_csv(
        candidates=job.candidates,
        output_csv_path=csv_out,
        brand_handle=handle
    )

    return FileResponse(
        path=str(csv_file),
        filename=csv_file.name,
        media_type="text/csv"
    )

class HarvestRequest(BaseModel):
    channel_url: str
    clips: int = 5
    max_videos: int = 2
    anti_copyright: bool = True
    watermark: Optional[str] = "@ClipLocal"

@app.post("/api/harvest")
async def harvest_channel(req: HarvestRequest):
    new_vids = detect_unprocessed_videos([req.channel_url], max_per_channel=req.max_videos)
    started_jobs = []
    for vid in new_vids:
        job = job_manager.submit_job(vid["url"], {
            "source": vid["url"],
            "clips": req.clips,
            "style": "hormozi",
            "mode": "auto",
            "anti_copyright": req.anti_copyright,
            "multicam": True,
            "top_banner": True,
            "watermark": req.watermark
        })
        started_jobs.append({"title": vid["title"], "url": vid["url"], "job_id": job.job_id})

    return {"detected_count": len(new_vids), "started_jobs": started_jobs}

@app.get("/api/discover/presets")
async def get_discover_presets():
    return CURATED_PRESETS

@app.get("/api/discover/search")
async def search_discover_videos(query: str, limit: int = 6):
    return search_viral_long_videos(query=query, limit=limit)

# Mount frontend build directory if it exists
frontend_dist = Path("web/frontend/dist")
if frontend_dist.exists():
    app.mount("/", StaticFiles(directory=str(frontend_dist), html=True), name="frontend")
