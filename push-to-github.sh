#!/bin/bash

# SSH Script to Push Code to GitHub
# This script configures SSH, adds files, commits changes, and pushes to GitHub

set -e  # Exit on error

echo "🚀 Starting GitHub push process..."

# Check if git is initialized
if [ ! -d .git ]; then
    echo "❌ Git repository not initialized. Initializing now..."
    git init
fi

# Configure Git (optional - skip if already configured)
# echo "Configuring Git user..."
# git config user.name "Paul Elisha"
# git config user.email "ireajao@yahoo.com"

# Set SSH remote if not already set
echo "📝 Setting up SSH remote..."
REMOTE_URL="git@github.com:PaulElisha/klaytn-feedelegation-hook.git"

if git remote | grep -q origin; then
    echo "Updating existing remote..."
    git remote set-url origin "$REMOTE_URL"
else
    echo "Adding new remote..."
    git remote add origin "$REMOTE_URL"
fi

# Add all changes
echo "📦 Staging files..."
git add -A

# Check if there are changes to commit
if git diff --cached --quiet; then
    echo "⚠️  No changes to commit."
    exit 0
fi

# Commit with a message
COMMIT_MESSAGE="${1:-Update: $(date '+%Y-%m-%d %H:%M:%S)')}"
echo "✍️  Committing with message: $COMMIT_MESSAGE"
git commit -m "$COMMIT_MESSAGE"

# Push to GitHub using SSH
echo "🔄 Pushing to GitHub via SSH..."
git push -u origin main

echo "✅ Successfully pushed to GitHub!"
echo "🔗 Repository: https://github.com/PaulElisha/klaytn-feedelegation-hook"
