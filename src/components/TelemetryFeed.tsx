import { useContext, useEffect, useState } from 'react'
import StreamsContext from '../streams/StreamsContext'

export type TelemetryMessage = {
  id: string
  timestamp: string
  level: 'info' | 'warn' | 'error'
  source: string
  text: string
  model?: {
    name: string
    confidence?: number
  }
}

function randomId() {
  return Math.random().toString(36).slice(2, 9)
}

const LEVELED_MESSAGES: Array<{ level: TelemetryMessage['level']; text: string }> = [
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
]

function sampleMessage(): TelemetryMessage {
  const entry = LEVELED_MESSAGES[Math.floor(Math.random() * LEVELED_MESSAGES.length)]
  return {
    id: randomId(),
    timestamp: new Date().toISOString(),
    level: entry.level,
    source: 'AI-Telemetry',
    text: entry.text,
    model: { name: 'FCX-AI', confidence: Math.round(Math.random() * 30 + 70) / 100 },
  }
}

export default function TelemetryFeed() {
  const streams = useContext(StreamsContext)
  const [localMessages, setLocalMessages] = useState<TelemetryMessage[]>([])

  useEffect(() => {
    if (streams) return
    const interval = setInterval(() => {
      setLocalMessages((s) => [sampleMessage(), ...s].slice(0, 20))
    }, 3000)
    return () => clearInterval(interval)
  }, [streams])

  const messages = streams ? streams.telemetry.slice(0, 20) : localMessages

  return (
    <div className="telemetry">
      <h3>AI Telemetry (live)</h3>
      <ul>
        {messages.map((m) => (
          <li key={m.id} className={`msg ${m.level}`}>
            <div className="ts">{new Date(m.timestamp).toLocaleTimeString()}</div>
            <div className="text">{m.text}</div>
            <div className="meta">{m.model?.name} {m.model?.confidence ?? ''}</div>
          </li>
        ))}
      </ul>
    </div>
  )
}
