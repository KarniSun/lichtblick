import config from '@payload-config'
import Image from 'next/image'
import Link from 'next/link'
import { getPayload } from 'payload'

import type { Project } from '@/payload-types'

import { FeaturedProject } from '@/components/FeaturedProject'
import { Reveal } from '@/components/Reveal'
import { resolveImage } from '@/lib/media'

export default async function HomePage() {
  const payload = await getPayload({ config })

  // overrideAccess: false - apply the collection's read access so drafts stay hidden
  const [homepage, featuredResult] = await Promise.all([
    payload.findGlobal({ slug: 'homepage', overrideAccess: false }),
    payload.find({
      collection: 'projects',
      where: { featured: { equals: true } },
      sort: '-year',
      limit: 5,
      depth: 1,
      overrideAccess: false,
    }),
  ])

  const featured = featuredResult.docs
  const heroProject =
    homepage.heroProject && typeof homepage.heroProject === 'object'
      ? (homepage.heroProject as Project)
      : featured[0]

  const heroImage = heroProject ? resolveImage(heroProject.heroImage, 'large') : null

  return (
    <>
      {/* Hero - one full-bleed photograph, no overlay, no CTA.
          The studio name sits in the fixed header corner. */}
      <section className="relative h-svh min-h-[520px]">
        {heroImage && (
          <Image
            alt={heroImage.alt}
            className="object-cover"
            fill
            priority
            sizes="100vw"
            src={heroImage.url}
          />
        )}
        {/* Subtle bottom scrim so the Kalkputz statement stays legible over any
            hero - including light images - without washing out the photograph. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-nussbaum/55 to-transparent"
        />
        {/* h1: the statement is the page's headline, keeps heading order valid */}
        <h1 className="absolute bottom-8 left-6 max-w-md text-base font-normal leading-relaxed text-kalk [text-shadow:0_1px_10px_rgba(59,46,39,0.5)] md:left-10 md:text-sm">
          {homepage.heroStatement}
        </h1>
      </section>

      {/* Featured projects - editorial layout, images bleed to the right edge */}
      <section className="py-20 pl-6 md:py-28 md:pl-10">
        <div className="mb-14 flex items-baseline justify-between pr-6 md:mb-20 md:pr-10">
          <h2 className="label">Ausgewählte Projekte</h2>
          <Link
            className="text-sm text-patina underline decoration-patina/40 underline-offset-4 transition-colors hover:decoration-patina"
            href="/work"
          >
            Alle Projekte
          </Link>
        </div>
        <div className="space-y-24 md:space-y-36">
          {featured.map((project, index) => (
            <FeaturedProject index={index} key={project.id} project={project} />
          ))}
        </div>
      </section>

      {/* Approach - short, quiet, aligned with the content column */}
      {homepage.philosophy && (
        <section className="border-t border-line">
          <div className="max-w-2xl px-6 py-24 md:ml-[240px] md:py-36 md:pl-12 lg:ml-[280px] lg:pl-16">
            <Reveal>
              <span aria-hidden="true" className="block h-px w-10 bg-patina" />
              {homepage.philosophyHeading && (
                <h2 className="label mt-6">{homepage.philosophyHeading}</h2>
              )}
              <p className="mt-6 font-display text-2xl leading-snug tracking-tight md:text-3xl">
                {homepage.philosophy}
              </p>
            </Reveal>
          </div>
        </section>
      )}
    </>
  )
}
