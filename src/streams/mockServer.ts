import type { TelemetryMessage } from '../components/TelemetryFeed'

function randomId() {
  return Math.random().toString(36).slice(2, 9)
}

export function sampleMessage(): TelemetryMessage {
  const levels: TelemetryMessage['level'][] = ['info', 'warn', 'error']
  const texts = [
    'Mock: model summary: stable',
    'Mock: CH4 spike detected in Sector D2',
    'Mock: HT-042 predicted hydraulic failure in ~18h',
    'Mock: Radar heavy rainfall approaching Zone B7',
    'Mock: Truck 12 deviated from route'
  ]
  const level = levels[Math.floor(Math.random() * levels.length)]
  const text = texts[Math.floor(Math.random() * texts.length)]
  return {
    id: randomId(),
    timestamp: new Date().toISOString(),
    level,
    source: 'Mock-Stream',
    text,
    model: { name: 'GPT-4o', confidence: Math.round(Math.random() * 100) / 100 }
  }
}

export default { sampleMessage }
