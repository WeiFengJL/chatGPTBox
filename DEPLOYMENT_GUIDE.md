# ChatGPTBox v2.5.9 - Deployment Guide

## Build Status ✅

All builds have been successfully generated:

- ✅ **Chromium** (Chrome, Edge, Opera, Brave, etc.)
  - File: `build/chromium.zip` (1.8 MB)
  - Directory: `build/chromium/` (5.0 MB uncompressed)
  - Manifest: v3
  - Version: 2.5.9

- ✅ **Firefox**
  - File: `build/firefox.zip` (1.8 MB)
  - Directory: `build/firefox/` (5.0 MB uncompressed)
  - Manifest: v2
  - Version: 2.5.9

- ⚠️ **Safari** (Not built - requires macOS)
  - Build command: `npm run build:safari`
  - Requirements: macOS with Xcode installed
  - Output: `Fission - ChatBox.app` and `safari.dmg`

## Pre-Deployment Checklist

### 1. Build Verification ✅

- [x] Chromium build completed successfully
- [x] Firefox build completed successfully  
- [x] All required files present in build directories
- [x] Manifest files contain correct version (2.5.9)
- [x] ZIP archives created successfully
- [ ] Safari build (requires macOS environment)

### 2. Testing Requirements ⚠️

**IMPORTANT**: This extension has no automated tests. Manual testing is required before deployment.

#### Core Functionality Tests
- [ ] Extension loads in Chromium without errors
- [ ] Extension loads in Firefox without errors
- [ ] Keyboard shortcut `Ctrl+B` / `⌘+B` opens chat dialog
- [ ] Extension popup opens correctly
- [ ] Selection tools appear when text is selected
- [ ] Context menu "Ask ChatGPT" works

#### Feature-Specific Tests (This Release)
- [ ] **API Custom Model Configuration**:
  - [ ] Navigate to API mode settings
  - [ ] Verify three separate input fields present: Custom Name, Model ID, Display Name
  - [ ] Test saving custom model configuration
  - [ ] Verify custom model appears in selection dropdown with correct display name
  
- [ ] **Settings Cleanup**:
  - [ ] Open general settings
  - [ ] Verify default custom model option is NOT present in API mode section
  - [ ] Confirm settings UI is cleaner and less confusing

- [ ] **Hide Sidebar Feature**:
  - [ ] Open Independent Conversation Window
  - [ ] Toggle sidebar visibility
  - [ ] Verify sidebar hides/shows correctly
  - [ ] Close and reopen window - verify state persists
  - [ ] Repeat for Independent Conversation Page
  - [ ] Repeat for Side Panel mode
  - [ ] Test across browser restart to confirm persistence

#### Site Integration Tests
- [ ] Visit YouTube.com - verify video summary works
- [ ] Visit Reddit.com - verify integration appears
- [ ] Visit GitHub.com - verify code analysis works
- [ ] Visit Google.com search - verify ChatGPT responses appear

### 3. Documentation ✅

- [x] Release notes created (`RELEASE_NOTES_v2.5.9.md`)
- [x] GitHub release notes prepared (`GITHUB_RELEASE_NOTES.md`)
- [x] Deployment guide created (this file)
- [x] Installation instructions included
- [x] Chinese translations provided

## Deployment Steps

### Step 1: Manual Testing

Before proceeding with deployment, perform all tests in the checklist above.

**Chromium Testing**:
```bash
# The extension is already built in build/chromium/
# 1. Open Chrome/Edge/Brave
# 2. Navigate to chrome://extensions/
# 3. Enable "Developer mode"
# 4. Click "Load unpacked"
# 5. Select the build/chromium/ directory
# 6. Run through test checklist
```

**Firefox Testing**:
```bash
# The extension is already built in build/firefox/
# 1. Open Firefox
# 2. Navigate to about:debugging#/runtime/this-firefox
# 3. Click "Load Temporary Add-on"
# 4. Select build/firefox/manifest.json
# 5. Run through test checklist
```

### Step 2: Browser Store Submissions

#### Chrome Web Store

