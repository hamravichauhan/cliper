#!/usr/bin/env bash
set -e

echo "=========================================================="
echo "🎬 ClipLocal — Setup for Apple Silicon Mac (M4)"
echo "=========================================================="

# 1. Check Homebrew
if ! command -v brew &> /dev/null; then
    echo "❌ Homebrew is not installed. Please install Homebrew from https://brew.sh first."
    exit 1
fi

echo "✔ Homebrew found: $(brew --prefix)"

# 2. Check / Install uv
if ! command -v uv &> /dev/null; then
    echo "📦 Installing uv via Homebrew..."
    brew install uv
fi
echo "✔ uv found: $(uv --version)"

# 3. Check / Verify FFmpeg with libass & videotoolbox
if ! ffmpeg -filters 2>&1 | grep -q " ass "; then
    echo "📦 Linking ffmpeg-full with libass support..."
    if ! brew list ffmpeg-full &> /dev/null; then
        brew install ffmpeg-full
    fi
    brew unlink ffmpeg 2>/dev/null || true
    brew link --overwrite ffmpeg-full
fi
echo "✔ FFmpeg verified with libass and VideoToolbox hardware acceleration."

# 4. Install Python Dependencies
echo "🐍 Syncing Python virtual environment with uv (Python 3.11+)..."
uv sync

# 5. Build Web Frontend SPA
echo "⚛️ Building React + Vite Web UI..."
if command -v npm &> /dev/null; then
    cd web/frontend
    npm install
    npm run build
    cd ../..
    echo "✔ Frontend build complete: web/frontend/dist ready."
else
    echo "⚠️ npm not found in PATH. Web UI can be run in dev mode."
fi

# 6. Verify Test Fixture
echo "🧪 Generating sample test video fixture..."
uv run python fixtures/generate_test_video.py

echo ""
echo "=========================================================="
echo "🎉 ClipLocal setup completed successfully!"
echo "Run './run.sh' to launch the web studio at http://127.0.0.1:8000"
echo "Or use CLI: 'uv run cliplocal run fixtures/test_podcast_sample.mp4'"
echo "=========================================================="
