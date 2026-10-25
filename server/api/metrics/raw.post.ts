import { appendFileSync, mkdirSync } from 'node:fs'
import { join } from 'node:path'

export default defineEventHandler(async (event) => {
  // 1. CORS headers
  setResponseHeaders(event, {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, DELETE',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, x-tuyul-token, x-session-token',
  })

  // Handle preflight
  if (event.method === 'OPTIONS') {
    setResponseStatus(event, 204)
    return ''
  }

  // 2. Read headers & body
  const headers = getHeaders(event)
  const body = await readBody(event)

  const apiUrl = body?.url || ''
  const payload = body?.rawPayload !== undefined 
    ? body.rawPayload 
    : (body?.payload !== undefined ? body.payload : body)
  const classification = classifyMetric(apiUrl, payload)

  const packet: MetricPacket = {
    id: Math.random().toString(36).substring(2, 9),
    receivedAt: new Date().toLocaleTimeString(),
    timestamp: Date.now(),
    pageTitle: body?.pageTitle || 'Shopee Seller Centre',
    pageUrl: body?.pageUrl || '',
    apiUrl,
    method: body?.method || 'GET',
    status: body?.status || 200,
    classification,
    headers: {
      authorization: headers['authorization'],
      'x-tuyul-token': headers['x-tuyul-token'],
      'content-type': headers['content-type'],
    },
    payload,
    source: body?.source,
  }

  // 3. Store in memory for instant display in /metrics
  addMetricPacket(packet)

  // 4. Persist to disk log file
  try {
    const dir = join(process.cwd(), '.data', 'tuyul-stream')
    mkdirSync(dir, { recursive: true })
    const file = join(dir, 'stream.jsonl')
    appendFileSync(file, JSON.stringify(packet) + '\n')
  } catch (err) {
    console.error('[Tuyul Harvester] Failed to write log:', err)
  }

  return {
    success: true,
    message: 'Raw metric ingested successfully',
    id: packet.id,
    isActionable: classification.isActionable,
    category: classification.category,
    pageTitle: packet.pageTitle,
    receivedAt: packet.receivedAt,
  }
})
