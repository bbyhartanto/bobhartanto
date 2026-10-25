import { readFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'

function isCatalogPacket(p: any): boolean {
  if (!p) return false
  const apiUrl = p.apiUrl || p.url || ''
  const payload = p.payload || {}
  return Boolean(
    p.source === 'shopee_product_harvester' ||
    apiUrl.includes('shopee://catalog') ||
    payload.type === 'PRODUCT_CATALOG' ||
    (Array.isArray(payload.products) && payload.products.length > 0)
  )
}

function isWorkflowPacket(p: any): boolean {
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

function getWorkflowData(pkt: any) {
  let payload = pkt.payload || {}
  if (payload.rawPayload && typeof payload.rawPayload === 'object') {
    payload = { ...payload, ...payload.rawPayload }
  } else if (payload.payload && typeof payload.payload === 'object') {
    payload = { ...payload, ...payload.payload }
  }
  const steps = Array.isArray(payload.steps) ? payload.steps : []
  const name = payload.workflowName || pkt.pageTitle || 'Workflow Recording'
  return { payload, steps, name }
}

export default defineEventHandler(async (event) => {
  setResponseHeaders(event, {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PATCH, OPTIONS, DELETE',
  })

  let packets = getMetricPackets()

  // If memory store is empty (e.g. server restart), load latest 500 lines from disk
  if (packets.length === 0) {
    try {
      const file = join(process.cwd(), '.data', 'tuyul-stream', 'stream.jsonl')
      if (existsSync(file)) {
        const content = readFileSync(file, 'utf-8')
        const lines = content.trim().split('\n').filter(Boolean)
        const recentLines = lines.slice(-500)
        for (let i = recentLines.length - 1; i >= 0; i--) {
          try {
            const parsed = JSON.parse(recentLines[i])
            if (!parsed.classification) {
              parsed.classification = classifyMetric(parsed.apiUrl || parsed.url || '', parsed.payload)
            }
            packets.push(parsed)
          } catch {
            // ignore malformed line
          }
        }
      }
    } catch (err) {
      console.error('[Tuyul] Error reading history from disk:', err)
    }
  } else {
    // Ensure every memory packet has classification
    for (const pkt of packets) {
      if (!pkt.classification) {
        pkt.classification = classifyMetric(pkt.apiUrl || '', pkt.payload)
      }
    }
  }

  const headers = getHeaders(event)
  const query = getQuery(event)
  const acceptsHtml = (headers['accept']?.includes('text/html') || query.view === 'html') && query.format !== 'json'

  // Jika diakses via browser (HTML request), tampilkan UI rekaman workflow & kontrol aksi
  if (acceptsHtml) {
    setResponseHeaders(event, {
      'Content-Type': 'text/html; charset=utf-8',
    })

    const workflowPackets = packets.filter(isWorkflowPacket)
    const catalogPackets = packets.filter(isCatalogPacket)

    const renderCatalogCard = (cat: any) => {
      const payload = cat.payload || {}
      const products = Array.isArray(payload.products) ? payload.products : []
      const total = products.length

      const productsHtml = products.map((prod: any, idx: number) => {
        const variants = Array.isArray(prod.variants) ? prod.variants : []
        const varList = variants.map((v: any) => 
          `<span style="background:#1e293b; color:#94a3b8; padding:2px 6px; border-radius:4px; font-size:10.5px; border:1px solid #334155;">${escapeHtml(v.name)}: Rp ${(v.normal_price || 0).toLocaleString('id-ID')} (stok: ${v.stock || 0})</span>`
        ).join(' ')

        return `
          <div style="background:var(--step-bg); border:1px solid var(--step-border); border-radius:8px; padding:10px 14px; display:flex; flex-direction:column; gap:6px;">
            <div style="display:flex; justify-content:space-between; align-items:flex-start; gap:8px;">
              <div style="font-weight:600; color:#ffffff; font-size:12.5px;">
                #${idx + 1} &bull; ${escapeHtml(prod.name)}
              </div>
              <div style="font-size:11px; color:#38bdf8; font-weight:700; white-space:nowrap;">
                Rp ${(prod.price || 0).toLocaleString('id-ID')}
              </div>
            </div>
            <div style="font-size:11px; color:#64748b; display:flex; gap:12px; flex-wrap:wrap;">
              <span>Product ID: <code>${escapeHtml(String(prod.product_id))}</code></span>
              <span>Total Varian: <strong>${prod.total_variants || variants.length}</strong></span>
              <span>Stok: <strong>${prod.stock || 0}</strong></span>
              <span>Image: <em>[Placeholder]</em></span>
            </div>
            ${varList ? `<div style="display:flex; gap:4px; flex-wrap:wrap; margin-top:2px;">${varList}</div>` : ''}
          </div>
        `
      }).join('')

      return `
        <div class="workflow-container" id="wf-${escapeHtml(cat.id)}" style="border-left: 3px solid #10b981;">
          <div class="workflow-header">
            <div class="workflow-title-wrap">
              <span class="workflow-icon">📦</span>
              <div>
                <h3 class="workflow-title">Shopee Product Catalog (${total} Produk)</h3>
                <span class="workflow-subtitle">Tercatat: ${escapeHtml(cat.receivedAt)} &bull; ID: <code>${escapeHtml(cat.id)}</code></span>
              </div>
            </div>
            <div class="workflow-stats">
              <span class="badge badge-steps" style="background:#dcfce7; color:#15803d; border-color:#86efac;">${total} Produk</span>
              <button 
                type="button" 
                class="btn-delete" 
                title="Hapus katalog ini" 
                data-id="${escapeHtml(cat.id)}" 
                data-name="Katalog ${total} Produk"
                onclick="handleDeleteBtn(this)">
                🗑️ Hapus
              </button>
            </div>
          </div>

          <div class="workflow-info-bar">
            <div><strong>Halaman Asal:</strong> <a href="${escapeHtml(cat.pageUrl)}" target="_blank">${escapeHtml(cat.pageUrl)}</a></div>
            <div><strong>Data:</strong> ${total} produk diekstrak (ID, Nama, Gambar Placeholder, Varian, Harga Normal)</div>
          </div>

          <div class="steps-wrapper">
            <div class="steps-wrapper-title">Daftar Produk yang Berhasil Dipanen:</div>
            <div class="steps-grid">
              ${productsHtml || `<div style="color:#64748b;">Tidak ada produk</div>`}
            </div>
          </div>

          <div class="workflow-card-actions">
            <button 
              type="button" 
              class="btn-action-delete" 
              data-id="${escapeHtml(cat.id)}" 
              data-name="Katalog ${total} Produk"
              onclick="handleDeleteBtn(this)">
              🗑️ Hapus Katalog Ini
            </button>
            <button 
              type="button" 
              class="btn-action-copy" 
              onclick="copyWorkflowJson(this, '${escapeHtml(cat.id)}')">
              📋 Salin JSON Katalog
            </button>
            <button 
              type="button" 
              class="btn-action-download" 
              onclick="downloadWorkflowJson('${escapeHtml(cat.id)}', 'Shopee_Catalog_${total}_Items')">
              💾 Unduh JSON
            </button>
          </div>

          <details class="json-details">
            <summary>Lihat Raw JSON Katalog</summary>
            <pre class="json-dump" id="json-dump-${escapeHtml(cat.id)}">${escapeHtml(JSON.stringify(payload, null, 2))}</pre>
          </details>

          <script id="json-${escapeHtml(cat.id)}" type="application/json">${JSON.stringify(payload)}</script>
        </div>
      `
    }

    const renderStepDiv = (step: any, stepIdx: number, pktId: string) => {
      const target = step.target || {}
      const targetLabel = target.text || target.ariaLabel || target.placeholder || step.value || target.id || '-'
      const isNewTab = Boolean(step.isNewTab)
      const actionClass = step.action === 'CLICK' ? 'action-click' : 'action-input'
      const notes: string[] = Array.isArray(step.notes) ? step.notes : []

      const notesListHtml = notes.map((note, nIdx) => `
        <div class="note-item" data-note-idx="${nIdx}">
          <span class="note-bullet">📌</span>
          <span class="note-text">${escapeHtml(note)}</span>
          <button type="button" class="btn-remove-note" title="Hapus note ini" onclick="removeStepNote('${escapeHtml(pktId)}', ${stepIdx}, ${nIdx})">✕</button>
        </div>
      `).join('')

      return `
        <div class="step-card" id="step-${escapeHtml(pktId)}-${stepIdx}">
          <div class="step-main-row">
            <div class="step-badge">Langkah #${step.step}</div>
            <div class="action-pill ${actionClass}">${step.action}</div>
            <div class="tag-badge">&lt;${escapeHtml(target.tag || 'el')}&gt;</div>
            <div class="step-target">
              <span class="target-title">"${escapeHtml(targetLabel)}"</span>
              ${step.value ? `<span class="value-highlight"> &bull; Value: "${escapeHtml(step.value)}"</span>` : ''}
            </div>
            ${isNewTab ? '<div class="new-tab-badge">🌐 Tab Baru</div>' : ''}
            <div class="step-meta">
              ${target.id ? `<span>ID: <code>${escapeHtml(target.id)}</code></span>` : ''}
              ${target.name ? `<span>Name: <code>${escapeHtml(target.name)}</code></span>` : ''}
              ${target.ariaLabel ? `<span>Aria: <code>${escapeHtml(target.ariaLabel)}</code></span>` : ''}
            </div>
          </div>

          <!-- Contextual Notes for LLM (fillable notes array) -->
          <div class="step-notes-container">
            <div class="step-notes-header">
              <span class="step-notes-title">🧠 Contextual Notes for LLM (<code>notes: [ ... ]</code>)</span>
              <span class="notes-count-badge" id="notes-badge-${escapeHtml(pktId)}-${stepIdx}">${notes.length} catatan</span>
            </div>

            <div class="notes-list" id="notes-list-${escapeHtml(pktId)}-${stepIdx}">
              ${notesListHtml || '<div class="no-notes-hint">Belum ada catatan kontekstual untuk langkah ini. Tambahkan di bawah agar LLM memahami intensi & alur respons API.</div>'}
            </div>

            <div class="add-note-box">
              <div class="note-quick-tags">
                <span class="quick-tag-label">Template Cepat:</span>
                <button type="button" class="quick-tag" onclick="insertNoteTemplate('${escapeHtml(pktId)}', ${stepIdx}, 'ACTION: Klik \\'${escapeHtml(targetLabel)}\\'')">⚡ ACTION</button>
                <button type="button" class="quick-tag" onclick="insertNoteTemplate('${escapeHtml(pktId)}', ${stepIdx}, 'WAIT FOR NETWORK: inject.js menangkap respons internal Shopee (misal: /api/.../list) dengan payload metadata')">🌐 WAIT FOR NETWORK</button>
                <button type="button" class="quick-tag" onclick="insertNoteTemplate('${escapeHtml(pktId)}', ${stepIdx}, 'SELECT & FILTER: Agent memfilter item berdasarkan instruksi (misal: stok > 10)')">🔍 SELECT & FILTER</button>
                <button type="button" class="quick-tag" onclick="insertNoteTemplate('${escapeHtml(pktId)}', ${stepIdx}, 'DOM TARGETING: Agent menargetkan elemen menggunakan atribut spesifik (item_id/class)')">🎯 DOM TARGETING</button>
                <button type="button" class="quick-tag" onclick="insertNoteTemplate('${escapeHtml(pktId)}', ${stepIdx}, 'METADATA INTERACTION: Menghitung nilai, mengisi harga, dan menggeser toggle')">⚙️ METADATA INTERACTION</button>
              </div>
              <div class="note-input-row">
                <textarea 
                  id="note-input-${escapeHtml(pktId)}-${stepIdx}" 
                  class="note-textarea" 
                  placeholder="Ketik konteks untuk LLM (misal: '2. WAIT FOR NETWORK: tangkap endpoint /api/v3/product/list lalu ambil item_id...')..." 
                  rows="2"></textarea>
                <button 
                  type="button" 
                  class="btn-add-note" 
                  onclick="addStepNote('${escapeHtml(pktId)}', ${stepIdx})">
                  ➕ Tambah Note
                </button>
              </div>
            </div>
          </div>
        </div>
      `
    }

    const renderWorkflowCard = (pkt: any, index: number) => {
      const { payload, steps, name } = getWorkflowData(pkt)
      const stepsHtml = steps.length > 0
        ? steps.map((s, idx) => renderStepDiv(s, idx, pkt.id)).join('')
        : '<div class="empty-steps">Belum ada langkah dalam sesi ini</div>'

      const workflowNotes: string[] = Array.isArray(payload.notes) ? payload.notes : []
      const wfNotesListHtml = workflowNotes.map((note, nIdx) => `
        <div class="note-item" data-wf-note-idx="${nIdx}">
          <span class="note-bullet">🎯</span>
          <span class="note-text">${escapeHtml(note)}</span>
          <button type="button" class="btn-remove-note" title="Hapus note ini" onclick="removeWorkflowNote('${escapeHtml(pkt.id)}', ${nIdx})">✕</button>
        </div>
      `).join('')

      return `
        <div class="workflow-container" id="wf-${escapeHtml(pkt.id)}">
          <div class="workflow-header">
            <div class="workflow-title-wrap">
              <span class="workflow-icon">🤖</span>
              <div>
                <h3 class="workflow-title">${escapeHtml(name)}</h3>
                <span class="workflow-subtitle">Tercatat: ${escapeHtml(pkt.receivedAt || payload.recordedAt || '-')} &bull; ID: <code>${escapeHtml(pkt.id)}</code></span>
              </div>
            </div>
            <div class="workflow-stats">
              ${payload.multiTab ? '<span class="multi-tab-pill">🌐 Multi-Tab Attached</span>' : ''}
              <span class="count-pill">${steps.length} Langkah</span>
              <button 
                type="button" 
                class="btn-delete" 
                title="Hapus rekaman workflow ini" 
                data-id="${escapeHtml(pkt.id)}" 
                data-name="${escapeHtml(name)}"
                onclick="handleDeleteBtn(this)">
                🗑️ Hapus
              </button>
            </div>
          </div>

          <div class="workflow-info-bar">
            <div><strong>URL Asal:</strong> <a href="${escapeHtml(pkt.pageUrl || payload.pageUrl || '#')}" target="_blank" rel="noopener noreferrer">${escapeHtml(pkt.pageUrl || payload.pageUrl || '-')}</a></div>
            <div><strong>Judul Halaman:</strong> ${escapeHtml(pkt.pageTitle || payload.pageTitle || '-')}</div>
          </div>

          <!-- Overall Workflow Context / Instructions for LLM -->
          <div class="wf-global-notes-container">
            <div class="step-notes-header">
              <span class="step-notes-title">📋 Global Workflow Context & Instructions (<code>workflow.notes: [ ... ]</code>)</span>
              <span class="notes-count-badge" id="wf-notes-badge-${escapeHtml(pkt.id)}">${workflowNotes.length} instruksi global</span>
            </div>
            <div class="notes-list" id="wf-notes-list-${escapeHtml(pkt.id)}">
              ${wfNotesListHtml || '<div class="no-notes-hint">Belum ada instruksi global untuk workflow ini. Tambahkan tujuan/prekondisi untuk memandu eksekusi LLM.</div>'}
            </div>
            <div class="add-note-box">
              <div class="note-input-row">
                <input 
                  type="text" 
                  id="wf-note-input-${escapeHtml(pkt.id)}" 
                  class="note-textarea note-input-single" 
                  placeholder="Tambahkan instruksi global untuk LLM (misal: 'Tugas: Set Flash Sale untuk produk berstok > 10 dengan diskon 15%')..." />
                <button 
                  type="button" 
                  class="btn-add-note" 
                  onclick="addWorkflowNote('${escapeHtml(pkt.id)}')">
                  ➕ Tambah Instruksi Global
                </button>
              </div>
            </div>
          </div>

          <!-- Container untuk masing-masing step (contained divs) -->
          <div class="steps-wrapper">
            <div class="steps-wrapper-title">Rincian Langkah Eksekusi (Contained Divs dengan Contextual Notes):</div>
            <div class="steps-grid">
              ${stepsHtml}
            </div>
          </div>

          <!-- Bottom Action Toolbar -->
          <div class="workflow-card-actions">
            <button 
              type="button" 
              class="btn-action-delete" 
              title="Hapus seluruh sesi workflow ini"
              data-id="${escapeHtml(pkt.id)}" 
              data-name="${escapeHtml(name)}"
              onclick="handleDeleteBtn(this)">
              🗑️ Hapus Workflow Ini
            </button>
            <button 
              type="button" 
              class="btn-action-copy" 
              onclick="copyWorkflowJson(this, '${escapeHtml(pkt.id)}')">
              📋 Salin JSON (Lengkap dengan Notes)
            </button>
            <button 
              type="button" 
              class="btn-action-download" 
              onclick="downloadWorkflowJson('${escapeHtml(pkt.id)}', '${escapeHtml(name)}')">
              💾 Unduh JSON
            </button>
          </div>

          <details class="json-details">
            <summary>Lihat Raw JSON Payload (Real-time with Notes)</summary>
            <pre class="json-dump" id="json-dump-${escapeHtml(pkt.id)}">${escapeHtml(JSON.stringify(payload, null, 2))}</pre>
          </details>

          <!-- Hidden JSON container for fast and safe copy/download -->
          <script id="json-${escapeHtml(pkt.id)}" type="application/json">${JSON.stringify(payload)}</script>
        </div>
      `
    }

    const catalogsHtml = catalogPackets.length > 0
      ? catalogPackets.map(c => renderCatalogCard(c)).join('')
      : ''

    const workflowsHtml = workflowPackets.length > 0
      ? workflowPackets.map((wf, idx) => renderWorkflowCard(wf, idx)).join('')
      : `
        <div class="empty-state" id="empty-state-notice">
          <div class="empty-icon">📁</div>
          <h3>Belum Ada Workflow yang Direkam</h3>
          <p>Lakukan aksi di Shopee Seller Centre menggunakan ekstensi <strong>Tuyul Shopee</strong> & klik <strong>"🔴 Ajari Workflow"</strong> lalu <strong>"💾 Simpan & Kirim"</strong>.</p>
        </div>
      `

    return `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Tuyul Shopee - Recorded Workflows with LLM Notes (/api/metrics/raw)</title>
  <style>
    :root {
      --bg: #090d13;
      --card-bg: #0e131b;
      --card-border: #1f2937;
      --step-bg: #131922;
      --step-border: #2d3748;
      --text: #e2e8f0;
      --text-muted: #94a3b8;
      --accent: #38bdf8;
      --danger: #ef4444;
      --danger-dark: #dc2626;
      --shopee: #ee4d2d;
      --note-bg: #0b1118;
      --note-border: #1e293b;
      --tag-bg: #1e293b;
      --tag-hover: #334155;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      background: var(--bg);
      color: var(--text);
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, monospace;
      font-size: 13px;
      line-height: 1.5;
      padding: 24px;
      max-width: 1040px;
      margin: 0 auto;
    }
    header {
      border-bottom: 1px solid var(--card-border);
      padding-bottom: 16px;
      margin-bottom: 24px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 12px;
    }
    .brand h1 {
      font-size: 20px;
      font-weight: 700;
      color: #ffffff;
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .brand p {
      font-size: 12px;
      color: var(--text-muted);
      margin-top: 4px;
      font-family: monospace;
    }
    .nav-actions {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
      align-items: center;
    }
    .nav-actions a, .nav-actions button {
      padding: 7px 13px;
      border-radius: 6px;
      font-size: 12px;
      text-decoration: none;
      font-weight: 600;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      cursor: pointer;
      font-family: inherit;
      transition: all 0.18s ease;
      border: 1px solid transparent;
    }
    .btn-metrics {
      background: #1e293b;
      color: #93c5fd;
      border-color: #334155;
    }
    .btn-metrics:hover {
      background: #334155;
      color: #ffffff;
      transform: translateY(-1px);
    }
    .btn-clear-wf {
      background: rgba(239, 68, 68, 0.15);
      color: #fca5a5;
      border-color: rgba(239, 68, 68, 0.4);
    }
    .btn-clear-wf:hover {
      background: var(--danger);
      color: #ffffff;
      border-color: var(--danger);
      box-shadow: 0 2px 10px rgba(239, 68, 68, 0.35);
      transform: translateY(-1px);
    }
    .btn-clear-all {
      background: #181414;
      color: #9ca3af;
      border-color: #374151;
    }
    .btn-clear-all:hover {
      background: #262020;
      color: #fca5a5;
      border-color: #ef4444;
    }
    .btn-json {
      background: #0f172a;
      color: #cbd5e1;
      border-color: #334155;
      font-family: monospace;
    }
    .btn-json:hover {
      background: #1e293b;
      color: #ffffff;
    }
    .section-title {
      font-size: 14px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      color: #94a3b8;
      margin-bottom: 14px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
    }
    .workflow-container {
      background: var(--card-bg);
      border: 1px solid var(--card-border);
      border-radius: 12px;
      padding: 18px 20px;
      margin-bottom: 24px;
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.25);
      transition: all 0.25s ease;
    }
    .workflow-container:hover {
      border-color: #334155;
    }
    .workflow-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 12px;
      margin-bottom: 14px;
    }
    .workflow-title-wrap {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .workflow-icon {
      font-size: 22px;
      background: #1e293b;
      width: 42px;
      height: 42px;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1px solid #334155;
    }
    .workflow-title {
      font-size: 16px;
      font-weight: 700;
      color: #ffffff;
    }
    .workflow-subtitle {
      font-size: 11px;
      color: var(--text-muted);
    }
    .workflow-stats {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .count-pill {
      background: #0369a1;
      color: #e0f2fe;
      padding: 4px 12px;
      border-radius: 9999px;
      font-size: 11.5px;
      font-weight: 700;
      border: 1px solid #0284c7;
    }
    .multi-tab-pill {
      background: #1e3a8a;
      color: #bfdbfe;
      padding: 4px 12px;
      border-radius: 9999px;
      font-size: 11.5px;
      font-weight: 600;
      border: 1px solid #3b82f6;
    }
    .btn-delete {
      background: rgba(239, 68, 68, 0.15);
      color: #fca5a5;
      border: 1px solid rgba(239, 68, 68, 0.35);
      border-radius: 9999px;
      padding: 4px 12px;
      font-size: 11.5px;
      font-weight: 700;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 5px;
      transition: all 0.18s ease;
      font-family: inherit;
    }
    .btn-delete:hover {
      background: var(--danger);
      color: #ffffff;
      border-color: var(--danger);
      box-shadow: 0 2px 8px rgba(239, 68, 68, 0.35);
      transform: translateY(-1px);
    }
    .workflow-info-bar {
      background: #090d13;
      border: 1px solid var(--card-border);
      border-radius: 8px;
      padding: 10px 14px;
      font-size: 11.5px;
      margin-bottom: 16px;
      color: var(--text-muted);
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
    .workflow-info-bar a {
      color: var(--accent);
      text-decoration: none;
      word-break: break-all;
    }
    .workflow-info-bar a:hover {
      text-decoration: underline;
    }
    .workflow-info-bar strong {
      color: var(--text);
    }

    /* Global Workflow Notes */
    .wf-global-notes-container {
      background: #0a111a;
      border: 1px solid #1e293b;
      border-left: 3px solid #38bdf8;
      border-radius: 8px;
      padding: 12px 14px;
      margin-bottom: 18px;
    }

    .steps-wrapper-title {
      font-size: 12px;
      font-weight: 700;
      color: #cbd5e1;
      margin-bottom: 10px;
    }
    .steps-grid {
      display: flex;
      flex-direction: column;
      gap: 14px;
    }
    .step-card {
      background: var(--step-bg);
      border: 1px solid var(--step-border);
      border-radius: 10px;
      padding: 14px 16px;
      display: flex;
      flex-direction: column;
      gap: 12px;
      transition: border-color 0.15s ease;
    }
    .step-card:hover {
      border-color: #4b5563;
    }
    .step-main-row {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: 10px;
    }
    .step-badge {
      font-weight: 800;
      color: #94a3b8;
      font-size: 12px;
      min-width: 80px;
    }
    .action-pill {
      font-weight: 700;
      font-size: 11px;
      padding: 2px 8px;
      border-radius: 4px;
    }
    .action-click {
      background: #1e3a8a;
      color: #93c5fd;
      border: 1px solid #2563eb;
    }
    .action-input {
      background: #312e81;
      color: #c7d2fe;
      border: 1px solid #4f46e5;
    }
    .tag-badge {
      font-family: monospace;
      color: #a78bfa;
      font-size: 11px;
      background: #1e1b4b;
      padding: 2px 6px;
      border-radius: 4px;
    }
    .step-target {
      flex: 1;
      min-width: 200px;
      font-size: 13px;
    }
    .target-title {
      font-weight: 600;
      color: #ffffff;
    }
    .value-highlight {
      color: #38bdf8;
      font-weight: 500;
    }
    .new-tab-badge {
      font-size: 10px;
      font-weight: 700;
      color: #38bdf8;
      background: rgba(56, 189, 248, 0.15);
      border: 1px solid rgba(56, 189, 248, 0.3);
      padding: 2px 6px;
      border-radius: 4px;
    }
    .step-meta {
      font-size: 11px;
      color: #64748b;
      display: flex;
      gap: 8px;
      margin-left: auto;
    }
    .step-meta code {
      background: #090d13;
      padding: 1px 4px;
      border-radius: 3px;
      color: #cbd5e1;
    }

    /* Contextual Notes Styling */
    .step-notes-container {
      background: var(--note-bg);
      border: 1px solid var(--note-border);
      border-radius: 8px;
      padding: 10px 12px;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    .step-notes-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
    }
    .step-notes-title {
      font-size: 11.5px;
      font-weight: 700;
      color: #93c5fd;
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .step-notes-title code {
      background: #1e293b;
      padding: 1px 5px;
      border-radius: 3px;
      color: #38bdf8;
      font-size: 11px;
    }
    .notes-count-badge {
      font-size: 10.5px;
      font-weight: 600;
      color: #94a3b8;
      background: #1e293b;
      padding: 2px 8px;
      border-radius: 9999px;
    }
    .notes-list {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }
    .no-notes-hint {
      font-size: 11px;
      color: #64748b;
      font-style: italic;
      padding: 4px 0;
    }
    .note-item {
      background: #131d2a;
      border: 1px solid #23354d;
      border-left: 3px solid #38bdf8;
      border-radius: 6px;
      padding: 8px 10px;
      display: flex;
      align-items: flex-start;
      gap: 8px;
      font-size: 12px;
      line-height: 1.45;
      color: #e2e8f0;
      transition: border-color 0.15s ease;
    }
    .note-item:hover {
      border-color: #38bdf8;
    }
    .note-bullet {
      font-size: 13px;
      flex-shrink: 0;
      margin-top: 1px;
    }
    .note-text {
      flex: 1;
      white-space: pre-wrap;
      word-break: break-word;
    }
    .btn-remove-note {
      background: transparent;
      border: none;
      color: #64748b;
      cursor: pointer;
      font-size: 12px;
      padding: 0 4px;
      border-radius: 3px;
      line-height: 1;
      transition: all 0.15s ease;
      flex-shrink: 0;
    }
    .btn-remove-note:hover {
      color: #f87171;
      background: rgba(239, 68, 68, 0.15);
    }
    .add-note-box {
      display: flex;
      flex-direction: column;
      gap: 8px;
      margin-top: 4px;
    }
    .note-quick-tags {
      display: flex;
      align-items: center;
      gap: 6px;
      flex-wrap: wrap;
    }
    .quick-tag-label {
      font-size: 10.5px;
      color: #64748b;
      font-weight: 600;
    }
    .quick-tag {
      background: #182230;
      color: #93c5fd;
      border: 1px solid #28374d;
      border-radius: 4px;
      padding: 3px 7px;
      font-size: 10px;
      font-weight: 700;
      cursor: pointer;
      transition: all 0.15s ease;
      font-family: inherit;
    }
    .quick-tag:hover {
      background: #2563eb;
      color: #ffffff;
      border-color: #3b82f6;
      transform: translateY(-1px);
    }
    .note-input-row {
      display: flex;
      gap: 8px;
      align-items: stretch;
    }
    .note-textarea {
      flex: 1;
      background: #06090e;
      border: 1px solid #1e293b;
      border-radius: 6px;
      padding: 8px 10px;
      color: #f1f5f9;
      font-size: 12px;
      font-family: inherit;
      resize: vertical;
      line-height: 1.4;
      transition: border-color 0.15s ease;
    }
    .note-input-single {
      height: 36px;
      padding: 0 10px;
    }
    .note-textarea:focus {
      outline: none;
      border-color: #38bdf8;
      box-shadow: 0 0 0 1px #38bdf8;
    }
    .btn-add-note {
      background: #0284c7;
      color: #ffffff;
      border: 1px solid #0369a1;
      border-radius: 6px;
      padding: 8px 14px;
      font-size: 11.5px;
      font-weight: 700;
      cursor: pointer;
      font-family: inherit;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      white-space: nowrap;
      transition: all 0.18s ease;
    }
    .btn-add-note:hover {
      background: #0ea5e9;
      border-color: #38bdf8;
      transform: translateY(-1px);
    }
    .workflow-card-actions {
      margin-top: 16px;
      padding-top: 14px;
      border-top: 1px solid var(--card-border);
      display: flex;
      align-items: center;
      gap: 10px;
      flex-wrap: wrap;
    }
    .workflow-card-actions button {
      padding: 6px 12px;
      border-radius: 6px;
      font-size: 11.5px;
      font-weight: 600;
      cursor: pointer;
      font-family: inherit;
      display: inline-flex;
      align-items: center;
      gap: 5px;
      transition: all 0.18s ease;
      border: 1px solid transparent;
    }
    .btn-action-delete {
      background: rgba(239, 68, 68, 0.15);
      color: #fca5a5;
      border-color: rgba(239, 68, 68, 0.35);
    }
    .btn-action-delete:hover {
      background: var(--danger);
      color: #ffffff;
      border-color: var(--danger);
      box-shadow: 0 2px 8px rgba(239, 68, 68, 0.35);
      transform: translateY(-1px);
    }
    .btn-action-copy, .btn-action-download {
      background: #1e293b;
      color: #cbd5e1;
      border-color: #334155;
    }
    .btn-action-copy:hover, .btn-action-download:hover {
      background: #334155;
      color: #ffffff;
      transform: translateY(-1px);
    }
    .json-details {
      margin-top: 14px;
      font-size: 11px;
    }
    .json-details summary {
      cursor: pointer;
      color: var(--text-muted);
    }
    .json-details summary:hover {
      color: var(--accent);
    }
    .json-dump {
      background: #05070a;
      border: 1px solid var(--card-border);
      border-radius: 6px;
      padding: 12px;
      margin-top: 8px;
      overflow-x: auto;
      color: #86efac;
      font-size: 11px;
    }
    .empty-state {
      background: var(--card-bg);
      border: 1px dashed var(--card-border);
      border-radius: 12px;
      padding: 48px 24px;
      text-align: center;
      color: var(--text-muted);
    }
    .empty-icon {
      font-size: 36px;
      margin-bottom: 12px;
      opacity: 0.8;
    }
    .empty-state h3 {
      color: #ffffff;
      margin-bottom: 8px;
      font-size: 16px;
    }
    .toast-container {
      position: fixed;
      bottom: 24px;
      right: 24px;
      display: flex;
      flex-direction: column;
      gap: 10px;
      z-index: 9999;
    }
    .toast {
      background: #1e293b;
      color: #ffffff;
      border: 1px solid #334155;
      padding: 10px 16px;
      border-radius: 8px;
      font-size: 12.5px;
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.4);
      display: flex;
      align-items: center;
      gap: 8px;
      animation: slideIn 0.25s ease-out;
    }
    .toast-success {
      border-left: 4px solid #10b981;
    }
    .toast-error {
      border-left: 4px solid #ef4444;
    }
    @keyframes slideIn {
      from { transform: translateX(100%); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }
  </style>
</head>
<body>
  <div class="toast-container" id="toast-box"></div>

  <header>
    <div class="brand">
      <h1><span>🎯</span> Tuyul Recorded Workflows</h1>
      <p id="header-meta">GET /api/metrics/raw &bull; <span id="count-wf-meta">${workflowPackets.length}</span> Workflows &bull; ${packets.length} Total Packets</p>
    </div>
    <div class="nav-actions">
      <button class="btn-clear-wf" id="btn-clear-all-wf" onclick="clearAllWorkflows()">
        🗑️ Hapus Semua Workflow (<span id="btn-count-wf">${workflowPackets.length}</span>)
      </button>
      <button class="btn-clear-all" onclick="clearAllData()">
        ⚠️ Reset Semua (${packets.length})
      </button>
      <a href="/metrics" class="btn-metrics">📊 Nuxt Dashboard</a>
      <a href="/api/metrics/raw?format=json" class="btn-json">{ JSON Raw }</a>
    </div>
  </header>

  <div class="section-title">
    <span>📋 Recorded Workflow Sessions (Contained Steps & Contextual LLM Notes)</span>
    <span style="font-size: 11px; font-weight: normal; color: var(--text-muted);">
      <span id="title-count-wf">${workflowPackets.length}</span> sesi tersimpan
    </span>
  </div>

  <main id="workflows-list">
    ${workflowsHtml}
  </main>

  ${catalogsHtml ? `
  <div class="section-title" style="margin-top: 32px;">
    <span>📦 Harvested Product Catalogs (Shopee Seller Products)</span>
    <span style="font-size: 11px; font-weight: normal; color: var(--text-muted);">
      <span id="title-count-cat">${catalogPackets.length}</span> katalog tersimpan
    </span>
  </div>
  <section id="catalogs-list">
    ${catalogsHtml}
  </section>
  ` : ''}

  <script>
    function escapeHtml(str) {
      if (str === undefined || str === null) return '';
      return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
    }

    function showToast(message, type = 'success') {
      const box = document.getElementById('toast-box');
      if (!box) return;
      const toast = document.createElement('div');
      toast.className = 'toast toast-' + type;
      toast.innerHTML = (type === 'success' ? '✅ ' : '❌ ') + message;
      box.appendChild(toast);
      setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(10px)';
        toast.style.transition = 'all 0.3s ease';
        setTimeout(() => toast.remove(), 300);
      }, 3500);
    }

    function updateCounts(remainingCount) {
      const btnCount = document.getElementById('btn-count-wf');
      const titleCount = document.getElementById('title-count-wf');
      const metaCount = document.getElementById('count-wf-meta');
      if (btnCount) btnCount.textContent = remainingCount;
      if (titleCount) titleCount.textContent = remainingCount;
      if (metaCount) metaCount.textContent = remainingCount;

      const clearBtn = document.getElementById('btn-clear-all-wf');
      if (clearBtn && remainingCount === 0) {
        clearBtn.disabled = true;
        clearBtn.style.opacity = '0.5';
        clearBtn.style.cursor = 'not-allowed';
      }
    }

    async function handleDeleteBtn(btn) {
      const id = btn.getAttribute('data-id');
      const name = btn.getAttribute('data-name') || 'Workflow';
      await deleteWorkflow(id, name, btn);
    }

    async function deleteWorkflow(id, name, triggerBtn) {
      if (!confirm('Hapus sesi workflow "' + name + '" (ID: ' + id + ')?\\n\\nTindakan ini akan menghapus rekaman ini dari memori dan file penyimpanan log.')) {
        return;
      }

      if (triggerBtn) {
        triggerBtn.disabled = true;
        triggerBtn.textContent = '⏳ Menghapus...';
      }

      try {
        const res = await fetch('/api/metrics/raw?id=' + encodeURIComponent(id), {
          method: 'DELETE'
        });
        const data = await res.json();
        if (data.success) {
          const el = document.getElementById('wf-' + id);
          if (el) {
            el.style.transition = 'all 0.3s ease';
            el.style.opacity = '0';
            el.style.transform = 'scale(0.95)';
            setTimeout(() => {
              el.remove();
              const remaining = document.querySelectorAll('.workflow-container').length;
              updateCounts(remaining);
              if (remaining === 0) {
                const list = document.getElementById('workflows-list');
                if (list) {
                  list.innerHTML = \`
                    <div class="empty-state" id="empty-state-notice">
                      <div class="empty-icon">📁</div>
                      <h3>Belum Ada Workflow yang Direkam</h3>
                      <p>Semua workflow telah dihapus. Lakukan perekaman baru di Shopee Seller Centre menggunakan Tuyul Shopee.</p>
                    </div>
                  \`;
                }
              }
            }, 300);
          } else {
            location.reload();
          }
          showToast('Workflow "' + name + '" berhasil dihapus', 'success');
        } else {
          alert('Gagal: ' + (data.message || 'Error'));
          if (triggerBtn) {
            triggerBtn.disabled = false;
            triggerBtn.textContent = '🗑️ Hapus';
          }
        }
      } catch (err) {
        alert('Gagal menghapus: ' + err.message);
        if (triggerBtn) {
          triggerBtn.disabled = false;
          triggerBtn.textContent = '🗑️ Hapus';
        }
      }
    }

    async function clearAllWorkflows() {
      const count = document.querySelectorAll('.workflow-container').length;
      if (count === 0) {
        alert('Tidak ada sesi workflow yang tersimpan saat ini.');
        return;
      }

      if (!confirm('Peringatan: Yakin ingin menghapus SEMUA (' + count + ') sesi rekaman workflow dari server?')) return;
      
      const btn = document.getElementById('btn-clear-all-wf');
      if (btn) {
        btn.disabled = true;
        btn.textContent = '⏳ Menghapus Semua...';
      }

      try {
        const res = await fetch('/api/metrics/raw?only=workflows', {
          method: 'DELETE'
        });
        const data = await res.json();
        if (data.success) {
          showToast('Semua workflow berhasil dihapus!', 'success');
          setTimeout(() => location.reload(), 600);
        } else {
          alert('Gagal: ' + (data.message || 'Error'));
          if (btn) {
            btn.disabled = false;
            btn.textContent = '🗑️ Hapus Semua Workflow';
          }
        }
      } catch (err) {
        alert('Gagal menghapus: ' + err.message);
        if (btn) {
          btn.disabled = false;
          btn.textContent = '🗑️ Hapus Semua Workflow';
        }
      }
    }

    async function clearAllData() {
      if (!confirm('Peringatan: Ini akan mengosongkan SELURUH memori & file log stream.jsonl. Lanjutkan?')) return;
      try {
        const res = await fetch('/api/metrics/raw', {
          method: 'DELETE'
        });
        const data = await res.json();
        if (data.success) {
          showToast('Seluruh data server berhasil dikosongkan', 'success');
          setTimeout(() => location.reload(), 600);
        } else {
          alert('Gagal: ' + (data.message || 'Error'));
        }
      } catch (err) {
        alert('Gagal: ' + err.message);
      }
    }

    // Helper to get parsed payload from hidden script tag
    function getStoredPayload(id) {
      const tag = document.getElementById('json-' + id);
      if (!tag) return null;
      try {
        return JSON.parse(tag.textContent);
      } catch {
        return null;
      }
    }

    function syncPayloadToUI(id, payload) {
      const tag = document.getElementById('json-' + id);
      if (tag) tag.textContent = JSON.stringify(payload);
      const dump = document.getElementById('json-dump-' + id);
      if (dump) dump.textContent = JSON.stringify(payload, null, 2);
    }

    // ============================================
    // NOTES LOGIC (Step Notes & Workflow Notes)
    // ============================================

    function insertNoteTemplate(pktId, stepIdx, templateText) {
      const input = document.getElementById('note-input-' + pktId + '-' + stepIdx);
      if (!input) return;
      if (input.value.trim()) {
        input.value = input.value + '\\n' + templateText;
      } else {
        input.value = templateText;
      }
      input.focus();
    }

    async function addStepNote(pktId, stepIdx) {
      const input = document.getElementById('note-input-' + pktId + '-' + stepIdx);
      if (!input) return;
      const text = input.value.trim();
      if (!text) {
        alert('Silakan ketik catatan konteks terlebih dahulu.');
        return;
      }

      const payload = getStoredPayload(pktId);
      if (!payload || !Array.isArray(payload.steps) || !payload.steps[stepIdx]) {
        alert('Data step tidak ditemukan.');
        return;
      }

      const step = payload.steps[stepIdx];
      if (!Array.isArray(step.notes)) {
        step.notes = [];
      }
      step.notes.push(text);

      try {
        const res = await fetch('/api/metrics/raw', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            id: pktId,
            stepIndex: stepIdx,
            notes: step.notes,
          }),
        });
        const result = await res.json();
        if (result.success) {
          syncPayloadToUI(pktId, payload);
          renderStepNotesList(pktId, stepIdx, step.notes);
          input.value = '';
          showToast('Catatan Langkah #' + step.step + ' berhasil ditambahkan!', 'success');
        } else {
          alert('Gagal menyimpan note: ' + (result.message || 'Error'));
        }
      } catch (err) {
        alert('Gagal menyimpan note: ' + err.message);
      }
    }

    async function removeStepNote(pktId, stepIdx, noteIdx) {
      const payload = getStoredPayload(pktId);
      if (!payload || !Array.isArray(payload.steps) || !payload.steps[stepIdx]) return;
      const step = payload.steps[stepIdx];
      if (!Array.isArray(step.notes)) return;

      if (!confirm('Hapus catatan ini dari step #' + step.step + '?')) return;

      step.notes.splice(noteIdx, 1);

      try {
        const res = await fetch('/api/metrics/raw', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            id: pktId,
            stepIndex: stepIdx,
            notes: step.notes,
          }),
        });
        const result = await res.json();
        if (result.success) {
          syncPayloadToUI(pktId, payload);
          renderStepNotesList(pktId, stepIdx, step.notes);
          showToast('Catatan berhasil dihapus', 'success');
        } else {
          alert('Gagal menghapus note: ' + (result.message || 'Error'));
        }
      } catch (err) {
        alert('Gagal: ' + err.message);
      }
    }

    function renderStepNotesList(pktId, stepIdx, notes) {
      const listEl = document.getElementById('notes-list-' + pktId + '-' + stepIdx);
      const badgeEl = document.getElementById('notes-badge-' + pktId + '-' + stepIdx);
      if (badgeEl) badgeEl.textContent = notes.length + ' catatan';
      if (!listEl) return;

      if (!notes || notes.length === 0) {
        listEl.innerHTML = '<div class="no-notes-hint">Belum ada catatan kontekstual untuk langkah ini. Tambahkan di bawah agar LLM memahami intensi & alur respons API.</div>';
        return;
      }

      listEl.innerHTML = notes.map((n, i) => \`
        <div class="note-item" data-note-idx="\${i}">
          <span class="note-bullet">📌</span>
          <span class="note-text">\${escapeHtml(n)}</span>
          <button type="button" class="btn-remove-note" title="Hapus note ini" onclick="removeStepNote('\${escapeHtml(pktId)}', \${stepIdx}, \${i})">✕</button>
        </div>
      \`).join('');
    }

    // Workflow-level notes
    async function addWorkflowNote(pktId) {
      const input = document.getElementById('wf-note-input-' + pktId);
      if (!input) return;
      const text = input.value.trim();
      if (!text) {
        alert('Silakan ketik instruksi global terlebih dahulu.');
        return;
      }

      const payload = getStoredPayload(pktId);
      if (!payload) return;
      if (!Array.isArray(payload.notes)) payload.notes = [];
      payload.notes.push(text);

      try {
        const res = await fetch('/api/metrics/raw', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            id: pktId,
            workflowNotes: payload.notes,
          }),
        });
        const result = await res.json();
        if (result.success) {
          syncPayloadToUI(pktId, payload);
          renderWorkflowNotesList(pktId, payload.notes);
          input.value = '';
          showToast('Instruksi global workflow tersimpan!', 'success');
        } else {
          alert('Gagal: ' + (result.message || 'Error'));
        }
      } catch (err) {
        alert('Gagal: ' + err.message);
      }
    }

    async function removeWorkflowNote(pktId, noteIdx) {
      const payload = getStoredPayload(pktId);
      if (!payload || !Array.isArray(payload.notes)) return;
      if (!confirm('Hapus instruksi global ini?')) return;
      payload.notes.splice(noteIdx, 1);

      try {
        const res = await fetch('/api/metrics/raw', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            id: pktId,
            workflowNotes: payload.notes,
          }),
        });
        const result = await res.json();
        if (result.success) {
          syncPayloadToUI(pktId, payload);
          renderWorkflowNotesList(pktId, payload.notes);
          showToast('Instruksi global dihapus', 'success');
        }
      } catch (err) {
        alert('Gagal: ' + err.message);
      }
    }

    function renderWorkflowNotesList(pktId, notes) {
      const listEl = document.getElementById('wf-notes-list-' + pktId);
      const badgeEl = document.getElementById('wf-notes-badge-' + pktId);
      if (badgeEl) badgeEl.textContent = notes.length + ' instruksi global';
      if (!listEl) return;

      if (!notes || notes.length === 0) {
        listEl.innerHTML = '<div class="no-notes-hint">Belum ada instruksi global untuk workflow ini. Tambahkan tujuan/prekondisi untuk memandu eksekusi LLM.</div>';
        return;
      }

      listEl.innerHTML = notes.map((n, i) => \`
        <div class="note-item" data-wf-note-idx="\${i}">
          <span class="note-bullet">🎯</span>
          <span class="note-text">\${escapeHtml(n)}</span>
          <button type="button" class="btn-remove-note" title="Hapus note ini" onclick="removeWorkflowNote('\${escapeHtml(pktId)}', \${i})">✕</button>
        </div>
      \`).join('');
    }

    function copyWorkflowJson(btn, id) {
      const payload = getStoredPayload(id);
      if (!payload) return;
      try {
        const json = JSON.stringify(payload, null, 2);
        navigator.clipboard.writeText(json).then(() => {
          const original = btn.textContent;
          btn.textContent = '✅ JSON Tersalin!';
          setTimeout(() => btn.textContent = original, 1800);
          showToast('JSON workflow lengkap dengan contextual notes berhasil disalin ke clipboard', 'success');
        });
      } catch (e) {
        alert('Gagal menyalin JSON: ' + e.message);
      }
    }

    function downloadWorkflowJson(id, name) {
      const payload = getStoredPayload(id);
      if (!payload) return;
      try {
        const json = JSON.stringify(payload, null, 2);
        const blob = new Blob([json], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        const cleanName = (name || 'workflow').replace(/[^a-zA-Z0-9_-]/g, '_').toLowerCase();
        a.href = url;
        a.download = cleanName + '-' + id + '.json';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        showToast('File JSON sedang diunduh', 'success');
      } catch (e) {
        alert('Gagal mengunduh: ' + e.message);
      }
    }
  </script>
</body>
</html>`
  }

  const actionableCount = packets.filter(p => p.classification?.isActionable).length
  const noiseCount = packets.length - actionableCount

  return {
    success: true,
    total: packets.length,
    actionableCount,
    noiseCount,
    packets,
  }
})

function escapeHtml(str: any): string {
  if (str === undefined || str === null) return ''
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}
