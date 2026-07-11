import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Impressum',
  robots: { index: false },
}

export default function ImpressumPage() {
  return (
    <div className="mx-auto max-w-2xl px-6 pb-16 pt-28 md:pb-24 md:pt-36">
      <h1 className="font-display text-4xl tracking-tight">Impressum</h1>
      <div className="mt-10 space-y-4 text-sm leading-relaxed text-muted">
        <p className="text-nussbaum">
          Hinweis: Dies ist ein fiktives Demo-Projekt. Das „Studio Lichtblick“ ist ein erfundenes
          Studio; sämtliche Projekte, Namen und Kontaktdaten im Inhalt der Website sind frei
          erfunden. Die Seite dient ausschließlich als Portfolio-Demonstration.
        </p>

        <h2 className="mt-8 font-display text-lg tracking-tight text-nussbaum">
          Angaben gemäß § 5 DDG
        </h2>
        <p>
          Diese Demo-Website wird bereitgestellt von:
          <br />
          Marcel Hoang
          <br />
          E-Mail: marcelhoang@web.de
        </p>

        <h2 className="mt-8 font-display text-lg tracking-tight text-nussbaum">
          Verantwortlich für den Inhalt
        </h2>
        <p>Marcel Hoang</p>
      </div>
    </div>
  )
}
