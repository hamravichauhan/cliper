import gc
from pathlib import Path
from typing import Optional, List
import mlx_whisper
from src.cliplocal.core.models import Transcript, Word
from src.cliplocal.transcribe.base import BaseTranscriber

class MLXWhisperTranscriber(BaseTranscriber):
    def __init__(self, model_name: str = "mlx-community/whisper-large-v3-turbo"):
        self.model_name = model_name

    def transcribe(self, audio_path: Path, language: Optional[str] = None) -> Transcript:
        options = {
            "path_or_hf_repo": self.model_name,
            "word_timestamps": True,
        }
        if language and language != "auto":
            options["language"] = language

        result = mlx_whisper.transcribe(str(audio_path), **options)

        full_text = result.get("text", "").strip()
        detected_lang = result.get("language", "en")
        words: List[Word] = []

        segments = result.get("segments", [])
        duration = segments[-1]["end"] if segments else 0.0

        for seg in segments:
            for w in seg.get("words", []):
                clean_text = w.get("word", "").strip()
                if clean_text:
                    words.append(Word(
                        word=clean_text,
                        start=round(float(w.get("start", 0.0)), 3),
                        end=round(float(w.get("end", 0.0)), 3),
                        probability=round(float(w.get("probability", 1.0)), 3)
                    ))

        return Transcript(
            language=detected_lang,
            duration=duration,
            text=full_text,
            words=words,
            sentences=[]
        )

    def unload(self) -> None:
        gc.collect()
