#!/bin/bash

# GitHub Release Creation Script for ChatGPTBox v2.5.9
# This script creates a GitHub release with the build artifacts

set -e

VERSION="v2.5.9"
REPO_OWNER="WeiFengJL"
REPO_NAME="chatGPTBox"
BUILD_DIR="./build"

# Check if build directory exists
if [ ! -d "$BUILD_DIR" ]; then
    echo "Error: Build directory not found. Please run 'npm run build' first."
    exit 1
fi

# Check if required files exist
if [ ! -f "$BUILD_DIR/chromium.zip" ] || [ ! -f "$BUILD_DIR/firefox.zip" ]; then
    echo "Error: Required build files not found."
    exit 1
fi

# Read release notes
RELEASE_NOTES_FILE="./RELEASE_NOTES_v2.5.9.md"
if [ ! -f "$RELEASE_NOTES_FILE" ]; then
    echo "Error: Release notes file not found."
    exit 1
fi

# Create JSON payload for the release
cat > release-payload.json << EOF
{
  "tag_name": "$VERSION",
  "name": "ChatGPTBox $VERSION",
  "body": $(cat "$RELEASE_NOTES_FILE" | jq -Rs .),
  "draft": false,
  "prerelease": false
}
EOF

echo "Creating GitHub release for $VERSION..."

# Create the release
RELEASE_RESPONSE=$(curl -s -X POST \
  -H "Authorization: token ${GITHUB_TOKEN}" \
  -H "Accept: application/vnd.github.v3+json" \
  https://api.github.com/repos/$REPO_OWNER/$REPO_NAME/releases \
  -d @release-payload.json)

# Extract release ID from response
RELEASE_ID=$(echo "$RELEASE_RESPONSE" | jq -r .id)

if [ "$RELEASE_ID" = "null" ]; then
    echo "Error creating release:"
    echo "$RELEASE_RESPONSE" | jq .
    exit 1
fi

echo "Release created successfully with ID: $RELEASE_ID"

# Upload Chromium build
echo "Uploading Chromium build..."
curl -s -X POST \
  -H "Authorization: token ${GITHUB_TOKEN}" \
  -H "Content-Type: application/zip" \
  --data-binary @"$BUILD_DIR/chromium.zip" \
  https://uploads.github.com/repos/$REPO_OWNER/$REPO_NAME/releases/$RELEASE_ID/assets?name=chromium.zip

# Upload Firefox build
echo "Uploading Firefox build..."
curl -s -X POST \
  -H "Authorization: token ${GITHUB_TOKEN}" \
  -H "Content-Type: application/zip" \
  --data-binary @"$BUILD_DIR/firefox.zip" \
  https://uploads.github.com/repos/$REPO_OWNER/$REPO_NAME/releases/$RELEASE_ID/assets?name=firefox.zip

# Upload minimal builds if they exist
if [ -f "$BUILD_DIR/chromium-without-katex-and-tiktoken.zip" ]; then
    echo "Uploading Chromium minimal build..."
    curl -s -X POST \
      -H "Authorization: token ${GITHUB_TOKEN}" \
      -H "Content-Type: application/zip" \
      --data-binary @"$BUILD_DIR/chromium-without-katex-and-tiktoken.zip" \
      https://uploads.github.com/repos/$REPO_OWNER/$REPO_NAME/releases/$RELEASE_ID/assets?name=chromium-without-katex-and-tiktoken.zip
fi

if [ -f "$BUILD_DIR/firefox-without-katex-and-tiktoken.zip" ]; then
    echo "Uploading Firefox minimal build..."
    curl -s -X POST \
      -H "Authorization: token ${GITHUB_TOKEN}" \
      -H "Content-Type: application/zip" \
      --data-binary @"$BUILD_DIR/firefox-without-katex-and-tiktoken.zip" \
      https://uploads.github.com/repos/$REPO_OWNER/$REPO_NAME/releases/$RELEASE_ID/assets?name=firefox-without-katex-and-tiktoken.zip"
fi

# Clean up
rm -f release-payload.json

echo "✅ Release $VERSION created successfully!"
echo "📦 Build artifacts uploaded:"
echo "   - chromium.zip"
echo "   - firefox.zip"
echo "   - chromium-without-katex-and-tiktoken.zip (if available)"
echo "   - firefox-without-katex-and-tiktoken.zip (if available)"
echo ""
echo "🔗 Release URL: https://github.com/$REPO_OWNER/$REPO_NAME/releases/tag/$VERSION"