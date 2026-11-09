import json
import subprocess
import urllib.request
from pathlib import Path
from typing import Optional, List
from src.cliplocal.core.models import Transcript, Word
from src.cliplocal.transcribe.base import BaseTranscriber
from src.cliplocal.config.settings import config

class WhisperCppTranscriber(BaseTranscriber):
    def __init__(self, model_name: str = "ggml-large-v3-turbo.bin", models_dir: Path | str = ".cache/models"):
        self.model_name = model_name
        self.models_dir = Path(models_dir)
        self.models_dir.mkdir(parents=True, exist_ok=True)
        self.bin_path = Path(config.get("system", {}).get("whisper_cpp_bin", "/opt/homebrew/bin/whisper-cli"))

    def _ensure_model(self) -> Path:
        model_path = self.models_dir / self.model_name
        if model_path.exists() and model_path.stat().st_size > 100000:
            return model_path

        # Download model if not present
        url = f"https://huggingface.co/ggerganov/whisper.cpp/resolve/main/{self.model_name}"
        urllib.request.urlretrieve(url, model_path)
        return model_path

    def transcribe(self, audio_path: Path, language: Optional[str] = None) -> Transcript:
        if not self.bin_path.exists():
            raise FileNotFoundError(f"whisper-cli not found at {self.bin_path}")

        model_file = self._ensure_model()
        out_prefix = self.models_dir / f"tmp_cpp_{audio_path.stem}"

        cmd = [
            str(self.bin_path),
            "-m", str(model_file),
            "-f", str(audio_path),
            "-ojf",
            "-of", str(out_prefix),
            "-wt", "0.01",
            "--split-on-word"
        ]

        if language and language != "auto":
            cmd.extend(["-l", language])
        else:
            cmd.extend(["-l", "auto"])

        subprocess.run(cmd, stdout=subprocess.DEVNULL, stderr=subprocess.PIPE, check=True)

        json_file = Path(f"{out_prefix}.json")
        if not json_file.exists():
            raise RuntimeError(f"whisper-cli output json file not found: {json_file}")

        with open(json_file, "r", encoding="utf-8") as f:
            data = json.load(f)

        # Cleanup tmp json
        try:
            json_file.unlink()
        except Exception:
            pass

        transcription = data.get("transcription", [])
        words: List[Word] = []
        full_text_list: List[str] = []
        duration = 0.0

        for seg in transcription:
            full_text_list.append(seg.get("text", "").strip())
            # Check tokens or words
            for tok in seg.get("tokens", []):
                t_text = tok.get("text", "").strip()
                t_offsets = tok.get("offsets", {})
                t_from = t_offsets.get("from", 0) / 1000.0
                t_to = t_offsets.get("to", 0) / 1000.0
                prob = tok.get("p", 1.0)
                if t_text and not t_text.startswith("[_"):
                    words.append(Word(
                        word=t_text,
                        start=round(t_from, 3),
                        end=round(t_to, 3),
                        probability=round(prob, 3)
                    ))
                    duration = max(duration, t_to)

        return Transcript(
            language=data.get("result", {}).get("language", "en"),
            duration=duration,
            text=" ".join(full_text_list),
            words=words,
            sentences=[]
        )

    def unload(self) -> None:
        pass
