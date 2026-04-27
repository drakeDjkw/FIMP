import React, { createContext, useContext, useEffect, useRef, useState } from 'react'
import type { TelemetryMessage } from '../components/TelemetryFeed'
import Ajv from 'ajv'
import schema from '../../schemas/telemetry.json'

type Streams = {
  telemetry: TelemetryMessage[]
}

const StreamsContext = createContext<Streams | null>(null)

export function useStreams() {
  const c = useContext(StreamsContext)
  if (!c) throw new Error('useStreams must be used within StreamsProvider')
  return c
}

export function StreamsProvider({
  children,
  mode = 'auto', // 'auto' | 'mock' | 'ws'
  wsUrl,
}: {
  children: React.ReactNode
  mode?: 'auto' | 'mock' | 'ws'
  wsUrl?: string
}) {
  const [telemetry, setTelemetry] = useState<TelemetryMessage[]>([])
  const wsRef = useRef<WebSocket | null>(null)
  const backoffRef = useRef(500)

  const ajv = new Ajv()
  const validate = ajv.compile(schema as object)

  useEffect(() => {
    let stopped = false

    async function connectWebSocket(url: string) {
      if (stopped) return
      try {
        const ws = new WebSocket(url)
        wsRef.current = ws
        backoffRef.current = 500
        ws.addEventListener('message', (ev) => {
          try {
            const msg = JSON.parse(ev.data)
            if (validate(msg)) {
              setTelemetry((s) => [msg, ...s].slice(0, 50))
            } else {
              // invalid message, ignore or log
              // console.warn('Invalid telemetry message', validate.errors)
            }
          } catch (e) {
            // ignore parse errors
          }
        })
        ws.addEventListener('close', () => {
          if (stopped) return
          // reconnect with backoff
          setTimeout(() => {
            backoffRef.current = Math.min(backoffRef.current * 1.5, 10000)
            connectWebSocket(url)
          }, backoffRef.current)
        })
      } catch (e) {
        // schedule reconnect
        setTimeout(() => {
          backoffRef.current = Math.min(backoffRef.current * 1.5, 10000)
          connectWebSocket(url)
        }, backoffRef.current)
      }
    }

    const runtimeWs = (import.meta as any).env?.VITE_WS_URL

    if (mode === 'ws' || (mode === 'auto' && runtimeWs)) {
      const url = wsUrl ?? runtimeWs
      if (url) connectWebSocket(url)
    } else if (mode === 'mock' || (mode === 'auto' && !runtimeWs)) {
      const iv = setInterval(() => {
        import('./mockServer').then((m) => {
          const msg = m.sampleMessage()
          if (validate(msg)) setTelemetry((s) => [msg, ...s].slice(0, 50))
        })
      }, 3000)
      return () => clearInterval(iv)
    }

    return () => {
      stopped = true
      if (wsRef.current) {
        wsRef.current.close()
        wsRef.current = null
      }
    }
  }, [mode, wsUrl])

  return (
    <StreamsContext.Provider value={{ telemetry }}>{children}</StreamsContext.Provider>
  )
}

export default StreamsContext
