from __future__ import annotations
import json
from pathlib import Path
from typing import List, Dict, Any, Optional

from src.cliplocal.segment.podcast_qa import PodcastQAPair

def export_podcast_qa_manifest_json(
    qa_pairs: List[PodcastQAPair],
    output_path: Path | str,
    video_title: str = "Podcast Episode",
    source_url: Optional[str] = None,
    rendered_indices: Optional[List[int]] = None
) -> Path:
    """Export complete structured JSON manifest of all detected Q&A pairs."""
    out_p = Path(output_path).resolve()
    out_p.parent.mkdir(parents=True, exist_ok=True)

    rendered_set = set(rendered_indices or [])

    items: List[Dict[str, Any]] = []
    for qa in qa_pairs:
        items.append({
            "qa_id": qa.qa_id,
            "question_text": qa.question_text,
            "asker": qa.asker,
            "answerer": qa.answerer,
            "answer_preview": qa.answer_text[:120] + "..." if len(qa.answer_text) > 120 else qa.answer_text,
            "timestamps": {
                "question_start": round(qa.question_start, 2),
                "question_end": round(qa.question_end, 2),
                "answer_start": round(qa.answer_start, 2),
                "answer_end": round(qa.answer_end, 2),
                "total_start": round(qa.total_start, 2),
                "total_end": round(qa.total_end, 2),
                "duration_seconds": round(qa.duration, 2)
            },
            "viral_score": qa.viral_score,
            "viral_archetype": qa.viral_archetype,
            "recommended_platform": qa.recommended_platform,
            "hook_headline": qa.hook_headline,
            "social_caption": qa.social_caption,
            "hashtags": qa.hashtags,
            "is_rendered": qa.qa_id in rendered_set
        })

    payload = {
        "title": video_title,
        "source": source_url or "",
        "total_questions_detected": len(qa_pairs),
        "total_rendered_clips": len(rendered_set),
        "questions": items
    }

    out_p.write_text(json.dumps(payload, indent=2, ensure_ascii=False), encoding="utf-8")
    return out_p

def export_podcast_qa_manifest_md(
    qa_pairs: List[PodcastQAPair],
    output_path: Path | str,
    video_title: str = "Podcast Episode",
    source_url: Optional[str] = None,
    rendered_indices: Optional[List[int]] = None
) -> Path:
    """
    Export human-readable Markdown briefing table listing all Q&A pairs,
    speakers, timestamps, virality scores, and platform targeting.
    """
    out_p = Path(output_path).resolve()
    out_p.parent.mkdir(parents=True, exist_ok=True)

    rendered_set = set(rendered_indices or [])

    lines = [
        f"# 🎙️ Podcast Q&A Master Index: {video_title}",
        "",
        f"> **Total Questions Detected**: {len(qa_pairs)}  ",
        f"> **Auto-Rendered Top Clips**: {len(rendered_set)}  ",
        f"> **Source**: {source_url or 'Local File'}  ",
        "",
        "---",
        "",
        "## 📊 Complete Questions Index",
        "",
        "| # | Status | Viral Score | Recommended Platform | Question Asked | Duration | Timestamp | Archetype |",
        "|---|---|---|---|---|---|---|---|"
    ]

    for qa in qa_pairs:
        status_badge = "🟢 **Rendered**" if qa.qa_id in rendered_set else "⚪ *Ready to Render*"
        platform_icon = "🔴 YouTube Shorts" if qa.recommended_platform == "YouTube Shorts" else "🟣 Instagram Reels"
        m, s = divmod(int(qa.total_start), 60)
        time_str = f"{m:02d}:{s:02d}"
        dur_str = f"{qa.duration:.1f}s"
        clean_q = qa.question_text.replace("|", "\\|").replace("\n", " ")

        lines.append(
            f"| **{qa.qa_id}** | {status_badge} | **{qa.viral_score}/100** | {platform_icon} | {clean_q} | {dur_str} | `{time_str}` | *{qa.viral_archetype}* |"
        )

    lines.extend([
        "",
        "---",
        "",
        "### 💡 How to Render Remaining Questions On Demand",
        "All unrendered questions above are preserved in this project's database.",
        "You can render any question into a vertical 9:16 short at any time by selecting its Question # in the ClipLocal Studio or CLI."
    ])

    out_p.write_text("\n".join(lines), encoding="utf-8")
    return out_p
