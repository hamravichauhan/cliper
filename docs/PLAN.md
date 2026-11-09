# ClipLocal Implementation Plan

## Overview
ClipLocal is an internal, 100% offline Mac tool that transforms long-form horizontal videos (podcasts, talks, streams) into ranked, vertical 9:16 short clips with animated, burned-in captions, optimized for Apple Silicon (M4, 16 GB RAM).

---

## Phase Breakdown

### Phase 1: Core Pipeline & CLI Baseline
- **Ingest**: File hash calculation, ffprobe metadata extraction, audio normalization to 16 kHz mono WAV. Support local video file and YouTube URL via `yt-dlp`.
- **Transcription & Benchmarking**:
  - Implement benchmark harness on a test sample for:
    - (a) `whisper.cpp` (Metal)
    - (b) `mlx-whisper`
    - (c) `faster-whisper` (CPU int8 / coreml)
  - Word-level timestamp extraction, language auto-detection, JSON output cache.
  - VAD filtering to trim long silences.
- **Segmentation**:
  - Punctuation & pause detection (> 0.85s).
  - Dangling connector filters (`and`, `but`, `the`, `because`).
  - Sentence embedding topic shift detection (`sentence-transformers`).
- **Candidates**:
  - Sliding windows (20s - 60s, configurable) aligned strictly to sentence boundaries.
  - Setup and payoff expansion (1 sentence buffer).
- **Heuristic Scoring**:
  - Hook detection (questions, bold claims, curiosity gaps, statistics).
  - Pacing sweet spot (~115-180 WPM).
  - Librosa acoustic energy & pitch variation.
  - Sentiment & reaction keywords.
  - Penalties for banter, stream check, mic setup, dead preambles.
  - Score breakdown transparency (0-100 explainable score).
- **Deduplication**:
  - Overlap suppression (IoU > 30%), retaining highest-scoring candidate.
- **Captions & Render Baseline**:
  - Word-by-word highlighted ASS subtitle generator (Hormozi baseline style).
  - FFmpeg pipeline: 9:16 center-crop (`crop=ih*9/16:ih`), libass subtitle burn-in, audio loudness normalization (`loudnorm`), hardware encoding (`h264_videotoolbox` with `libx264` fallback).
  - JSON sidecar output alongside MP4.
- **CLI Interface**:
  - `cliplocal run <path-or-url> --clips 6 --style hormozi --no-llm`.
- **Verification & Git Commit**:
  - Unit tests for segmentation, candidates, scoring, dedupe, and ASS generation.
  - Run CLI on a generated test video fixture; verify output clip and JSON sidecar.

### Phase 2: Reframing Modes & Extended Caption Styles
- **Reframing Engines**:
  - Mode A: Center crop (from Phase 1).
  - Mode B: Blur-fill (blurred 9:16 background with centered horizontal video).
  - Mode C: Face-follow with MediaPipe Face Mesh / Detection at ~5 fps.
    - Exponential Moving Average (EMA) and dead-zone filtering to eliminate camera jitter.
    - PySceneDetect integration: reset smoothing on scene cuts.
    - Max pan speed clamp to prevent rapid camera swings.
  - Auto-mode selection: 1 face -> face-follow, screencast/no face -> blur-fill.
- **Caption Styles**:
  - 1. `hormozi`: Bold yellow/green highlight with word pop.
  - 2. `minimal`: Clean white text with subtle underline or subtle accent.
  - 3. `boxed`: High-contrast pill outline around active word.
  - 4. `neon`: Vibrant cyan/magenta glow effect.
  - Safe-area margin compliance (header/footer margin guards).
  - Optional emoji auto-insertion based on keyword triggers.
- **Verification & Git Commit**:
  - Verify reframing modes and caption styles on test footage.

### Phase 3: Web UI, Job Progress & Clip Editor
- **FastAPI Server**:
  - REST endpoints for file upload, URL submission, job creation, status polling (SSE/WebSocket or polling), clip listing, media streaming, and clip re-rendering.
  - Background worker thread with SQLite task tracking.
- **React + Vite Frontend (Dark Mode)**:
  - Screen 1: Submit URL or file, configure clip count, length constraints, reframe mode, caption style, and LLM toggle. Live stage progress and terminal-style logs.
  - Screen 2: Ranked clip cards with 9:16 video player, score badge, score breakdown drawer, title, caption copy, and export button.
  - Screen 3: Interactive clip editor:
    - Scrubber timeline with word boundary snapping.
    - Autocut transcript editing: deleting words cuts spans and remaps subtitles.
    - Style & reframe mode selector with live re-render.
- **Verification & Git Commit**:
  - End-to-end browser walkthrough and API testing.

### Phase 4: Ollama Local LLM Enhancement
- **Local LLM Integration**:
  - Ollama client targeting local models (`llama3.2:3b`, `qwen2.5:7b`, etc.).
  - Memory isolation: ensure Whisper models are unloaded before prompting Ollama.
  - Candidate re-ranking on top 10-15 heuristic candidates.
  - Structured output parsing: generate title, viral caption, hashtags, and hook reason.
  - Resilient JSON parser and repair fallback to heuristic scores if Ollama fails or is disabled.
- **Verification & Git Commit**:
  - Unit tests for LLM prompt builder, JSON repair, and heuristic fallback.

### Phase 5: Active Speaker Detection & Split-Stacked Layout
- **Mode D: Active Speaker Detection**:
  - Phase 1: MediaPipe facial landmark Mouth Aspect Ratio (MAR) variance correlated with audio voice activity.
  - Phase 2: LR-ASD (Lightweight and Robust Network for Active Speaker Detection) ONNX inference with ONNX Runtime CoreML/CPU.
  - Dynamic camera switching between speakers with minimum dwell time (hysteresis).
- **Mode E: Split Stacked Layout**:
  - Two detected speakers framed into dual 1080x960 vertical stacked panels with divider line.
- **Auto-mode upgrade**: 2 speakers alternating -> Active Speaker or Split Stacked.
- **Verification & Git Commit**:
  - Multi-speaker test fixture verification.

### Phase 6: Filler & Pause Removal, Polish & Documentation
- **Filler Word & Long Pause Pruning**:
  - Detect fillers (`um`, `uh`, `like`, `you know`) and long silence pauses (> 1.2s).
  - Construct FFmpeg complex filter trims to cut dead audio/video.
  - Remap ASS subtitle timestamps to match truncated timeline.
- **Reliability & Performance**:
  - Resumable job state: cache every stage by hash.
  - Per-stage execution timing report.
  - Handling edge cases: silent videos, 0 faces, weird aspect ratios, variable frame rates.
- **Setup & Run Automation**:
  - `setup.sh`: checks brew, installs dependencies, builds frontend, downloads test models.
  - `run.sh`: launches the FastAPI backend and serves the frontend on localhost.
- **Documentation**:
  - Detailed `README.md` covering architecture, configuration tuning, CLI and web usage, troubleshooting, and rights reminder.
- **Final Verification**:
  - Complete end-to-end test and timing benchmark.
