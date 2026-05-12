const KPI_CARDS = [
  { label: 'Copper Production Gain', value: '+8.2%', target: 'Target: 5–10%', color: '#16a34a' },
  { label: "Add'l Annual Output", value: '~200M lbs', target: 'vs. baseline', color: '#2563eb' },
  { label: 'Processing Efficiency', value: '+22%', target: 'Target: 20–25%', color: '#16a34a' },
  { label: 'Downtime Reduction', value: '−30%', target: 'Equipment fleet', color: '#16a34a' },
  { label: 'AI Models Active', value: '6', target: 'Grasberg live', color: '#7c3aed' },
  { label: 'Sensor Data Points/s', value: '1.1M', target: 'Real-time ingestion', color: '#0891b2' },
]

const SITES = [
  { name: 'Grasberg (PTFI), Indonesia', flag: '🇮🇩', status: '5G Active' },
]

const PARTNERS = [
  { name: 'McKinsey', role: 'Custom AI models & operational improvements' },
  { name: 'Accenture', role: 'Cloud platform & mine solution analytics' },
  { name: 'WWT', role: 'Hauling fleet data integration' },
  { name: 'Nutanix', role: 'Hybrid cloud infrastructure (remote sites)' },
]

export default function Overview() {
  return (
    <div className="module">
      <div className="kpi-grid">
        {KPI_CARDS.map((k) => (
          <div key={k.label} className="kpi-card">
            <div className="kpi-value" style={{ color: k.color }}>{k.value}</div>
            <div className="kpi-label">{k.label}</div>
            <div className="kpi-target">{k.target}</div>
          </div>
        ))}
      </div>

      <div className="section-row" style={{ marginTop: 16 }}>
        <div className="section-box">
          <h3>Active Sites</h3>
          <table className="data-table">
            <thead>
              <tr><th>Site</th><th>Status</th></tr>
            </thead>
            <tbody>
              {SITES.map((s) => (
                <tr key={s.name}>
                  <td>{s.flag} {s.name}</td>
                  <td>
                    <span className={`badge ${s.status === '5G Active' ? 'badge-blue' : 'badge-green'}`}>
                      {s.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="section-box">
          <h3>Strategic Partners</h3>
          <table className="data-table">
            <thead>
              <tr><th>Partner</th><th>Role</th></tr>
            </thead>
            <tbody>
              {PARTNERS.map((p) => (
                <tr key={p.name}>
                  <td><strong>{p.name}</strong></td>
                  <td>{p.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="info-box" style={{ marginTop: 16 }}>
        Freeport-McMoRan's AI-driven intelligence platform processes millions of data points from sensors on
        trucks, shovels, and processing plants to make real-time operational adjustments across all sites.
      </div>
    </div>
  )
}
