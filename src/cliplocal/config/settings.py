from pathlib import Path
from typing import Any, Dict
import yaml

CONFIG_PATH = Path(__file__).resolve().parent / "config.yaml"

def load_config(path: Path | None = None) -> Dict[str, Any]:
    target_path = path or CONFIG_PATH
    if not target_path.exists():
        return {}
    with open(target_path, "r", encoding="utf-8") as f:
        return yaml.safe_load(f)

# Global singleton config
config = load_config()
