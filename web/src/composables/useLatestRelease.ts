import { onMounted, ref, type Ref } from 'vue'

export interface ReleaseAsset {
  name: string
  url: string
}

export interface LatestRelease {
  tag: string
  assets: ReleaseAsset[]
}

const API = 'https://api.github.com/repos/GodD6366/deskfuse-release/releases?per_page=5'

let cached: Promise<LatestRelease | null> | null = null

function fetchLatest(): Promise<LatestRelease | null> {
  return fetch(API, { headers: { Accept: 'application/vnd.github+json' } })
    .then((r) => (r.ok ? r.json() : Promise.reject(new Error(String(r.status)))))
    .then((releases: any[]) => {
      if (!Array.isArray(releases) || releases.length === 0) return null
      // 全部为 prerelease 时 /releases/latest 会 404，这里按创建时间取最新一条非草稿
      const latest = releases.find((r) => !r?.draft)
      if (!latest) return null
      return {
        tag: latest.tag_name || '',
        assets: (latest.assets || []).map((a: any) => ({
          name: a.name,
          url: a.browser_download_url,
        })),
      }
    })
    .catch(() => null)
}

/** 共享最新 release：页面内多处使用也只请求一次，失败时保持静态回退 */
export function useLatestRelease() {
  const release: Ref<LatestRelease | null> = ref(null)
  onMounted(async () => {
    cached ??= fetchLatest()
    release.value = await cached
  })
  return { release }
}

/** 取某个资产的下载地址；拿不到时回退到给定链接 */
export function assetUrl(release: LatestRelease | null, name: string, fallback: string): string {
  const hit = release?.assets.find((a) => a.name === name)
  return hit ? hit.url : fallback
}

export const FALLBACK_RELEASE_TAG = 'v0.4.0'
