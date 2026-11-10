import time
import pytest
from pathlib import Path
from src.cliplocal.llm.circuit_breaker import CircuitBreaker, CircuitState
from src.cliplocal.ingest.license import analyze_video_license
from src.cliplocal.llm.rerank import clean_opening_hook, truncate_at_word_boundary, generate_heuristic_title
from src.cliplocal.web.db import init_db, checkpoint_db, is_network_filesystem, DB_PATH
import sqlite3

def test_circuit_breaker_3_state_lifecycle():
    breaker = CircuitBreaker(timeout_sec=1.0, cooldown_sec=0.2)
    
    # 1. Starts CLOSED
    assert breaker.state == CircuitState.CLOSED
    assert breaker.can_execute() is True

    # 2. Failure trips to OPEN
    breaker.record_failure()
    assert breaker.state == CircuitState.OPEN
    assert breaker.can_execute() is False

    # 3. Before cooldown, stays OPEN
    time.sleep(0.05)
    assert breaker.state == CircuitState.OPEN
    assert breaker.can_execute() is False

    # 4. After cooldown (0.2s), transitions to HALF-OPEN
    time.sleep(0.18)
    assert breaker.state == CircuitState.HALF_OPEN
    assert breaker.can_execute() is True # allows exactly 1 probe
    assert breaker.can_execute() is False # second call blocked while probe inflight

    # 5. Probe failure restarts cooldown and returns to OPEN
    breaker.record_failure()
    assert breaker.state == CircuitState.OPEN
    assert breaker.can_execute() is False

    # 6. Wait for cooldown again -> HALF-OPEN
    time.sleep(0.22)
    assert breaker.state == CircuitState.HALF_OPEN

    # 7. Probe success recovers to CLOSED
    breaker.record_success()
    assert breaker.state == CircuitState.CLOSED
    assert breaker.can_execute() is True

def test_license_analysis_multi_signal():
    # Signal A: Direct CC tag
    res_cc = analyze_video_license(info_dict={"license": "Creative Commons Attribution license (reuse allowed)"})
    assert res_cc["is_creative_commons"] is True
    assert res_cc["risk_level"] == "low_risk"

    # Signal B: Allowlist Channel
    res_ted = analyze_video_license(channel="TED", info_dict={})
    assert res_ted["is_creative_commons"] is True
    assert res_ted["risk_level"] == "low_risk"

    # Signal C: Description regex
    res_desc = analyze_video_license(description="This keynote lecture is shared under Creative Commons Attribution license.")
    assert res_desc["is_creative_commons"] is True
    assert res_desc["risk_level"] == "low_risk"

    # Signal D: Aggressive commercial claimant
    res_claimant = analyze_video_license(channel="Warner Music Group Official", info_dict={})
    assert res_claimant["is_creative_commons"] is False
    assert res_claimant["risk_level"] == "high_risk"

    # Signal E: Uncertain content (Must default to yellow standard, never green CC)
    res_default = analyze_video_license(channel="Random Creator", description="Podcast episode 42", info_dict={})
    assert res_default["is_creative_commons"] is False
    assert res_default["risk_level"] == "standard"

def test_locale_guarded_filler_scrubbing_and_boundary_truncation():
    # English filler word scrubbed
    en_text = "You know, consistency is the real competitive advantage."
    assert clean_opening_hook(en_text, language="en") == "consistency is the real competitive advantage."

    # Non-English preserved verbatim without English regex corruption
    hi_text = "You know yeh baat bilkul sahi hai."
    assert clean_opening_hook(hi_text, language="hi") == "You know yeh baat bilkul sahi hai."

    # Word-boundary truncation test: never truncates mid-word
    phrase = "The Extraordinary Quantum Architecture of Modern Intelligence"
    truncated = truncate_at_word_boundary(phrase, max_chars=35)
    assert len(truncated) <= 35
    # Should end at "Quantum" without splitting "Architecture" into "Archit..."
    assert truncated == "The Extraordinary Quantum"
    assert not truncated.endswith("Arch")

    # Generate heuristic title with smart boundaries
    title = generate_heuristic_title("Basically we found that customer retention compounds daily", hook_type="Insight", language="en")
    assert "Basically" not in title
    assert "Insight:" in title

def test_sqlite_wal_and_indexes():
    init_db()
    checkpoint_db()

    with sqlite3.connect(DB_PATH) as conn:
        cursor = conn.cursor()
        # Check WAL mode
        cursor.execute("PRAGMA journal_mode;")
        mode = cursor.fetchone()[0]
        # In local filesystem, WAL mode is active
        if not is_network_filesystem(DB_PATH):
            assert mode.upper() == "WAL"

        # Check indexes exist
        cursor.execute("PRAGMA index_list('jobs');")
        indexes = [row[1] for row in cursor.fetchall()]
        assert "idx_jobs_status_created" in indexes
        assert "idx_jobs_source" in indexes

def test_transformation_log_config_and_provenance():
    from src.cliplocal.ingest.license import load_channels_config
    allowlist, claimants = load_channels_config()
    assert "ted" in allowlist
    assert "nasa" in allowlist
    assert "warner music" in claimants
