# ChatGPTBox v2.5.9 - Release Checklist

## 📋 Quick Reference

**Version**: 2.5.9 (no version bump)  
**Build Date**: November 11, 2024  
**Branch**: release/no-version-bump-api-custom-model-hide-sidebar

## ✅ Completed Tasks

### Code & Build
- [x] All feature branches merged to release branch
  - [x] PR #1: API mode custom model fields (`794e684`)
  - [x] PR #2: Remove default custom model setting (`32d6ca7`)
  - [x] PR #3: Hide sidebar with persistence (`51ac2ce`)
- [x] Dependencies installed (`npm ci`)
- [x] Linting passed (`npm run lint`)
- [x] Production build completed (`npm run build`)
- [x] Chromium build generated (1.8 MB)
- [x] Firefox build generated (1.8 MB)
- [x] Build integrity verified (SHA256 checksums generated)
- [x] Version verified in manifests (2.5.9)

### Documentation
- [x] Comprehensive release notes created (`RELEASE_NOTES_v2.5.9.md`)
- [x] GitHub release notes prepared (`GITHUB_RELEASE_NOTES.md`)
- [x] Deployment guide created (`DEPLOYMENT_GUIDE.md`)
- [x] Release summary created (`RELEASE_SUMMARY.md`)
- [x] Release checklist created (this document)
- [x] English & Chinese translations provided
- [x] Installation instructions included

## ⚠️ Pending Tasks

### Critical - Must Complete Before Deployment

#### 1. Manual Testing (REQUIRED)
**Priority**: 🔴 CRITICAL

Chromium Testing:
- [ ] Load extension in Chrome/Edge/Brave
- [ ] Test keyboard shortcut (Ctrl+B / ⌘+B)
- [ ] Test extension popup opens correctly
- [ ] Test selection tools appear
- [ ] Test context menu works
- [ ] **Test API custom model configuration**:
  - [ ] Open API mode settings
  - [ ] Verify three input fields: Custom Name, Model ID, Display Name
  - [ ] Add a custom model configuration
  - [ ] Verify it appears in dropdown with correct display name
  - [ ] Test using the custom model in a chat
- [ ] **Test settings cleanup**:
  - [ ] Open general settings
  - [ ] Verify default custom model option is NOT present
  - [ ] Confirm UI is cleaner
- [ ] **Test hide sidebar feature**:
  - [ ] Open Independent Conversation Window
  - [ ] Click sidebar toggle button
  - [ ] Verify sidebar hides
  - [ ] Close and reopen window → verify state persists
  - [ ] Test in Independent Conversation Page
  - [ ] Test in Side Panel mode
  - [ ] Restart browser → verify all states persist
- [ ] Test site integrations:
  - [ ] YouTube video summary
  - [ ] Reddit integration
  - [ ] GitHub code analysis
  - [ ] Google search results

Firefox Testing:
- [ ] Load extension in Firefox
- [ ] Repeat all tests from Chromium section above
- [ ] Verify Manifest v2 works correctly
- [ ] Test any Firefox-specific behaviors

#### 2. Safari Build (macOS Required)
**Priority**: 🟡 HIGH (but environment-dependent)

- [ ] Access macOS system with Xcode installed
- [ ] Clone repository on macOS
- [ ] Checkout release branch
- [ ] Run `npm ci`
- [ ] Run `npm run build:safari`
- [ ] Verify `Fission - ChatBox.app` is created
- [ ] Verify `safari.dmg` is created
- [ ] Test Safari extension
- [ ] Repeat all manual tests from section 1

### Store Submissions

#### Chrome Web Store
- [ ] Login to Chrome Developer Dashboard
- [ ] Navigate to ChatGPTBox extension
- [ ] Upload `build/chromium.zip`
- [ ] Update "What's new" with release notes
- [ ] Update screenshots (if sidebar toggle changes UI significantly)
- [ ] Submit for review
- [ ] Monitor review status

#### Firefox Add-ons (AMO)
- [ ] Login to Firefox Add-on Developer Hub
- [ ] Navigate to ChatGPTBox add-on
- [ ] Upload `build/firefox.zip`
- [ ] Copy release notes to version notes
- [ ] Submit version
- [ ] Monitor review status

#### Microsoft Edge Add-ons
- [ ] Login to Microsoft Partner Center
- [ ] Navigate to ChatGPTBox extension
- [ ] Upload `build/chromium.zip`
- [ ] Update store listing with release notes
- [ ] Submit for certification
- [ ] Monitor certification status

#### Safari App Store (macOS)
- [ ] Open Xcode with Safari project
- [ ] Archive the app
- [ ] Upload to App Store Connect
- [ ] Fill in metadata
- [ ] Add release notes (English & Chinese)
- [ ] Submit for review
- [ ] Monitor review status

### GitHub Release

