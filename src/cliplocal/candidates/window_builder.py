from typing import List
from src.cliplocal.core.models import Sentence, CandidateClip, ScoreBreakdown, Word
from src.cliplocal.config.settings import config

def build_candidate_windows(
    sentences: List[Sentence],
    min_duration: float | None = None,
    max_duration: float | None = None,
    target_duration: float | None = None
) -> List[CandidateClip]:
    """
    Build candidate clip spans (20-60s) starting strictly on a sentence boundary
    and concluding on a completed thought (not dangling).
    """
    if not sentences:
        return []

    min_dur = min_duration or config.get("candidates", {}).get("min_duration_s", 20.0)
    max_dur = max_duration or config.get("candidates", {}).get("max_duration_s", 60.0)
    target_dur = target_duration or config.get("candidates", {}).get("target_duration_s", 42.0)

    candidates: List[CandidateClip] = []
    num_sentences = len(sentences)

    for i in range(num_sentences):
        start_sent = sentences[i]
        # Never start on a sentence with a broken preamble or dangling start
        if start_sent.dangling_end and len(start_sent.words) < 5:
            continue

        accumulated_words: List[Word] = []
        accumulated_sentences: List[Sentence] = []
        clip_start = start_sent.start

        for j in range(i, num_sentences):
            current_sent = sentences[j]
            accumulated_sentences.append(current_sent)
            accumulated_words.extend(current_sent.words)

            clip_end = current_sent.end
            duration = clip_end - clip_start

            if duration > max_dur:
                break

            if duration >= min_dur and not current_sent.dangling_end:
                # Valid candidate thought
                text_content = " ".join(s.text for s in accumulated_sentences)
                clip_id = f"cand_{i}_{j}"
                candidates.append(CandidateClip(
                    clip_id=clip_id,
                    index=len(candidates),
                    start=round(clip_start, 3),
                    end=round(clip_end, 3),
                    duration=round(duration, 3),
                    text=text_content,
                    words=list(accumulated_words),
                    sentences=list(accumulated_sentences),
                    score=ScoreBreakdown()
                ))

    return candidates
