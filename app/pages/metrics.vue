<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

definePageMeta({
  layout: false,
})

interface MetricClassification {
  isActionable: boolean
  category: string
  reason: string
}

interface MetricPacket {
  id: string
  receivedAt: string
  timestamp: number
  pageTitle?: string
  pageUrl?: string
  apiUrl?: string
  url?: string
  method?: string
  status?: number
  classification?: MetricClassification
  headers: Record<string, string | string[] | undefined>
  payload: any
}

const packets = ref<MetricPacket[]>([])
const activeTab = ref<'actionable' | 'raw' | 'noise'>('actionable')
const actionableCategoryFilter = ref<string>('ALL')
const selectedPageFilter = ref<string>('ALL')
const searchQuery = ref<string>('')
const autoRefresh = ref(true)
let refreshInterval: any = null

// Initial fetch via SSR
const { data: initialData } = await useAsyncData('metrics-initial', () =>
  $fetch<{
    success: boolean
    total: number
    actionableCount: number
    noiseCount: number
    packets: MetricPacket[]
  }>('/api/metrics/raw')
)

if (initialData.value?.packets) {
  packets.value = initialData.value.packets
}

// Simple JSON syntax colorizer for value highlighting
const colorizeJson = (obj: any): string => {
  if (!obj) return ''
  const str = typeof obj === 'string' ? obj : JSON.stringify(obj, null, 2)
  const escaped = str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')

  return escaped.replace(
    /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
    (match) => {
      let colorClass = 'text-amber-400' // numbers
      if (/^"/.test(match)) {
        if (/:$/.test(match)) {
          colorClass = 'text-slate-400 font-medium' // json keys
        } else {
          colorClass = 'text-emerald-400' // string values
        }
      } else if (/true|false/.test(match)) {
        colorClass = 'text-purple-400 font-semibold' // booleans
      } else if (/null/.test(match)) {
        colorClass = 'text-rose-400 italic' // null
      }
      return `<span class="${colorClass}">${match}</span>`
    }
  )
}

const fetchMetrics = async () => {
  try {
    const res = await $fetch<{
      success: boolean
      total: number
      actionableCount: number
      noiseCount: number
      packets: MetricPacket[]
    }>('/api/metrics/raw')
    if (res && res.packets) {
      packets.value = res.packets
    }
  } catch (err) {
    console.error('Failed to load metrics:', err)
  }
}

const clearMetrics = async () => {
  if (!confirm('Clear recent metrics buffer from display?')) return
  try {
    await $fetch('/api/metrics/raw', { method: 'DELETE' })
    packets.value = []
  } catch (err) {
    console.error('Failed to clear metrics:', err)
  }
}

// Counts
const actionablePackets = computed(() => packets.value.filter(p => p.classification?.isActionable))
const noisePackets = computed(() => packets.value.filter(p => !p.classification?.isActionable))

// Actionable Categories Available
const actionableCategories = computed(() => {
  const cats = new Set<string>()
  for (const p of actionablePackets.value) {
    if (p.classification?.category) {
      cats.add(p.classification.category)
    }
  }
  return Array.from(cats)
})

// Grouped Actionable Metrics
const groupedActionableMetrics = computed(() => {
  let list = actionablePackets.value

  if (actionableCategoryFilter.value !== 'ALL') {
    list = list.filter(p => p.classification?.category === actionableCategoryFilter.value)
  }

  if (searchQuery.value.trim()) {
    const q = searchQuery.value.toLowerCase()
    list = list.filter(p => {
      const url = (p.apiUrl || p.url || '').toLowerCase()
      const title = (p.pageTitle || '').toLowerCase()
      const payload = JSON.stringify(p.payload).toLowerCase()
      return url.includes(q) || title.includes(q) || payload.includes(q)
    })
  }

  const groups: Record<string, { pageTitle: string; pageUrl: string; items: MetricPacket[] }> = {}
  for (const pkt of list) {
    const title = pkt.pageTitle || 'Shopee Seller Centre'
    const pageUrl = pkt.pageUrl || ''
    if (!groups[title]) {
      groups[title] = { pageTitle: title, pageUrl, items: [] }
    }
    if (!groups[title].pageUrl && pageUrl) {
      groups[title].pageUrl = pageUrl
    }
    groups[title].items.push(pkt)
  }

  return Object.values(groups)
})

