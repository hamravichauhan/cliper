import pytest
from src.cliplocal.core.models import Word
from src.cliplocal.edit.jump_cut import detect_filler_and_pause_cuts

def test_detect_filler_and_pause_cuts():
    words = [
        Word(word="Hello", start=0.0, end=0.4),
        Word(word="um", start=0.6, end=0.8), # Filler to be cut
        Word(word="world", start=1.0, end=1.4),
        # 3.0 second dead silence here
        Word(word="again.", start=4.5, end=5.0),
    ]

    keep_intervals, remapped_words = detect_filler_and_pause_cuts(
        words=words,
        clip_start=0.0,
        clip_end=5.0,
        max_pause_sec=1.0,
        remove_fillers=True
    )

    # The dead silence between 1.4s and 4.5s should result in 2 separate intervals
    assert len(keep_intervals) == 2
    # "um" should be removed
    assert [w.word for w in remapped_words] == ["Hello", "world", "again."]
    # Remapped words should have compressed continuous timestamps
    assert remapped_words[-1].end < 5.0
