import type { Metadata } from 'next'

import config from '@payload-config'
import Link from 'next/link'
import { getPayload } from 'payload'

import { ProjectCard } from '@/components/ProjectCard'
import { Reveal } from '@/components/Reveal'
import { CATEGORY_LABELS, cn } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Projekte',
  description: 'Ausgewählte Wohn-, Gewerbe- und Interieurprojekte von Studio Lichtblick.',
}

const CATEGORIES = ['residential', 'commercial', 'interior'] as const

type Props = {
  searchParams: Promise<{ kategorie?: string }>
}

export default async function WorkPage({ searchParams }: Props) {
  const { kategorie } = await searchParams
  const activeCategory = CATEGORIES.find((c) => c === kategorie)

  const payload = await getPayload({ config })
  const result = await payload.find({
    collection: 'projects',
    where: activeCategory ? { category: { equals: activeCategory } } : undefined,
    sort: '-year',
    limit: 100,
    depth: 1,
    overrideAccess: false,
  })

  return (
    <div className="mx-auto max-w-[1400px] px-6 pb-16 pt-28 md:px-10 md:pb-24 md:pt-36">
      <Reveal>
        <h1 className="font-display text-[2.75rem] leading-[1.05] tracking-tight md:text-5xl md:leading-none">
          Projekte
        </h1>

        <nav className="mt-8 flex flex-wrap gap-5 border-b border-line pb-5 md:gap-8">
          <Link
            className={cn(
              'text-sm transition-colors',
              !activeCategory ? 'text-nussbaum' : 'text-muted hover:text-nussbaum',
            )}
            href="/work"
          >
            Alle
          </Link>
          {CATEGORIES.map((category) => (
            <Link
              className={cn(
                'text-sm transition-colors',
                activeCategory === category ? 'text-nussbaum' : 'text-muted hover:text-nussbaum',
              )}
              href={`/work?kategorie=${category}`}
              key={category}
            >
              {CATEGORY_LABELS[category]}
            </Link>
          ))}
        </nav>
      </Reveal>

      <h2 className="sr-only">Projektübersicht</h2>
      {result.docs.length === 0 ? (
        <p className="mt-16 text-muted">Keine Projekte in dieser Kategorie.</p>
      ) : (
        <div className="mt-12 grid gap-x-6 gap-y-14 md:grid-cols-2 md:gap-x-8 md:gap-y-20 lg:grid-cols-3">
          {result.docs.map((project, index) => (
            <Reveal
              className={cn(
                // mobile rhythm: full-bleed cards alternate with narrower offset ones
                index % 2 === 1 &&
                  (index % 4 === 1 ? 'ml-auto w-[85%] md:ml-0 md:w-auto' : 'mr-auto w-[85%] md:mr-0 md:w-auto'),
              )}
              delay={(index % 3) * 100}
              key={project.id}
            >
              <ProjectCard bleed={index % 2 === 0} project={project} />
            </Reveal>
          ))}
        </div>
      )}
    </div>
  )
}