// Grouped Raw Metrics (All Streams)
const groupedRawMetrics = computed(() => {
  let list = packets.value

  if (selectedPageFilter.value !== 'ALL') {
    list = list.filter(p => (p.pageTitle || 'Shopee Seller Centre') === selectedPageFilter.value)
  }

  if (searchQuery.value.trim()) {
    const q = searchQuery.value.toLowerCase()
    list = list.filter(p => {
      const url = (p.apiUrl || p.url || '').toLowerCase()
      const title = (p.pageTitle || '').toLowerCase()
      const payload = JSON.stringify(p.payload).toLowerCase()
      return url.includes(q) || title.includes(q) || payload.includes(q)
    })
  }

  const groups: Record<string, { pageTitle: string; pageUrl: string; items: MetricPacket[] }> = {}
  for (const pkt of list) {
    const title = pkt.pageTitle || 'Shopee Seller Centre'
    const pageUrl = pkt.pageUrl || ''
    if (!groups[title]) {
      groups[title] = { pageTitle: title, pageUrl, items: [] }
    }
    if (!groups[title].pageUrl && pageUrl) {
      groups[title].pageUrl = pageUrl
    }
    groups[title].items.push(pkt)
  }

  return Object.values(groups)
})

// Grouped Noise Metrics
const groupedNoiseMetrics = computed(() => {
  let list = noisePackets.value
  if (searchQuery.value.trim()) {
    const q = searchQuery.value.toLowerCase()
    list = list.filter(p => {
      const url = (p.apiUrl || p.url || '').toLowerCase()
      const payload = JSON.stringify(p.payload).toLowerCase()
      return url.includes(q) || payload.includes(q)
    })
  }

  const groups: Record<string, { category: string; reason: string; items: MetricPacket[] }> = {}
  for (const pkt of list) {
    const cat = pkt.classification?.category || 'Background Traffic'
    const reason = pkt.classification?.reason || 'Non-business traffic'
    if (!groups[cat]) {
      groups[cat] = { category: cat, reason, items: [] }
    }
    groups[cat].items.push(pkt)
  }

  return Object.values(groups)
})

const uniquePageTitles = computed(() => {
  const titles = new Set<string>()
  for (const pkt of packets.value) {
    titles.add(pkt.pageTitle || 'Shopee Seller Centre')
  }
  return Array.from(titles)
})

const copyToClipboard = (data: any) => {
  navigator.clipboard.writeText(JSON.stringify(data, null, 2))
  alert('JSON copied to clipboard!')
}

onMounted(() => {
  refreshInterval = setInterval(() => {
    if (autoRefresh.value) {
      fetchMetrics()
    }
  }, 1500)
})

onUnmounted(() => {
  if (refreshInterval) clearInterval(refreshInterval)
})
</script>

