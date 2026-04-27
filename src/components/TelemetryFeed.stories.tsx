import React from 'react'
import TelemetryFeed from './TelemetryFeed'
import { StreamsProvider } from '../streams/StreamsContext'

export default {
  title: 'Components/TelemetryFeed',
  component: TelemetryFeed,
}

export const Live = () => (
  <StreamsProvider>
    <div style={{ width: 320 }}>
      <TelemetryFeed />
    </div>
  </StreamsProvider>
)

export const Standalone = () => (
  <div style={{ width: 320 }}>
    <TelemetryFeed />
  </div>
)
