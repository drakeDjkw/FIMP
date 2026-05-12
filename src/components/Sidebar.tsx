export const MODULES = [
  'Overview',
  'Real-time Processing',
  'Ore Sorting',
  'Digital Twin',
  'Predictive Maintenance',
  'Fleet Intelligence',
  'Safety & 5G',
] as const

type ModuleType = (typeof MODULES)[number]

const SECTIONS: Array<{ label: string; modules: ModuleType[] }> = [
  { label: 'Platform', modules: ['Overview'] },
  { label: 'AI Operations', modules: ['Real-time Processing', 'Ore Sorting'] },
  { label: 'Intelligence', modules: ['Digital Twin', 'Predictive Maintenance', 'Fleet Intelligence'] },
  { label: 'Safety', modules: ['Safety & 5G'] },
]

export default function Sidebar({
  selected,
  onSelect,
}: {
  selected: ModuleType
  onSelect: (m: ModuleType) => void
}) {
  return (
    <aside className="sidebar">
      <div>
        <div className="brand">FIMP</div>
        <div className="brand-sub">Freeport Intelligence Mining Platform</div>
      </div>
      <nav>
        {SECTIONS.map((s) => (
          <div key={s.label}>
            <div className="nav-section">{s.label}</div>
            {s.modules.map((m) => (
              <button
                key={m}
                className={`nav-item ${selected === m ? 'active' : ''}`}
                onClick={() => onSelect(m)}
              >
                {m}
              </button>
            ))}
          </div>
        ))}
      </nav>
      <div className="sidebar-footer">
        Powered by Accenture · Nutanix<br />
        McKinsey AI · WWT
      </div>
    </aside>
  )
}
