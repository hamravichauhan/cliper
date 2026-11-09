import pytest
from src.cliplocal.score.hooks import score_hook
from src.cliplocal.score.acoustic import calculate_speaking_pace
from src.cliplocal.score.sentiment import score_sentiment, score_payoff
from src.cliplocal.score.penalties import check_penalties
from src.cliplocal.core.models import Word

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
