#!/bin/bash

# ChatGPTBox v2.5.9 Release Script
# This script completes the release process for ChatGPTBox v2.5.9

set -e

VERSION="v2.5.9"
REPO_OWNER="WeiFengJL"
REPO_NAME="chatGPTBox"
BUILD_DIR="./build"

echo "🚀 ChatGPTBox Release Script - Version $VERSION"
echo "=============================================="

# Check if build directory exists
if [ ! -d "$BUILD_DIR" ]; then
    echo "❌ Error: Build directory not found. Please run 'npm run build' first."
    exit 1
fi

# Verify required files exist
echo "📋 Verifying build artifacts..."
REQUIRED_FILES=(
    "$BUILD_DIR/chromium.zip"
    "$BUILD_DIR/firefox.zip"
    "$BUILD_DIR/chromium-without-katex-and-tiktoken.zip"
    "$BUILD_DIR/firefox-without-katex-and-tiktoken.zip"
)

for file in "${REQUIRED_FILES[@]}"; do
    if [ -f "$file" ]; then
        echo "✅ $(basename $file) ($(du -h $file | cut -f1))"
    else
        echo "❌ $(basename $file) (missing)"
        exit 1
    fi
done

# Verify manifest versions
echo ""
echo "🔍 Verifying version numbers..."
CHROMIUM_VERSION=$(grep -o '"version": "[^"]*"' "$BUILD_DIR/chromium/manifest.json" | cut -d'"' -f4)
FIREFOX_VERSION=$(grep -o '"version": "[^"]*"' "$BUILD_DIR/firefox/manifest.json" | cut -d'"' -f4)

if [ "$CHROMIUM_VERSION" = "2.5.9" ] && [ "$FIREFOX_VERSION" = "2.5.9" ]; then
    echo "✅ Version verification passed (2.5.9)"
else
    echo "❌ Version mismatch: Chromium=$CHROMIUM_VERSION, Firefox=$FIREFOX_VERSION"
    exit 1
fi

# Check for GitHub token
echo ""
echo "🔐 Checking for GitHub token..."
if [ -z "$GITHUB_TOKEN" ]; then
    echo "⚠️  Warning: GITHUB_TOKEN not found in environment variables"
    echo "   GitHub release will be skipped. Set GITHUB_TOKEN to create release."
    SKIP_GITHUB=true
else
    echo "✅ GitHub token found"
    SKIP_GITHUB=false
fi

# Create GitHub release if token is available
if [ "$SKIP_GITHUB" = false ]; then
    echo ""
    echo "🌐 Creating GitHub release..."
    
    # Check if release notes exist
    RELEASE_NOTES_FILE="./RELEASE_NOTES_v2.5.9.md"
    if [ ! -f "$RELEASE_NOTES_FILE" ]; then
        echo "❌ Error: Release notes file not found."
        exit 1
    fi
    
    # Create JSON payload
    cat > release-payload.json << EOF
{
  "tag_name": "$VERSION",
  "name": "ChatGPTBox $VERSION",
  "body": $(cat "$RELEASE_NOTES_FILE" | jq -Rs .),
  "draft": false,
  "prerelease": false
}
EOF
    
    # Create the release
    echo "📝 Creating release..."
    RELEASE_RESPONSE=$(curl -s -X POST \
      -H "Authorization: token ${GITHUB_TOKEN}" \
      -H "Accept: application/vnd.github.v3+json" \
      https://api.github.com/repos/$REPO_OWNER/$REPO_NAME/releases \
      -d @release-payload.json)
    
    # Extract release ID
    RELEASE_ID=$(echo "$RELEASE_RESPONSE" | jq -r .id)
    
    if [ "$RELEASE_ID" = "null" ]; then
        echo "❌ Error creating release:"
        echo "$RELEASE_RESPONSE" | jq .
        rm -f release-payload.json
        exit 1
    fi
    
    echo "✅ Release created successfully with ID: $RELEASE_ID"
    
    # Upload artifacts
    echo "📦 Uploading build artifacts..."
    
    ARTIFACTS=(
        "chromium.zip"
        "firefox.zip"
        "chromium-without-katex-and-tiktoken.zip"
        "firefox-without-katex-and-tiktoken.zip"
    )
    
    for artifact in "${ARTIFACTS[@]}"; do
        echo "⬆️  Uploading $artifact..."
        curl -s -X POST \
          -H "Authorization: token ${GITHUB_TOKEN}" \
          -H "Content-Type: application/zip" \
          --data-binary @"$BUILD_DIR/$artifact" \
          https://uploads.github.com/repos/$REPO_OWNER/$REPO_NAME/releases/$RELEASE_ID/assets?name=$artifact
        echo "✅ $artifact uploaded"
    done
    
    # Clean up
    rm -f release-payload.json
    
    echo ""
    echo "🎉 GitHub release completed successfully!"
    echo "🔗 Release URL: https://github.com/$REPO_OWNER/$REPO_NAME/releases/tag/$VERSION"
else
    echo ""
    echo "⏭️  Skipping GitHub release (no token)"
    echo "💡 To create release manually:"
    echo "   1. Go to: https://github.com/$REPO_OWNER/$REPO_NAME/releases/new"
    echo "   2. Tag: $VERSION"
    echo "   3. Title: ChatGPTBox $VERSION"
    echo "   4. Upload the following files:"
    for artifact in "${REQUIRED_FILES[@]}"; do
        echo "      - $(basename $artifact)"
    done
fi

# Summary
echo ""
echo "📊 Release Summary"
echo "==================="
echo "Version: $VERSION"
echo "Build Date: $(date)"
echo "Branch: $(git branch --show-current)"
echo ""

echo "✅ Build Status: PASSED"
echo "✅ Version Verification: PASSED"
echo "✅ Artifact Generation: PASSED"
if [ "$SKIP_GITHUB" = false ]; then
    echo "✅ GitHub Release: PASSED"
else
    echo "⏭️  GitHub Release: SKIPPED (no token)"
fi

echo ""
echo "📦 Generated Files:"
for file in "${REQUIRED_FILES[@]}"; do
    size=$(du -h "$file" | cut -f1)
    echo "   - $(basename $file) ($size)"
done

echo ""
echo "🎯 Ready for distribution!"
echo "=========================="
echo ""
echo "Installation Instructions:"
echo "1. Chromium: Download chromium.zip, extract, and load as unpacked extension"
echo "2. Firefox: Download firefox.zip, extract, and load temporary add-on"
echo "3. Safari: Requires macOS with Xcode for native build"
echo ""
echo "📖 For detailed instructions, see README.md"