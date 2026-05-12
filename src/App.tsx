import React, { useState } from 'react'
import Sidebar, { MODULES } from './components/Sidebar'
import RightPanel from './components/RightPanel'
import TelemetryFeed from './components/TelemetryFeed'
import { StreamsProvider } from './streams/StreamsContext'
import Overview from './components/modules/Overview'
import RealTimeProcessing from './components/modules/RealTimeProcessing'
import OreSorting from './components/modules/OreSorting'
import DigitalTwin from './components/modules/DigitalTwin'
import PredictiveMaintenance from './components/modules/PredictiveMaintenance'
import FleetIntelligence from './components/modules/FleetIntelligence'
import SafetyAI from './components/modules/SafetyAI'

const MODULE_COMPONENTS: Record<typeof MODULES[number], React.ComponentType> = {
  'Overview': Overview,
  'Real-time Processing': RealTimeProcessing,
  'Ore Sorting': OreSorting,
  'Digital Twin': DigitalTwin,
  'Predictive Maintenance': PredictiveMaintenance,
  'Fleet Intelligence': FleetIntelligence,
  'Safety & 5G': SafetyAI,
}

export default function App() {
  const [selected, setSelected] = useState<typeof MODULES[number]>('Overview')
  const [mode, setMode] = useState<'auto' | 'mock' | 'ws'>('auto')
  const [wsUrl, setWsUrl] = useState<string | undefined>(undefined)

  const ActiveModule = MODULE_COMPONENTS[selected]

  return (
    <div className="app">
      <Sidebar selected={selected} onSelect={setSelected} />
      <StreamsProvider mode={mode} wsUrl={wsUrl}>
        <main className="main">
          <div className="main-header">
            <h1>{selected}</h1>
            <div className="mode-controls">
              <label>
                <input type="radio" checked={mode === 'auto'} onChange={() => setMode('auto')} /> Auto
              </label>
              <label>
                <input type="radio" checked={mode === 'mock'} onChange={() => setMode('mock')} /> Mock
              </label>
              <label>
                <input type="radio" checked={mode === 'ws'} onChange={() => setMode('ws')} /> WebSocket
              </label>
              {mode === 'ws' && (
                <input
                  className="ws-input"
                  placeholder="ws://localhost:8081"
                  value={wsUrl ?? ''}
                  onChange={(e) => setWsUrl(e.target.value)}
                />
              )}
            </div>
          </div>
          <ActiveModule />
        </main>
        <RightPanel>
          <TelemetryFeed />
        </RightPanel>
      </StreamsProvider>
    </div>
  )
}
