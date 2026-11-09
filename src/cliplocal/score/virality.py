from pathlib import Path
from typing import List, Optional
from src.cliplocal.core.models import CandidateClip, ScoreBreakdown
from src.cliplocal.config.settings import config
from src.cliplocal.score.hooks import score_hook
from src.cliplocal.score.acoustic import calculate_speaking_pace, analyze_audio_segment
from src.cliplocal.score.sentiment import score_sentiment, score_payoff
from src.cliplocal.score.penalties import check_penalties

def score_length_fit(duration: float) -> float:
    """Score length appropriateness (sweet spot around target 42s)."""
    target = config.get("candidates", {}).get("target_duration_s", 42.0)
    diff = abs(duration - target)
    return max(30.0, 100.0 - (diff * 2.5))

def score_candidate(
    candidate: CandidateClip,
    audio_path: Optional[Path | str] = None
) -> ScoreBreakdown:
    first_sent = candidate.sentences[0].text if candidate.sentences else ""
    last_sent = candidate.sentences[-1].text if candidate.sentences else ""

    # 1. Hook score
    hook_score, hook_type, hook_reason = score_hook(first_sent)

    # 2. Speaking pace (WPM)
    wpm, pace_score = calculate_speaking_pace(candidate.words, candidate.duration)

    # 3. Acoustic score (librosa energy & pitch)
    if audio_path:
        acoustic_score, energy_var, pitch_var = analyze_audio_segment(audio_path, candidate.start, candidate.end)
    else:
        acoustic_score, energy_var, pitch_var = 70.0, 0.4, 3.0

    # 4. Sentiment & Payoff
    sentiment_score = score_sentiment(candidate.text)
    payoff_score = score_payoff(last_sent)

    # 5. Length fit
    length_score = score_length_fit(candidate.duration)

    # 6. Penalties
    penalties, penalty_reasons = check_penalties(candidate.text, first_sent)

    # Weight components
    weights = config.get("scoring", {}).get("weights", {
        "hook": 30.0,
        "acoustic": 20.0,
        "pace": 15.0,
        "payoff": 15.0,
        "sentiment": 10.0,
        "length_fit": 10.0
    })

    weighted_sum = (
        (hook_score * weights["hook"]) +
        (acoustic_score * weights["acoustic"]) +
        (pace_score * weights["pace"]) +
        (payoff_score * weights["payoff"]) +
        (sentiment_score * weights["sentiment"]) +
        (length_score * weights["length_fit"])
    ) / 100.0

    total = max(0.0, min(100.0, weighted_sum + penalties))

    full_reason = hook_reason or "Strong conversational pacing and clarity"
    if penalty_reasons:
        full_reason += f" (Flags: {', '.join(penalty_reasons)})"

    return ScoreBreakdown(
        total_score=round(total, 1),
        hook_score=round(hook_score, 1),
        acoustic_score=round(acoustic_score, 1),
        pace_score=round(pace_score, 1),
        payoff_score=round(payoff_score, 1),
        sentiment_score=round(sentiment_score, 1),
        length_score=round(length_score, 1),
        penalties=round(penalties, 1),
        hook_type=hook_type or "Dialogue Flow",
        hook_reason=full_reason,
        words_per_minute=wpm,
        energy_variance=energy_var
    )

def score_all_candidates(
    candidates: List[CandidateClip],
    audio_path: Optional[Path | str] = None
) -> List[CandidateClip]:
    for cand in candidates:
        cand.score = score_candidate(cand, audio_path=audio_path)
    return candidates
