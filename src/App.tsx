import React, { useState } from 'react'
import Sidebar, { MODULES } from './components/Sidebar'
import RightPanel from './components/RightPanel'
import TelemetryFeed from './components/TelemetryFeed'
import { StreamsProvider } from './streams/StreamsContext'

export default function App() {
  const [selected, setSelected] = useState<typeof MODULES[number]>('Overview')
  const [mode, setMode] = useState<'auto' | 'mock' | 'ws'>('auto')
  const [wsUrl, setWsUrl] = useState<string | undefined>(undefined)

  return (
    <div className="app">
      <Sidebar selected={selected} onSelect={setSelected} />
      <StreamsProvider mode={mode} wsUrl={wsUrl}>
        <main className="main">
          <h1>FIMP — Demo</h1>

          <div style={{ marginBottom: 12 }}>
            <label style={{ marginRight: 8 }}>
              <input type="radio" checked={mode === 'auto'} onChange={() => setMode('auto')} /> Auto
            </label>
            <label style={{ marginRight: 8 }}>
              <input type="radio" checked={mode === 'mock'} onChange={() => setMode('mock')} /> Mock
            </label>
            <label style={{ marginRight: 8 }}>
              <input type="radio" checked={mode === 'ws'} onChange={() => setMode('ws')} /> WebSocket
            </label>
            {mode === 'ws' && (
              <input
                style={{ marginLeft: 8, padding: '4px 8px' }}
                placeholder="ws://localhost:8081"
                value={wsUrl ?? ''}
                onChange={(e) => setWsUrl(e.target.value)}
              />
            )}
          </div>

          <div className="module-placeholder">
            <h2>{selected}</h2>
            <p>Module content for <strong>{selected}</strong> will be shown here.</p>
          </div>
        </main>
      </StreamsProvider>
      <RightPanel>
        <TelemetryFeed />
      </RightPanel>
    </div>
  )
}
