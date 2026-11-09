@echo off
setlocal enabledelayedexpansion

echo ==========================================================
echo 🎬 ClipLocal — Setup for Windows (PC / Laptop)
echo ==========================================================

:: 1. Check winget
where winget >nul 2>nul
if %errorlevel% neq 0 (
    echo [!] winget not found. Please ensure you are on Windows 10/11 with App Installer.
)

:: 2. Check / Install uv
where uv >nul 2>nul
if %errorlevel% neq 0 (
    echo [*] Installing uv via winget...
    winget install --id=astral-sh.uv -e --accept-source-agreements --accept-package-agreements
    if %errorlevel% neq 0 (
        echo [*] Alternative: Installing uv via PowerShell script...
        powershell -ExecutionPolicy ByPass -c "irm https://astral.sh/uv/install.ps1 | iex"
    )
)
echo [OK] uv verified.

:: 3. Check / Install FFmpeg with libass support (Gyan.dev build)
where ffmpeg >nul 2>nul
if %errorlevel% neq 0 (
    echo [*] Installing FFmpeg via winget (Gyan.dev full build with libass)...
    winget install --id=Gyan.FFmpeg -e --accept-source-agreements --accept-package-agreements
)
echo [OK] FFmpeg verified.

:: 4. Sync Python virtual environment (Python 3.11+)
echo [*] Syncing Python dependencies with uv...
uv sync

:: 5. Build React Web UI
echo [*] Building React + Vite Web UI...
where npm >nul 2>nul
if %errorlevel% equ 0 (
    cd web\frontend
    call npm install
    call npm run build
    cd ..\..
    echo [OK] Web UI built successfully in web\frontend\dist
) else (
    echo [!] npm not found in PATH. Make sure Node.js is installed if modifying frontend.
)

:: 6. Generate test video fixture
echo [*] Generating synthetic sample video fixture...
uv run python fixtures\generate_test_video.py

echo.
echo ==========================================================
echo [SUCCESS] ClipLocal Windows setup complete!
echo Run 'run.bat' to launch the web studio on http://127.0.0.1:8000
echo Or CLI: 'uv run cliplocal run fixtures\test_podcast_sample.mp4'
echo ==========================================================
pause
