import type { Media } from '@/payload-types'

export type ResolvedImage = {
  alt: string
  height: number
  url: string
  width: number
}

/**
 * Resolve an upload relation to a usable image, preferring a named size.
 * Returns null if the relation is still an unpopulated id or has no url.
 */
export function resolveImage(
  media: Media | number | null | undefined,
  size?: 'card' | 'large',
): ResolvedImage | null {
  if (!media || typeof media === 'number') return null

  const sized = size ? media.sizes?.[size] : undefined

  const url = sized?.url ?? media.url
  const width = sized?.width ?? media.width
  const height = sized?.height ?? media.height

  if (!url || !width || !height) return null

  return { alt: media.alt ?? '', height, url, width }
}
