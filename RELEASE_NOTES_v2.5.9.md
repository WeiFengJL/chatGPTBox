# ChatGPTBox v2.5.9 - Updated Release

## Overview
This is an updated build of v2.5.9 based on the latest code changes from the main branch.

## Latest Changes Included
- **PR #12**: Resolve Merge Conflicts and Optimize Sidebar Integration and UI
  - Fixed sidebar merge conflicts
  - Optimized sidebar integration and user interface

## Build Information
- **Version**: 2.5.9
- **Build Date**: November 11, 2024
- **Git Commit**: 996f6a9c94d6a47f6dbab5c7551dbc11b98d5ac7
- **Branch**: release-rebuild-v2.5.9-from-latest

## Available Builds

### Full Builds (with KaTeX and tiktoken)
- **chromium.zip** (1.8 MB) - For Chrome, Edge, Brave, and other Chromium-based browsers
- **firefox.zip** (1.8 MB) - For Firefox

### Minimal Builds (without KaTeX and tiktoken)
- **chromium-without-katex-and-tiktoken.zip** (471 KB) - Lightweight Chromium build
- **firefox-without-katex-and-tiktoken.zip** (471 KB) - Lightweight Firefox build

## Installation Instructions

### Chrome/Edge/Brave (Chromium)
1. Download `chromium.zip`
2. Extract the zip file
3. Open `chrome://extensions/` (or `edge://extensions/`)
4. Enable "Developer mode"
5. Click "Load unpacked" and select the extracted folder

### Firefox
1. Download `firefox.zip`
2. Extract the zip file
3. Open `about:debugging#/runtime/this-firefox`
4. Click "Load Temporary Add-on"
5. Select the `manifest.json` file from the extracted folder

## Notes
- This release includes the latest optimizations for sidebar integration and UI improvements
- All builds have been verified and tested
- Both full and minimal variants are provided for different use cases

## Verification
All build artifacts have been validated:
- ✓ chromium.zip is valid
- ✓ firefox.zip is valid
- ✓ Manifest version: 2.5.9
- ✓ All required files present
