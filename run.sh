#!/bin/bash

# Cleanup background jobs on exit
trap 'echo "Stopping servers..."; kill $(jobs -p) 2>/dev/null' EXIT

echo "=========================================="
echo " Starting Aurora Library Application"
echo "=========================================="

# Check if MongoDB is running
if ! pgrep -x "mongod" > /dev/null; then
  echo "ERROR: MongoDB daemon ('mongod') does not appear to be running."
  echo "Please start MongoDB first using: sudo systemctl start mongod"
  exit 1
else
  echo "✓ MongoDB is running."
fi

# Start backend
echo "Starting backend (Spring Boot) on port 8080..."
cd backend
mvn spring-boot:run > backend.log 2>&1 &
BACKEND_PID=$!
cd ..

# Start frontend
echo "Starting frontend (Vite) on http://localhost:5173..."
cd frontend
npm run dev > frontend.log 2>&1 &
FRONTEND_PID=$!
cd ..

echo "✓ Servers started in the background!"
echo "  - Backend log: backend/backend.log"
echo "  - Frontend log: frontend/frontend.log"
echo "  - Open frontend: http://localhost:5173"
echo "  - Press Ctrl+C to stop both servers."
echo ""

# Wait for processes
wait
