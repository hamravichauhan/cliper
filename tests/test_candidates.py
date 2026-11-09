import pytest
from src.cliplocal.core.models import Sentence, Word
from src.cliplocal.candidates.window_builder import build_candidate_windows

def make_sentence(idx: int, text: str, start: float, end: float, dangling: bool = False) -> Sentence:
    words = [Word(word=w, start=start, end=end) for w in text.split()]
    return Sentence(
        index=idx,
        start=start,
        end=end,
        text=text,
        words=words,
        has_terminal_punct=not dangling,
        dangling_end=dangling
    )

def test_candidate_window_duration_constraints():
    sentences = [
        make_sentence(0, "First sentence here.", 0.0, 10.0),
        make_sentence(1, "Second sentence with more words.", 10.0, 25.0),
        make_sentence(2, "Third sentence concluding a thought.", 25.0, 45.0),
        make_sentence(3, "Fourth sentence following up.", 45.0, 70.0),
    ]

    candidates = build_candidate_windows(sentences, min_duration=20.0, max_duration=50.0)
    # Check that every candidate duration is between 20.0s and 50.0s
    assert len(candidates) > 0
    for cand in candidates:
        assert 20.0 <= cand.duration <= 50.0
        assert not cand.sentences[-1].dangling_end

def test_candidate_does_not_start_on_dangling_word():
    sentences = [
        make_sentence(0, "And so", 0.0, 2.0, dangling=True),
        make_sentence(1, "The real secret is perseverance.", 2.5, 25.0),
        make_sentence(2, "That makes all the difference.", 25.5, 45.0),
    ]
    candidates = build_candidate_windows(sentences, min_duration=20.0, max_duration=60.0)
    # Candidates should not start with sentence 0
    for cand in candidates:
        assert cand.sentences[0].index != 0
