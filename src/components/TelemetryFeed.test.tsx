import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { act } from 'react'
import TelemetryFeed from './TelemetryFeed'
import { vi } from 'vitest'

vi.useFakeTimers()

describe('TelemetryFeed', () => {
  it('renders and updates with messages', async () => {
    render(<TelemetryFeed />)
    expect(screen.getByText(/AI Telemetry/i)).toBeInTheDocument()
    // advance timers inside act so React flushes the state update
    await act(async () => {
      vi.advanceTimersByTime(3100)
    })
    const list = screen.getAllByRole('listitem')
    expect(list.length).toBeGreaterThan(0)
  })
})
