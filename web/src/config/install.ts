/**
 * Homebrew 安装命令的唯一来源，Hero 命令行与安装卡片共用。
 *
 * tap 与 cask 名称随仓库改名同步；改名前的老 tap `godd6366/unidesk`
 * 仍可通过其远端重定向继续安装。
 */
const TAP = 'godd6366/deskfuse'
const REPO = 'https://github.com/GodD6366/deskfuse-release'

export const HOMEBREW_ONE_LINE = `brew trust --cask ${TAP}/deskfuse && brew tap ${TAP} ${REPO} && brew install --cask ${TAP}/deskfuse`

export const HOMEBREW_SCRIPT = [
  `brew trust --cask ${TAP}/deskfuse`,
  `brew tap ${TAP} \\
  ${REPO}`,
  `brew install --cask ${TAP}/deskfuse`,
].join('\n')

export const HOMEBREW_UPGRADE = 'brew update && brew upgrade --cask deskfuse'
