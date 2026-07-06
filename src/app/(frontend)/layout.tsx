import type { Metadata } from 'next'

import config from '@payload-config'
import { Fraunces, Hanken_Grotesk } from 'next/font/google'
import { getPayload } from 'payload'
import React from 'react'

import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'

import './globals.css'

const hanken = Hanken_Grotesk({
  subsets: ['latin'],
  variable: '--font-hanken',
})

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  axes: ['opsz'],
})

export const metadata: Metadata = {
  // Base for resolving absolute OG/social image URLs. Env-driven so it is
  // correct once deployed; falls back to localhost for local dev.
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'),
  title: {
    default: 'Studio Lichtblick - Innenarchitektur, München',
    template: '%s - Studio Lichtblick',
  },
  description:
    'Studio Lichtblick plant Innenräume für Wohnen und Arbeit in München, mit Kalkputz, Holz und ruhigem Licht.',
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const payload = await getPayload({ config })
  const settings = await payload.findGlobal({ slug: 'settings' })

  return (
    <html className={`${hanken.variable} ${fraunces.variable}`} lang="de">
      <body className="flex min-h-svh flex-col">
        <Header settings={settings} />
        <main className="flex-1">{children}</main>
        <Footer settings={settings} />
      </body>
    </html>
  )
}
