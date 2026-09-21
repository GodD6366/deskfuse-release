/**
 * 安装方式开关。
 *
 * 当前站点只提供 DMG 直接下载：Homebrew 方案已从页面隐藏。
 * 重新上架 Homebrew 时，把 HOMEBREW_ENABLED 改成 true，
 * 并恢复两个组件里被移除的 Homebrew 区块（Hero 命令行 + 安装卡片，见 git 历史）。
 *
 * 对应的命令（tap 已随仓库改名更新，当前站点不再渲染，故不进入打包产物）：
 *   brew trust --cask godd6366/deskfuse/deskfuse
 *   brew tap godd6366/deskfuse https://github.com/GodD6366/deskfuse-release
 *   brew install --cask godd6366/deskfuse/deskfuse
 *   brew update && brew upgrade --cask deskfuse
 */
export const HOMEBREW_ENABLED = false
