#!/usr/bin/env pwsh
# PowerShell script to start all services

$ErrorActionPreference = "Continue"

Write-Host "===========================================" -ForegroundColor Cyan
Write-Host "University Sports Portal - Auto Starter" -ForegroundColor Cyan
Write-Host "===========================================" -ForegroundColor Cyan
Write-Host ""

# Check MongoDB
Write-Host "Checking MongoDB..." -ForegroundColor Yellow
$mongod = Get-Process mongod -ErrorAction SilentlyContinue
if ($mongod) {
    Write-Host "✓ MongoDB is already running (PID: $($mongod.Id))" -ForegroundColor Green
} else {
    Write-Host "✗ MongoDB not running - starting..." -ForegroundColor Red
    Start-Process mongod -WindowStyle Normal
    Start-Sleep -Seconds 5
}

Write-Host ""

# Check Backend
Write-Host "Checking Backend (Port 4000)..." -ForegroundColor Yellow
$netstat = netstat -ano 2>$null | Select-String ":4000.*LISTENING"
if ($netstat) {
    Write-Host "✓ Backend is already running on port 4000" -ForegroundColor Green
} else {
    Write-Host "✗ Backend not running - starting..." -ForegroundColor Red
    $backendPath = "C:\Users\Yashoda Kulathunga\Desktop\New folder\backend"
    Start-Process pwsh -ArgumentList "-NoExit", "-Command", "cd '$backendPath'; npm run dev" -WindowStyle Normal
    Start-Sleep -Seconds 10
}

Write-Host ""

# Check Frontend
Write-Host "Checking Frontend (Port 3000)..." -ForegroundColor Yellow
$netstat = netstat -ano 2>$null | Select-String ":3000.*LISTENING"
if ($netstat) {
    Write-Host "✓ Frontend is already running on port 3000" -ForegroundColor Green
} else {
    Write-Host "✗ Frontend not running - starting..." -ForegroundColor Red
    $frontendPath = "C:\Users\Yashoda Kulathunga\Desktop\New folder\frontend"
    Start-Process pwsh -ArgumentList "-NoExit", "-Command", "cd '$frontendPath'; npm run dev" -WindowStyle Normal
    Start-Sleep -Seconds 5
}

Write-Host ""
Write-Host "===========================================" -ForegroundColor Green
Write-Host "Starting services..." -ForegroundColor Green
Write-Host "===========================================" -ForegroundColor Green
Write-Host ""
Write-Host "MongoDB:  mongod (running)" -ForegroundColor Green
Write-Host "Backend:  localhost:4000 (running)" -ForegroundColor Green
Write-Host "Frontend: localhost:3000 (running)" -ForegroundColor Green
Write-Host ""
Write-Host "Opening browser in 3 seconds..." -ForegroundColor Cyan
Start-Sleep -Seconds 3
Start-Process "http://localhost:3000"

Write-Host ""
Write-Host "✓ All services started! Open: http://localhost:3000" -ForegroundColor Green
Write-Host ""
