from abc import ABC, abstractmethod
from pathlib import Path
from typing import Optional
from src.cliplocal.core.models import Transcript

class BaseTranscriber(ABC):
    @abstractmethod
    def transcribe(self, audio_path: Path, language: Optional[str] = None) -> Transcript:
        """Transcribe audio file into a standardized Transcript object with word-level timestamps."""
        pass

    @abstractmethod
    def unload(self) -> None:
        """Free memory allocated by the model."""
        pass
