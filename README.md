# DeskFuse Releases

DeskFuse 的公开发行与官网源码。目标仓库为 `GodD6366/deskfuse-release`。

[下载所有版本](https://github.com/GodD6366/deskfuse-release/releases)

## 发布状态

首次发行准备中，目前没有可安装的 DeskFuse Release 或 Cask。
发布流水线会在安装包公开后生成带有真实版本与 SHA-256 的 Cask。

DeskFuse 使用独立应用身份、协议和数据目录，不读取或迁移其他产品的数据。
首次安装需要在各设备上重新授权、配对和配置。安装器不会删除其他产品的数据。

## 安装

macOS 14+，Apple Silicon。下载对应版本的 `DeskFuse-arm64.dmg`，将应用拖入 Applications。每个 Release 保留 `SHA256SUMS`、`release.json` 和 `build-info.json` 供校验与追踪构建。

```sh
brew trust --cask godd6366/deskfuse/deskfuse
brew tap godd6366/deskfuse https://github.com/GodD6366/deskfuse-release
brew install --cask godd6366/deskfuse/deskfuse
```

以上命令在首次发行和仓库切换完成后可用。网站发行地址从
`web/src/config/distribution.json` 读取，由应用源码仓库的发行配置生成。

## 版本与源码

此仓库的版本 tag 仅指向安装说明，不包含应用源码。实际构建的源码 commit 记录于每个 Release 的 `build-info.json`。历史已公开源码仍适用其原有许可；第三方组件保持各自许可。
