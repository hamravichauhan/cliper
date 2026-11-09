import httpx
from typing import Optional, List, Dict, Any
from src.cliplocal.config.settings import config

class OllamaClient:
    def __init__(self, host: Optional[str] = None, model: Optional[str] = None):
        ollama_cfg = config.get("ollama", {})
        self.host = (host or ollama_cfg.get("host", "http://127.0.0.1:11434")).rstrip("/")
        self.model = model or ollama_cfg.get("model", "llava:7b")
        self.timeout = float(ollama_cfg.get("timeout_seconds", 45))

    def is_available(self) -> bool:
        """Check if local Ollama daemon is reachable on localhost."""
        try:
            r = httpx.get(f"{self.host}/api/tags", timeout=2.0)
            return r.status_code == 200
        except Exception:
            return False

    def get_available_models(self) -> List[str]:
        try:
            r = httpx.get(f"{self.host}/api/tags", timeout=2.0)
            if r.status_code == 200:
                data = r.json()
                return [m.get("name", "") for m in data.get("models", [])]
        except Exception:
            pass
        return []

    def generate(self, prompt: str, system_prompt: Optional[str] = None) -> Optional[str]:
        """Generate response from local Ollama model."""
        payload = {
            "model": self.model,
            "prompt": prompt,
            "stream": False,
            "options": {
                "temperature": 0.2,
                "top_p": 0.9,
            }
        }
        if system_prompt:
            payload["system"] = system_prompt

        try:
            with httpx.Client(timeout=self.timeout) as client:
                res = client.post(f"{self.host}/api/generate", json=payload)
                if res.status_code == 200:
                    return res.json().get("response")
        except Exception as e:
            # Fall back safely
            pass
        return None
