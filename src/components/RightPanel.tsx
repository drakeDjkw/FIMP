import React from 'react'

export default function RightPanel({ children }: { children: React.ReactNode }) {
  return (
    <aside className="right-panel">
      <div className="right-header">Right Panel</div>
      <div className="right-body">{children}</div>
    </aside>
  )
}
