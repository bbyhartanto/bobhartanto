import { readFileSync, writeFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'

export default defineEventHandler(async (event) => {
  setResponseHeaders(event, {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PATCH, OPTIONS, DELETE',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, x-tuyul-token',
  })

  if (event.method === 'OPTIONS') {
    setResponseStatus(event, 204)
    return ''
  }

  const body = await readBody(event)
  const id = body?.id as string

  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing packet ID',
    })
  }

  let updatedPacket: any = null

  function getPayloadTarget(target: any) {
    if (!target) return target
    if (target.payload && typeof target.payload === 'object' && Array.isArray(target.payload.steps)) {
      return target.payload
    }
    if (target.rawPayload && typeof target.rawPayload === 'object' && Array.isArray(target.rawPayload.steps)) {
      return target.rawPayload
    }
    return target
  }

  // 1. Update in-memory packet
  const updatedInMemory = updateMetricPacketById(id, (pkt) => {
    if (!pkt.payload) pkt.payload = {}
    const p = getPayloadTarget(pkt.payload)
    
    // Workflow-level notes
    if (Array.isArray(body.workflowNotes)) {
      p.notes = body.workflowNotes
    }

    // Step-level notes by stepIndex (0-based)
    if (typeof body.stepIndex === 'number' && Array.isArray(body.notes)) {
      if (Array.isArray(p.steps) && p.steps[body.stepIndex]) {
        p.steps[body.stepIndex].notes = body.notes
      }
    }

    // Full steps array replacement (if provided)
    if (Array.isArray(body.steps)) {
      p.steps = body.steps
    }

    updatedPacket = pkt
  })

  // 2. Persist update to disk log file (stream.jsonl)
  const file = join(process.cwd(), '.data', 'tuyul-stream', 'stream.jsonl')
  try {
    if (existsSync(file)) {
      const content = readFileSync(file, 'utf-8')
      const lines = content.trim().split('\n').filter(Boolean)
      const updatedLines = lines.map((line) => {
        try {
          const parsed = JSON.parse(line)
          if (parsed.id === id) {
            if (!parsed.payload) parsed.payload = {}
            const p = getPayloadTarget(parsed.payload)
            if (Array.isArray(body.workflowNotes)) {
              p.notes = body.workflowNotes
            }
            if (typeof body.stepIndex === 'number' && Array.isArray(body.notes)) {
              if (Array.isArray(p.steps) && p.steps[body.stepIndex]) {
                p.steps[body.stepIndex].notes = body.notes
              }
            }
            if (Array.isArray(body.steps)) {
              p.steps = body.steps
            }
            if (!updatedPacket) {
              updatedPacket = parsed
            }
            return JSON.stringify(parsed)
          }
          return line
        } catch {
          return line
        }
      })

      writeFileSync(file, updatedLines.join('\n') + (updatedLines.length ? '\n' : ''))
    }
  } catch (err) {
    console.error('[Tuyul] Failed to update packet in disk log:', err)
  }

  return {
    success: true,
    message: 'Notes updated successfully',
    id,
    updatedInMemory,
    payload: updatedPacket?.payload,
  }
})
