from __future__ import annotations
from typing import List, Optional, Dict, Any
from pydantic import BaseModel, Field

class TypographyDNA(BaseModel):
    font_family: str = "Arial"
    font_size: int = 50
    bold: bool = True
    uppercase: bool = True
    primary_color: str = "#FFFFFF"          # Base word color (White)
    highlight_color: str = "#FFD700"        # Active word pop color (e.g. Golden Yellow for Raj Shamani)
    highlight_box_color: Optional[str] = None # Dark translucent pill or box
    outline_color: str = "#000000"
    outline_width: int = 4
    shadow_offset: int = 2
    highlight_scale: int = 115              # Scale pop on active word (115%)
    margin_v: int = 280                     # Vertical position from bottom safe area
    words_per_line: int = 3                 # 2-4 words per card

class RhythmDNA(BaseModel):
    average_shot_duration_sec: float = 2.0  # Cut or snap-zoom every ~2 seconds
    zoom_punch_ratio: float = 1.25          # 1.25x close-up
    snap_zoom_on_emphasis: bool = True      # Snap-zoom on high-energy words
    max_pause_silence_ms: int = 350         # Dead-air threshold

class GraphicOverlayDNA(BaseModel):
    enabled: bool = True
    overlay_type: str = "die_cut_sticker"   # "die_cut_sticker" | "fullscreen_broll" | "none"
    sticker_border_px: int = 4              # 4px die-cut white outline
    sticker_border_color: str = "#FFFFFF"   # White stroke
    drop_shadow: bool = True                # 40% soft shadow
    animation_style: str = "spring_pop"     # "spring_pop" | "slide_in"
    max_overlays_per_clip: int = 3          # 2-3 visual pops per short
    asset_source: str = "wikimedia_openverse" # Non-copyright search target

class AudioDNA(BaseModel):
    whoosh_on_cuts: bool = True             # Subtle whoosh on scene/camera cuts
    shutter_on_stickers: bool = True        # Camera shutter or pop SFX when graphic appears
    sub_drop_on_climax: bool = True         # 808 sub bass drop on climax sentence
    bg_music_track: Optional[str] = "ambient_lofi"
    bg_music_ducking_db: float = -18.0      # -18 dB auto-ducking during dialogue

class CreatorStyleProfile(BaseModel):
    id: str                                 # Unique identifier (e.g. "raj_shamani", "alex_hormozi")
    name: str                               # Display name (e.g. "Raj Shamani Signature")
    creator_handle: Optional[str] = None    # e.g. "@rajshamani"
    description: str = ""
    is_builtin: bool = False
    created_at: float = Field(default_factory=lambda: 0.0)
    sample_urls: List[str] = Field(default_factory=list)
    typography: TypographyDNA = Field(default_factory=TypographyDNA)
    rhythm: RhythmDNA = Field(default_factory=RhythmDNA)
    graphics: GraphicOverlayDNA = Field(default_factory=GraphicOverlayDNA)
    audio: AudioDNA = Field(default_factory=AudioDNA)
