import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Impressum',
  robots: { index: false },
}

export default function ImpressumPage() {
  return (
    <div className="mx-auto max-w-2xl px-6 pb-16 pt-28 md:pb-24 md:pt-36">
      <h1 className="font-display text-4xl tracking-tight">Impressum</h1>
      <div className="mt-10 space-y-6 text-sm leading-relaxed text-muted">
        <p className="text-ink">
          Hinweis: Dies ist ein fiktives Demo-Projekt. Studio Lichtblick existiert nicht.
        </p>
        <p>
          Studio Lichtblick GmbH
          <br />
          Musterstraße 12
          <br />
          80331 München
        </p>
        <p>
          Vertreten durch: Anna Muster
          <br />
          E-Mail: studio@lichtblick.example
          <br />
          Telefon: +49 89 000000
        </p>
        <p>
          Handelsregister: Amtsgericht München, HRB 000000
          <br />
          USt-IdNr.: DE000000000
        </p>
      </div>
    </div>
  )
}
