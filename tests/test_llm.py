import pytest
from src.cliplocal.llm.json_repair import extract_and_repair_json
from src.cliplocal.llm.rerank import rerank_candidates_with_llm
from src.cliplocal.core.models import CandidateClip, ScoreBreakdown

def test_json_repair_with_markdown_fences():
    raw = """Here is the ranked analysis:
```json
[
  {
    "id": "cand_0_1",
    "score": 92.5,
    "title": "Why Startups Fail Fast",
    "hook_reason": "Strong question hook",
    "caption": "Most founders ignore this.",
    "hashtags": ["#startup", "#tech", "#shorts"]
  }
]
```
Hope this helps!"""

    data = extract_and_repair_json(raw)
    assert data is not None
    assert isinstance(data, list)
    assert len(data) == 1
    assert data[0]["id"] == "cand_0_1"
    assert data[0]["score"] == 92.5

def test_json_repair_with_trailing_commas_and_unclosed_bracket():
    raw = """[
      {"id": "c1", "score": 85.0, "title": "First Step",},
      {"id": "c2", "score": 75.0, "title": "Second Step",}
    """
    data = extract_and_repair_json(raw)
    assert data is not None
    assert len(data) == 2
    assert data[0]["id"] == "c1"

def test_heuristic_fallback_when_llm_fails():
    candidates = [
        CandidateClip(
            clip_id="c1",
            index=1,
            start=10.0,
            end=35.0,
            duration=25.0,
            text="The secret to success is continuous execution.",
            score=ScoreBreakdown(total_score=80.0, hook_type="Actionable Advice")
        )
    ]

    # Run re-ranking with a dummy/non-existent host to simulate offline/failure
    from src.cliplocal.llm.client import OllamaClient
    dummy_client = OllamaClient(host="http://127.0.0.1:9999")

    reranked = rerank_candidates_with_llm(candidates, client=dummy_client)
    # Ensure candidate is preserved, timestamps unchanged, score intact
    assert len(reranked) == 1
    assert reranked[0].start == 10.0
    assert reranked[0].end == 35.0
    assert reranked[0].score.total_score == 80.0
    assert "Actionable Advice" in reranked[0].title
