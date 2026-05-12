import { useEffect, useState } from 'react'

const SENSORS = [
  { id: 'XRT-01', type: 'X-ray Transmission', belt: 'Belt A', status: 'Active' },
  { id: 'XRT-02', type: 'X-ray Transmission', belt: 'Belt B', status: 'Active' },
  { id: 'XRT-03', type: 'X-ray Transmission', belt: 'Belt C', status: 'Calibrating' },
  { id: 'NIR-01', type: 'Near-Infrared', belt: 'Belt A', status: 'Active' },
  { id: 'NIR-02', type: 'Near-Infrared', belt: 'Belt B', status: 'Active' },
]

export default function OreSorting() {
  const [recovery, setRecovery] = useState(91.2)
  const [throughput, setThroughput] = useState(3840)

  useEffect(() => {
    const iv = setInterval(() => {
      setRecovery((v) => parseFloat((Math.max(88, Math.min(94, v + (Math.random() - 0.5) * 0.3))).toFixed(1)))
      setThroughput((v) => Math.round(Math.max(3600, Math.min(4100, v + (Math.random() - 0.5) * 30))))
    }, 2500)
    return () => clearInterval(iv)
  }, [])

  return (
    <div className="module">
      <div className="kpi-grid kpi-grid-4">
        <div className="kpi-card">
          <div className="kpi-value" style={{ color: '#16a34a' }}>{recovery}%</div>
          <div className="kpi-label">Metal Recovery Rate</div>
          <div className="kpi-target">Baseline: 85.2%</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-value" style={{ color: '#2563eb' }}>{throughput.toLocaleString()} t/h</div>
          <div className="kpi-label">Sorting Throughput</div>
          <div className="kpi-target">AI-driven classification</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-value" style={{ color: '#16a34a' }}>−23%</div>
          <div className="kpi-label">Energy Savings</div>
          <div className="kpi-target">vs. conventional sorting</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-value" style={{ color: '#16a34a' }}>−19%</div>
          <div className="kpi-label">Chemical Consumption</div>
          <div className="kpi-target">Reagent reduction</div>
        </div>
      </div>

      <div className="section-box" style={{ marginTop: 16 }}>
        <h3>Sensor Array Status</h3>
        <table className="data-table">
          <thead>
            <tr><th>Sensor ID</th><th>Type</th><th>Location</th><th>Status</th></tr>
          </thead>
          <tbody>
            {SENSORS.map((s) => (
              <tr key={s.id}>
                <td><strong>{s.id}</strong></td>
                <td>{s.type}</td>
                <td>{s.belt}</td>
                <td>
                  <span className={`badge ${s.status === 'Active' ? 'badge-green' : 'badge-yellow'}`}>
                    {s.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="info-box" style={{ marginTop: 16 }}>
        AI-powered ore sorting using <strong>X-ray transmission (XRT)</strong> and <strong>near-infrared (NIR)</strong> sensors
        delivers a <strong>+20–25% processing efficiency improvement</strong> with reduced energy and chemical consumption.
      </div>
    </div>
  )
}
