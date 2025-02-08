#!/bin/bash

# Always enable debug logging for server
export DEBUG="makarasham:*"
echo "🐛 Debug mode enabled"

echo "🔄 Restarting Makarasham server..."

# Function to kill process using port 3000
kill_port_3000() {
    PID=$(lsof -ti:3000)
    if [ ! -z "$PID" ]; then
        echo "Killing process on port 3000 (PID: $PID)"
        kill -9 $PID
    else
        echo "No process found on port 3000"
    fi
}

# Kill any process using port 3000
echo "Stopping existing server..."
kill_port_3000

# Wait a moment for processes to clean up
sleep 2

# Start the server
echo "🚀 Starting server..."
cd server
npm start &


echo "✨ Done! Server running on port "
echo "📝 Access the application at http://localhost:3001"
