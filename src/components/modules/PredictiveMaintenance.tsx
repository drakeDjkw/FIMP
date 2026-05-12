import { useEffect, useState } from 'react'

type Equipment = {
  id: string
  type: string
  site: string
  health: number
  nextMaintenance: string
  prediction: string
  status: 'Healthy' | 'Watch' | 'Critical'
}

const INITIAL_EQUIPMENT: Equipment[] = [
  { id: 'HT-042', type: 'Haul Truck', site: 'Grasberg', health: 34, nextMaintenance: '~18h', prediction: 'Hydraulic failure predicted', status: 'Critical' },
  { id: 'HT-017', type: 'Haul Truck', site: 'Grasberg', health: 71, nextMaintenance: '~5d', prediction: 'Tire wear above threshold', status: 'Watch' },
  { id: 'HT-029', type: 'Haul Truck', site: 'Grasberg', health: 88, nextMaintenance: '~12d', prediction: 'Normal wear pattern', status: 'Healthy' },
  { id: 'SH-004', type: 'Shovel', site: 'Grasberg', health: 62, nextMaintenance: '~3d', prediction: 'Dipper tooth wear detected', status: 'Watch' },
  { id: 'SH-011', type: 'Shovel', site: 'Grasberg', health: 91, nextMaintenance: '~18d', prediction: 'All systems nominal', status: 'Healthy' },
  { id: 'CR-001', type: 'Crusher', site: 'Grasberg', health: 55, nextMaintenance: '~2d', prediction: 'Liner replacement due', status: 'Watch' },
  { id: 'CR-003', type: 'Crusher', site: 'Grasberg', health: 95, nextMaintenance: '~22d', prediction: 'All systems nominal', status: 'Healthy' },
  { id: 'ML-007', type: 'Mill', site: 'Grasberg', health: 78, nextMaintenance: '~7d', prediction: 'Bearing vibration elevated', status: 'Watch' },
]

export default function PredictiveMaintenance() {
  const [equipment, setEquipment] = useState(INITIAL_EQUIPMENT)

  useEffect(() => {
    const iv = setInterval(() => {
      setEquipment((prev) =>
        prev.map((e) => ({
          ...e,
          health: Math.max(10, Math.min(99, e.health + Math.round((Math.random() - 0.5) * 2))),
        }))
      )
    }, 4000)
    return () => clearInterval(iv)
  }, [])

  const critical = equipment.filter((e) => e.status === 'Critical').length
  const watch = equipment.filter((e) => e.status === 'Watch').length
  const healthy = equipment.filter((e) => e.status === 'Healthy').length

  return (
    <div className="module">
      <div className="kpi-grid kpi-grid-4">
        <div className="kpi-card">
          <div className="kpi-value" style={{ color: '#dc2626' }}>{critical}</div>
          <div className="kpi-label">Critical Alerts</div>
          <div className="kpi-target">Immediate action required</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-value" style={{ color: '#d97706' }}>{watch}</div>
          <div className="kpi-label">Under Watch</div>
          <div className="kpi-target">Monitor closely</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-value" style={{ color: '#16a34a' }}>{healthy}</div>
          <div className="kpi-label">Healthy</div>
          <div className="kpi-target">Normal operation</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-value" style={{ color: '#16a34a' }}>−30%</div>
          <div className="kpi-label">Downtime Reduction</div>
          <div className="kpi-target">vs. reactive maintenance</div>
        </div>
      </div>

      <div className="section-box" style={{ marginTop: 16 }}>
        <h3>Equipment Health Monitor</h3>
        <table className="data-table">
          <thead>
            <tr><th>ID</th><th>Type</th><th>Site</th><th>Health</th><th>Next Maint.</th><th>AI Prediction</th><th>Status</th></tr>
          </thead>
          <tbody>
            {equipment.map((e) => (
              <tr key={e.id}>
                <td><strong>{e.id}</strong></td>
                <td>{e.type}</td>
                <td>{e.site}</td>
                <td>
                  <div className="health-bar-wrap">
                    <div
                      className="health-bar"
                      style={{
                        width: `${e.health}%`,
                        background: e.health > 70 ? '#16a34a' : e.health > 40 ? '#d97706' : '#dc2626',
                      }}
                    />
                    <span className="health-pct">{e.health}%</span>
                  </div>
                </td>
                <td>{e.nextMaintenance}</td>
                <td>{e.prediction}</td>
                <td>
                  <span className={`badge ${e.status === 'Healthy' ? 'badge-green' : e.status === 'Watch' ? 'badge-yellow' : 'badge-red'}`}>
                    {e.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
