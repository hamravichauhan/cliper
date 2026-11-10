import shutil
import zipfile
import json
import re
from pathlib import Path
from datetime import datetime
from typing import List, Optional, Dict, Any
from src.cliplocal.core.models import CandidateClip, VideoMetadata
from src.cliplocal.copywriting.generator import generate_social_copy, SocialCopyBundle

HTML_REPORT_TEMPLATE = """<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Executive Clip Delivery Report — {client_name}</title>
  <style>
    body {{
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      background: #0B0E14;
      color: #E2E8F0;
      margin: 0;
      padding: 40px 20px;
    }}
    .container {{
      max-width: 900px;
      margin: 0 auto;
    }}
    .header {{
      border-bottom: 1px solid #1E293B;
      padding-bottom: 24px;
      margin-bottom: 32px;
    }}
    h1 {{
      font-size: 28px;
      color: #F8FAFC;
      margin: 0 0 8px 0;
    }}
    .meta {{
      font-size: 14px;
      color: #94A3B8;
    }}
    .badge {{
      display: inline-block;
      padding: 4px 10px;
      border-radius: 999px;
      font-size: 12px;
      font-weight: 700;
      background: #7C3AED20;
      color: #A78BFA;
      border: 1px solid #7C3AED40;
    }}
    .clip-card {{
      background: #111827;
      border: 1px solid #1F2937;
      border-radius: 16px;
      padding: 24px;
      margin-bottom: 24px;
    }}
    .clip-title {{
      font-size: 18px;
      font-weight: 700;
      color: #FFFFFF;
      margin-top: 0;
    }}
    .score-badge {{
      font-size: 13px;
      font-weight: bold;
      padding: 3px 8px;
      border-radius: 6px;
      background: #05966920;
      color: #34D399;
      border: 1px solid #05966940;
    }}
    .copy-block {{
      background: #030712;
      border: 1px solid #1E293B;
      border-radius: 8px;
      padding: 14px;
      font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
      font-size: 12px;
      color: #CBD5E1;
      white-space: pre-wrap;
      margin-top: 12px;
    }}
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <span class="badge">PRO CONTENT DELIVERY</span>
      <h1>Executive Shorts Delivery — {client_name}</h1>
      <div class="meta">
        Processed: {delivery_date} | Clips: {total_clips} | Source: {source_name}
      </div>
    </div>

    {clip_sections}
  </div>
</body>
</html>
"""

def create_client_delivery_bundle(
    candidates: List[CandidateClip],
    output_bundle_dir: Path | str,
    client_name: str = "Client",
    brand_handle: str = "@ClientName",
    source_name: str = "Podcast Episode",
    make_zip: bool = True
) -> Path:
    """
    Export a turnkey agency client delivery pack containing organized folders
    with MP4 videos, 9:16 cover thumbnails, YouTube copy, Instagram copy,
    and an executive client delivery HTML report.
    """
    root_out = Path(output_bundle_dir).resolve()
    timestamp_slug = datetime.now().strftime("%Y%m%d_%H%M")
    clean_client = re.sub(r"[^\w-]", "_", client_name.strip())
    bundle_folder = root_out / f"Delivery_{clean_client}_{timestamp_slug}"
    bundle_folder.mkdir(parents=True, exist_ok=True)

    clip_html_sections = []

    for idx, cand in enumerate(candidates):
        clip_slug = re.sub(r"[^\w-]", "_", (cand.title or f"clip_{idx+1}").lower())[:30]
        clip_dir = bundle_folder / f"{idx+1:02d}_{clip_slug}"
        clip_dir.mkdir(parents=True, exist_ok=True)

        # 1. Copy Video
        if cand.output_path and Path(cand.output_path).exists():
            shutil.copyfile(cand.output_path, clip_dir / f"{idx+1:02d}_{clip_slug}.mp4")

        # 2. Copy Thumbnails
        for t_idx, thumb_str in enumerate(cand.thumbnails):
            thumb_path = Path(thumb_str)
            if thumb_path.exists():
                shutil.copyfile(thumb_path, clip_dir / f"cover_{t_idx+1}.jpg")

        # 3. Generate Social Copy
        copy_bundle = generate_social_copy(cand, brand_handle=brand_handle)
        (clip_dir / "post_copy_instagram.txt").write_text(copy_bundle.instagram.formatted_post, encoding="utf-8")
        (clip_dir / "post_copy_youtube.txt").write_text(copy_bundle.youtube.formatted_post, encoding="utf-8")

        # Append HTML Section
        section_html = f"""
        <div class="clip-card">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
            <h2 class="clip-title">#{idx+1} — {cand.title}</h2>
            <span class="score-badge">Virality Score: {cand.score.total_score:.1f}/100</span>
          </div>
          <div style="font-size: 13px; color: #94A3B8; margin-bottom: 8px;">
            Duration: {cand.duration:.1f}s | Hook Type: {cand.score.hook_type or 'Insight'}
          </div>
          <div style="font-size: 13px; color: #E2E8F0; margin-bottom: 12px;">
            <strong>Transcript Excerpt:</strong> "{cand.text[:160]}..."
          </div>
          <strong>Instagram Caption & Hashtags:</strong>
          <div class="copy-block">{copy_bundle.instagram.caption}</div>
        </div>
        """
        clip_html_sections.append(section_html)

    # 4. Write Executive HTML Report
    html_content = HTML_REPORT_TEMPLATE.format(
        client_name=client_name,
        delivery_date=datetime.now().strftime("%B %d, %Y"),
        total_clips=len(candidates),
        source_name=source_name,
        clip_sections="\n".join(clip_html_sections)
    )
    (bundle_folder / "Executive_Delivery_Report.html").write_text(html_content, encoding="utf-8")

    # 5. Optional ZIP packaging
    if make_zip:
        zip_path = root_out / f"Delivery_{clean_client}_{timestamp_slug}.zip"
        with zipfile.ZipFile(zip_path, "w", zipfile.ZIP_DEFLATED) as zipf:
            for file_p in bundle_folder.rglob("*"):
                if file_p.is_file():
                    arcname = file_p.relative_to(bundle_folder)
                    zipf.write(file_p, arcname)
        return zip_path

    return bundle_folder
