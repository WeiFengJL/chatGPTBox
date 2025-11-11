# ChatGPTBox v2.5.9 - Feature Enhancements

## 🎉 What's New

### 1. 🎨 Enhanced API Custom Model Configuration
- Added separate input fields for **Custom Name**, **Model ID**, and **Display Name**
- Better organization and identification of custom API models
- Improved flexibility for custom endpoints and self-hosted models

### 2. 🧹 Streamlined Settings Interface  
- Removed redundant default custom model option from general configuration
- Cleaner, more intuitive settings UI
- Reduced configuration complexity

### 3. 👁️ Hide Sidebar Feature
- Added sidebar toggle across all chat window types:
  - Independent Conversation Window
  - Independent Conversation Page  
  - Side Panel
- Persistent state - remembers your preference across sessions
- Maximize chat area for better focus

## 📦 Download

Choose the appropriate build for your browser:

- **Chromium** (Chrome, Edge, Opera, Brave, etc.): `chromium.zip` 
- **Firefox**: `firefox.zip`
- **Safari**: Requires macOS build (see installation guide)

## 📥 Installation

### Chromium Browsers
1. Download and extract `chromium.zip`
2. Go to `chrome://extensions/`
3. Enable "Developer mode"
4. Click "Load unpacked" → Select the `chromium` folder

### Firefox
1. Download and extract `firefox.zip`
2. Go to `about:debugging#/runtime/this-firefox`
3. Click "Load Temporary Add-on"
4. Select `manifest.json` from the `firefox` folder

### Safari (macOS only)
Requires Xcode. Build with:
```bash
npm run build:safari
```

---

## 🇨🇳 中文说明

### 新功能

1. **API 模式自定义模型配置增强**
   - 新增独立的自定义名称、模型 ID、显示名称输入框
   - 更好地管理自定义 API 模型

2. **精简常规设置**  
   - 删除常规配置中冗余的 API 默认自定义模型选项
   - 更清晰的设置界面

3. **聊天窗口隐藏侧边栏**
   - 在所有聊天窗口类型中添加侧边栏切换功能
   - 状态持久化保存
   - 最大化聊天区域

### 下载与安装

- **Chromium 浏览器**：下载 `chromium.zip`
- **Firefox 浏览器**：下载 `firefox.zip`  
- **Safari 浏览器**：需要 macOS 环境构建

---

**Full Release Notes**: [RELEASE_NOTES_v2.5.9.md](./RELEASE_NOTES_v2.5.9.md)

**Version**: 2.5.9 (no version bump)  
**Build Date**: November 11, 2024
