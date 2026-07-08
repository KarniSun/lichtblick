import Image from 'next/image'
import Link from 'next/link'

import type { Project } from '@/payload-types'

import { resolveImage } from '@/lib/media'
import { CATEGORY_LABELS, cn } from '@/lib/utils'

// bleed: on mobile the image runs edge to edge while the meta keeps the page inset
export function ProjectCard({ bleed = false, project }: { bleed?: boolean; project: Project }) {
  const image = resolveImage(project.heroImage, 'card')

  return (
    <Link className="group block" href={`/work/${project.slug}`}>
      <div
        className={cn(
          'relative aspect-[4/3] overflow-hidden bg-line',
          bleed && '-mx-6 md:mx-0',
        )}
      >
        {image && (
          <Image
            alt={image.alt || project.title}
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            src={image.url}
          />
        )}
        {/* hover reveal - name / location / year */}
        <div className="absolute inset-0 hidden items-end bg-nussbaum/0 transition-colors duration-500 group-hover:bg-nussbaum/45 md:flex">
          <div className="w-full p-6 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
            <p className="font-display text-xl text-kalk">{project.title}</p>
            <p className="mt-1 text-sm text-kalk/80">
              {project.location} · {project.year}
            </p>
          </div>
        </div>
      </div>
      {/* static meta - always visible on mobile, quiet on desktop */}
      <div className="mt-3 flex items-baseline justify-between md:mt-4">
        <p className="font-display text-lg tracking-tight">{project.title}</p>
        <p className="label">{CATEGORY_LABELS[project.category] ?? project.category}</p>
      </div>
      <p className="mt-0.5 text-sm text-muted md:hidden">
        {project.location} · {project.year}
      </p>
    </Link>
  )
}
