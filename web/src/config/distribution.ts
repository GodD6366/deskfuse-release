import config from './distribution.json'

export const RELEASE_REPOSITORY = config.release_repository
export const REPOSITORY_URL = `https://github.com/${RELEASE_REPOSITORY}`
export const RELEASES_URL = `${REPOSITORY_URL}/releases`
export const FALLBACK_RELEASE_TAG = config.fallback_release_tag
export const ASSETS = config.assets
export const fallbackUrl = (_name: string) => RELEASES_URL

const cask = `${config.homebrew_tap}/${config.cask_token}`
const commands = [
  `brew trust --cask ${cask}`,
  `brew tap ${config.homebrew_tap} ${REPOSITORY_URL}`,
  `brew install --cask ${cask}`,
]
export const BREW_CMD = commands.join('\n')
export const BREW_ONE_LINE = commands.join(' && ')
export const BREW_UPGRADE = `brew update && brew upgrade --cask ${cask}`
