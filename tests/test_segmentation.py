import pytest
from src.cliplocal.core.models import Word
from src.cliplocal.segment.sentences import group_words_into_sentences

def test_sentence_segmentation_with_punctuation():
    words = [
        Word(word="Here", start=0.0, end=0.3),
        Word(word="is", start=0.35, end=0.5),
        Word(word="the", start=0.55, end=0.7),
        Word(word="thing.", start=0.75, end=1.1),
        Word(word="We", start=1.2, end=1.4),
        Word(word="must", start=1.45, end=1.7),
        Word(word="focus.", start=1.75, end=2.1),
    ]
    sentences = group_words_into_sentences(words)
    assert len(sentences) == 2
    assert sentences[0].text == "Here is the thing."
    assert sentences[1].text == "We must focus."
    assert sentences[0].has_terminal_punct is True

def test_never_split_on_dangling_connector():
    words = [
        Word(word="We", start=0.0, end=0.3),
        Word(word="built", start=0.35, end=0.6),
        Word(word="the", start=0.65, end=0.9),
        Word(word="product", start=0.95, end=1.3),
        Word(word="and", start=1.35, end=1.5),  # Dangling connector before long pause
        Word(word="customers", start=2.6, end=3.1), # 1.1s pause after 'and'
        Word(word="loved", start=3.15, end=3.4),
        Word(word="it.", start=3.45, end=3.8),
    ]
    sentences = group_words_into_sentences(words, pause_threshold=0.85)
    # The pause is after 'and', but 'and' is dangling, so it should not split after 'and'
    assert len(sentences) == 1
    assert "and customers loved it." in sentences[0].text
