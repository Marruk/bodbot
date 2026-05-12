#!/bin/bash
ROOT="$(cd "$(dirname "$0")" && pwd)"

osascript <<EOF
tell application "Terminal"
    do script "cd '$ROOT/frontend' && npm run dev" in front window
    tell application "System Events" to keystroke "t" using command down
    delay 0.3
    do script "cd '$ROOT/backend' && source .venv/bin/activate && uvicorn main:app --reload" in front window
end tell
EOF
