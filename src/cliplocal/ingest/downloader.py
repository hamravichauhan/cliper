import subprocess
from pathlib import Path
from src.cliplocal.config.settings import config
from src.cliplocal.core.utils import compute_file_hash

def is_url(path_or_url: str) -> bool:
    return path_or_url.startswith("http://") or path_or_url.startswith("https://")

def download_video(url: str, cache_dir: Path | str | None = None) -> Path:
    """Download video using yt-dlp with caching."""
    base_cache = Path(cache_dir or config.get("app", {}).get("cache_dir", ".cache"))
    downloads_dir = base_cache / "downloads"
    downloads_dir.mkdir(parents=True, exist_ok=True)

    url_hash = compute_file_hash(url)
    out_template = str(downloads_dir / f"{url_hash}_%(title).50s.%(ext)s")

    # Check if file with url_hash already exists
    existing = list(downloads_dir.glob(f"{url_hash}_*"))
    if existing and existing[0].exists() and existing[0].stat().st_size > 1024:
        return existing[0]

    cmd = [
        "yt-dlp",
        "--format", "bestvideo[ext=mp4]+bestaudio[ext=m4a]/best[ext=mp4]/best",
        "--merge-output-format", "mp4",
        "--output", out_template,
        "--no-playlist",
        url
    ]

    subprocess.run(cmd, stdout=subprocess.DEVNULL, stderr=subprocess.PIPE, check=True)

    # Find the downloaded file
    downloaded = list(downloads_dir.glob(f"{url_hash}_*"))
    if not downloaded:
        raise RuntimeError(f"Failed to locate downloaded file for {url}")
    return downloaded[0]
