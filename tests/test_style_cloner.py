import pytest
import numpy as np
import cv2
from pathlib import Path

from src.cliplocal.styles.models import (
    CreatorStyleProfile, TypographyDNA, RhythmDNA, GraphicOverlayDNA, AudioDNA
)
from src.cliplocal.styles.manager import (
    list_style_profiles, get_style_profile, save_style_profile, delete_style_profile, BUILTIN_PROFILES
)
from src.cliplocal.styles.extractor import (
    detect_caption_colors_from_frames, measure_video_cut_rhythm, clone_creator_style_dna
)
from src.cliplocal.broll.scraper import (
    extract_semantic_entities, generate_procedural_sticker_fallback, convert_to_die_cut_sticker
)

def test_builtin_profiles_available():
    profiles = list_style_profiles()
    ids = [p.id for p in profiles]
    assert "raj_shamani" in ids
    assert "alex_hormozi" in ids
    assert "ali_abdaal" in ids

    raj = get_style_profile("raj_shamani")
    assert raj is not None
    assert raj.typography.highlight_color == "#FFD700" # Golden yellow
    assert raj.rhythm.average_shot_duration_sec == 2.0
    assert raj.graphics.overlay_type == "die_cut_sticker"

def test_custom_profile_save_and_delete(tmp_path):
    custom = CreatorStyleProfile(
        id="test_creator_123",
        name="Test Creator Signature",
        creator_handle="@testcreator",
        description="Testing custom cloned style.",
        typography=TypographyDNA(
            primary_color="#FFFFFF",
            highlight_color="#FF0055"
        )
    )
    saved_path = save_style_profile(custom)
    assert saved_path.exists()

    fetched = get_style_profile("test_creator_123")
    assert fetched is not None
    assert fetched.typography.highlight_color == "#FF0055"

    deleted = delete_style_profile("test_creator_123")
    assert deleted is True
    assert get_style_profile("test_creator_123") is None

def test_detect_caption_colors_yellow():
    # Create test frame with bright yellow text block
    h, w = 1920, 1080
    frame = np.zeros((h, w, 3), dtype=np.uint8)
    # Paint a yellow block in middle third (BGR for yellow: 0, 215, 255)
    frame[1000:1080, 400:680] = [0, 215, 255]

    primary, highlight, has_pill = detect_caption_colors_from_frames([frame])
    assert highlight == "#FFD700"

def test_extract_semantic_entities():
    text1 = "When Steve Jobs took over Apple again they had zero money left in the bank."
    entities = extract_semantic_entities(text1)
    assert any("steve jobs" in e.lower() or "apple" in e.lower() or "money" in e.lower() for e in entities)

    text2 = "The startup founder raised capital but the profit was too low."
    entities2 = extract_semantic_entities(text2)
    assert any("startup" in e.lower() or "founder" in e.lower() or "profit" in e.lower() for e in entities2)

def test_die_cut_sticker_generation(tmp_path):
    # Create a small dummy RGBA image
    test_img = np.zeros((200, 200, 3), dtype=np.uint8)
    cv2.circle(test_img, (100, 100), 80, (0, 120, 255), -1)
    raw_p = tmp_path / "raw_test.jpg"
    cv2.imwrite(str(raw_p), test_img)

    sticker_p = convert_to_die_cut_sticker(raw_p, border_px=4, target_size=300)
    assert sticker_p.exists()

    sticker_mat = cv2.imread(str(sticker_p), cv2.IMREAD_UNCHANGED)
    assert sticker_mat.shape[2] == 4 # Has alpha channel
    assert sticker_mat.shape[0] == 300
    assert sticker_mat.shape[1] == 300
