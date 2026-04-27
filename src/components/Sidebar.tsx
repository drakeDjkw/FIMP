import React from 'react'

export const MODULES = [
  'Overview',
  'Geohazard',
  'Predictive Maintenance',
  'Fleet Intelligence',
  'Ore Optimization',
  'Safety AI'
] as const

type ModuleType = (typeof MODULES)[number]

export default function Sidebar({
  selected,
  onSelect,
}: {
  selected: ModuleType
  onSelect: (m: ModuleType) => void
}) {
  return (
    <aside className="sidebar">
      <div className="brand">FIMP</div>
      <nav>
        {MODULES.map((m) => (
          <button
            key={m}
            className={`nav-item ${selected === m ? 'active' : ''}`}
            onClick={() => onSelect(m)}
          >
            {m}
          </button>
        ))}
      </nav>
    </aside>
  )
}
