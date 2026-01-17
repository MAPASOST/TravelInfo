#!/bin/bash

# Budget Visualization App - Setup Script
# This script sets up the development environment

set -e

echo "🚀 Setting up Budget Visualization App..."
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Error: Node.js is not installed"
    echo "Please install Node.js from https://nodejs.org/"
    exit 1
fi

NODE_VERSION=$(node -v)
echo "✅ Node.js is installed: $NODE_VERSION"

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ Error: npm is not installed"
    exit 1
fi

NPM_VERSION=$(npm -v)
echo "✅ npm is installed: $NPM_VERSION"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -eq 0 ]; then
    echo "✅ Dependencies installed successfully"
else
    echo "❌ Error installing dependencies"
    exit 1
fi

echo ""

# Generate icons
echo "🎨 Generating app icons..."
npm run make-icons 2>/dev/null || echo "⚠️  Icon generation skipped (optional)"

echo ""
echo "✨ Setup complete!"
echo ""
echo "To start the development server, run:"
echo "  npm start"
echo ""
echo "To build for production, run:"
echo "  npm run build:electron"
echo ""
echo "For more information, see:"
echo "  - README.md - Usage and features"
echo "  - INSTALLATION.md - Detailed installation guide"
echo "  - EXCEL_FORMAT_GUIDE.md - Excel file format requirements"
echo ""
