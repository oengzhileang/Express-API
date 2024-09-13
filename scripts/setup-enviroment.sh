#!/bin/bash

# Define the NVM directory if not already set
export NVM_DIR="$HOME/.nvm"

# Ensure NVM is installed
if [ ! -s "$NVM_DIR/nvm.sh" ]; then
    echo "NVM not found. Installing NVM..."
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
    export NVM_DIR="$HOME/.nvm"
    [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"
fi

# Load NVM
if [ -s "$NVM_DIR/nvm.sh" ]; then
    . "$NVM_DIR/nvm.sh"
else
    echo "Error: NVM installation failed or NVM not found."
    exit 1
fi

# Install Node.js v20
echo "Installing Node.js version 20..."
nvm install 20
if [ $? -ne 0 ]; then
    echo "Error: Node.js installation failed."
    exit 1
fi

nvm use 20
nvm alias default 20

# Install Yarn and PM2
echo "Installing Yarn and PM2 globally..."
npm install -g yarn pm2
if [ $? -ne 0 ]; then
    echo "Error: Failed to install Yarn and PM2."
    exit 1
fi

# Display versions
echo "Node.js version: $(node -v)"
echo "PM2 version: $(pm2 -v)"
echo "Yarn version: $(yarn -v)"
