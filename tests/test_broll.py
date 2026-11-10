import pytest
from src.cliplocal.core.models import Word
from src.cliplocal.broll.engine import find_broll_cutaways, ensure_default_broll_assets

def test_ensure_default_broll_assets():
    assets = ensure_default_broll_assets()
    assert "money" in assets
    assert "tech" in assets
    assert assets["money"].exists()

def test_find_broll_cutaways():
    words = [
        Word(word="Here", start=10.0, end=10.3),
        Word(word="is", start=10.4, end=10.6),
        # At 14.0s (offset 10.0 -> rel 4.0s) keyword 'money'
        Word(word="the", start=13.5, end=13.8),
        Word(word="money", start=14.0, end=14.5),
        # At 24.0s (rel 14.0s) keyword 'code'
        Word(word="about", start=23.5, end=23.8),
        Word(word="code", start=24.0, end=24.5),
    ]

    cutaways = find_broll_cutaways(
        words=words,
        time_offset=10.0,
        clip_duration=30.0,
        max_cutaways=2,
        min_spacing=6.0
    )

    assert len(cutaways) >= 1
    assert cutaways[0].tag == "money"
    assert cutaways[0].t_start >= 3.0
    assert cutaways[0].t_end <= 30.0
