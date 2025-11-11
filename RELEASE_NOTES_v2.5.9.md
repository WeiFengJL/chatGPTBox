# ChatGPTBox v2.5.9 Release Notes

## Overview

This is a maintenance release that includes three key improvements to enhance user experience and configuration flexibility. The version number remains unchanged at v2.5.9.

## New Features & Improvements

### 1. Enhanced Custom Model Configuration for API Mode

We've significantly improved the custom model configuration interface for API modes. Users can now configure custom models with more granular control:

- **Custom Name Field**: Set a unique identifier for your custom model configuration
- **Model ID Field**: Specify the exact model identifier/name to be used in API calls
- **Display Name Field**: Define how the model appears in the UI selection dropdown

This enhancement provides better flexibility for users working with custom API endpoints and allows for clearer distinction between different custom model configurations.

**Impact**: Users can now better organize and identify their custom API models, especially when working with multiple custom endpoints or self-hosted models.

### 2. Streamlined General Settings

Removed the default custom model option from the API mode section in general configuration settings. This change:

- Reduces confusion in the settings interface
- Simplifies the initial setup process
- Encourages users to configure custom models directly in the appropriate API mode settings where more detailed options are available

**Impact**: Cleaner settings UI with less redundancy, making it easier for users to find and configure the options they need.

### 3. Hide Sidebar Functionality in Chat Windows

Added a new option to hide the sidebar across all chat window types:

- **Independent Conversation Window**: Toggle sidebar visibility in standalone windows
- **Independent Conversation Page**: Hide/show sidebar in full-page chat mode
- **Side Panel**: Control sidebar display in browser side panel mode

The sidebar visibility state is now persistent across sessions, remembering your preference.

**Impact**: Users can maximize their chat area and customize their workspace according to their preferences. This is especially useful for users on smaller screens or those who prefer a minimalist interface.

## Build Information

- **Version**: 2.5.9 (unchanged)
- **Build Date**: November 11, 2024
- **Platforms**: 
  - ✅ Chromium (Chrome, Edge, Opera, Brave, etc.) - `chromium.zip`
  - ✅ Firefox - `firefox.zip`
  - ⚠️ Safari - Requires macOS build environment

## Installation & Updates

### Chromium-based Browsers
1. Download `chromium.zip` from the release assets
2. Extract the archive
3. Go to `chrome://extensions/` (or equivalent for your browser)
4. Enable "Developer mode"
5. Click "Load unpacked" and select the extracted `chromium` folder

### Firefox
1. Download `firefox.zip` from the release assets
2. Go to `about:debugging#/runtime/this-firefox`
3. Click "Load Temporary Add-on"
4. Select the `manifest.json` file inside the extracted `firefox` folder

### Safari (macOS only)
Safari build requires macOS with Xcode installed. Please run:
```bash
npm run build:safari
```

## Technical Details

### Manifest Versions
- Chromium: Manifest V3
- Firefox: Manifest V2

### Build Artifacts
- `chromium.zip` (~1.8 MB) - Full featured Chromium build
- `firefox.zip` (~1.8 MB) - Full featured Firefox build
- `chromium-without-katex-and-tiktoken.zip` (~471 KB) - Minimal build without math rendering
- `firefox-without-katex-and-tiktoken.zip` (~471 KB) - Minimal Firefox build

## For Developers

### Changes in This Release

1. **API Mode Configuration** (`src/popup/` or similar):
   - Enhanced custom model input fields with separate name, ID, and display fields
   - Improved model configuration UI/UX

2. **Settings Refactoring** (`src/config/`):
   - Removed redundant default custom model setting from general configuration
   - Streamlined settings structure

3. **UI Enhancements** (`src/pages/IndependentPanel/` and related):
   - Added sidebar toggle functionality
   - Implemented persistent state for sidebar visibility
   - Applied changes across all chat window types

### Testing Recommendations

- Test custom model configuration with various API providers
- Verify sidebar toggle works correctly in all three window types
- Confirm sidebar state persists across browser sessions
- Validate that general settings no longer show the removed custom model option

## Known Issues

None identified in this release.

## Feedback & Support

If you encounter any issues or have suggestions:
- Open an issue on GitHub: https://github.com/josStorer/chatGPTBox
- Check existing issues for similar problems

---

## 中文版本发布说明

## 概述

这是一个维护版本，包含三项关键改进，旨在增强用户体验和配置灵活性。版本号保持为 v2.5.9 不变。

