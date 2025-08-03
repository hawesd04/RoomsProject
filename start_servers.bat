@echo off
REM Open frontend in a new Command Prompt
start "Frontend" cmd /k "cd /d frontend && npm start"

REM Open backend in a new Command Prompt
start "Backend" cmd /k "cd /d backend && node app.js"
