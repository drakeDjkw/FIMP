export default function RightPanel({ children }: { children: React.ReactNode }) {
  return (
    <aside className="right-panel">
      <div className="right-header">
        <span className="live-dot" /> AI Telemetry Feed
      </div>
      {children}
    </aside>
  )
}
