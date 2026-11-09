@echo off
setlocal

set PORT=8000
set HOST=127.0.0.1

echo ==========================================================
echo 🚀 Launching ClipLocal Studio on http://%HOST%:%PORT%
echo ==========================================================

:: Open browser after 2 seconds
start "" http://%HOST%:%PORT%

:: Start FastAPI Uvicorn Server
uv run uvicorn src.cliplocal.web.server:app --host %HOST% --port %PORT% --log-level info
