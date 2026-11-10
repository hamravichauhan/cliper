import csv
from pathlib import Path
from datetime import datetime, timedelta
from typing import List, Optional
from src.cliplocal.core.models import CandidateClip
from src.cliplocal.copywriting.generator import generate_social_copy

SCHEDULE_TIMES = ["10:00:00", "14:30:00", "19:00:00"]

def export_bulk_schedule_csv(
    candidates: List[CandidateClip],
    output_csv_path: Path | str,
    brand_handle: str = "@ClipLocal",
    start_date: Optional[datetime] = None,
    posts_per_day: int = 3
) -> Path:
    """
    Generate standard CSV compatible with Meta Business Suite, Buffer, and Metricool
    to schedule 30 days of vertical shorts in 5 minutes.
    """
    out_p = Path(output_csv_path).resolve()
    out_p.parent.mkdir(parents=True, exist_ok=True)

    curr_date = (start_date or datetime.now()).date() + timedelta(days=1)
    time_idx = 0

    rows = []
    headers = ["Date", "Time", "Platform", "Title", "Caption", "Media_Path"]

    for idx, cand in enumerate(candidates):
        schedule_time = SCHEDULE_TIMES[time_idx % len(SCHEDULE_TIMES)]
        copy_bundle = generate_social_copy(cand, brand_handle=brand_handle)

        # Instagram Row
        rows.append({
            "Date": curr_date.strftime("%Y-%m-%d"),
            "Time": schedule_time,
            "Platform": "Instagram Reels",
            "Title": copy_bundle.instagram.title,
            "Caption": copy_bundle.instagram.caption.replace("\n", " "),
            "Media_Path": cand.output_path or ""
        })

        # YouTube Shorts Row
        rows.append({
            "Date": curr_date.strftime("%Y-%m-%d"),
            "Time": schedule_time,
            "Platform": "YouTube Shorts",
            "Title": copy_bundle.youtube.title,
            "Caption": copy_bundle.youtube.caption.replace("\n", " "),
            "Media_Path": cand.output_path or ""
        })

        time_idx += 1
        if time_idx % posts_per_day == 0:
            curr_date += timedelta(days=1)

    with open(out_p, "w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=headers)
        writer.writeheader()
        writer.writerows(rows)

    return out_p
