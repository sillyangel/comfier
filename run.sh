#!/bin/bash

# Function to check and install npm packages
check_and_install() {
    if [ ! -d "node_modules" ]; then
        echo "Installing npm packages in $1..."
        npm install
    fi

    if [ ! -f ".env" ]; then
        echo "Environment variables not set. Checkout the README to get started."
    fi
}

# Check and install npm packages for client
cd client
check_and_install "client"
cd ..

# Check and install npm packages for server
cd server
check_and_install "server"
cd ..

# Navigate to the client directory and start the development server
(cd client && npm run dev ) &

# Navigate to the server directory and start the development server
(cd server && npm run dev ) &

# Wait for all background processes to finish
wait