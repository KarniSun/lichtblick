import React from 'react'

// Login screen logo (admin.components.graphics.Logo).
// Styling lives in src/app/(payload)/custom.scss.
export function Logo() {
  return (
    <div className="admin-brand">
      <span className="admin-wordmark" style={{ fontSize: '2rem' }}>
        Studio Lichtblick
      </span>
      <span aria-hidden="true" className="admin-brand__rule" />
    </div>
  )
}
