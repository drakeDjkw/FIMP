#!/usr/bin/env node
const WebSocket = require('ws')

const port = process.env.PORT || 8081
const wss = new WebSocket.Server({ port: +port })

function randomId() {
  return Math.random().toString(36).slice(2, 9)
}

function sampleMessage() {
  const levels = ['info', 'warn', 'error']
  const texts = [
    'WS: model summary: stable',
    'WS: CH4 spike detected in Sector D2',
    'WS: HT-042 predicted hydraulic failure in ~18h',
    'WS: Radar heavy rainfall approaching Zone B7',
    'WS: Truck 12 deviated from route'
  ]
  const level = levels[Math.floor(Math.random() * levels.length)]
  const text = texts[Math.floor(Math.random() * texts.length)]
  return {
    id: randomId(),
    timestamp: new Date().toISOString(),
    level,
    source: 'WS-Mock',
    text,
    model: { name: 'GPT-4o', confidence: Math.round(Math.random() * 100) / 100 }
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
