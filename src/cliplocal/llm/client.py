import httpx
import concurrent.futures
from typing import Optional, List, Dict, Any
from src.cliplocal.config.settings import config
from src.cliplocal.llm.circuit_breaker import ollama_circuit_breaker

PREFERRED_MODELS = ["llama3", "mistral", "qwen2.5", "qwen", "llama", "llava"]

class OllamaClient:
    def __init__(self, host: Optional[str] = None, model: Optional[str] = None):
        ollama_cfg = config.get("ollama", {})
        self.host = (host or ollama_cfg.get("host", "http://127.0.0.1:11434")).rstrip("/")
        self.timeout = float(ollama_cfg.get("timeout_seconds", 8.0)) # 8.0s strict circuit breaker timeout
        self.model = model or self._auto_detect_model(ollama_cfg.get("model"))

    def _auto_detect_model(self, configured_model: Optional[str] = None) -> str:
        """Probe available models and pick best model in priority cascade."""
        if configured_model and configured_model != "auto":
            return configured_model
        try:
            available = self.get_available_models()
            for pref in PREFERRED_MODELS:
                for m in available:
                    if pref in m.lower():
                        return m
            if available:
                return available[0]
        except Exception:
            pass
        return "llama3:latest"

    def is_available(self) -> bool:
        """Check if local Ollama daemon is reachable on localhost."""
        if not ollama_circuit_breaker.can_execute():
            return False
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

    def _raw_generate_post(self, payload: dict) -> Optional[str]:
        with httpx.Client(timeout=self.timeout) as client:
            res = client.post(f"{self.host}/api/generate", json=payload)
            if res.status_code == 200:
                return res.json().get("response")
        return None

    def generate(self, prompt: str, system_prompt: Optional[str] = None) -> Optional[str]:
        """
        Generate response from local Ollama model with hard wall-clock timeout & circuit breaker protection.
        Uses ThreadPoolExecutor to enforce an 8s hard wall-clock limit, immune to slow token streaming.
        """
        if not ollama_circuit_breaker.can_execute():
            return None

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

        # Enforce hard wall-clock timeout via concurrent.futures ThreadPoolExecutor
        with concurrent.futures.ThreadPoolExecutor(max_workers=1) as executor:
            future = executor.submit(self._raw_generate_post, payload)
            try:
                response = future.result(timeout=self.timeout)
                if response:
                    ollama_circuit_breaker.record_success()
                    return response
                else:
                    ollama_circuit_breaker.record_failure()
            except concurrent.futures.TimeoutError:
                # Hard wall-clock limit exceeded
                ollama_circuit_breaker.record_failure()
            except Exception:
                ollama_circuit_breaker.record_failure()

        return None
