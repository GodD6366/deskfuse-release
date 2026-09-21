/**
 * Refresh site/api/releases.json from the public GitHub Releases API.
 *
 * The DeskFuse updater and this site both read api.github.com today. That host
 * is not reachable from every network, so the site republishes the same release
 * list on its own domain:
 *
 *   https://deskfuse.godd.cc/api/releases.json
 *
 * The payload keeps the GitHub Releases API shape so a client can swap the URL
 * without touching its parser. Vite copies the committed baseline from
 * web/public/api/releases.json first; this script overwrites it only after a
 * successful fetch, so a rate limit or a GitHub outage can never take the
 * endpoint offline or make it empty.
 */
import { readFile, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const scriptDirectory = dirname(fileURLToPath(import.meta.url))
const output = resolve(scriptDirectory, '../../site/api/releases.json')
const repository = process.env.DESKFUSE_RELEASE_REPOSITORY ?? 'GodD6366/deskfuse-release'
const releaseLimit = Number.parseInt(process.env.DESKFUSE_FEED_LIMIT ?? '30', 10)
// Overridable so the feed can be pointed at a mirror, and so the script can be
// exercised against a stub without touching the public API.
const apiBase = (process.env.DESKFUSE_FEED_API ?? 'https://api.github.com').replace(/\/+$/, '')
const sumsName = 'SHA256SUMS'

function headers(extra = {}) {
  const values = {
    Accept: 'application/vnd.github+json',
    'User-Agent': 'deskfuse-site',
    'X-GitHub-Api-Version': '2022-11-28',
    ...extra,
  }
  if (process.env.GITHUB_TOKEN) {
    values.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`
  }
  return values
}

async function fetchText(url) {
  const response = await fetch(url, { headers: headers() })
  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText} for ${url}`)
  }
  return response.text()
}

/** `sha256  file` lines, as written by scripts/release.py. */
function parseSums(text) {
  const sums = new Map()
  for (const line of text.split('\n')) {
    const match = /^([a-f0-9]{64})\s+\*?(.+?)\s*$/.exec(line)
    if (match) {
      sums.set(match[2], match[1])
    }
  }
  return sums
}

function normalize(release, sums) {
  return {
    tag_name: release.tag_name,
    name: release.name ?? '',
    draft: Boolean(release.draft),
    prerelease: Boolean(release.prerelease),
    published_at: release.published_at ?? null,
    created_at: release.created_at ?? null,
    html_url: release.html_url ?? '',
    assets: (release.assets ?? []).map((asset) => {
      const normalized = {
        name: asset.name,
        size: asset.size ?? 0,
        state: asset.state ?? '',
        browser_download_url: asset.browser_download_url ?? '',
      }
      // GitHub's own payload carries no checksum; the newest release gets one
      // so a client can verify a DMG without a second request.
      if (sums?.has(asset.name)) {
        normalized.sha256 = sums.get(asset.name)
      }
      return normalized
    }),
  }
}

/** The newest release that is public and actually installable. */
function newestInstallable(releases) {
  return releases.find(
    (release) =>
      !release.draft &&
      release.published_at &&
      release.assets?.some((asset) => asset.name === sumsName && asset.state === 'uploaded'),
  )
}

async function buildFeed() {
  const releases = JSON.parse(
    await fetchText(`${apiBase}/repos/${repository}/releases?per_page=100`),
  )
  if (!Array.isArray(releases)) {
    throw new Error('release list is malformed')
  }
  // An authenticated call also returns drafts; they must never reach the feed.
  const published = releases.filter((release) => !release?.draft)
  if (published.length === 0) {
    throw new Error('release list is empty')
  }
  const page = published.slice(0, releaseLimit)
  const newest = newestInstallable(page)
  let sums = null
  if (newest) {
    const sumsUrl = newest.assets.find((asset) => asset.name === sumsName).browser_download_url
    try {
      sums = parseSums(await fetchText(sumsUrl))
    } catch (error) {
      console.warn(`warning: skipping checksums for ${newest.tag_name}: ${error.message}`)
    }
  }
  return {
    feed: page.map((release) =>
      normalize(release, sums && release.tag_name === newest?.tag_name ? sums : null),
    ),
    newest: newest?.tag_name ?? 'n/a',
  }
}

async function main() {
  let feed
  try {
    feed = await buildFeed()
  } catch (error) {
    let existing = ''
    try {
      existing = await readFile(output, 'utf8')
    } catch {
      throw new Error(`release feed is unavailable and no baseline is published: ${error.message}`)
    }
    const published = JSON.parse(existing)
    console.warn(
      `warning: keeping the committed release feed (${published.length} releases): ${error.message}`,
    )
    return
  }
  await writeFile(output, `${JSON.stringify(feed.feed, null, 2)}\n`)
  console.log(`release feed: ${feed.feed.length} releases, newest ${feed.newest} -> ${output}`)
}

await main()
