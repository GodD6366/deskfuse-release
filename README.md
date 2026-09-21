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

## 更新检查接口

软件默认向 GitHub 检查更新：版本列表来自 `api.github.com`，元数据文件来自 release 资产 CDN。这两个域名在部分网络下不可达、被限流，或偶发 504，因此站点在自定义域名下重发同一份数据：

```sh
curl -fsSL https://deskfuse.godd.cc/api/releases.json
curl -fsSL https://deskfuse.godd.cc/api/releases/v0.4.0/SHA256SUMS
curl -fsSL https://deskfuse.godd.cc/api/releases/v0.4.0/release.json
curl -fsSL https://deskfuse.godd.cc/api/releases/v0.4.0/build-info.json
```

版本列表字段与 GitHub 一致（`tag_name`、`draft`、`prerelease`、`published_at`、`assets[].name/size/state/browser_download_url`），并额外为最新版本安装包附带 `sha256`；`api/releases/<tag>/` 下是与 GitHub 资产逐字节相同的元数据，软件校验 SHA-256 时仍然成立。

这些文件在每次 Pages 构建时由 `web/scripts/update-feed.mjs` 刷新，另有每日定时重跑和 release 发布后的即时重跑；拉取失败时保留 `web/public/api/` 中已提交的快照，接口不会因限流或 CDN 抖动而消失或变空。安装包本身不镜像，软件仍从 GitHub 下载 DMG 并由 `SHA256SUMS`、Developer ID 签名把关。

## 版本与源码

此仓库的版本 tag 仅指向安装说明，不包含应用源码。实际构建的源码 commit 记录于每个 Release 的 `build-info.json`。历史已公开源码仍适用其原有许可；第三方组件保持各自许可。
