from typing import List
import numpy as np
from sentence_transformers import SentenceTransformer
from src.cliplocal.core.models import Sentence
from src.cliplocal.config.settings import config

_model_cache: SentenceTransformer | None = None

def get_topic_model() -> SentenceTransformer:
    global _model_cache
    if _model_cache is None:
        model_name = config.get("segmentation", {}).get("topic_model", "all-MiniLM-L6-v2")
        _model_cache = SentenceTransformer(model_name)
    return _model_cache

def detect_topic_shifts(sentences: List[Sentence], threshold: float | None = None) -> List[int]:
    """
    Compute sentence embeddings and detect cosine similarity drops indicating topic boundaries.
    Returns indices of sentences that mark the beginning of a new topic.
    """
    if len(sentences) < 2:
        return []

    shift_threshold = threshold or config.get("segmentation", {}).get("topic_shift_threshold", 0.45)
    model = get_topic_model()
    texts = [s.text for s in sentences]
    embeddings = model.encode(texts, normalize_embeddings=True, show_progress_bar=False)

    topic_boundaries: List[int] = [0]
    for i in range(len(embeddings) - 1):
        cos_sim = float(np.dot(embeddings[i], embeddings[i + 1]))
        # A low similarity means semantic drift / topic transition
        if cos_sim < shift_threshold:
            topic_boundaries.append(i + 1)

    return topic_boundaries
