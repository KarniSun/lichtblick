import React from 'react'

// Small nav mark (admin.components.graphics.Icon).
// Payload's icon slot is ~18px wide with overflow hidden, so the
// monogram must stay within that. Styling in custom.scss.
export function Icon() {
  return (
    <span className="admin-wordmark" style={{ fontSize: '0.72rem', letterSpacing: 0 }}>
      SL
    </span>
  )
}