1. **Login**: Go to [Chrome Developer Dashboard](https://chrome.google.com/webstore/devconsole)

2. **Update Extension**:
   - Select "ChatGPTBox" from your items
   - Click "Package" → "Upload new package"
   - Upload `build/chromium.zip`

3. **Store Listing**:
   - Update "What's new" section with content from `GITHUB_RELEASE_NOTES.md`
   - Version: 2.5.9 (no change)
   - Update screenshots if UI changed (sidebar toggle feature)

4. **Submit for Review**:
   - Click "Submit for review"
   - Review time: typically 1-3 business days

#### Firefox Add-ons (AMO)

1. **Login**: Go to [Firefox Add-on Developer Hub](https://addons.mozilla.org/developers/)

2. **Update Extension**:
   - Go to your add-on page
   - Click "Upload New Version"
   - Upload `build/firefox.zip`

3. **Version Notes**:
   - Copy release notes from `GITHUB_RELEASE_NOTES.md`
   - Version: 2.5.9

4. **Submit for Review**:
   - Click "Submit Version"
   - Review time: typically automatic for updates, may take 1-2 days for manual review

#### Edge Add-ons

1. **Login**: Go to [Microsoft Partner Center](https://partner.microsoft.com/dashboard/microsoftedge/)

2. **Update Extension**:
   - Select your extension
   - Click "Update"
   - Upload `build/chromium.zip` (Edge uses Chromium builds)

3. **Store Listing**:
   - Update release notes
   - Version: 2.5.9

4. **Submit for Certification**:
   - Review time: typically 1-2 business days

#### Safari (App Store) - Requires macOS

**Prerequisites**:
- macOS computer with Xcode installed
- Apple Developer account
- Valid signing certificates

**Build Process**:
```bash
# On macOS machine:
git clone [repository]
cd chatgptbox
git checkout release/no-version-bump-api-custom-model-hide-sidebar
npm ci
npm run build:safari
```

**Submission**:
1. Open Xcode with the generated project
2. Archive the app
3. Submit to App Store Connect
4. Fill in metadata and release notes
5. Submit for review
6. Review time: typically 1-2 weeks

### Step 3: GitHub Release

1. **Create Git Tag** (if not already tagged):
```bash
git tag -a v2.5.9-update -m "Feature enhancements: API custom model config, settings cleanup, hide sidebar"
git push origin v2.5.9-update
```

2. **Create GitHub Release**:
   - Go to repository → Releases → "Draft a new release"
   - Tag: `v2.5.9-update` (or appropriate tag for this update)
   - Title: `ChatGPTBox v2.5.9 - Feature Enhancements`
   - Description: Copy content from `GITHUB_RELEASE_NOTES.md`
   - Attach files:
     - `build/chromium.zip`
     - `build/firefox.zip`
     - `RELEASE_NOTES_v2.5.9.md`

3. **Publish Release**:
   - Check "Set as the latest release"
   - Click "Publish release"

### Step 4: Documentation Updates

If the repository has a changelog:
```bash
# Update CHANGELOG.md with new entries
# Commit and push changes
```

Verify README badges and links still work.

### Step 5: Announcement

Consider announcing the release:
- GitHub Discussions (if enabled)
- Social media channels
- Project website/blog
- User community forums

## Post-Deployment Monitoring

### Week 1 After Release

Monitor for:
- User-reported issues on GitHub
- Store review ratings/comments
- Error reports (if analytics enabled)
- Installation/update success rate

### Common Post-Release Issues

1. **Extension fails to load**:
   - Check manifest permissions
   - Verify all files are included in package

2. **Features not working**:
   - Check browser console for errors
   - Verify API configurations
   - Test with different API providers

3. **Settings not saving**:
   - Check storage permissions
   - Verify migration logic for existing users

## Rollback Procedure

If critical issues are discovered:

1. **Immediate**: Remove from store listings (mark as unavailable)
2. **Investigate**: Identify root cause
3. **Fix**: Apply hotfix or revert changes
4. **Rebuild**: Generate new build with fixes
5. **Test**: Run full test suite
6. **Redeploy**: Follow deployment steps again

## Build Information

- **Build Date**: November 11, 2024
- **Build Time**: ~35 seconds
- **Node Version**: Check with `node --version`
- **Build Command**: `npm run build`
- **Build Script**: `build.mjs`

## Files Included in This Release

```
build/
├── chromium.zip                              # Chromium distribution
├── firefox.zip                               # Firefox distribution
├── chromium-without-katex-and-tiktoken.zip  # Minimal Chromium build
├── firefox-without-katex-and-tiktoken.zip   # Minimal Firefox build
├── chromium/                                 # Unpacked Chromium build
│   ├── manifest.json                         # v3, version 2.5.9
│   ├── background.js                         # Service worker
│   ├── content-script.js                     # Main functionality
│   ├── content-script.css                    # Styling
│   ├── popup.html/js/css                     # Extension popup
│   ├── IndependentPanel.html/js              # Standalone chat
│   ├── shared.js                             # Vendor bundle
│   ├── logo.png                              # Extension icon
│   └── rules.json                            # DNR rules
└── firefox/                                  # Unpacked Firefox build
├── manifest.json                         # v2, version 2.5.9
    └── [same files as chromium]
```

## Support Contacts

- GitHub Issues: [Repository Issues Page]
- Developer: [Contact Information]
- Documentation: [Project Wiki/Docs]

---

## Notes for Release Manager

- Version number is maintained at 2.5.9 (no version bump as requested)
- All three features have been merged to master:
  1. PR #1: API mode custom model fields
  2. PR #2: Remove default custom model setting
  3. PR #3: Hide sidebar feature with persistence
- Git branch: `release/no-version-bump-api-custom-model-hide-sidebar`
- Safari build requires manual intervention on macOS
- No breaking changes in this release
- Backward compatible with existing user configurations

---

**Last Updated**: November 11, 2024  
**Document Version**: 1.0