<template>
  <div class="min-h-screen bg-[#090d13] text-[#c9d1d9] font-mono p-4 md:p-8">
    <!-- Header -->
    <header class="max-w-7xl mx-auto mb-6 border-b border-neutral-800 pb-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div>
        <div class="flex items-center gap-2.5">
          <span class="inline-block w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></span>
          <h1 class="text-lg md:text-xl font-semibold text-white tracking-tight">
            Tuyul Harvester &bull; Metrics Pipeline
          </h1>
        </div>
        <p class="text-xs text-neutral-400 mt-1">
          Target: <code class="text-emerald-400 bg-neutral-900 px-1.5 py-0.5 rounded">POST /api/metrics/raw</code>
        </p>
      </div>

      <!-- Controls -->
      <div class="flex items-center flex-wrap gap-2 text-xs">
        <button
          @click="autoRefresh = !autoRefresh"
          :class="autoRefresh ? 'bg-emerald-950 text-emerald-300 border-emerald-800' : 'bg-neutral-800 text-neutral-400 border-neutral-700'"
          class="px-3 py-1.5 rounded border transition-colors cursor-pointer"
        >
          Auto-refresh: {{ autoRefresh ? 'ON (1.5s)' : 'PAUSED' }}
        </button>

        <button
          @click="clearMetrics"
          class="px-3 py-1.5 rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-300 border border-neutral-700 transition-colors cursor-pointer"
        >
          Clear Memory ({{ packets.length }})
        </button>
      </div>
    </header>

    <!-- Top Primary Tabs -->
    <div class="max-w-7xl mx-auto mb-6">
      <div class="flex items-center gap-2 border-b border-neutral-800 pb-2">
        <!-- Tab 1: Actionable -->
        <button
          @click="activeTab = 'actionable'"
          :class="activeTab === 'actionable' ? 'bg-emerald-600 text-white font-bold' : 'bg-[#161b22] text-neutral-400 hover:text-white border border-neutral-800'"
          class="px-4 py-2 rounded-t-lg text-xs md:text-sm flex items-center gap-2 transition-all cursor-pointer"
        >
          <span>⚡ Actionable Data</span>
          <span
            :class="activeTab === 'actionable' ? 'bg-black/30 text-white' : 'bg-emerald-950 text-emerald-400 border border-emerald-800/60'"
            class="px-2 py-0.5 rounded-full text-xs font-mono font-bold"
          >
            {{ actionablePackets.length }}
          </span>
        </button>

        <!-- Tab 2: Raw Harvest (Full Stream) -->
        <button
          @click="activeTab = 'raw'"
          :class="activeTab === 'raw' ? 'bg-blue-600 text-white font-bold' : 'bg-[#161b22] text-neutral-400 hover:text-white border border-neutral-800'"
          class="px-4 py-2 rounded-t-lg text-xs md:text-sm flex items-center gap-2 transition-all cursor-pointer"
        >
          <span>📦 Raw Harvest (Compare)</span>
          <span
            :class="activeTab === 'raw' ? 'bg-black/30 text-white' : 'bg-neutral-800 text-neutral-300 border border-neutral-700'"
            class="px-2 py-0.5 rounded-full text-xs font-mono"
          >
            {{ packets.length }}
          </span>
        </button>

        <!-- Tab 3: Filtered Noise -->
        <button
          @click="activeTab = 'noise'"
          :class="activeTab === 'noise' ? 'bg-neutral-700 text-white font-bold' : 'bg-[#161b22] text-neutral-400 hover:text-white border border-neutral-800'"
          class="px-4 py-2 rounded-t-lg text-xs md:text-sm flex items-center gap-2 transition-all cursor-pointer"
        >
          <span>🔇 Filtered Noise</span>
          <span class="px-2 py-0.5 rounded-full text-xs font-mono bg-neutral-900 text-neutral-500 border border-neutral-800">
            {{ noisePackets.length }}
          </span>
        </button>
      </div>
    </div>

    <!-- Search Bar & Filters -->
    <div class="max-w-7xl mx-auto mb-6 space-y-3">
      <div class="flex items-center justify-between gap-3 flex-wrap">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Filter by API URL or keyword in JSON payload..."
          class="w-full md:w-96 px-3 py-1.5 bg-[#161b22] border border-neutral-800 rounded text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-blue-500"
        />

        <!-- Value Color Legend -->
        <div class="flex items-center gap-3 px-3 py-1.5 bg-neutral-900/60 rounded border border-neutral-800 text-xs">
          <span class="text-neutral-500 text-[11px]">Values:</span>
          <span class="text-slate-400">"key"</span>
          <span class="text-emerald-400">"string"</span>
          <span class="text-amber-400">123</span>
          <span class="text-purple-400">bool</span>
          <span class="text-rose-400">null</span>
        </div>
      </div>

      <!-- Actionable Sub-category Pills (Tab 1) -->
      <div v-if="activeTab === 'actionable' && actionableCategories.length > 0" class="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
        <span class="text-neutral-500 text-[11px] whitespace-nowrap">Category:</span>
        <button
          @click="actionableCategoryFilter = 'ALL'"
          :class="actionableCategoryFilter === 'ALL' ? 'bg-emerald-700 text-white font-bold' : 'bg-neutral-800/80 text-neutral-300 hover:bg-neutral-700'"
          class="px-2.5 py-1 rounded transition-colors whitespace-nowrap cursor-pointer"
        >
          All Actionable ({{ actionablePackets.length }})
        </button>
        <button
          v-for="cat in actionableCategories"
          :key="cat"
          @click="actionableCategoryFilter = cat"
          :class="actionableCategoryFilter === cat ? 'bg-emerald-700 text-white font-bold' : 'bg-neutral-800/80 text-neutral-300 hover:bg-neutral-700'"
          class="px-2.5 py-1 rounded transition-colors whitespace-nowrap cursor-pointer"
        >
          {{ cat }}
        </button>
      </div>

      <!-- Raw Page Title Filter Pills (Tab 2) -->
      <div v-if="activeTab === 'raw' && uniquePageTitles.length > 0" class="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
        <span class="text-neutral-500 text-[11px] whitespace-nowrap">Filter Page:</span>
        <button
          @click="selectedPageFilter = 'ALL'"
          :class="selectedPageFilter === 'ALL' ? 'bg-blue-600 text-white font-bold' : 'bg-neutral-800/80 text-neutral-300 hover:bg-neutral-700'"
          class="px-2.5 py-1 rounded transition-colors whitespace-nowrap cursor-pointer"
        >
          All Pages ({{ packets.length }})
        </button>
        <button
          v-for="title in uniquePageTitles"
          :key="title"
          @click="selectedPageFilter = title"
          :class="selectedPageFilter === title ? 'bg-blue-600 text-white font-bold' : 'bg-neutral-800/80 text-neutral-300 hover:bg-neutral-700'"
          class="px-2.5 py-1 rounded transition-colors whitespace-nowrap cursor-pointer max-w-[280px] truncate"
          :title="title"
        >
          {{ title }}
        </button>
      </div>
    </div>

    <!-- Main Content Area -->
    <main class="max-w-7xl mx-auto">
      <!-- ================= TAB 1: ACTIONABLE DATA ================= -->
      <div v-if="activeTab === 'actionable'">
        <div v-if="groupedActionableMetrics.length === 0" class="border border-dashed border-emerald-900/60 rounded-xl p-16 text-center text-neutral-400">
          <p class="text-white text-base font-semibold mb-2">No actionable metrics captured yet.</p>
          <p class="text-xs text-neutral-500 max-w-md mx-auto">
            Actionable data includes Flash Sale lists, Ads/Promotion performance, orders, inventory, and shop health metrics. Navigate Shopee Seller Centre to harvest.
          </p>
        </div>

        <div v-else class="space-y-8">
          <section
            v-for="group in groupedActionableMetrics"
            :key="group.pageTitle"
            class="border border-emerald-900/50 bg-[#0c1219] rounded-xl overflow-hidden shadow-lg"
          >
            <!-- Group Header -->
            <div class="bg-[#101824] px-5 py-3.5 border-b border-emerald-900/40 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
              <div>
                <div class="flex items-center gap-2.5">
                  <span class="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
                  <h2 class="text-sm md:text-base font-semibold text-white tracking-tight">
                    {{ group.pageTitle }}
                  </h2>
                  <span class="text-[11px] bg-emerald-950 text-emerald-300 border border-emerald-800/60 px-2 py-0.5 rounded font-mono font-bold">
                    {{ group.items.length }} {{ group.items.length === 1 ? 'call' : 'calls' }}
                  </span>
                </div>
                <p v-if="group.pageUrl" class="text-[11px] text-neutral-400 mt-1 font-mono truncate max-w-3xl">
                  Page URL: <a :href="group.pageUrl" target="_blank" class="text-emerald-400 hover:underline">{{ group.pageUrl }}</a>
                </p>
              </div>
            </div>

            <!-- Packets List -->
            <div class="p-4 space-y-4">
              <div
                v-for="(pkt, idx) in group.items"
                :key="pkt.id"
                class="border border-neutral-800 bg-[#141b24] rounded-lg overflow-hidden text-xs"
              >
                <!-- Packet Meta Bar -->
                <div class="bg-[#18212d] px-4 py-2.5 flex flex-wrap items-center justify-between gap-2 border-b border-neutral-800">
                  <div class="flex items-center gap-2.5 flex-wrap">
                    <span class="font-bold text-neutral-300">#{{ group.items.length - idx }}</span>
                    <span class="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-950 text-emerald-300 border border-emerald-700">
                      {{ pkt.classification?.category || 'Actionable' }}
                    </span>
                    <span class="text-white font-mono break-all text-[12px]">
                      {{ pkt.apiUrl || pkt.url || 'Internal API' }}
                    </span>
                  </div>

                  <div class="flex items-center gap-3 text-neutral-400 text-[11px]">
                    <span class="text-emerald-400 font-semibold">{{ pkt.status || 200 }} OK</span>
                    <span>{{ pkt.receivedAt }}</span>
                    <button
                      @click="copyToClipboard(pkt.payload)"
                      class="text-neutral-400 hover:text-white px-2 py-0.5 bg-neutral-800 hover:bg-neutral-700 rounded transition-colors cursor-pointer"
                    >
                      Copy JSON
                    </button>
                  </div>
                </div>

                <!-- Highlighted Body -->
                <div class="p-4 overflow-x-auto text-[13px] leading-relaxed bg-[#0b0f15]">
                  <pre class="font-mono whitespace-pre" v-html="colorizeJson(pkt.payload)"></pre>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

      <!-- ================= TAB 2: RAW HARVEST (COMPARE VIEW) ================= -->
      <div v-if="activeTab === 'raw'">
        <div v-if="groupedRawMetrics.length === 0" class="border border-dashed border-neutral-800 rounded-xl p-16 text-center text-neutral-400">
          <p class="text-white text-base font-semibold mb-2">No raw streams collected yet.</p>
        </div>

        <div v-else class="space-y-8">
          <section
            v-for="group in groupedRawMetrics"
            :key="group.pageTitle"
            class="border border-neutral-800 bg-[#0e131b] rounded-xl overflow-hidden shadow-lg"
          >
            <!-- Group Header -->
            <div class="bg-[#141a24] px-5 py-3.5 border-b border-neutral-800 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
              <div>
                <div class="flex items-center gap-2.5">
                  <span class="w-2 h-2 rounded-full bg-blue-400"></span>
                  <h2 class="text-sm md:text-base font-semibold text-white tracking-tight">
                    {{ group.pageTitle }}
                  </h2>
                  <span class="text-[11px] bg-blue-950 text-blue-300 border border-blue-800/50 px-2 py-0.5 rounded font-mono">
                    {{ group.items.length }} {{ group.items.length === 1 ? 'call' : 'calls' }}
                  </span>
                </div>
                <p v-if="group.pageUrl" class="text-[11px] text-neutral-400 mt-1 font-mono truncate max-w-3xl">
                  Page URL: <a :href="group.pageUrl" target="_blank" class="text-blue-400 hover:underline">{{ group.pageUrl }}</a>
                </p>
              </div>
            </div>

            <!-- Packets List -->
            <div class="p-4 space-y-4">
              <div
                v-for="(pkt, idx) in group.items"
                :key="pkt.id"
                class="border border-neutral-800/80 bg-[#161b22] rounded-lg overflow-hidden text-xs"
              >
                <!-- Packet Meta Bar -->
                <div class="bg-[#1c222b] px-4 py-2.5 flex flex-wrap items-center justify-between gap-2 border-b border-neutral-800/80">
                  <div class="flex items-center gap-2.5 flex-wrap">
                    <span class="font-bold text-neutral-300">#{{ group.items.length - idx }}</span>
                    <span
                      :class="pkt.classification?.isActionable ? 'bg-emerald-950 text-emerald-300 border-emerald-700' : 'bg-neutral-800 text-neutral-400 border-neutral-700'"
                      class="px-1.5 py-0.5 rounded text-[10px] font-bold border"
                    >
                      {{ pkt.classification?.category || (pkt.method || 'GET') }}
                    </span>
                    <span class="text-white font-mono break-all text-[12px]">
                      {{ pkt.apiUrl || pkt.url || 'Internal API' }}
                    </span>
                  </div>

                  <div class="flex items-center gap-3 text-neutral-400 text-[11px]">
                    <span class="text-emerald-400 font-semibold">{{ pkt.status || 200 }} OK</span>
                    <span>{{ pkt.receivedAt }}</span>
                    <button
                      @click="copyToClipboard(pkt.payload)"
                      class="text-neutral-400 hover:text-white px-2 py-0.5 bg-neutral-800 hover:bg-neutral-700 rounded transition-colors cursor-pointer"
                    >
                      Copy JSON
                    </button>
                  </div>
                </div>

                <!-- Highlighted Body -->
                <div class="p-4 overflow-x-auto text-[13px] leading-relaxed bg-[#0d1117]">
                  <pre class="font-mono whitespace-pre" v-html="colorizeJson(pkt.payload)"></pre>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

      <!-- ================= TAB 3: FILTERED NOISE ================= -->
      <div v-if="activeTab === 'noise'">
        <div class="mb-4 bg-neutral-900/60 border border-neutral-800 rounded-lg p-3 text-xs text-neutral-400 flex items-center justify-between">
          <p>
            These are background calls filtered from the Actionable tab (e.g. Chatbot telemetry, UI translation strings, feature flags). Kept for reference.
          </p>
          <span class="font-mono text-neutral-300 font-bold">{{ noisePackets.length }} total calls</span>
        </div>

        <div class="space-y-6">
          <section
            v-for="group in groupedNoiseMetrics"
            :key="group.category"
            class="border border-neutral-800 bg-[#0d1117] rounded-xl overflow-hidden"
          >
            <!-- Group Header -->
            <div class="bg-[#161b22] px-4 py-3 border-b border-neutral-800 flex items-center justify-between">
              <div>
                <span class="text-xs font-bold text-neutral-300 font-mono">{{ group.category }}</span>
                <span class="text-[11px] text-neutral-500 ml-2">({{ group.reason }})</span>
              </div>
              <span class="text-xs text-neutral-400 font-mono">{{ group.items.length }} calls</span>
            </div>

            <!-- List -->
            <div class="p-3 divide-y divide-neutral-800/60 max-h-96 overflow-y-auto">
              <div
                v-for="pkt in group.items"
                :key="pkt.id"
                class="py-2 flex items-center justify-between text-xs font-mono"
              >
                <div class="truncate max-w-2xl text-neutral-400">
                  <span class="text-neutral-500 text-[11px] mr-2">[{{ pkt.receivedAt }}]</span>
                  <span class="text-neutral-300">{{ pkt.apiUrl || pkt.url }}</span>
                </div>
                <button
                  @click="copyToClipboard(pkt.payload)"
                  class="text-[11px] text-neutral-500 hover:text-white px-2 py-0.5 rounded bg-neutral-800 cursor-pointer"
                >
                  Copy
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  </div>
</template>
