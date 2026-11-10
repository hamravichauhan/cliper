import pytest
from fastapi.testclient import TestClient
from src.cliplocal.web.server import app
from src.cliplocal.web.db import (
    save_job,
    get_job,
    delete_job,
    list_jobs,
    get_analytics_summary
)

client = TestClient(app)

def test_db_analytics_and_job_lifecycle():
    test_job_id = "job_test_tracking_999"
    test_options = {"style": "hormozi", "clips": 3}
    test_state = {
        "job_id": test_job_id,
        "metadata": {"title": "Test Production Video", "duration": 180.0},
        "candidates": [
            {"clip_id": "c1", "score": {"total_score": 88.5}},
            {"clip_id": "c2", "score": {"total_score": 75.0}}
        ]
    }

    # 1. Save job
    save_job(
        job_id=test_job_id,
        created_at=1700000000.0,
        status="completed",
        progress=100.0,
        stage="Completed",
        source="https://youtube.com/watch?v=mocktest",
        options=test_options,
        state=test_state
    )

    # 2. Check get_job
    job = get_job(test_job_id)
    assert job is not None
    assert job["status"] == "completed"
    assert job["source"] == "https://youtube.com/watch?v=mocktest"

    # 3. Check list_jobs includes enriched fields
    jobs = list_jobs()
    matching = [j for j in jobs if j["job_id"] == test_job_id]
    assert len(matching) == 1
    m = matching[0]
    assert m["title"] == "Test Production Video"
    assert m["clip_count"] == 2
    assert m["avg_virality_score"] == pytest.approx(81.75, 0.1)

    # 4. Check get_analytics_summary
    stats = get_analytics_summary()
    assert stats["total_jobs"] >= 1
    assert stats["completed_jobs"] >= 1
    assert stats["total_clips"] >= 2
    assert stats["estimated_hours_saved"] >= 1.0
    assert "system" in stats
    assert "apple_silicon" in stats["system"]

    # 5. Test API Endpoints
    res = client.get("/api/analytics")
    assert res.status_code == 200
    data = res.json()
    assert "total_jobs" in data
    assert "system" in data

    res_jobs = client.get("/api/jobs")
    assert res_jobs.status_code == 200
    assert any(j["job_id"] == test_job_id for j in res_jobs.json())

    # 6. Delete test job
    deleted = delete_job(test_job_id)
    assert deleted is True
    assert get_job(test_job_id) is None
