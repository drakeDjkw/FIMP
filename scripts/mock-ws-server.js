#!/usr/bin/env node
const WebSocket = require('ws')

const port = process.env.PORT || 8081
const wss = new WebSocket.Server({ port: +port })

function randomId() {
  return Math.random().toString(36).slice(2, 9)
}

const LEVELED_MESSAGES = [
  { level: 'info', text: 'Grasberg Mill: throughput at 42,800 t/h — +7.0% above baseline' },
  { level: 'info', text: 'McKinsey AI: plant optimization cycle complete — +0.3% efficiency gain' },
  { level: 'warn', text: 'HT-042 (Grasberg): hydraulic pressure anomaly — check in 18h' },
  { level: 'error', text: 'T-003 (Grasberg): route deviation detected — operator alerted' },
  { level: 'info', text: 'Ore Sorting XRT-01: metal recovery at 91.2% — above target' },
  { level: 'info', text: 'PTFI Grasberg 5G: all underground zones reporting nominal' },
  { level: 'warn', text: 'Grasberg: slurry pH drift — AI recalibrating reagent dosage' },
  { level: 'info', text: 'Digital Twin: Grasberg model synced — 3.4M geo-points updated' },
  { level: 'warn', text: 'SH-004 (Grasberg): dipper tooth wear above threshold' },
  { level: 'info', text: 'Fleet: 7 active trucks on AI-optimized routes — Grasberg dispatch' },
  { level: 'error', text: 'CR-001 (Grasberg): crusher liner critical — schedule maintenance' },
  { level: 'info', text: 'Accenture cloud: Grasberg data ingest nominal at 1.1M pts/s' },
  { level: 'info', text: 'Grasberg: remote LHD R-01 operating in Block Cave B2 — all nominal' },
  { level: 'warn', text: 'ML-007 (Grasberg): bearing vibration elevated — monitoring' },
  { level: 'info', text: 'Nutanix hybrid cloud: Grasberg edge node synced successfully' },
]

function sampleMessage() {
  const entry = LEVELED_MESSAGES[Math.floor(Math.random() * LEVELED_MESSAGES.length)]
  return {
    id: randomId(),
    timestamp: new Date().toISOString(),
    level: entry.level,
    source: 'WS-Stream',
    text: entry.text,
    model: { name: 'FCX-AI', confidence: Math.round(Math.random() * 30 + 70) / 100 },
  }
}

wss.on('connection', function connection(ws) {
  console.log('client connected')
  const iv = setInterval(() => {
    ws.send(JSON.stringify(sampleMessage()))
  }, 3000)
  ws.on('close', () => clearInterval(iv))
})

console.log(`Mock WS server listening on ws://localhost:${port}`)
