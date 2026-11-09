import hashlib
import os
import subprocess
from pathlib import Path
from typing import Tuple, List, Optional
import shutil

def get_system_ram_gb() -> float:
    """Detect available physical RAM in GB (macOS sysctl or os fallback)."""
    try:
        out = subprocess.check_output(["sysctl", "-n", "hw.memsize"]).strip()
        bytes_val = int(out)
        return round(bytes_val / (1024 ** 3), 2)
    except Exception:
        # Fallback
        return 16.0

def compute_file_hash(file_path: Path | str, chunk_size: int = 1024 * 1024) -> str:
    """Compute SHA-256 hash of a file or URL string."""
    str_path = str(file_path)
    if str_path.startswith("http://") or str_path.startswith("https://"):
        return hashlib.sha256(str_path.encode("utf-8")).hexdigest()[:16]
    
    p = Path(file_path)
    if not p.exists():
        return hashlib.sha256(str_path.encode("utf-8")).hexdigest()[:16]
    
    hasher = hashlib.sha256()
    # If file is larger than 100MB, hash first 10MB + last 10MB + size for speed
    file_size = p.stat().st_size
    if file_size > 100 * 1024 * 1024:
        with open(p, "rb") as f:
            hasher.update(f.read(10 * 1024 * 1024))
            f.seek(-10 * 1024 * 1024, os.SEEK_END)
            hasher.update(f.read(10 * 1024 * 1024))
            hasher.update(str(file_size).encode("utf-8"))
    else:
        with open(p, "rb") as f:
            while chunk := f.read(chunk_size):
                hasher.update(chunk)
    return hasher.hexdigest()[:16]

def format_timestamp(seconds: float) -> str:
    """Format seconds into HH:MM:SS.mmm."""
    h = int(seconds // 3600)
    m = int((seconds % 3600) // 60)
    s = int(seconds % 60)
    ms = int((seconds - int(seconds)) * 1000)
    return f"{h:02d}:{m:02d}:{s:02d}.{ms:03d}"

def ass_time(seconds: float) -> str:
    """Format seconds to ASS subtitle format: H:MM:SS.cs (centiseconds)."""
    clamped = max(0.0, seconds)
    h = int(clamped // 3600)
    m = int((clamped % 3600) // 60)
    s = int(clamped % 60)
    cs = int(round((clamped - int(clamped)) * 100))
    if cs >= 100:
        cs = 99
    return f"{h}:{m:02d}:{s:02d}.{cs:02d}"

def check_hardware_encoder() -> str:
    """Probe whether h264_videotoolbox is supported by ffmpeg."""
    try:
        result = subprocess.run(
            ["ffmpeg", "-encoders"],
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            text=True,
            check=True
        )
        if "h264_videotoolbox" in result.stdout:
            return "h264_videotoolbox"
    except Exception:
        pass
    return "libx264"
