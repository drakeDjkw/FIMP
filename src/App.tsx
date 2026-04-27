import React from 'react'
import Sidebar from './components/Sidebar'
import RightPanel from './components/RightPanel'
import TelemetryFeed from './components/TelemetryFeed'

export default function App() {
  return (
    <div className="app">
      <Sidebar />
      <main className="main">
        <h1>FIMP — Demo</h1>
        <div className="module-placeholder">Select a module from the sidebar</div>
      </main>
      <RightPanel>
        <TelemetryFeed />
      </RightPanel>
    </div>
  )
}
