import pytest
from src.cliplocal.score.hooks import (
    score_hook,
    strip_leading_fillers,
    find_climax_teaser_sentence,
    generate_hook_headline
)
from src.cliplocal.score.acoustic import calculate_speaking_pace
from src.cliplocal.score.sentiment import score_sentiment, score_payoff
from src.cliplocal.score.penalties import check_penalties
from src.cliplocal.core.models import Word, Sentence

def test_hook_pattern_detection():
    score, hook_type, reason = score_hook("The secret to building a viral app is hooks.")
    assert hook_type == "Actionable Advice"
    assert score >= 70.0

    score2, hook_type2, _ = score_hook("What happens when you ignore real customer feedback?")
    assert hook_type2 == "Curiosity Gap" or hook_type2 == "Provocative Question"
    assert score2 >= 50.0

def test_speaking_pace_sweet_spot():
    # 150 words in 60 seconds = 150 WPM (in sweet spot [120, 175])
    words_opt = [Word(word="test", start=i*0.4, end=i*0.4+0.3) for i in range(150)]
    wpm, pace_score = calculate_speaking_pace(words_opt, duration=60.0)
    assert wpm == 150.0
    assert pace_score == 100.0

    # 40 words in 60 seconds = 40 WPM (too slow)
    words_slow = [Word(word="test", start=i*1.5, end=i*1.5+0.5) for i in range(40)]
    wpm_slow, pace_score_slow = calculate_speaking_pace(words_slow, duration=60.0)
    assert wpm_slow == 40.0
    assert pace_score_slow < 50.0

def test_penalties_banter_and_broken_start():
    penalties, reasons = check_penalties(
        full_text="Hey guys, hold on let me do a quick mic check before we start.",
        first_sentence_text="Hold on let me do a quick mic check"
    )
    assert penalties <= -20.0
    assert any("banter" in r for r in reasons)

def test_strip_leading_fillers():
    words = [
        Word(word="Um,", start=10.0, end=10.3),
        Word(word="yeah,", start=10.4, end=10.7),
        Word(word="so", start=10.8, end=11.0),
        Word(word="the", start=11.2, end=11.4),
        Word(word="biggest", start=11.45, end=11.8),
        Word(word="mistake", start=11.85, end=12.3),
        Word(word="is", start=12.35, end=12.5),
        Word(word="here.", start=12.55, end=35.0)
    ]
    new_start, trimmed = strip_leading_fillers(words, clip_start=10.0, min_remaining_duration=12.0)
    assert new_start > 11.0
    assert trimmed[0].word.lower() == "the"

def test_find_climax_teaser_sentence():
    sentences = [
        Sentence(index=0, text="So back in 2021 I was thinking about starting.", start=0.0, end=4.0, words=[]),
        Sentence(index=1, text="We called three different suppliers.", start=4.1, end=8.0, words=[]),
        Sentence(index=2, text="And then we accidentally sent 250,000 dollars to the wrong bank!", start=8.1, end=11.5, words=[])
    ]
    climax = find_climax_teaser_sentence(sentences)
    assert climax is not None
    assert climax.index == 2
    assert "250,000" in climax.text

def test_generate_hook_headline():
    presets = generate_hook_headline("The Secret", "Shocking Confession")
    assert len(presets) >= 4
    assert any("LOST" in p or "HAPPENED" in p or "WAIT" in p for p in presets)
