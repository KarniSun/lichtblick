'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

import type { Setting } from '@/payload-types'

const FALLBACK_NAV = [
  { href: '/work', label: 'Projekte' },
  { href: '/studio', label: 'Studio' },
  { href: '/studio#kontakt', label: 'Kontakt' },
]

// Fixed, unobtrusive - the studio name sits small in the top corner,
// no bar, no background; the hero photograph runs underneath.
export function Header({ settings }: { settings: Setting }) {
  const nav = settings.nav?.length ? settings.nav : FALLBACK_NAV
  const [open, setOpen] = useState(false)

  // Close the mobile panel on Escape
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50">
      {/* quiet strip, not a bar - keeps the wordmark legible over scrolling content.
          No backdrop-filter: it re-samples the backdrop on every scroll frame and
          janks scrolling over the large photos; a soft Kalkputz fade reads the same. */}
      <div className="relative flex items-baseline justify-between bg-gradient-to-b from-kalk/90 via-kalk/60 to-transparent px-6 pb-8 pt-6 md:px-10">
        <Link className="pointer-events-auto font-display text-base tracking-tight" href="/">
          {settings.siteTitle}
        </Link>

        {/* Desktop nav */}
        <nav className="pointer-events-auto hidden gap-5 md:flex md:gap-8">
          {nav.map((item) => (
            <Link
              className="text-sm text-nussbaum/80 transition-colors hover:text-patina"
              href={item.href}
              key={item.href + item.label}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Mobile toggle */}
        <button
          aria-controls="mobile-nav"
          aria-expanded={open}
          aria-label={open ? 'Menü schließen' : 'Menü öffnen'}
          className="pointer-events-auto -my-1 flex h-8 w-8 items-center justify-center text-nussbaum md:hidden"
          onClick={() => setOpen((v) => !v)}
          type="button"
        >
          <svg aria-hidden="true" fill="none" height="18" viewBox="0 0 18 18" width="18">
            {open ? (
              <path d="M3 3l12 12M15 3L3 15" stroke="currentColor" strokeWidth="1.4" />
            ) : (
              <path d="M1 4.5h16M1 13.5h16" stroke="currentColor" strokeWidth="1.4" />
            )}
          </svg>
        </button>

        {/* Mobile panel - quiet drop-down, kept mounted for a calm fade */}
        <nav
          aria-hidden={!open}
          aria-label="Hauptmenü"
          className={`absolute inset-x-0 top-full border-t border-line bg-kalk transition duration-300 motion-reduce:transition-none md:hidden ${
            open
              ? 'pointer-events-auto translate-y-0 opacity-100'
              : 'pointer-events-none -translate-y-1 opacity-0'
          }`}
          id="mobile-nav"
        >
          <div className="flex flex-col px-6 py-2">
            {nav.map((item) => (
              <Link
                className="border-b border-line py-4 text-base text-nussbaum/90 transition-colors last:border-b-0 hover:text-patina"
                href={item.href}
                key={item.href + item.label}
                onClick={() => setOpen(false)}
                tabIndex={open ? 0 : -1}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
      </div>
    </header>
  )
}
