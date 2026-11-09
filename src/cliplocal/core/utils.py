import hashlib
import os
import subprocess
from pathlib import Path
from typing import Tuple, List, Optional
import shutil

import platform

def get_system_ram_gb() -> float:
    """Detect available physical RAM in GB across macOS, Windows, and Linux."""
    try:
        if platform.system() == "Darwin":
            out = subprocess.check_output(["sysctl", "-n", "hw.memsize"]).strip()
            return round(int(out) / (1024 ** 3), 2)
        elif platform.system() == "Windows":
            import ctypes
            class MEMORYSTATUSEX(ctypes.Structure):
                _fields_ = [
                    ("dwLength", ctypes.c_ulong),
                    ("dwMemoryLoad", ctypes.c_ulong),
                    ("ullTotalPhys", ctypes.c_ulonglong),
                    ("ullAvailPhys", ctypes.c_ulonglong),
                    ("ullTotalPageFile", ctypes.c_ulonglong),
                    ("ullAvailPageFile", ctypes.c_ulonglong),
                    ("ullTotalVirtual", ctypes.c_ulonglong),
                    ("ullAvailVirtual", ctypes.c_ulonglong),
                    ("sullAvailExtendedVirtual", ctypes.c_ulonglong),
                ]
            stat = MEMORYSTATUSEX()
            stat.dwLength = ctypes.sizeof(MEMORYSTATUSEX)
            ctypes.windll.kernel32.GlobalMemoryStatusEx(ctypes.byref(stat))
            return round(stat.ullTotalPhys / (1024 ** 3), 2)
        else:
            # Linux fallback
            with open("/proc/meminfo", "r") as f:
                for line in f:
                    if line.startswith("MemTotal:"):
                        kb = int(line.split()[1])
                        return round(kb / (1024 ** 2), 2)
    except Exception:
        pass
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
    """Probe whether hardware encoders (Apple VideoToolbox, NVIDIA NVENC, AMD AMF, Intel QSV) are supported."""
    try:
        result = subprocess.run(
            ["ffmpeg", "-encoders"],
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            text=True,
            check=True
        )
        stdout = result.stdout
        if "h264_videotoolbox" in stdout and platform.system() == "Darwin":
            return "h264_videotoolbox"
        elif "h264_nvenc" in stdout:
            return "h264_nvenc"
        elif "h264_amf" in stdout:
            return "h264_amf"
        elif "h264_qsv" in stdout:
            return "h264_qsv"
    except Exception:
        pass
    return "libx264"
