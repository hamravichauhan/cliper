import re
from typing import List, Set
from src.cliplocal.core.models import Word, Sentence
from src.cliplocal.config.settings import config

DANGLING_CONNECTORS: Set[str] = set(config.get("segmentation", {}).get("dangling_words", [
    "a", "an", "the", "and", "but", "or", "so", "because", "like", "if",
    "that", "which", "with", "to", "when", "as", "then", "than", "of", "in",
    "on", "at", "by", "for", "about", "is", "are", "was", "were", "my", "your",
    "into", "from"
]))

def clean_word_token(token: str) -> str:
    return re.sub(r"[^a-zA-Z0-9]", "", token.lower())

def group_words_into_sentences(
    words: List[Word],
    pause_threshold: float = 0.85,
    min_words: int = 3
) -> List[Sentence]:
    """
    Group word tokens into grammatically sound sentences.
    Ensures sentence boundaries are placed at terminal punctuation or natural pauses,
    strictly preventing splits on dangling connectors.
    """
    if not words:
        return []

    sentences: List[Sentence] = []
    current_words: List[Word] = []

    for i, w in enumerate(words):
        current_words.append(w)
        raw_token = w.word.strip()
        clean = clean_word_token(raw_token)
        has_terminal_punct = bool(re.search(r"[.?!]$", raw_token))

        # Check pause to next word
        pause_after = (words[i + 1].start - w.end) if (i < len(words) - 1) else 0.0
        is_dangling = clean in DANGLING_CONNECTORS
        is_natural_pause = (pause_after >= pause_threshold) and not is_dangling and (len(current_words) >= min_words)
        is_last_word = (i == len(words) - 1)

        # Decide whether to close sentence
        if has_terminal_punct or is_natural_pause or is_last_word:
            # If word is dangling and there are more words, defer boundary unless sentence is very long
            if is_dangling and not is_last_word and len(current_words) < 25:
                continue

            text_str = " ".join(item.word.strip() for item in current_words)
            sentences.append(Sentence(
                index=len(sentences),
                start=current_words[0].start,
                end=current_words[-1].end,
                text=text_str,
                words=list(current_words),
                has_terminal_punct=has_terminal_punct,
                dangling_end=is_dangling
            ))
            current_words = []

    return sentences
