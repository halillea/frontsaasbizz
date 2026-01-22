#!/bin/bash

# Get the file path from Claude's hook input
file_path=$(jq -r '.tool_input.file_path')

# Format Vue, JS, TS files with Prettier
if [[ $file_path =~ \.(vue|js|ts|jsx|tsx)$ ]]; then
    npx prettier --write "$file_path" 2>/dev/null || true
    echo "✅ Formatted: $file_path"
fi