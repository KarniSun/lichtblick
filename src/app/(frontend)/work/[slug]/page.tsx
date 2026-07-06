import type { Metadata } from 'next'

import config from '@payload-config'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'

import { RenderBlocks } from '@/components/blocks/RenderBlocks'
import { Reveal } from '@/components/Reveal'
import { resolveImage } from '@/lib/media'
import { CATEGORY_LABELS } from '@/lib/utils'

type Props = {
  params: Promise<{ slug: string }>
}

async function getProject(slug: string) {
  const payload = await getPayload({ config })
  const result = await payload.find({
    collection: 'projects',
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 1,
    overrideAccess: false,
  })
  return result.docs[0] ?? null
}

export async function generateStaticParams() {
  const payload = await getPayload({ config })
  const result = await payload.find({
    collection: 'projects',
    limit: 100,
    select: { slug: true },
    overrideAccess: false,
  })
  return result.docs.filter((doc) => doc.slug).map((doc) => ({ slug: doc.slug as string }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const project = await getProject(slug)
  if (!project) return {}

  return {
    title: project.title,
    description: project.summary ?? `${project.title}, ${project.location}, ${project.year}`,
  }
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params
  const project = await getProject(slug)
  if (!project) notFound()

  const heroImage = resolveImage(project.heroImage, 'large')

  // next / previous project by year, newest first
  const payload = await getPayload({ config })
  const all = await payload.find({
    collection: 'projects',
    sort: '-year',
    limit: 100,
    select: { slug: true, title: true },
    overrideAccess: false,
  })
  const index = all.docs.findIndex((doc) => doc.id === project.id)
  const previous = index > 0 ? all.docs[index - 1] : null
  const next = index >= 0 && index < all.docs.length - 1 ? all.docs[index + 1] : null

  return (
    <article>
      {/* Hero */}
      <div className="relative h-[70svh] min-h-[420px] bg-ink">
        {heroImage && (
          <Image
            alt={heroImage.alt || project.title}
            className="object-cover"
            fill
            priority
            sizes="100vw"
            src={heroImage.url}
          />
        )}
      </div>

      {/* Title + meta */}
      <header className="mx-auto max-w-[1400px] px-6 pt-12 md:px-10 md:pt-16">
        <Reveal>
          <h1 className="font-display text-[2.75rem] leading-[1.05] tracking-tight md:text-5xl md:leading-none">
            {project.title}
          </h1>
          <dl className="mt-6 flex flex-wrap gap-x-10 gap-y-2">
            <div>
              <dt className="label">Ort</dt>
              <dd className="mt-1 text-sm">{project.location}</dd>
            </div>
            <div>
              <dt className="label">Jahr</dt>
              <dd className="mt-1 text-sm">{project.year}</dd>
            </div>
            <div>
              <dt className="label">Kategorie</dt>
              <dd className="mt-1 text-sm">
                {CATEGORY_LABELS[project.category] ?? project.category}
              </dd>
            </div>
          </dl>
          {project.summary && (
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted">{project.summary}</p>
          )}
        </Reveal>
      </header>

      {/* Flexible layout blocks */}
      <div className="mx-auto max-w-[1400px] px-6 py-16 md:px-10 md:py-24">
        <RenderBlocks blocks={project.layout} />
      </div>

      {/* Prev / next */}
      <nav className="border-t border-line">
        <div className="mx-auto flex max-w-[1400px] justify-between gap-6 px-6 py-10 md:px-10">
          {next ? (
            <Link className="group text-sm" href={`/work/${next.slug}`}>
              <span className="label block">← Vorheriges Projekt</span>
              <span className="mt-1 block font-display text-lg tracking-tight text-muted transition-colors group-hover:text-ink">
                {next.title}
              </span>
            </Link>
          ) : (
            <span />
          )}
          {previous ? (
            <Link className="group text-right text-sm" href={`/work/${previous.slug}`}>
              <span className="label block">Nächstes Projekt →</span>
              <span className="mt-1 block font-display text-lg tracking-tight text-muted transition-colors group-hover:text-ink">
                {previous.title}
              </span>
            </Link>
          ) : (
            <span />
          )}
        </div>
      </nav>
    </article>
  )
}
