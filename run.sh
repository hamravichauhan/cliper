#!/usr/bin/env bash
set -e

PORT=8000
HOST="127.0.0.1"

echo "=========================================================="
echo "🚀 Launching ClipLocal Studio on http://${HOST}:${PORT}"
echo "=========================================================="

# Auto-open browser on macOS after 1.5s
(sleep 1.5 && open "http://${HOST}:${PORT}") &

# Start FastAPI Uvicorn Server
exec uv run uvicorn src.cliplocal.web.server:app --host "${HOST}" --port "${PORT}" --log-level info
