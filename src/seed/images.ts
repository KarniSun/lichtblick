import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import sharp from 'sharp'

// Real photography dropped into src/seed/assets/<name>.jpg is the source of
// truth for seeded imagery. If an asset is ever missing, fall back to a plain
// Kalkputz-toned rectangle so the seed still completes.
const ASSETS_DIR = path.join(path.dirname(fileURLToPath(import.meta.url)), 'assets')

export async function imageBuffer(name: string, width: number, height: number): Promise<Buffer> {
  const assetPath = path.join(ASSETS_DIR, `${name}.jpg`)

  if (fs.existsSync(assetPath)) {
    return sharp(assetPath)
      .resize(width, height, { fit: 'cover' })
      .jpeg({ quality: 88, mozjpeg: true })
      .toBuffer()
  }

  return sharp({ create: { width, height, channels: 3, background: '#ede8e0' } })
    .jpeg({ quality: 82 })
    .toBuffer()
}
