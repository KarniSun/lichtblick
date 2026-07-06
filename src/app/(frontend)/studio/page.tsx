import type { Metadata } from 'next'

import config from '@payload-config'
import Image from 'next/image'
import { getPayload } from 'payload'

import { ContactForm } from '@/components/ContactForm'
import { Reveal } from '@/components/Reveal'
import { RichText } from '@/components/RichText'
import { resolveImage } from '@/lib/media'

export const metadata: Metadata = {
  title: 'Studio',
  description:
    'Studio Lichtblick, Architektur- und Innenarchitekturbüro in München. Team, Haltung und Kontakt.',
}

export default async function StudioPage() {
  const payload = await getPayload({ config })
  const [studio, settings] = await Promise.all([
    payload.findGlobal({ slug: 'studio-page' }),
    payload.findGlobal({ slug: 'settings' }),
  ])

  return (
    <div className="mx-auto max-w-[1400px] px-6 pb-16 pt-28 md:px-10 md:pb-24 md:pt-36">
      <Reveal>
        <h1 className="font-display text-[2.75rem] leading-[1.05] tracking-tight md:text-5xl md:leading-none">
          {studio.heading}
        </h1>
      </Reveal>

      {studio.intro && (
        <Reveal className="mt-10 max-w-2xl">
          <RichText className="text-lg" data={studio.intro} />
        </Reveal>
      )}

      {studio.team && studio.team.length > 0 && (
        <section className="mt-20 md:mt-28">
          <Reveal>
            <h2 className="label mb-10">Team</h2>
          </Reveal>
          <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 md:grid-cols-3">
            {studio.team.map((member, index) => {
              const portrait = resolveImage(member.portrait, 'card')
              const initials = member.name
                .split(/\s+/)
                .slice(0, 2)
                .map((part) => part[0]?.toUpperCase() ?? '')
                .join('')
              return (
                <Reveal delay={(index % 3) * 100} key={member.id ?? member.name}>
                  <div className="relative mb-3 aspect-[3/4] overflow-hidden">
                    {portrait ? (
                      <Image
                        alt={portrait.alt || member.name}
                        className="object-cover"
                        fill
                        sizes="(max-width: 640px) 100vw, 33vw"
                        src={portrait.url}
                      />
                    ) : (
                      // Quiet in-palette placeholder until a real portrait is added
                      <div
                        aria-hidden="true"
                        className="flex h-full w-full items-center justify-center bg-nussbaum/5"
                      >
                        <span className="font-display text-3xl tracking-tight text-muted">
                          {initials}
                        </span>
                      </div>
                    )}
                  </div>
                  <p className="border-t border-line pt-3 font-display text-lg tracking-tight">
                    {member.name}
                  </p>
                  {member.role && <p className="text-sm text-muted">{member.role}</p>}
                </Reveal>
              )
            })}
          </div>
        </section>
      )}

      <section className="mt-20 grid gap-12 border-t border-line pt-16 md:mt-28 md:grid-cols-2" id="kontakt">
        <Reveal>
          <h2 className="font-display text-3xl tracking-tight md:text-4xl">
            {studio.contactHeading}
          </h2>
          {settings.footer?.address && (
            <p className="mt-6 whitespace-pre-line text-sm leading-relaxed text-muted">
              {settings.footer.address}
            </p>
          )}
          {settings.footer?.email && (
            <p className="mt-4 text-sm">
              <a className="underline underline-offset-4" href={`mailto:${settings.footer.email}`}>
                {settings.footer.email}
              </a>
            </p>
          )}
          {settings.footer?.phone && (
            <p className="mt-1 text-sm text-muted">{settings.footer.phone}</p>
          )}
        </Reveal>
        <Reveal delay={120}>
          <ContactForm />
        </Reveal>
      </section>
    </div>
  )
}
