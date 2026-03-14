#!/bin/bash

set -e

SCRIPT_DIR=$(dirname "$(realpath "$0")")

rm -rf "$SCRIPT_DIR/../node_modules"
rm -rf "$SCRIPT_DIR/../front/node_modules"
rm -rf "$SCRIPT_DIR/../back/node_modules"

# Setup front
bun install
cd "$SCRIPT_DIR/../front"
bun install

# Setup back
cd "$SCRIPT_DIR/../back"
bun install
cp .env.example .env


cd "$SCRIPT_DIR/.."

ZED_DIRNAME=".zed"
ZED_SETTING_FILE="$SCRIPT_DIR/../$ZED_DIRNAME/settings.json"
[ -d "$ZED_DIRNAME" ] || mkdir "$ZED_DIRNAME"
[ -e "$ZED_SETTING_FILE" ] || cp "$SCRIPT_DIR/assets/zed/settings.json" "$ZED_SETTING_FILE";

# Add more setup steps as needed

echo "Setup completed successfully."