## 新功能与改进

### 1. API 模式自定义模型配置增强

我们显著改进了 API 模式的自定义模型配置界面。用户现在可以更精细地配置自定义模型：

- **自定义名称字段**：为您的自定义模型配置设置唯一标识符
- **模型 ID 字段**：指定 API 调用中使用的确切模型标识符/名称
- **显示名称字段**：定义模型在 UI 选择下拉菜单中的显示方式

此增强功能为使用自定义 API 端点的用户提供了更好的灵活性，并允许更清晰地区分不同的自定义模型配置。

**影响**：用户现在可以更好地组织和识别其自定义 API 模型，特别是在使用多个自定义端点或自托管模型时。

### 2. 精简常规设置

从常规配置设置中的 API 模式部分删除了默认自定义模型选项。此更改：

- 减少设置界面中的混淆
- 简化初始设置过程
- 鼓励用户直接在适当的 API 模式设置中配置自定义模型，那里提供更详细的选项

**影响**：更清晰的设置 UI，减少冗余，使用户更容易找到和配置所需的选项。

### 3. 聊天窗口隐藏侧边栏功能

在所有聊天窗口类型中添加了隐藏侧边栏的新选项：

- **独立对话窗口**：在独立窗口中切换侧边栏可见性
- **独立对话页面**：在全页聊天模式中隐藏/显示侧边栏
- **侧边栏**：在浏览器侧边栏模式中控制侧边栏显示

侧边栏可见性状态现在在会话之间持久保存，记住您的偏好。

**影响**：用户可以最大化聊天区域，并根据自己的偏好自定义工作空间。这对于使用较小屏幕的用户或喜欢简约界面的用户特别有用。

## 构建信息

- **版本**：2.5.9（未更改）
- **构建日期**：2024年11月11日
- **平台**：
  - ✅ Chromium（Chrome、Edge、Opera、Brave 等）- `chromium.zip`
  - ✅ Firefox - `firefox.zip`
  - ⚠️ Safari - 需要 macOS 构建环境

## 安装与更新

### 基于 Chromium 的浏览器
1. 从发布资源中下载 `chromium.zip`
2. 解压存档
3. 转到 `chrome://extensions/`（或您的浏览器的等效地址）
4. 启用"开发者模式"
5. 点击"加载已解压的扩展程序"并选择解压的 `chromium` 文件夹

### Firefox
1. 从发布资源中下载 `firefox.zip`
2. 转到 `about:debugging#/runtime/this-firefox`
3. 点击"加载临时附加组件"
4. 选择解压的 `firefox` 文件夹中的 `manifest.json` 文件

### Safari（仅限 macOS）
Safari 构建需要安装了 Xcode 的 macOS。请运行：
```bash
npm run build:safari
```

## 技术细节

### 清单版本
- Chromium：清单 V3
- Firefox：清单 V2

### 构建产物
- `chromium.zip`（约 1.8 MB）- 功能完整的 Chromium 构建
- `firefox.zip`（约 1.8 MB）- 功能完整的 Firefox 构建
- `chromium-without-katex-and-tiktoken.zip`（约 471 KB）- 不含数学渲染的最小构建
- `firefox-without-katex-and-tiktoken.zip`（约 471 KB）- 最小 Firefox 构建

## 开发者信息

### 此版本中的更改

1. **API 模式配置**（`src/popup/` 或类似位置）：
   - 增强的自定义模型输入字段，包含独立的名称、ID 和显示字段
   - 改进的模型配置 UI/UX

2. **设置重构**（`src/config/`）：
   - 从常规配置中删除了冗余的默认自定义模型设置
   - 精简了设置结构

3. **UI 增强**（`src/pages/IndependentPanel/` 及相关）：
   - 添加了侧边栏切换功能
   - 实现了侧边栏可见性的持久状态
   - 在所有聊天窗口类型中应用了更改

### 测试建议

- 使用各种 API 提供商测试自定义模型配置
- 验证侧边栏切换在所有三种窗口类型中正常工作
- 确认侧边栏状态在浏览器会话之间持久保存
- 验证常规设置不再显示已删除的自定义模型选项

## 已知问题

此版本中未发现问题。

## 反馈与支持

如果您遇到任何问题或有建议：
- 在 GitHub 上提交 issue：https://github.com/josStorer/chatGPTBox
- 检查现有 issue 是否有类似问题

---

**Note**: This release maintains version 2.5.9 - no version bump was performed as requested.
