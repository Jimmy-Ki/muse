#!/bin/bash

echo "🚀 Muse Quick Deployment Script"
echo "================================"

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Please run this script from the muse project directory"
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build the project
echo "🔨 Building the project..."
npm run build

echo "✅ Build completed successfully!"
echo "📂 Build output is in the 'dist' directory"
echo ""
echo "🌐 To deploy to Cloudflare Pages:"
echo "1. Push your code to GitHub"
echo "2. Connect your repository to Cloudflare Pages"
echo "3. Set build command: npm run build"
echo "4. Set build output directory: dist"
echo "5. Add GEMINI_API_KEY environment variable"
echo ""
echo "📋 Current dist contents:"
ls -la dist/ || echo "dist directory not found - build may have failed"