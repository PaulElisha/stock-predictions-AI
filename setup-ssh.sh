#!/bin/bash

# SSH Setup Script for GitHub
# Run this once to configure SSH keys for GitHub authentication

set -e

echo "🔐 GitHub SSH Setup Script"
echo "=========================="

# Check if SSH key exists
SSH_KEY_PATH="$HOME/.ssh/id_ed25519"

if [ -f "$SSH_KEY_PATH" ]; then
    echo "✅ SSH key already exists at $SSH_KEY_PATH"
else
    echo "🔑 Generating new SSH key..."
    ssh-keygen -t ed25519 -C "ireajao@yahoo.com" -f "$SSH_KEY_PATH" -N ""
    echo "✅ SSH key created at $SSH_KEY_PATH"
fi

# Add SSH key to ssh-agent
echo "🚀 Adding SSH key to ssh-agent..."
eval "$(ssh-agent -s)"
ssh-add -K "$SSH_KEY_PATH"

# Display public key
echo ""
echo "📋 Your public SSH key:"
echo "========================"
cat "$SSH_KEY_PATH.pub"
echo ""
echo "⚠️  Copy the above key and add it to GitHub:"
echo "   1. Go to https://github.com/settings/keys"
echo "   2. Click 'New SSH key'"
echo "   3. Paste the key above"
echo "   4. Click 'Add SSH key'"
echo ""

# Test SSH connection
echo "🧪 Testing SSH connection to GitHub..."
if ssh -T git@github.com 2>&1 | grep -q "successfully authenticated"; then
    echo "✅ SSH connection successful!"
else
    echo "⚠️  SSH connection test completed. Check if key is added to GitHub."
fi

echo ""
echo "✅ SSH setup complete!"
