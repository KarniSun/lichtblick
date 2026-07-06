import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[70svh] max-w-[1400px] flex-col justify-center px-6 py-28 md:px-10">
      <p className="label">Fehler 404</p>
      <h1 className="mt-6 max-w-2xl font-display text-4xl leading-tight tracking-tight md:text-5xl">
        Diese Seite konnten wir nicht finden.
      </h1>
      <p className="mt-6 max-w-md text-base leading-relaxed text-muted">
        Vielleicht wurde sie verschoben oder existiert nicht mehr. Zurück zu den Projekten oder zur
        Startseite.
      </p>
      <div className="mt-10 flex gap-8 text-sm">
        <Link
          className="text-patina underline decoration-patina/40 underline-offset-4 transition-colors hover:decoration-patina"
          href="/"
        >
          Startseite
        </Link>
        <Link
          className="text-patina underline decoration-patina/40 underline-offset-4 transition-colors hover:decoration-patina"
          href="/work"
        >
          Projekte
        </Link>
      </div>
    </div>
  )
}
