import { Fraunces, Hanken_Grotesk } from 'next/font/google'
import Link from 'next/link'

import './(frontend)/globals.css'

// Global 404 for unmatched URLs. The app uses route groups with no root
// layout, so Next supplies a default <html>/<body> here - this component must
// only render the inner content (fonts scoped to the wrapper). In-app
// notFound() calls (e.g. a bad project slug) use (frontend)/not-found.tsx,
// which keeps the full Header/Footer.
const hanken = Hanken_Grotesk({ subsets: ['latin'], variable: '--font-hanken' })
const fraunces = Fraunces({ subsets: ['latin'], variable: '--font-fraunces', axes: ['opsz'] })

const linkClass =
  'text-patina underline decoration-patina/40 underline-offset-4 transition-colors hover:decoration-patina'

export default function GlobalNotFound() {
  return (
    <div
      className={`${hanken.variable} ${fraunces.variable} flex min-h-svh flex-col justify-center bg-kalk px-6 text-nussbaum antialiased md:px-10`}
      // This route renders outside the (frontend) layout, where the Tailwind
      // font tokens don't resolve - set the families from the next/font vars directly.
      style={{ fontFamily: 'var(--font-hanken), "Helvetica Neue", Arial, sans-serif' }}
    >
      <p className="label">Fehler 404</p>
      <h1
        className="mt-6 max-w-2xl text-4xl leading-tight tracking-tight md:text-5xl"
        style={{ fontFamily: 'var(--font-fraunces), Georgia, serif' }}
      >
        Diese Seite konnten wir nicht finden.
      </h1>
      <p className="mt-6 max-w-md text-base leading-relaxed text-muted">
        Vielleicht wurde sie verschoben oder existiert nicht mehr.
      </p>
      <div className="mt-10 flex gap-8 text-sm">
        <Link className={linkClass} href="/">
          Startseite
        </Link>
        <Link className={linkClass} href="/work">
          Projekte
        </Link>
      </div>
    </div>
  )
}
