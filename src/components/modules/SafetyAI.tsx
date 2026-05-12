import { useEffect, useState } from 'react'

const ZONES = [
  { id: 'UG-B1', name: 'Block Cave B1', depth: '−1,200m', workers: 42, coverage: '5G', risk: 'Low' },
  { id: 'UG-B2', name: 'Block Cave B2', depth: '−1,450m', workers: 38, coverage: '5G', risk: 'Low' },
  { id: 'UG-C1', name: 'Deep Ore Zone C1', depth: '−1,800m', workers: 14, coverage: '5G', risk: 'Medium' },
  { id: 'UG-D1', name: 'Development Heading D1', depth: '−2,100m', workers: 8, coverage: 'LTE', risk: 'High' },
]

const REMOTE_OPS = [
  { equipment: 'LHD Loader R-01', site: 'Grasberg', zone: 'Block Cave B2', status: 'Active' },
  { equipment: 'Drill Rig R-04', site: 'Grasberg', zone: 'Block Cave B1', status: 'Active' },
  { equipment: 'LHD Loader R-07', site: 'Grasberg', zone: 'Deep Ore Zone C1', status: 'Standby' },
]

export default function SafetyAI() {
  const [safetyIndex, setSafetyIndex] = useState(97.4)

  useEffect(() => {
    const iv = setInterval(() => {
      setSafetyIndex((v) =>
        parseFloat((Math.max(95, Math.min(99.9, v + (Math.random() - 0.5) * 0.2))).toFixed(1))
      )
    }, 4000)
    return () => clearInterval(iv)
  }, [])

  return (
    <div className="module">
      <div className="module-header-row">
        <span><span className="live-dot" /> PTFI Grasberg — 5G Smart Mining: <strong>Active</strong></span>
        <span className="muted">Indonesia deep underground operations</span>
      </div>

      <div className="kpi-grid kpi-grid-4">
        <div className="kpi-card">
          <div className="kpi-value" style={{ color: '#16a34a' }}>{safetyIndex}%</div>
          <div className="kpi-label">Safety Index</div>
          <div className="kpi-target">AI real-time monitoring</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-value" style={{ color: '#16a34a' }}>0</div>
          <div className="kpi-label">Incidents (shift)</div>
          <div className="kpi-target">Lost-time incidents: 0</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-value" style={{ color: '#2563eb' }}>102</div>
          <div className="kpi-label">Workers Underground</div>
          <div className="kpi-target">Real-time tracking active</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-value" style={{ color: '#7c3aed' }}>3</div>
          <div className="kpi-label">Remote Operations</div>
          <div className="kpi-target">High-risk area equipment</div>
        </div>
      </div>

      <div className="section-row" style={{ marginTop: 16 }}>
        <div className="section-box">
          <h3>Underground Zones — PTFI Grasberg</h3>
          <table className="data-table">
            <thead>
              <tr><th>Zone</th><th>Depth</th><th>Workers</th><th>Network</th><th>Risk</th></tr>
            </thead>
            <tbody>
              {ZONES.map((z) => (
                <tr key={z.id}>
                  <td><strong>{z.id}</strong> — {z.name}</td>
                  <td>{z.depth}</td>
                  <td>{z.workers}</td>
                  <td>
                    <span className={`badge ${z.coverage === '5G' ? 'badge-blue' : 'badge-yellow'}`}>
                      {z.coverage}
                    </span>
                  </td>
                  <td>
                    <span className={`badge ${z.risk === 'Low' ? 'badge-green' : z.risk === 'Medium' ? 'badge-yellow' : 'badge-red'}`}>
                      {z.risk}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="section-box">
          <h3>Remote-Operated Equipment</h3>
          <table className="data-table">
            <thead>
              <tr><th>Equipment</th><th>Zone</th><th>Status</th></tr>
            </thead>
            <tbody>
              {REMOTE_OPS.map((r) => (
                <tr key={r.equipment}>
                  <td>{r.equipment}</td>
                  <td>{r.zone}</td>
                  <td>
                    <span className={`badge ${r.status === 'Active' ? 'badge-green' : 'badge-yellow'}`}>
                      {r.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="info-box" style={{ marginTop: 12 }}>
            5G enables remote operation of heavy equipment in <strong>high-risk deep underground areas</strong>,
            keeping workers safe while maintaining full productivity.
          </div>
        </div>
      </div>
    </div>
  )
}
