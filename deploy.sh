#!/bin/bash

# 🚀 TAJPE HMS Deployment Script
# This script helps prepare and deploy your project to Vercel

echo "🚀 Starting TAJPE HMS Deployment Process..."

# Check if we're in the right directory
if [ ! -f "package.json" ] || [ ! -f "vercel.json" ]; then
    echo "❌ Error: Please run this script from the project root directory"
    exit 1
fi

echo "✅ Project structure verified"

# Install dependencies
echo "📦 Installing dependencies..."
npm run install:all

if [ $? -ne 0 ]; then
    echo "❌ Error: Failed to install dependencies"
    exit 1
fi

echo "✅ Dependencies installed successfully"

# Test build
echo "🔨 Testing build process..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Error: Build failed"
    exit 1
fi

echo "✅ Build successful"

# Check git status
echo "📝 Checking git status..."
if [ -n "$(git status --porcelain)" ]; then
    echo "⚠️  Warning: You have uncommitted changes"
    echo "   Consider committing them before deployment:"
    git status --short
    echo ""
    read -p "Continue with deployment? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "❌ Deployment cancelled"
        exit 1
    fi
else
    echo "✅ Working directory is clean"
fi

# Push to GitHub (if needed)
echo "📤 Pushing to GitHub..."
git push origin main

if [ $? -ne 0 ]; then
    echo "❌ Error: Failed to push to GitHub"
    exit 1
fi

echo "✅ Code pushed to GitHub successfully"

echo ""
echo "🎉 Deployment preparation complete!"
echo ""
echo "📋 Next steps:"
echo "1. Go to https://vercel.com/dashboard"
echo "2. Click 'New Project'"
echo "3. Import your GitHub repository: ashish07-singh/hms"
echo "4. Configure environment variables (see DEPLOYMENT_CONFIG.md)"
echo "5. Deploy!"
echo ""
echo "🔗 Useful links:"
echo "- Deployment Guide: DEPLOYMENT.md"
echo "- Configuration: DEPLOYMENT_CONFIG.md"
echo "- GitHub Repo: https://github.com/ashish07-singh/hms"
echo ""
echo "🚀 Happy deploying!" 