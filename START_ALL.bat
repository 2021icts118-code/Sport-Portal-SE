@echo off
REM Start all three services in separate windows

echo Starting University Sports Portal...
echo.
echo Opening 3 terminal windows...
echo   1. MongoDB
echo   2. Backend API
echo   3. Frontend
echo.

REM Terminal 1: MongoDB
start "MongoDB" cmd /k "mongod"

REM Wait a bit for MongoDB to start
timeout /t 3 /nobreak

REM Terminal 2: Backend
start "Backend API - localhost:4000" cmd /k "cd /d C:\Users\Yashoda Kulathunga\Desktop\New folder\backend && npm run dev"

REM Wait a bit for backend to start
timeout /t 3 /nobreak

REM Terminal 3: Frontend
start "Frontend - localhost:3000" cmd /k "cd /d C:\Users\Yashoda Kulathunga\Desktop\New folder\frontend && npm run dev"

echo.
echo ============================================
echo Waiting for servers to start...
echo.
echo MongoDB:    mongod (Terminal 1)
echo Backend:    localhost:4000 (Terminal 2)
echo Frontend:   localhost:3000 (Terminal 3)
echo.
echo Open browser: http://localhost:3000
echo ============================================
echo.

timeout /t 5

REM Open browser
start http://localhost:3000
