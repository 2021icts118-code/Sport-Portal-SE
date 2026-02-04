#!/bin/bash
# Diagnostic script to check all services

echo "===== CHECKING SERVICES ====="
echo ""

# Check MongoDB
echo "1. MongoDB Status:"
if Get-Process mongod -ErrorAction SilentlyContinue; then
  echo "   ✓ MongoDB is RUNNING"
else
  echo "   ✗ MongoDB is NOT running"
  echo "   → Start with: mongod"
fi

echo ""

# Check if port 4000 is open
echo "2. Backend (Port 4000):"
$portTest = Test-NetConnection -ComputerName localhost -Port 4000 -WarningAction SilentlyContinue
if ($portTest.TcpTestSucceeded) {
  echo "   ✓ Port 4000 is OPEN (backend running)"
} else {
  echo "   ✗ Port 4000 is CLOSED (backend not running)"
  echo "   → Start with: cd backend && npm run dev"
fi

echo ""

# Check if port 3000 is open
echo "3. Frontend (Port 3000):"
$portTest = Test-NetConnection -ComputerName localhost -Port 3000 -WarningAction SilentlyContinue
if ($portTest.TcpTestSucceeded) {
  echo "   ✓ Port 3000 is OPEN (frontend running)"
} else {
  echo "   ✗ Port 3000 is CLOSED (frontend not running)"
  echo "   → Start with: cd frontend && npm run dev"
fi

echo ""
echo "===== REQUIRED SERVERS ====="
echo "1. mongod (MongoDB)"
echo "2. backend/npm run dev (port 4000)"
echo "3. frontend/npm run dev (port 3000)"
