<script setup lang="ts">
import { computed } from 'vue'
import { useLatestRelease, assetUrl, FALLBACK_RELEASE_TAG } from '../composables/useLatestRelease'
import { useCopy } from '../composables/useCopy'

const { release } = useLatestRelease()
const { copied, copy } = useCopy()

const BREW_CMD = `brew trust --cask godd6366/unidesk/unidesk
brew tap godd6366/unidesk \\
  https://github.com/GodD6366/unidesk-release
brew install --cask godd6366/unidesk/unidesk`
const BREW_ONE_LINE = 'brew trust --cask godd6366/unidesk/unidesk && brew tap godd6366/unidesk https://github.com/GodD6366/unidesk-release && brew install --cask godd6366/unidesk/unidesk'

const rel = (name: string) =>
  `https://github.com/GodD6366/unidesk-release/releases/download/${FALLBACK_RELEASE_TAG}/${name}`
const arm64Url = computed(() => assetUrl(release.value, 'uniDesk-arm64.dmg', rel('uniDesk-arm64.dmg')))
const intelUrl = computed(() => assetUrl(release.value, 'uniDesk-x86_64.dmg', rel('uniDesk-x86_64.dmg')))
const checksumsUrl = computed(() => assetUrl(release.value, 'SHA256SUMS', rel('SHA256SUMS')))

const platforms: [string, string, string][] = [
  ['macOS 14+ · Apple Silicon', '主平台', 'ok'],
  ['macOS 26+', '原生 Liquid Glass', 'ok'],
  ['Windows x64', '实验性离线安装器', 'warn'],
  ['Intel Mac', 'x86_64 DMG', 'ok'],
  ['Linux', '不在首发范围', 'muted'],
]
</script>

<template>
  <section class="section" id="install">
    <div class="section-inner">
      <div class="section-head" v-reveal>
        <p class="eyebrow">安装</p>
        <h2>两种方式，一分钟上手。</h2>
      </div>
      <div class="install-grid">
        <div class="install-card" v-reveal>
          <h3>Homebrew <span class="tag">推荐</span></h3>
          <p>macOS 14+ · Apple Silicon，一条命令装好，随 brew 更新。</p>
          <div class="code-block">
            <button class="copy-btn" :class="{ copied }" @click="copy(BREW_ONE_LINE)">
              {{ copied ? '已复制 ✓' : '复制' }}
            </button>
            <pre><code>{{ BREW_CMD }}</code></pre>
          </div>
          <p class="install-note">升级：<code>brew update && brew upgrade --cask unidesk</code></p>
        </div>

        <div class="install-card" v-reveal>
          <h3>手动安装 DMG</h3>
          <p>选择你的 Mac 芯片版本直接下载，拖入「应用程序」即可。</p>
          <ol class="steps">
            <li><a :href="arm64Url">Apple Silicon（arm64）DMG</a></li>
            <li><a :href="intelUrl">Intel（x86_64）DMG</a></li>
            <li><a :href="checksumsUrl">下载 SHA256SUMS 校验文件</a></li>
            <li>运行 <code>shasum -a 256 -c SHA256SUMS</code> 校验完整性</li>
            <li>打开 DMG，把 uniDesk.app 拖进「应用程序」</li>
            <li>按提示允许局域网访问；键鼠共享另需辅助功能授权</li>
          </ol>
          <p class="install-note">公开预发行经 Developer ID 签名并公证，可直接打开。</p>
        </div>
      </div>

      <div class="platforms" v-reveal>
        <div v-for="[name, status, kind] in platforms" :key="name" class="platform">
          <span class="platform-name">{{ name }}</span>
          <span class="platform-status" :class="kind">{{ status }}</span>
        </div>
      </div>
    </div>
  </section>
</template>
