#!/bin/bash

# Portfolio Deployment Script
# This script helps you deploy your portfolio to various platforms

echo "🚀 Portfolio Deployment Helper"
echo "=============================="

echo "Available deployment options:"
echo "1. GitHub Pages"
echo "2. Netlify"
echo "3. Vercel"
echo "4. Local Development Server"
echo ""

read -p "Choose deployment option (1-4): " option

case $option in
    1)
        echo "📚 GitHub Pages Deployment:"
        echo "1. Push your code to GitHub"
        echo "2. Go to repository Settings > Pages"
        echo "3. Select source branch (main/master)"
        echo "4. Your site will be live at: https://yourusername.github.io/repository-name"
        ;;
    2)
        echo "🌐 Netlify Deployment:"
        echo "1. Visit https://netlify.com"
        echo "2. Drag and drop your portfolio folder"
        echo "3. Your site will be deployed instantly"
        echo "4. Optional: Connect your GitHub for automatic deployments"
        ;;
    3)
        echo "⚡ Vercel Deployment:"
        echo "1. Visit https://vercel.com"
        echo "2. Connect your GitHub repository"
        echo "3. Deploy with one click"
        echo "4. Your site will be live instantly"
        ;;
    4)
        echo "💻 Starting local development server..."
        if command -v python3 &> /dev/null; then
            echo "Starting Python server on http://localhost:8000"
            python3 -m http.server 8000
        elif command -v python &> /dev/null; then
            echo "Starting Python server on http://localhost:8000"
            python -m http.server 8000
        elif command -v npx &> /dev/null; then
            echo "Starting Node.js server on http://localhost:3000"
            npx http-server . -p 3000 -o
        else
            echo "Please install Python or Node.js to run a local server"
            echo "Or open index.html directly in your browser"
        fi
        ;;
    *)
        echo "Invalid option. Please run the script again."
        ;;
esac
