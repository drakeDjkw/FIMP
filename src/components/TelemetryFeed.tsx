import React, { useEffect, useState } from 'react'

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

function sampleMessage() {
  const levels: TelemetryMessage['level'][] = ['info', 'warn', 'error']
  const texts = [
    'Model summary: no immediate action',
    'CH4 spike detected in Sector D2',
    'HT-042 predicted hydraulic failure in ~18h',
    'Radar: heavy rainfall approaching Zone B7',
    'Truck 12 deviated from route'
  ]
  const level = levels[Math.floor(Math.random() * levels.length)]
  const text = texts[Math.floor(Math.random() * texts.length)]
  return {
    id: randomId(),
    timestamp: new Date().toISOString(),
    level,
    source: 'AI-Telemetry',
    text,
    model: { name: 'GPT-4o', confidence: Math.round(Math.random() * 100) / 100 }
  } as TelemetryMessage
}

export default function TelemetryFeed() {
  const [messages, setMessages] = useState<TelemetryMessage[]>([])

  useEffect(() => {
    const interval = setInterval(() => {
      setMessages((s) => [sampleMessage(), ...s].slice(0, 20))
    }, 3000)
    return () => clearInterval(interval)
  }, [])

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
