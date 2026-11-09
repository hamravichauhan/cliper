import copy
from typing import List, Tuple, Set
from src.cliplocal.core.models import Word

FILLER_WORDS: Set[str] = {"um", "uh", "erm", "like", "you know"}

def detect_filler_and_pause_cuts(
    words: List[Word],
    clip_start: float,
    clip_end: float,
    max_pause_sec: float = 1.0,
    remove_fillers: bool = True
) -> Tuple[List[Tuple[float, float]], List[Word]]:
    """
    Detect dead pauses and filler words, compute retained video spans,
    and remap word timestamps to the newly compressed timeline.
    Returns (keep_intervals, remapped_words).
    """
    if not words:
        return [(clip_start, clip_end)], []

    # Sort words
    sorted_words = sorted(words, key=lambda w: w.start)
    kept_words: List[Word] = []

    # Filter out fillers
    for w in sorted_words:
        clean = w.word.lower().strip(".,!?:;\"'")
        if remove_fillers and clean in FILLER_WORDS:
            continue
        kept_words.append(copy.deepcopy(w))

    if not kept_words:
        return [(clip_start, clip_end)], words

    # Build keep intervals around words with padding
    keep_intervals: List[Tuple[float, float]] = []
    padding = 0.15 # seconds before and after spoken word

    cur_start = max(clip_start, kept_words[0].start - padding)
    cur_end = min(clip_end, kept_words[0].end + padding)

    for w in kept_words[1:]:
        w_start = max(clip_start, w.start - padding)
        w_end = min(clip_end, w.end + padding)

        if w_start <= cur_end + max_pause_sec:
            # Merge interval
            cur_end = max(cur_end, w_end)
        else:
            # Cut pause
            keep_intervals.append((round(cur_start, 3), round(cur_end, 3)))
            cur_start = w_start
            cur_end = w_end

    keep_intervals.append((round(cur_start, 3), round(cur_end, 3)))

    # Remap kept words to the compressed timeline
    remapped_words: List[Word] = []
    for w in kept_words:
        # Calculate offset in compressed timeline
        accumulated_time = 0.0
        new_start = None
        new_end = None

        for k_start, k_end in keep_intervals:
            k_dur = k_end - k_start
            if k_start <= w.start <= k_end:
                new_start = accumulated_time + (w.start - k_start)
            if k_start <= w.end <= k_end:
                new_end = accumulated_time + (w.end - k_start)
            accumulated_time += k_dur

        if new_start is not None and new_end is not None:
            w.start = round(new_start, 3)
            w.end = round(new_end, 3)
            remapped_words.append(w)

    return keep_intervals, remapped_words
