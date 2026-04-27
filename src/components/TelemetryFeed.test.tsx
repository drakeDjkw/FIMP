import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import TelemetryFeed from './TelemetryFeed'
import { vi } from 'vitest'

vi.useFakeTimers()

describe('TelemetryFeed', () => {
  it('renders and updates with messages', async () => {
    render(<TelemetryFeed />)
    expect(screen.getByText(/AI Telemetry/i)).toBeInTheDocument()
    // advance timers to let the interval fire a few times
    vi.advanceTimersByTime(3100)
    // after timer fires, there should be at least one message rendered
    const list = await screen.findAllByRole('listitem')
    expect(list.length).toBeGreaterThan(0)
  })
})
