import pytest
from src.cliplocal.core.models import Word
from src.cliplocal.audio.sfx import ensure_sfx_assets, find_sfx_trigger_points

def test_ensure_sfx_assets():
    assets = ensure_sfx_assets()
    assert "pop" in assets
    assert "ding" in assets
    assert "whoosh" in assets
    assert assets["pop"].exists()
    assert assets["ding"].exists()
    assert assets["whoosh"].exists()

def test_find_sfx_trigger_points():
    words = [
        Word(word="Here", start=0.0, end=0.3),
        Word(word="is", start=0.35, end=0.5),
        Word(word="the", start=0.55, end=0.7),
        Word(word="secret", start=0.75, end=1.1),
        Word(word="to", start=1.2, end=1.4),
        Word(word="making", start=1.45, end=1.8),
        # Number word triggering ding after min spacing
        Word(word="million", start=5.0, end=5.5),
        Word(word="dollars.", start=5.55, end=6.0),
    ]

    triggers = find_sfx_trigger_points(words, clip_start=0.0, min_spacing_sec=3.0)
    assert len(triggers) >= 2
    assert triggers[0][1] == "whoosh" # opening trigger
    assert any(t[1] == "ding" for t in triggers)
