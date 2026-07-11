import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Datenschutz',
  robots: { index: false },
}

export default function DatenschutzPage() {
  return (
    <div className="mx-auto max-w-2xl px-6 pb-16 pt-28 md:pb-24 md:pt-36">
      <h1 className="font-display text-4xl tracking-tight">Datenschutzerklärung</h1>
      <div className="mt-10 space-y-4 text-sm leading-relaxed text-muted">
        <p className="text-nussbaum">
          Hinweis: Dies ist ein fiktives Demo-Projekt. Das „Studio Lichtblick“ existiert nicht; die
          gezeigten Projekte und Personen sind erfunden.
        </p>

        <h2 className="mt-8 font-display text-lg tracking-tight text-nussbaum">Verantwortlicher</h2>
        <p>Verantwortlich für diese Website ist die im Impressum genannte Person.</p>

        <h2 className="mt-8 font-display text-lg tracking-tight text-nussbaum">
          Keine Cookies, kein Tracking
        </h2>
        <p>
          Diese Website setzt keine Cookies, verwendet keine Analyse- oder Tracking-Dienste und
          bindet keine Inhalte Dritter (etwa Karten, Videos oder Social-Media-Plugins) ein. Ein
          Cookie-Banner ist daher nicht erforderlich.
        </p>

        <h2 className="mt-8 font-display text-lg tracking-tight text-nussbaum">Kontaktformular</h2>
        <p>
          Das Kontaktformular dieser Demo ist ohne E-Mail-Anbindung konfiguriert: Die eingegebenen
          Angaben (Name, E-Mail-Adresse, Nachricht) werden nicht gespeichert, nicht versendet und
          nicht weiterverarbeitet.
        </p>

        <h2 className="mt-8 font-display text-lg tracking-tight text-nussbaum">
          Hosting und Server-Logfiles
        </h2>
        <p>
          Die Website wird bei der Vercel Inc. (USA) gehostet. Beim Aufruf der Seite verarbeitet der
          Hosting-Anbieter technisch notwendige Daten (unter anderem IP-Adresse, Datum und Uhrzeit
          des Zugriffs sowie die aufgerufene Seite) in Server-Logfiles, um die Website auszuliefern
          und ihre Sicherheit und Stabilität zu gewährleisten. Rechtsgrundlage ist Art. 6 Abs. 1
          lit. f DSGVO (berechtigtes Interesse an einer funktionsfähigen Website). Die Verarbeitung
          in den USA stützt sich auf die Standardvertragsklauseln beziehungsweise das EU-US Data
          Privacy Framework.
        </p>

        <h2 className="mt-8 font-display text-lg tracking-tight text-nussbaum">Schriftarten</h2>
        <p>
          Schriftarten werden lokal von diesem Server ausgeliefert. Beim Seitenaufruf wird keine
          Verbindung zu Servern Dritter (etwa Google Fonts) hergestellt.
        </p>

        <h2 className="mt-8 font-display text-lg tracking-tight text-nussbaum">Ihre Rechte</h2>
        <p>
          Sie haben das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung,
          Datenübertragbarkeit und Widerspruch sowie das Recht auf Beschwerde bei einer
          Datenschutz-Aufsichtsbehörde. Wenden Sie sich dazu an die im Impressum genannte
          Kontaktadresse.
        </p>
      </div>
    </div>
  )
}
