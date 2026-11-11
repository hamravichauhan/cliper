from __future__ import annotations
import json
import time
from pathlib import Path
from typing import List, Optional, Dict

from src.cliplocal.styles.models import (
    CreatorStyleProfile, TypographyDNA, RhythmDNA, GraphicOverlayDNA, AudioDNA
)

PROFILES_DIR = Path(".cache/style_profiles")

# Built-in presets ready out-of-the-box
BUILTIN_PROFILES: Dict[str, CreatorStyleProfile] = {
    "raj_shamani": CreatorStyleProfile(
        id="raj_shamani",
        name="Raj Shamani Signature",
        creator_handle="@rajshamani",
        description="Vibrant golden-yellow highlights, 2.0s fast snap-zoom cadence, and white-bordered floating sticker pop overlays.",
        is_builtin=True,
        typography=TypographyDNA(
            font_family="Arial",
            font_size=52,
            bold=True,
            uppercase=True,
            primary_color="#FFFFFF",
            highlight_color="#FFD700", # Signature Golden Yellow
            highlight_box_color="#18181B", # Dark translucent backing pill
            outline_color="#000000",
            outline_width=4,
            shadow_offset=2,
            highlight_scale=116,
            words_per_line=3
        ),
        rhythm=RhythmDNA(
            average_shot_duration_sec=2.0,
            zoom_punch_ratio=1.25,
            snap_zoom_on_emphasis=True
        ),
        graphics=GraphicOverlayDNA(
            enabled=True,
            overlay_type="die_cut_sticker",
            sticker_border_px=4,
            sticker_border_color="#FFFFFF",
            drop_shadow=True,
            animation_style="spring_pop",
            max_overlays_per_clip=3
        ),
        audio=AudioDNA(
            whoosh_on_cuts=True,
            shutter_on_stickers=True,
            sub_drop_on_climax=True,
            bg_music_track="ambient_lofi",
            bg_music_ducking_db=-18.0
        )
    ),
    "alex_hormozi": CreatorStyleProfile(
        id="alex_hormozi",
        name="Alex Hormozi Hyper-Retention",
        creator_handle="@hormozi",
        description="High-contrast green/yellow word pops, ultra-fast 1.7s snap zoom, heavy black outlines, and cash ding SFX.",
        is_builtin=True,
        typography=TypographyDNA(
            font_family="Arial",
            font_size=54,
            bold=True,
            uppercase=True,
            primary_color="#FFFFFF",
            highlight_color="#00FF66", # Electric Emerald Green
            highlight_box_color=None,
            outline_color="#000000",
            outline_width=6,
            shadow_offset=3,
            highlight_scale=120,
            words_per_line=2
        ),
        rhythm=RhythmDNA(
            average_shot_duration_sec=1.7,
            zoom_punch_ratio=1.24,
            snap_zoom_on_emphasis=True
        ),
        graphics=GraphicOverlayDNA(
            enabled=False,
            overlay_type="none"
        ),
        audio=AudioDNA(
            whoosh_on_cuts=True,
            shutter_on_stickers=False,
            sub_drop_on_climax=True,
            bg_music_track="ambient_lofi",
            bg_music_ducking_db=-20.0
        )
    ),
    "ali_abdaal": CreatorStyleProfile(
        id="ali_abdaal",
        name="Ali Abdaal Minimalist",
        creator_handle="@aliabdaal",
        description="Clean sky-blue accents, smooth 2.6s calm pacing, soft pastel stickers, and warm lo-fi background music.",
        is_builtin=True,
        typography=TypographyDNA(
            font_family="Arial",
            font_size=44,
            bold=False,
            uppercase=False,
            primary_color="#FFFFFF",
            highlight_color="#38BDF8", # Sky Blue
            highlight_box_color=None,
            outline_color="#1E1E1E",
            outline_width=2,
            shadow_offset=1,
            highlight_scale=106,
            words_per_line=4
        ),
        rhythm=RhythmDNA(
            average_shot_duration_sec=2.6,
            zoom_punch_ratio=1.15,
            snap_zoom_on_emphasis=False
        ),
        graphics=GraphicOverlayDNA(
            enabled=True,
            overlay_type="die_cut_sticker",
            sticker_border_px=3,
            sticker_border_color="#F8FAFC",
            drop_shadow=True,
            animation_style="spring_pop",
            max_overlays_per_clip=2
        ),
        audio=AudioDNA(
            whoosh_on_cuts=False,
            shutter_on_stickers=True,
            sub_drop_on_climax=False,
            bg_music_track="ambient_lofi",
            bg_music_ducking_db=-15.0
        )
    )
}

def get_profiles_dir() -> Path:
    PROFILES_DIR.mkdir(parents=True, exist_ok=True)
    return PROFILES_DIR

def list_style_profiles() -> List[CreatorStyleProfile]:
    """Return all style profiles: built-in defaults + any custom cloned creator profiles."""
    profiles: List[CreatorStyleProfile] = list(BUILTIN_PROFILES.values())

    p_dir = get_profiles_dir()
    for f in p_dir.glob("*.json"):
        try:
            data = json.loads(f.read_text(encoding="utf-8"))
            p = CreatorStyleProfile.model_validate(data)
            # If custom overrides built-in or is new
            profiles = [x for x in profiles if x.id != p.id]
            profiles.append(p)
        except Exception:
            pass

    return profiles

def get_style_profile(profile_id: str) -> Optional[CreatorStyleProfile]:
    """Retrieve a specific profile by ID."""
    all_p = list_style_profiles()
    for p in all_p:
        if p.id.lower() == profile_id.lower():
            return p
    return None

def save_style_profile(profile: CreatorStyleProfile) -> Path:
    """Save a cloned creator style profile to persistent storage."""
    p_dir = get_profiles_dir()
    if not profile.created_at:
        profile.created_at = time.time()
    out_file = p_dir / f"{profile.id}.json"
    out_file.write_text(profile.model_dump_json(indent=2), encoding="utf-8")
    return out_file

def delete_style_profile(profile_id: str) -> bool:
    """Delete a custom style profile (built-ins cannot be deleted)."""
    if profile_id in BUILTIN_PROFILES:
        return False
    p_dir = get_profiles_dir()
    target = p_dir / f"{profile_id}.json"
    if target.exists():
        target.unlink()
        return True
    return False
