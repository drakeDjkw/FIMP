import { useEffect, useState } from 'react'

const TWINS = [
  {
    site: 'Grasberg (PTFI), Indonesia',
    flag: '🇮🇩',
    sensors: 15300,
    geoPoints: '3.4M',
    status: 'Live',
    models: ['Underground mapping', 'Cave propagation', 'Seismic monitoring'],
  },
]

export default function DigitalTwin() {
  const [syncTimes, setSyncTimes] = useState(TWINS.map(() => `${Math.floor(Math.random() * 5) + 1}s ago`))

  useEffect(() => {
    const iv = setInterval(() => {
      setSyncTimes(TWINS.map(() => `${Math.floor(Math.random() * 8) + 1}s ago`))
    }, 3000)
    return () => clearInterval(iv)
  }, [])

  return (
    <div className="module">
      <div className="module-header-row">
        <span><span className="live-dot" /> Digital Twin model active: <strong>Grasberg (PTFI)</strong></span>
        <span className="muted">Cloud platform: Accenture</span>
      </div>

      <div className="twin-grid">
        {TWINS.map((t, i) => (
          <div key={t.site} className="twin-card">
            <div className="twin-header">
              <span className="twin-flag">{t.flag}</span>
              <div>
                <div className="twin-site">{t.site}</div>
                <span className="badge badge-green">{t.status}</span>
              </div>
            </div>
            <div className="twin-stats">
              <div>
                <span className="muted">Sensors</span>
                <strong>{t.sensors.toLocaleString()}</strong>
              </div>
              <div>
                <span className="muted">Geo points</span>
                <strong>{t.geoPoints}</strong>
              </div>
              <div>
                <span className="muted">Last sync</span>
                <strong>{syncTimes[i]}</strong>
              </div>
            </div>
            <div className="twin-models">
              <div className="muted" style={{ marginBottom: 6, fontSize: 11 }}>AI models running:</div>
              {t.models.map((m) => (
                <div key={m} className="model-tag">{m}</div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="info-box" style={{ marginTop: 20 }}>
        Digital twins combine <strong>geological data</strong>, <strong>live sensor feeds</strong>, and <strong>AI models</strong> to
        create virtual mine replicas — enabling real-time operational decisions, predictive analysis, and
        scenario planning without disrupting production.
      </div>
    </div>
  )
}