- [ ] Create git tag: `git tag -a v2.5.9-update -m "Feature enhancements release"`
- [ ] Push tag: `git push origin v2.5.9-update`
- [ ] Go to GitHub → Releases → "Draft a new release"
- [ ] Select tag: `v2.5.9-update`
- [ ] Title: "ChatGPTBox v2.5.9 - Feature Enhancements"
- [ ] Description: Copy from `GITHUB_RELEASE_NOTES.md`
- [ ] Upload release assets:
  - [ ] `build/chromium.zip`
  - [ ] `build/firefox.zip`
  - [ ] `RELEASE_NOTES_v2.5.9.md`
  - [ ] Safari build files (when available)
- [ ] Check "Set as the latest release"
- [ ] Publish release

### Post-Deployment

#### Week 1 Monitoring
- [ ] Monitor GitHub issues for bug reports
- [ ] Check Chrome Web Store reviews
- [ ] Check Firefox Add-ons reviews
- [ ] Check Edge Add-ons reviews
- [ ] Check Safari App Store reviews
- [ ] Monitor discussion forums
- [ ] Track installation/update metrics (if available)

#### Response Plan
- [ ] Prepare rollback procedure in case of critical bugs
- [ ] Monitor error reports daily
- [ ] Respond to user issues within 24 hours
- [ ] Create hotfix branch if needed

## 📁 File Locations

### Build Artifacts
```
build/
├── chromium.zip                              (1.8 MB) ✅
├── firefox.zip                               (1.8 MB) ✅
├── chromium-without-katex-and-tiktoken.zip   (471 KB) ✅
├── firefox-without-katex-and-tiktoken.zip    (471 KB) ✅
├── chromium/                                 (5.0 MB) ✅
└── firefox/                                  (5.0 MB) ✅
```

### Documentation
```
/home/engine/project/
├── RELEASE_NOTES_v2.5.9.md      ✅ Comprehensive release notes
├── GITHUB_RELEASE_NOTES.md      ✅ GitHub release description
├── DEPLOYMENT_GUIDE.md          ✅ Deployment instructions
├── RELEASE_SUMMARY.md           ✅ Release summary
└── RELEASE_CHECKLIST.md         ✅ This checklist
```

## 🔍 Verification Commands

```bash
# Verify builds exist
ls -lh build/*.zip

# Verify version numbers
grep '"version"' build/chromium/manifest.json
grep '"version"' build/firefox/manifest.json

# Verify checksums
sha256sum build/chromium.zip
sha256sum build/firefox.zip

# Verify git status
git status
git log --oneline -5

# Run linting
npm run lint
```

## 🚨 Blockers

### Current Blockers
1. ⚠️ **Manual testing not completed** - Extension has no automated tests
2. ⚠️ **Safari build not available** - Requires macOS environment

### Blocker Resolution
1. **Manual Testing**: Must be completed before any store submission
   - Estimated time: 30-60 minutes per browser
   - Can be done in parallel for Chromium and Firefox
   
2. **Safari Build**: Two options:
   - Option A: Access macOS system to build
   - Option B: Deploy Chromium & Firefox first, Safari separately later

## 📊 Risk Assessment

### Low Risk ✅
- Chromium and Firefox builds completed successfully
- All code merged and reviewed
- No version conflicts (maintaining 2.5.9)
- Backward compatible changes
- Documentation complete

### Medium Risk ⚠️
- No automated tests (requires extensive manual testing)
- Safari requires separate build environment
- UI changes (sidebar toggle) need user acceptance testing

### High Risk 🔴
- None identified

## 🎯 Success Metrics

### Immediate Success (First Week)
- [ ] All store submissions accepted
- [ ] Extension loads without errors in all browsers
- [ ] No critical bugs reported
- [ ] All three features working as documented
- [ ] No negative reviews mentioning the new features

### Long-term Success (First Month)
- [ ] Positive user feedback on new features
- [ ] Increased usage of custom model configurations
- [ ] Users finding settings more intuitive
- [ ] Sidebar toggle feature adopted by users

## 📞 Emergency Contacts

If critical issues arise:
- Review GitHub Issues immediately
- Prepare hotfix if needed
- Consider rollback if issues are severe
- Update documentation with known issues

## 🎉 Completion Criteria

Release is considered complete when:
- [x] Chromium build completed ✅
- [x] Firefox build completed ✅
- [ ] Safari build completed (or scheduled separately)
- [ ] Manual testing passed for all browsers
- [ ] All store submissions approved
- [ ] GitHub release published
- [ ] No critical bugs in first 7 days
- [ ] Users receiving updates successfully

---

**Next Steps**:
1. 🔴 Complete manual testing (CRITICAL)
2. 🟡 Build Safari version on macOS (if available)
3. 🟢 Submit to browser stores (after testing)
4. 🟢 Publish GitHub release
5. 🟢 Monitor and respond to feedback

**Status**: 🟡 PENDING MANUAL TESTING

**Last Updated**: November 11, 2024
