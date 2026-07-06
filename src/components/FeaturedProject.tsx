import Image from 'next/image'
import Link from 'next/link'

import type { Project } from '@/payload-types'

import { Reveal } from '@/components/Reveal'
import { resolveImage, type ResolvedImage } from '@/lib/media'
import { CATEGORY_LABELS, cn } from '@/lib/utils'

// Pull up to three images out of the project's layout blocks:
// the full-width (landscape) image first, then the two-image details.
function collectImages(project: Project): ResolvedImage[] {
  const landscapes: ResolvedImage[] = []
  const details: ResolvedImage[] = []

  for (const block of project.layout ?? []) {
    if (block.blockType === 'fullImage') {
      const img = resolveImage(block.image, 'large')
      if (img) landscapes.push(img)
    }
    if (block.blockType === 'twoImage') {
      const a = resolveImage(block.imageOne, 'card')
      const b = resolveImage(block.imageTwo, 'card')
      if (a) details.push(a)
      if (b) details.push(b)
    }
  }

  const hero = resolveImage(project.heroImage, 'large')
  const first = landscapes[0] ?? hero

  return [first, details[0], details[1]].filter(Boolean) as ResolvedImage[]
}

function ProjectImage({
  className,
  image,
  sizes,
  title,
}: {
  className?: string
  image: ResolvedImage
  sizes: string
  title: string
}) {
  return (
    <Reveal className={cn('reveal--clip', className)}>
      <Image
        alt={image.alt || title}
        className="h-auto w-full"
        height={image.height}
        sizes={sizes}
        src={image.url}
        width={image.width}
      />
    </Reveal>
  )
}

function MaterialLabel({ text, className = '' }: { className?: string; text?: string }) {
  if (!text) return null
  return (
    <Reveal className={className} delay={300}>
      {/* hyphens-auto: labels sit in narrow gutters on mobile and German
          material words ("aufgearbeitet") need to break gracefully */}
      <p className="hyphens-auto break-words text-xs tracking-wide text-patina">{text}</p>
    </Reveal>
  )
}

type Props = {
  index: number
  project: Project
}

// One featured project: narrow left column with title/metadata that stays
// anchored (sticky) while the images scroll past on the right, bleeding to
// the viewport edge. Material labels fade in beside the images.
export function FeaturedProject({ index, project }: Props) {
  const images = collectImages(project)
  const materials = project.materials ?? []
  const mirrored = index % 2 === 1

  return (
    <article className="md:grid md:grid-cols-[240px_minmax(0,1fr)] md:gap-x-12 lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-x-16">
      {/* anchored metadata column */}
      <aside className="pr-6 md:sticky md:top-28 md:self-start md:pr-0">
        <h3 className="font-display text-[2.75rem] leading-[1.08] tracking-tight md:text-4xl md:leading-tight">
          <Link href={`/work/${project.slug}`}>{project.title}</Link>
        </h3>
        {/* mobile: one quiet meta line; desktop keeps the two stacked lines */}
        <p className="mt-3 text-sm text-muted md:hidden">
          {project.location}, {project.year} · {CATEGORY_LABELS[project.category] ?? project.category}
        </p>
        <p className="mt-3 hidden text-sm text-muted md:block">
          {project.location}, {project.year}
        </p>
        <p className="mt-0.5 hidden text-sm text-muted md:block">
          {CATEGORY_LABELS[project.category] ?? project.category}
        </p>
        {project.summary && (
          <p className="mt-6 hidden max-w-[32ch] text-sm leading-relaxed md:block">
            {project.summary}
          </p>
        )}
        <Link
          className="mt-6 hidden text-sm text-patina underline decoration-patina/40 underline-offset-4 transition-colors hover:decoration-patina md:inline-block"
          href={`/work/${project.slug}`}
        >
          Zum Projekt
        </Link>
      </aside>

      {/* images - right column, bleeding to the viewport edge */}
      <div className="mt-8 space-y-12 md:mt-0 md:space-y-20">
        {/* row 1 - landscape; edge-to-edge on mobile, full column width on desktop */}
        {images[0] && (
          <div>
            <ProjectImage
              className="-ml-6 w-[calc(100%+1.5rem)] md:ml-0 md:w-full"
              image={images[0]}
              sizes="(max-width: 768px) 100vw, 75vw"
              title={project.title}
            />
            <MaterialLabel className="mt-3 pr-6 md:pr-10" text={materials[0]?.label} />
          </div>
        )}

        {/* row 2 - portrait detail with the label in the gutter beside it
            (mobile: ~82% width bleeding to one screen edge, label in the free gutter) */}
        {images[1] &&
          (mirrored ? (
            <div className="-ml-6 grid grid-cols-[calc(76%+1.5rem)_minmax(0,1fr)] items-end gap-4 md:ml-0 md:grid-cols-[minmax(0,7fr)_minmax(0,3fr)] md:gap-8 md:pr-10">
              <ProjectImage
                image={images[1]}
                sizes="(max-width: 768px) 82vw, 50vw"
                title={project.title}
              />
              <MaterialLabel className="pb-1" text={materials[1]?.label} />
            </div>
          ) : (
            <div className="grid grid-cols-[minmax(0,1fr)_76%] items-end gap-4 md:grid-cols-[minmax(0,3fr)_minmax(0,7fr)] md:gap-8">
              <ProjectImage
                image={images[1]}
                sizes="(max-width: 768px) 76vw, 50vw"
                title={project.title}
              />
              <MaterialLabel className="order-first pb-1" text={materials[1]?.label} />
            </div>
          ))}

        {/* row 3 - smaller portrait, offset to the opposite side
            (mobile: ~70% width bleeding to the other screen edge than row 2) */}
        {images[2] &&
          (mirrored ? (
            <div className="flex items-end justify-end gap-4 md:w-[80%] md:justify-start md:gap-8">
              <div className="w-[70%] shrink-0">
                <ProjectImage
                  image={images[2]}
                  sizes="(max-width: 768px) 70vw, 40vw"
                  title={project.title}
                />
              </div>
              <MaterialLabel
                className="order-first min-w-0 flex-1 pb-1 md:order-none md:flex-none"
                text={materials[2]?.label}
              />
            </div>
          ) : (
            <div className="-ml-6 flex items-end gap-4 md:ml-auto md:w-[72%] md:gap-8">
              <div className="w-[calc(70%+1.5rem)] shrink-0 md:w-auto md:flex-1">
                <ProjectImage
                  image={images[2]}
                  sizes="(max-width: 768px) 76vw, 45vw"
                  title={project.title}
                />
              </div>
              <MaterialLabel
                className="min-w-0 pb-1 md:order-first md:shrink-0"
                text={materials[2]?.label}
              />
            </div>
          ))}

        {/* mobile-only project link */}
        <Link
          className="inline-block pr-6 text-sm text-patina underline decoration-patina/40 underline-offset-4 md:hidden"
          href={`/work/${project.slug}`}
        >
          Zum Projekt
        </Link>
      </div>
    </article>
  )
}
