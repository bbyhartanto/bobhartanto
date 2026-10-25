export interface MetricClassification {
  isActionable: boolean
  category: string
  reason: string
}

export interface MetricPacket {
  id: string
  receivedAt: string
  timestamp: number
  pageTitle: string
  pageUrl: string
  apiUrl: string
  method: string
  status: number
  classification?: MetricClassification
  headers: Record<string, string | string[] | undefined>
  payload: any
  source?: string
}

export function classifyMetric(url: string, payload: any): MetricClassification {
  const urlLower = (url || '').toLowerCase()

  // 1. Definite Noise / Telemetry / Support
  const isChat = /webchat|cschat|chatbot|avatar|casetracking/.test(urlLower)
  if (isChat) {
    return { isActionable: false, category: 'Chat & Support', reason: 'Internal chat/support system ping' }
  }

  const isTelemetry = /dem\.shopee|report\.chatbot|patronus|shpsec|loading_track|last_active|tags\/web-performance|track_config/.test(urlLower)
  if (isTelemetry) {
    return { isActionable: false, category: 'Telemetry & Tracking', reason: 'Browser performance & analytics beacon' }
  }

  const isUiConfig = /feature_toggle|get_toggle|manifest|remote-component|abtest|sidebar|unread_count|onboarding|feedback|unified-popup|notification\/poll|deo\.shopeemobile|tsp\/init/.test(urlLower)
  if (isUiConfig) {
    return { isActionable: false, category: 'UI Config & Feature Flags', reason: 'Shopee UI rendering, i18n & feature toggles' }
  }

  // 2. Actionable Business Endpoints
  if (/flash_sale|promotion|voucher|discount|pas|ads|campaign|keyword/.test(urlLower)) {
    return { isActionable: true, category: 'Flash Sale & Marketing', reason: 'Campaign, flash sale & ads performance data' }
  }

  if (/order|revenue|income|finance|settlement|escrow|wallet|transaction/.test(urlLower)) {
    return { isActionable: true, category: 'Orders & Finance', reason: 'Financial & order transaction records' }
  }

  if (/product|item|inventory|stock|price|sku|category/.test(urlLower)) {
    return { isActionable: true, category: 'Products & Inventory', reason: 'Product catalog & inventory metrics' }
  }

  if (/shop_info|selleraccount|tier|rating|performance/.test(urlLower)) {
    return { isActionable: true, category: 'Shop Health & Profile', reason: 'Shop ratings, tier status & seller profile' }
  }

  return { isActionable: false, category: 'Background Traffic', reason: 'Unclassified background network request' }
}

// In-memory buffer (keeps last 500 packets)
const MAX_PACKETS = 500
const memoryPackets: MetricPacket[] = []

export const addMetricPacket = (packet: MetricPacket) => {
  if (!packet.classification) {
    packet.classification = classifyMetric(packet.apiUrl, packet.payload)
  }
  memoryPackets.unshift(packet)
  if (memoryPackets.length > MAX_PACKETS) {
    memoryPackets.pop()
  }
}

export const getMetricPackets = (): MetricPacket[] => {
  return memoryPackets
}

export const clearMetricPackets = () => {
  memoryPackets.length = 0
}

export const deleteMetricPacketById = (id: string): boolean => {
  const idx = memoryPackets.findIndex(p => p.id === id)
  if (idx !== -1) {
    memoryPackets.splice(idx, 1)
    return true
  }
  return false
}

export const updateMetricPacketById = (id: string, mutator: (packet: MetricPacket) => void): boolean => {
  const packet = memoryPackets.find(p => p.id === id)
  if (!packet) return false
  mutator(packet)
  return true
}
