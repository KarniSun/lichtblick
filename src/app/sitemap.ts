import type { MetadataRoute } from 'next'

import config from '@payload-config'
import { getPayload } from 'payload'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'

// Legal pages (Impressum/Datenschutz) are intentionally excluded: they are noindex.
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const payload = await getPayload({ config })
  const projects = await payload.find({
    collection: 'projects',
    limit: 100,
    overrideAccess: false,
    select: { slug: true, updatedAt: true },
  })

  return [
    { url: BASE_URL, changeFrequency: 'monthly', priority: 1 },
    { url: `${BASE_URL}/work`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/studio`, changeFrequency: 'yearly', priority: 0.5 },
    ...projects.docs
      .filter((doc) => doc.slug)
      .map((doc) => ({
        url: `${BASE_URL}/work/${doc.slug}`,
        lastModified: new Date(doc.updatedAt),
        changeFrequency: 'yearly' as const,
        priority: 0.7,
      })),
  ]
}
