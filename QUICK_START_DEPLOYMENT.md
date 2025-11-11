# Quick Start: Complete v2.5.9 Release Deployment

## 🚀 Current Status

✅ **COMPLETED**:
- All code merged and tested
- Chromium build ready (`build/chromium.zip`)
- Firefox build ready (`build/firefox.zip`)
- Complete documentation prepared
- Version 2.5.9 verified in manifests

⚠️ **REQUIRED**:
- Manual browser testing (30-60 min)
- Browser store submissions
- Safari build (macOS only)

## ⚡ Quick Deployment Path

### Option 1: Full Deployment (Recommended)

**Time Required**: 2-3 hours

1. **Manual Testing** (60 min)
   ```bash
   # Load and test Chromium build
   # 1. Open Chrome
   # 2. Go to chrome://extensions/
   # 3. Enable Developer mode
   # 4. Load unpacked: select build/chromium/
   # 5. Test all features (see RELEASE_CHECKLIST.md)
   
   # Load and test Firefox build
   # 1. Open Firefox
   # 2. Go to about:debugging#/runtime/this-firefox
   # 3. Load Temporary Add-on: select build/firefox/manifest.json
   # 4. Test all features
   ```

2. **Submit to Stores** (30 min setup, then wait for review)
   - Chrome Web Store: Upload `build/chromium.zip`
   - Firefox AMO: Upload `build/firefox.zip`
   - Edge Add-ons: Upload `build/chromium.zip`
   
3. **Create GitHub Release** (15 min)
   ```bash
   git tag -a v2.5.9-update -m "Feature enhancements"
   git push origin v2.5.9-update
   # Then create release on GitHub with files from build/
   ```

4. **Safari Build** (macOS, 30 min)
   ```bash
   # On macOS:
   npm run build:safari
   # Submit to App Store Connect
   ```

### Option 2: Phased Deployment (If Safari not available)

**Phase 1**: Deploy Chromium & Firefox now (today)
- Complete manual testing
- Submit to Chrome, Firefox, Edge stores
- Create GitHub release with Chromium & Firefox builds

**Phase 2**: Deploy Safari separately (when macOS available)
- Build on macOS
- Submit to App Store
- Update GitHub release with Safari build

## 📋 Minimal Testing Checklist

If time is limited, test at minimum:

**Essential Tests** (15 min per browser):
- [ ] Extension loads without errors
- [ ] Press Ctrl+B → chat dialog opens
- [ ] Click extension icon → popup opens
- [ ] Open settings → navigate through tabs
- [ ] **NEW**: Check API settings for 3 custom model fields
- [ ] **NEW**: Verify general settings don't show removed option
- [ ] **NEW**: Open chat window → test sidebar toggle button
- [ ] **NEW**: Restart browser → verify sidebar state persists

## 🎯 Three-Step Quick Deploy

### Step 1: Verify Builds (5 min)
```bash
cd /home/engine/project

# Check builds exist
ls -lh build/*.zip

# Output should show:
# chromium.zip (1.8M)
# firefox.zip (1.8M)

# Verify versions
grep '"version"' build/chromium/manifest.json
grep '"version"' build/firefox/manifest.json
# Both should show: "version": "2.5.9"
```

### Step 2: Manual Test (30 min)
1. Load in Chrome: Use `build/chromium/` folder
2. Load in Firefox: Use `build/firefox/manifest.json`
3. Run through minimal testing checklist above
4. If any issues found → fix → rebuild → retest

### Step 3: Deploy (20 min + review time)

**Chrome Web Store**:
- Go to: https://chrome.google.com/webstore/devconsole
- Upload: `build/chromium.zip`
- Release notes: Copy from `GITHUB_RELEASE_NOTES.md`
- Submit

**Firefox Add-ons**:
- Go to: https://addons.mozilla.org/developers/
- Upload: `build/firefox.zip`
- Version notes: Copy from `GITHUB_RELEASE_NOTES.md`
- Submit

**GitHub Release**:
```bash
# Create and push tag
git tag -a v2.5.9-update -m "Feature enhancements: API custom model config, settings cleanup, hide sidebar"
git push origin v2.5.9-update

# Then on GitHub:
# 1. Go to Releases → Draft new release
# 2. Choose tag: v2.5.9-update
# 3. Title: ChatGPTBox v2.5.9 - Feature Enhancements
# 4. Description: Paste from GITHUB_RELEASE_NOTES.md
# 5. Upload: build/chromium.zip, build/firefox.zip
# 6. Publish
```

## 📁 Files You Need

All ready in `/home/engine/project/`:

**Build Files**:
- `build/chromium.zip` → Upload to Chrome/Edge stores
- `build/firefox.zip` → Upload to Firefox store

**Documentation** (for reference):
- `GITHUB_RELEASE_NOTES.md` → Copy for store listings & GitHub
- `RELEASE_CHECKLIST.md` → Complete testing checklist
- `DEPLOYMENT_GUIDE.md` → Detailed deployment instructions

## 🚨 Troubleshooting

### Build doesn't load in browser
- Check browser console for errors
- Verify manifest.json is present
- Check file permissions

### Features don't work
- Check if API is configured
- Test with different API providers
- Check browser console for errors

### Need to rebuild
```bash
cd /home/engine/project
rm -rf build/
npm run build
# Builds will be recreated in ~35 seconds
```

## 📞 Need Help?

1. **Build Issues**: Check `build.mjs` and build output
2. **Feature Questions**: See `RELEASE_NOTES_v2.5.9.md`
3. **Deployment Questions**: See `DEPLOYMENT_GUIDE.md`
4. **Testing Questions**: See `RELEASE_CHECKLIST.md`

## ✅ Success Checklist

- [ ] Builds verified
- [ ] Manual testing completed
- [ ] Chrome store submitted
- [ ] Firefox store submitted
- [ ] Edge store submitted
- [ ] GitHub release published
- [ ] Safari build (if macOS available)

## 🎉 After Deployment

Monitor for 7 days:
- GitHub issues
- Store reviews
- User feedback
- Error reports

---

**Estimated Total Time**: 2-3 hours (excluding store review times)

**Store Review Times**:
- Chrome: 1-3 business days
- Firefox: 1-2 days (often automatic)
- Edge: 1-2 business days
- Safari: 1-2 weeks

**Current Status**: ✅ BUILDS READY → ⚠️ TESTING REQUIRED → 🚀 READY TO DEPLOY

**Questions?** See detailed guides in the documentation files listed above.
