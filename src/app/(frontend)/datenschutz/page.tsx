import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Datenschutz',
  robots: { index: false },
}

export default function DatenschutzPage() {
  return (
    <div className="mx-auto max-w-2xl px-6 pb-16 pt-28 md:pb-24 md:pt-36">
      <h1 className="font-display text-4xl tracking-tight">Datenschutzerklärung</h1>
      <div className="mt-10 space-y-6 text-sm leading-relaxed text-muted">
        <p className="text-nussbaum">
          Hinweis: Dies ist ein fiktives Demo-Projekt. Studio Lichtblick existiert nicht.
        </p>
        <p>
          Diese Website verwendet keine Tracking-Cookies und keine Analyse-Dienste. Bei Nutzung des
          Kontaktformulars werden die angegebenen Daten (Name, E-Mail-Adresse, Nachricht)
          ausschließlich zur Bearbeitung der Anfrage verwendet und nicht an Dritte weitergegeben.
        </p>
        <p>
          Für den Versand des Kontaktformulars wird der Dienst Resend verwendet. Die Verarbeitung
          erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO.
        </p>
        <p>
          Sie haben jederzeit das Recht auf Auskunft, Berichtigung und Löschung Ihrer gespeicherten
          Daten. Wenden Sie sich dazu an die im Impressum angegebene Adresse.
        </p>
      </div>
    </div>
  )
}
