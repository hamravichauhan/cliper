import json
from pathlib import Path
from typing import Optional
from src.cliplocal.config.settings import config
from src.cliplocal.core.models import Transcript
from src.cliplocal.core.utils import compute_file_hash
from src.cliplocal.transcribe.mlx_engine import MLXWhisperTranscriber
from src.cliplocal.transcribe.faster_engine import FasterWhisperTranscriber
from src.cliplocal.transcribe.cpp_engine import WhisperCppTranscriber

def get_transcriber(backend: Optional[str] = None):
    chosen = backend or config.get("transcribe", {}).get("backend", "mlx")
    if chosen == "mlx":
        model_name = config.get("transcribe", {}).get("model", "mlx-community/whisper-large-v3-turbo")
        return MLXWhisperTranscriber(model_name=model_name)
    elif chosen == "faster_whisper":
        model_name = config.get("transcribe", {}).get("faster_whisper_model", "large-v3-turbo")
        return FasterWhisperTranscriber(model_name=model_name)
    elif chosen == "whisper_cpp":
        return WhisperCppTranscriber()
    else:
        raise ValueError(f"Unknown transcription backend: {chosen}")

def transcribe_audio_cached(audio_path: Path | str, backend: Optional[str] = None, language: Optional[str] = None, cache_dir: Path | str | None = None) -> Transcript:
    ap = Path(audio_path).resolve()
    base_cache = Path(cache_dir or config.get("app", {}).get("cache_dir", ".cache"))
    transcripts_cache = base_cache / "transcripts"
    transcripts_cache.mkdir(parents=True, exist_ok=True)

    audio_hash = compute_file_hash(ap)
    backend_name = backend or config.get("transcribe", {}).get("backend", "mlx")
    cache_file = transcripts_cache / f"{audio_hash}_{backend_name}.json"

    # Cache hit
    if cache_file.exists() and cache_file.stat().st_size > 10:
        with open(cache_file, "r", encoding="utf-8") as f:
            data = json.load(f)
            return Transcript.model_validate(data)

    transcriber = get_transcriber(backend=backend_name)
    try:
        transcript = transcriber.transcribe(ap, language=language)
    finally:
        transcriber.unload()

    # Cache result
    with open(cache_file, "w", encoding="utf-8") as f:
        json.dump(transcript.model_dump(), f, indent=2)

    return transcript
