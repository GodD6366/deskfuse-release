<script setup lang="ts">
import { computed } from 'vue'
import { useLatestRelease, assetUrl, FALLBACK_RELEASE_TAG } from '../composables/useLatestRelease'
import { HOMEBREW_ENABLED } from '../config/install'

const { release } = useLatestRelease()

const rel = (name: string) =>
  `https://github.com/GodD6366/deskfuse-release/releases/download/${FALLBACK_RELEASE_TAG}/${name}`
const arm64Url = computed(() => assetUrl(release.value, 'DeskFuse-arm64.dmg', rel('DeskFuse-arm64.dmg')))
const intelUrl = computed(() => assetUrl(release.value, 'DeskFuse-x86_64.dmg', rel('DeskFuse-x86_64.dmg')))
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
        <h2>{{ HOMEBREW_ENABLED ? '两种方式，一分钟上手。' : '下载 DMG，一分钟上手。' }}</h2>
      </div>
      <div class="install-grid" :class="{ 'install-grid-single': !HOMEBREW_ENABLED }">
        <div class="install-card" v-reveal>
          <h3>下载 DMG 安装</h3>
          <p>选择你的 Mac 芯片版本直接下载，拖入「应用程序」即可。</p>
          <ol class="steps">
            <li><a :href="arm64Url">Apple Silicon（arm64）DMG</a></li>
            <li><a :href="intelUrl">Intel（x86_64）DMG</a></li>
            <li><a :href="checksumsUrl">下载 SHA256SUMS 校验文件</a></li>
            <li>运行 <code>shasum -a 256 -c SHA256SUMS</code> 校验完整性</li>
            <li>打开 DMG，把 DeskFuse.app 拖进「应用程序」</li>
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
