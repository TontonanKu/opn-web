@echo off
title TOKO KAZURA - Official Linktree & Catalog Web
cd /d "%~dp0"
echo ===================================================
echo   MENJALANKAN WEBSITE TOKO KAZURA (ZURA STORE)
echo ===================================================
echo.
echo Membuka browser di http://localhost:5173 ...
start "" "http://localhost:5173"
call npm run dev
pause
