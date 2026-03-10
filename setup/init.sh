#!/bin/bash

set -e

SCRIPT_DIR=$(dirname "$(realpath "$0")")

rm -rf "$SCRIPT_DIR/../node_modules"
rm -rf "$SCRIPT_DIR/../front/node_modules"
rm -rf "$SCRIPT_DIR/../back/node_modules"
bun install
cd "$SCRIPT_DIR/../front"
bun install
cd "$SCRIPT_DIR/../back"
bun install
cp .env.example .env

cd "$SCRIPT_DIR/.."

VSCODE_DIRNAME=".vscode"
VSCODE_SETTING_FILE="$VSCODE_DIRNAME/settings.json"
[ -d "$VSCODE_DIRNAME" ] || mkdir "$VSCODE_DIRNAME"
[ -e "$VSCODE_SETTING_FILE" ] || cp ./setup/assets/vscode.settings.json "$VSCODE_SETTING_FILE";

# Add more setup steps as needed

echo "Setup completed successfully."