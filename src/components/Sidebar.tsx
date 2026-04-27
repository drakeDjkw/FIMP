import React from 'react'

const modules = [
  'Overview',
  'Geohazard',
  'Predictive Maintenance',
  'Fleet Intelligence',
  'Ore Optimization',
  'Safety AI'
]

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="brand">FIMP</div>
      <nav>
        {modules.map((m) => (
          <button key={m} className="nav-item">{m}</button>
        ))}
      </nav>
    </aside>
  )
}
