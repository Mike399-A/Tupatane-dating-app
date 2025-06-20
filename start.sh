#!/bin/bash

# 🦁 Tupatane App Startup Script

echo "🦁 Starting Tupatane - Kenyan Dating App"
echo "🇰🇪 Karibu (Welcome)! 🇰🇪"
echo ""

# Load nvm
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

# Check if Node.js is available
if ! command -v node &> /dev/null; then
    echo "❌ Node.js not found. Please install Node.js first."
    echo "📖 See SETUP.md or ALTERNATIVE_SETUP.md for installation instructions"
    exit 1
fi

echo "✅ Node.js version: $(node --version)"
echo "✅ npm version: $(npm --version)"
echo ""

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install --legacy-peer-deps
fi

# Install Expo CLI globally if not installed
if ! command -v expo &> /dev/null; then
    echo "📱 Installing Expo CLI..."
    npm install -g @expo/cli
fi

echo ""
echo "🚀 Starting Tupatane app..."
echo "📱 Download 'Expo Go' app on your phone to test"
echo "🔑 Demo login: test@example.com / password"
echo ""

# Start the app
npx expo start 