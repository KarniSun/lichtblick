import { ImageResponse } from 'next/og'

// Social share card (link previews in email, Slack, LinkedIn, …)
export const alt = 'Studio Lichtblick - Innenarchitektur, München'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

const KALK = '#EDE8E0'
const NUSSBAUM = '#3B2E27'
const MUTED = '#6B6157'
const PATINA = '#5C6B5D'
const RAUCH = '#A69B8D'

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '80px',
          backgroundColor: KALK,
          color: NUSSBAUM,
        }}
      >
        <div style={{ display: 'flex', fontSize: 26, letterSpacing: 1, color: MUTED }}>
          Innenarchitektur · München
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', fontSize: 92, fontWeight: 600, letterSpacing: -2 }}>
            Studio Lichtblick
          </div>
          <div style={{ display: 'flex', width: 64, height: 3, backgroundColor: PATINA, marginTop: 28 }} />
          <div style={{ display: 'flex', fontSize: 34, color: MUTED, marginTop: 28, maxWidth: 760 }}>
            Räume aus Kalkputz, Holz und ruhigem Licht. Zum Wohnen, Arbeiten und Ankommen.
          </div>
        </div>

        {/* Quiet nod to the material palette */}
        <div style={{ display: 'flex', gap: 12 }}>
          {[NUSSBAUM, RAUCH, PATINA].map((c) => (
            <div key={c} style={{ display: 'flex', width: 40, height: 40, backgroundColor: c }} />
          ))}
        </div>
      </div>
    ),
    { ...size },
  )
}
