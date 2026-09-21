# DeskFuse Releases

DeskFuse 的公开安装包仓库。源码在私有仓库维护，此仓库仅提供安装说明、Homebrew cask 和版本安装包。

[下载所有版本](https://github.com/GodD6366/deskfuse-release/releases)

> 原 `GodD6366/unidesk-release` 已改名为 `GodD6366/deskfuse-release`（仓库 ID 不变）。旧地址、旧下载链接与旧 API 路径由 GitHub 自动重定向，原有 Homebrew tap 无需更改远端。

## DeskFuse 安装

macOS 14+，Apple Silicon。最新预发行为 **v0.4.0**，经 Developer ID 签名并公证。

下载 `DeskFuse-arm64.dmg`，将应用拖入 Applications。每个 Release 保留 `SHA256SUMS`、`release.json` 和 `build-info.json` 供校验与追踪构建。

```sh
brew trust --cask godd6366/deskfuse/deskfuse
brew tap godd6366/deskfuse https://github.com/GodD6366/deskfuse-release
brew install --cask godd6366/deskfuse/deskfuse
```

已有 Homebrew tap 请更新远端地址：

```sh
git -C "$(brew --repository godd6366/unidesk)" remote set-url origin https://github.com/GodD6366/deskfuse-release
brew update
```

## 迁移说明

DeskFuse 采用全新的应用身份和协议，不兼容 uniDesk。安装后需要重新授权、重新配对设备和配置设置，旧剪贴板历史不会自动迁移。请在各台设备都准备好后退出 uniDesk，再使用 DeskFuse；原有数据不会因本提示而被删除。

## uniDesk 历史版本

uniDesk 已停止后续功能更新，最后一个版本为 v0.3.5。历史安装包按原始字节保留，没有重新签名或替换。

```sh
brew trust --cask godd6366/unidesk/unidesk
brew tap godd6366/unidesk https://github.com/GodD6366/deskfuse-release
brew install --cask godd6366/unidesk/unidesk
```

旧版应用使用原仓库更新地址；该仓库转为私有后，旧版需从本页手动安装新版本，才能使用新的应用内更新地址。

## 版本与源码

此仓库的版本 tag 仅指向安装说明，不包含应用源码。实际构建的源码 commit 记录于每个 Release 的 `build-info.json`。历史已公开源码仍适用其原有许可；第三方组件保持各自许可。
