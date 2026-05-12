import { useEffect, useState } from 'react'

type PlantMetric = {
  name: string
  value: number
  unit: string
  baseline: number
  direction: 'up' | 'down'
  decimals: number
}

const INITIAL: PlantMetric[] = [
  { name: 'Throughput', value: 42800, unit: 't/h', baseline: 40000, direction: 'up', decimals: 0 },
  { name: 'Recovery Rate', value: 89.4, unit: '%', baseline: 85.2, direction: 'up', decimals: 1 },
  { name: 'Energy Consumption', value: 18.2, unit: 'kWh/t', baseline: 22.5, direction: 'down', decimals: 1 },
  { name: 'Reagent Dosage', value: 31.4, unit: 'g/t', baseline: 38.0, direction: 'down', decimals: 1 },
  { name: 'Slurry pH', value: 10.8, unit: 'pH', baseline: 10.5, direction: 'up', decimals: 1 },
  { name: 'Flotation Airflow', value: 1240, unit: 'L/min', baseline: 1200, direction: 'up', decimals: 0 },
]

export default function RealTimeProcessing() {
  const [metrics, setMetrics] = useState(INITIAL)
  const [lastOptimized] = useState(() => new Date())

  useEffect(() => {
    const iv = setInterval(() => {
      setMetrics((prev) =>
        prev.map((m) => ({
          ...m,
          value: parseFloat(
            (m.value * (1 + (Math.random() - 0.5) * 0.008)).toFixed(m.decimals)
          ),
        }))
      )
    }, 2000)
    return () => clearInterval(iv)
  }, [])

  return (
    <div className="module">
      <div className="module-header-row">
        <span><span className="live-dot" /> McKinsey AI optimization: <strong>active</strong></span>
        <span className="muted">Last adjustment: {lastOptimized.toLocaleTimeString()} (hourly cycle)</span>
      </div>

      <div className="metrics-grid">
        {metrics.map((m) => {
          const delta = ((m.value - m.baseline) / m.baseline) * 100
          const isGood = m.direction === 'up' ? delta > 0 : delta < 0
          return (
            <div key={m.name} className="metric-card">
              <div className="metric-label">{m.name}</div>
              <div className="metric-value">
                {m.value.toLocaleString(undefined, { minimumFractionDigits: m.decimals, maximumFractionDigits: m.decimals })}
                <span className="metric-unit"> {m.unit}</span>
              </div>
              <div className={`metric-delta ${isGood ? 'delta-good' : 'delta-bad'}`}>
                {delta > 0 ? '+' : ''}{delta.toFixed(1)}% vs baseline
              </div>
            </div>
          )
        })}
      </div>

      <div className="info-box">
        AI models analyze sensor data <strong>second-by-second</strong> and adjust plant settings <strong>every hour</strong>,
        replacing the previous once-daily manual adjustments. Processing efficiency is up <strong>+22%</strong> vs. pre-AI baseline.
      </div>
    </div>
  )
}
