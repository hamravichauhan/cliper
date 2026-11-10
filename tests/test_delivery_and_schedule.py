import pytest
import csv
import zipfile
from pathlib import Path
from src.cliplocal.core.models import CandidateClip, ScoreBreakdown
from src.cliplocal.export.delivery import create_client_delivery_bundle
from src.cliplocal.export.scheduler import export_bulk_schedule_csv

@pytest.fixture
def sample_candidates(tmp_path):
    dummy_video = tmp_path / "clip_01.mp4"
    dummy_video.write_bytes(b"dummy mp4 data")
    dummy_thumb = tmp_path / "thumb_01.jpg"
    dummy_thumb.write_bytes(b"dummy jpg data")

    cand1 = CandidateClip(
        clip_id="c1",
        index=1,
        start=0.0,
        end=25.0,
        duration=25.0,
        text="The secret to scaling revenue is building distribution before building product.",
        score=ScoreBreakdown(total_score=92.0, hook_type="Curiosity Gap"),
        title="Distribution Over Product",
        output_path=str(dummy_video),
        thumbnails=[str(dummy_thumb)]
    )

    cand2 = CandidateClip(
        clip_id="c2",
        index=2,
        start=30.0,
        end=58.0,
        duration=28.0,
        text="Why most founders fail is lack of focus on their primary metric.",
        score=ScoreBreakdown(total_score=85.0, hook_type="Bold Claim"),
        title="Why Founders Fail",
        output_path=str(dummy_video),
        thumbnails=[str(dummy_thumb)]
    )
    return [cand1, cand2]

def test_create_client_delivery_bundle(sample_candidates, tmp_path):
    zip_path = create_client_delivery_bundle(
        candidates=sample_candidates,
        output_bundle_dir=tmp_path,
        client_name="AcmeCorp",
        brand_handle="@AcmeMedia",
        make_zip=True
    )

    assert zip_path.exists()
    assert zip_path.suffix == ".zip"

    # Verify zip content
    with zipfile.ZipFile(zip_path, "r") as zf:
        namelist = zf.namelist()
        assert any("Executive_Delivery_Report.html" in name for name in namelist)
        assert any("post_copy_instagram.txt" in name for name in namelist)
        assert any("post_copy_youtube.txt" in name for name in namelist)

def test_export_bulk_schedule_csv(sample_candidates, tmp_path):
    csv_out = tmp_path / "test_schedule.csv"
    res = export_bulk_schedule_csv(
        candidates=sample_candidates,
        output_csv_path=csv_out,
        brand_handle="@AcmeMedia",
        posts_per_day=3
    )

    assert res.exists()
    with open(res, "r", encoding="utf-8") as f:
        reader = list(csv.DictReader(f))
        # 2 clips x 2 platforms = 4 rows
        assert len(reader) == 4
        platforms = {r["Platform"] for r in reader}
        assert "Instagram Reels" in platforms
        assert "YouTube Shorts" in platforms
        assert all(r["Date"] for r in reader)
        assert all(r["Time"] for r in reader)
