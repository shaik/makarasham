#!/bin/bash

# Check if debug mode is enabled
DEBUG_MODE=${DEBUG_MODE:-0}
if [ "$DEBUG_MODE" = "1" ]; then
    export DEBUG="makarasham:*"
    echo "🐛 Debug mode enabled"
fi

echo "🔄 Restarting Makarasham applications..."

# Kill existing processes
echo "Stopping existing processes..."
pkill -f "node.*server/server.js" || true
pkill -f "node.*start" || true

# Wait a moment for processes to clean up
sleep 2

# Start the server
echo "🚀 Starting server..."
cd server
npm start &

# Wait for server to start
sleep 3

# Start the client
echo "🚀 Starting client..."
cd ../client
PORT=3001 npm start &

echo "✨ Done! Server running on port 3000, client on port 3001"
echo "📝 Access the application at http://localhost:3001"
