import Link from 'next/link'

import type { Setting } from '@/payload-types'

export function Footer({ settings }: { settings: Setting }) {
  const { footer } = settings

  return (
    <footer className="border-t border-line">
      <div className="mx-auto grid max-w-[1400px] gap-10 px-6 py-14 md:grid-cols-4 md:px-10">
        <div>
          <p className="font-display text-lg tracking-tight">{settings.siteTitle}</p>
          {footer?.address && (
            <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-muted">
              {footer.address}
            </p>
          )}
        </div>

        <div className="text-sm text-muted">
          {footer?.email && (
            <p>
              <a className="transition-colors hover:text-patina" href={`mailto:${footer.email}`}>
                {footer.email}
              </a>
            </p>
          )}
          {footer?.phone && <p className="mt-1">{footer.phone}</p>}
        </div>

        {footer?.socialLinks && footer.socialLinks.length > 0 && (
          <ul className="text-sm text-muted">
            {footer.socialLinks.map((link) => (
              <li key={link.url + link.label}>
                <a
                  className="transition-colors hover:text-patina"
                  href={link.url}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        )}

        <div className="text-sm text-muted md:text-right">
          <p>
            <Link className="transition-colors hover:text-patina" href="/impressum">
              Impressum
            </Link>
          </p>
          <p className="mt-1">
            <Link className="transition-colors hover:text-patina" href="/datenschutz">
              Datenschutz
            </Link>
          </p>
        </div>
      </div>
    </footer>
  )
}
