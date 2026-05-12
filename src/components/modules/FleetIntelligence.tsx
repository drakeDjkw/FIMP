import { useEffect, useState } from 'react'

type Truck = {
  id: string
  site: string
  status: 'En route' | 'Loading' | 'Dumping' | 'Alert' | 'Maintenance'
  load: number
  speed: number
  cycles: number
  deviation: boolean
}

const INITIAL_TRUCKS: Truck[] = [
  { id: 'T-001', site: 'Grasberg', status: 'En route', load: 240, speed: 32, cycles: 14, deviation: false },
  { id: 'T-002', site: 'Grasberg', status: 'Loading', load: 0, speed: 0, cycles: 12, deviation: false },
  { id: 'T-003', site: 'Grasberg', status: 'Alert', load: 185, speed: 18, cycles: 9, deviation: true },
  { id: 'T-004', site: 'Grasberg', status: 'En route', load: 220, speed: 28, cycles: 17, deviation: false },
  { id: 'T-005', site: 'Grasberg', status: 'Dumping', load: 210, speed: 5, cycles: 15, deviation: false },
  { id: 'T-006', site: 'Grasberg', status: 'En route', load: 195, speed: 31, cycles: 11, deviation: false },
  { id: 'T-007', site: 'Grasberg', status: 'Maintenance', load: 0, speed: 0, cycles: 8, deviation: false },
  { id: 'T-008', site: 'Grasberg', status: 'En route', load: 230, speed: 25, cycles: 13, deviation: false },
]

export default function FleetIntelligence() {
  const [trucks, setTrucks] = useState(INITIAL_TRUCKS)

  useEffect(() => {
    const iv = setInterval(() => {
      setTrucks((prev) =>
        prev.map((t) => ({
          ...t,
          speed:
            t.status === 'En route'
              ? Math.max(15, Math.min(40, t.speed + Math.round((Math.random() - 0.5) * 4)))
              : t.speed,
          cycles: t.status === 'Dumping' ? t.cycles + 1 : t.cycles,
        }))
      )
    }, 3000)
    return () => clearInterval(iv)
  }, [])

  const active = trucks.filter((t) => t.status !== 'Maintenance').length
  const alerts = trucks.filter((t) => t.deviation).length
  const avgCycles = Math.round(trucks.reduce((s, t) => s + t.cycles, 0) / trucks.length)

  return (
    <div className="module">
      <div className="module-header-row">
        <span><span className="live-dot" /> WWT Fleet Integration: <strong>Live</strong></span>
        <span className="muted">{trucks.length} trucks tracked — Grasberg (PTFI)</span>
      </div>

      <div className="kpi-grid kpi-grid-4">
        <div className="kpi-card">
          <div className="kpi-value" style={{ color: '#16a34a' }}>{active}</div>
          <div className="kpi-label">Active Trucks</div>
          <div className="kpi-target">of {trucks.length} total</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-value" style={{ color: alerts > 0 ? '#dc2626' : '#16a34a' }}>{alerts}</div>
          <div className="kpi-label">Route Deviations</div>
          <div className="kpi-target">Real-time GPS monitoring</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-value" style={{ color: '#2563eb' }}>{avgCycles}</div>
          <div className="kpi-label">Avg Cycles / Shift</div>
          <div className="kpi-target">AI-optimized dispatch</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-value" style={{ color: '#16a34a' }}>+12%</div>
          <div className="kpi-label">Fleet Efficiency</div>
          <div className="kpi-target">vs. pre-AI baseline</div>
        </div>
      </div>

      <div className="section-box" style={{ marginTop: 16 }}>
        <h3>Truck Status</h3>
        <table className="data-table">
          <thead>
            <tr><th>Truck ID</th><th>Site</th><th>Status</th><th>Load (t)</th><th>Speed (km/h)</th><th>Cycles</th></tr>
          </thead>
          <tbody>
            {trucks.map((t) => (
              <tr key={t.id} className={t.deviation ? 'row-alert' : ''}>
                <td><strong>{t.id}</strong>{t.deviation && ' ⚠'}</td>
                <td>{t.site}</td>
                <td>
                  <span className={`badge ${t.status === 'Alert' ? 'badge-red' : t.status === 'Maintenance' ? 'badge-yellow' : 'badge-green'}`}>
                    {t.status}
                  </span>
                </td>
                <td>{t.load > 0 ? t.load : '—'}</td>
                <td>{t.speed > 0 ? t.speed : '—'}</td>
                <td>{t.cycles}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
