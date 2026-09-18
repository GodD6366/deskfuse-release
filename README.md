# uniDesk Releases

uniDesk 的公开安装包仓库。源码在私有仓库维护，此仓库仅提供安装说明、Homebrew cask 和版本安装包。

[下载所有版本](https://github.com/GodD6366/unidesk-release/releases)

## 安装

macOS 14+，Apple Silicon。下载对应版本的 `uniDesk-arm64.dmg`，将应用拖入 Applications。每个 Release 保留 `SHA256SUMS`、`release.json` 和 `build-info.json` 供校验与追踪构建。

```sh
brew trust --cask godd6366/unidesk/unidesk
brew tap godd6366/unidesk https://github.com/GodD6366/unidesk-release
brew install --cask godd6366/unidesk/unidesk
```

已有 Homebrew tap 请更新远端地址：

```sh
git -C "$(brew --repository godd6366/unidesk)" remote set-url origin https://github.com/GodD6366/unidesk-release
brew update
```

旧版应用使用原仓库更新地址；该仓库转为私有后，旧版需从本页手动安装未来提供的新版本，才能使用新的应用内更新地址。历史安装包按原始字节保留，没有重新签名或替换。

## 版本与源码

此仓库的版本 tag 仅指向安装说明，不包含应用源码。实际构建的源码 commit 记录于每个 Release 的 `build-info.json`。历史已公开源码仍适用其原有许可；第三方组件保持各自许可。
