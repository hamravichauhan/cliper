import gc
from pathlib import Path
from typing import Optional, List
from faster_whisper import WhisperModel
from src.cliplocal.core.models import Transcript, Word
from src.cliplocal.transcribe.base import BaseTranscriber

class FasterWhisperTranscriber(BaseTranscriber):
    def __init__(self, model_name: str = "large-v3-turbo", device: str = "cpu", compute_type: str = "int8"):
        self.model_name = model_name
        self.device = device
        self.compute_type = compute_type
        self.model: Optional[WhisperModel] = None

    def _ensure_model(self):
        if self.model is None:
            self.model = WhisperModel(self.model_name, device=self.device, compute_type=self.compute_type)

    def transcribe(self, audio_path: Path, language: Optional[str] = None) -> Transcript:
        self._ensure_model()
        lang_arg = None if (not language or language == "auto") else language

        segments, info = self.model.transcribe(
            str(audio_path),
            language=lang_arg,
            word_timestamps=True,
            vad_filter=True,
            vad_parameters=dict(min_silence_duration_ms=800)
        )

        words: List[Word] = []
        full_text_parts: List[str] = []
        duration = 0.0

        for seg in segments:
            full_text_parts.append(seg.text.strip())
            duration = max(duration, seg.end)
            if seg.words:
                for w in seg.words:
                    clean_text = w.word.strip()
                    if clean_text:
                        words.append(Word(
                            word=clean_text,
                            start=round(float(w.start), 3),
                            end=round(float(w.end), 3),
                            probability=round(float(w.probability), 3)
                        ))

        return Transcript(
            language=info.language or "en",
            duration=duration,
            text=" ".join(full_text_parts),
            words=words,
            sentences=[]
        )

    def unload(self) -> None:
        if self.model is not None:
            del self.model
            self.model = None
        gc.collect()
