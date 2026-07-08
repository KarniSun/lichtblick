/**
 * Normalise text into a URL slug. German umlauts are transliterated
 * (ä→ae, ö→oe, ü→ue, ß→ss) so slugs stay ASCII and stable across the
 * CMS field hook and the seed script.
 */
export function slugify(input: string): string {
  return input
    .toLowerCase()
    .replace(/ä/g, 'ae')
    .replace(/ö/g, 'oe')
    .replace(/ü/g, 'ue')
    .replace(/ß/g, 'ss')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}
