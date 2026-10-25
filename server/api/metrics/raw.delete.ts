import { readFileSync, writeFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'

export default defineEventHandler(async (event) => {
  setResponseHeaders(event, {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, DELETE',
  })

  const query = getQuery(event)
  const id = query.id as string
  const file = join(process.cwd(), '.data', 'tuyul-stream', 'stream.jsonl')

  // 1. Delete individual workflow by ID
  if (id) {
    const deletedInMemory = deleteMetricPacketById(id)

    // Remove from disk log file
    try {
      if (existsSync(file)) {
        const content = readFileSync(file, 'utf-8')
        const lines = content.trim().split('\n').filter(Boolean)
        const filtered = lines.filter(line => {
          try {
            const parsed = JSON.parse(line)
            return parsed.id !== id
          } catch {
            return true
          }
        })
        writeFileSync(file, filtered.join('\n') + (filtered.length ? '\n' : ''))
      }
    } catch (err) {
      console.error('[Tuyul] Failed to remove packet from disk log:', err)
    }

    return {
      success: true,
      message: `Workflow packet ${id} removed successfully`,
      id,
      deletedInMemory,
    }
  }

  // 2. Clear only workflow recordings (if ?only=workflows)
  if (query.only === 'workflows') {
    const memory = getMetricPackets()
    for (let i = memory.length - 1; i >= 0; i--) {
      if (isWorkflow(memory[i])) {
        memory.splice(i, 1)
      }
    }

    try {
      if (existsSync(file)) {
        const content = readFileSync(file, 'utf-8')
        const lines = content.trim().split('\n').filter(Boolean)
        const filtered = lines.filter(line => {
          try {
            const parsed = JSON.parse(line)
            return !isWorkflow(parsed)
          } catch {
            return true
          }
        })
        writeFileSync(file, filtered.join('\n') + (filtered.length ? '\n' : ''))
      }
    } catch (err) {
      console.error('[Tuyul] Failed to clear workflows from disk:', err)
    }

    return {
      success: true,
      message: 'All recorded workflows cleared',
    }
  }

  // 3. Clear ALL data (both memory buffer and disk file)
  clearMetricPackets()
  try {
    if (existsSync(file)) {
      writeFileSync(file, '')
    }
  } catch (err) {
    console.error('[Tuyul] Failed to clear disk log:', err)
  }

  return {
    success: true,
    message: 'All metrics and workflow data cleared from memory and disk',
  }
})

function isWorkflow(p: any): boolean {
  if (!p) return false
  const apiUrl = p.apiUrl || p.url || ''
  const payload = p.payload || {}
  const rawPayload = payload.rawPayload || {}
  return Boolean(
    p.source === 'agent_workflow_recorder' ||
    apiUrl.includes('agent://workflow') ||
    payload.type === 'WORKFLOW_RECORDING' ||
    rawPayload.type === 'WORKFLOW_RECORDING' ||
    (payload.workflowName && payload.steps) ||
    (rawPayload.workflowName && rawPayload.steps)
  )
}
