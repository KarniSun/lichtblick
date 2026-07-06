import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import sharp from 'sharp'

// Real photography dropped into src/seed/assets/<name>.jpg replaces the
// generated placeholder of the same name on the next reseed.
const ASSETS_DIR = path.join(path.dirname(fileURLToPath(import.meta.url)), 'assets')

export type Palette = {
  accent: string
  bg: string
  fg: string
}

// Tints of the site palette: Kalkputz grounds, Rauchquarz mid-tones, Nussbaum darks
export const PALETTES: Palette[] = [
  { bg: '#e7e1d6', fg: '#a69b8d', accent: '#3b2e27' },
  { bg: '#e4ddd1', fg: '#b3a794', accent: '#4a3a2e' },
  { bg: '#e0d9cc', fg: '#9c8f7c', accent: '#33291f' },
  { bg: '#e6e2d9', fg: '#a3a396', accent: '#5c6b5d' },
  { bg: '#e5dfd4', fg: '#aca08c', accent: '#443830' },
  { bg: '#e0dacd', fg: '#988c7a', accent: '#3b2e27' },
]

export type Variant = 'arch' | 'columns' | 'diagonal' | 'disc' | 'facade' | 'stairs'

function shapes(variant: Variant, w: number, h: number, p: Palette): string {
  switch (variant) {
    case 'arch': {
      const aw = w * 0.42
      const ah = h * 0.72
      const x = (w - aw) / 2
      const y = h - ah
      return `
        <rect x="0" y="${h * 0.82}" width="${w}" height="${h * 0.18}" fill="${p.fg}" opacity="0.35"/>
        <path d="M ${x} ${h} L ${x} ${y + aw / 2} A ${aw / 2} ${aw / 2} 0 0 1 ${x + aw} ${y + aw / 2} L ${x + aw} ${h} Z" fill="${p.accent}"/>
        <path d="M ${x + aw * 0.18} ${h} L ${x + aw * 0.18} ${y + aw / 2 + aw * 0.18} A ${aw * 0.32} ${aw * 0.32} 0 0 1 ${x + aw * 0.82} ${y + aw / 2 + aw * 0.18} L ${x + aw * 0.82} ${h} Z" fill="${p.bg}"/>`
    }
    case 'facade': {
      const cols = 6
      const gap = w * 0.012
      const cw = (w * 0.8 - gap * (cols - 1)) / cols
      const x0 = w * 0.1
      let rects = ''
      for (let i = 0; i < cols; i++) {
        const rh = h * (0.45 + (i % 3) * 0.12)
        rects += `<rect x="${x0 + i * (cw + gap)}" y="${h - rh}" width="${cw}" height="${rh}" fill="${i % 2 === 0 ? p.accent : p.fg}"/>`
      }
      return rects
    }
    case 'stairs': {
      const steps = 5
      let rects = ''
      for (let i = 0; i < steps; i++) {
        const sw = w * 0.16
        const sh = h * 0.14 * (i + 1)
        rects += `<rect x="${w * 0.14 + i * sw}" y="${h - sh}" width="${sw}" height="${sh}" fill="${p.accent}" opacity="${0.55 + i * 0.1}"/>`
      }
      return rects
    }
    case 'disc': {
      return `
        <circle cx="${w * 0.62}" cy="${h * 0.34}" r="${Math.min(w, h) * 0.16}" fill="${p.accent}"/>
        <rect x="0" y="${h * 0.62}" width="${w}" height="${h * 0.38}" fill="${p.fg}" opacity="0.55"/>
        <rect x="0" y="${h * 0.62}" width="${w}" height="${h * 0.012}" fill="${p.accent}"/>`
    }
    case 'columns': {
      const heights = [0.85, 0.6, 0.92, 0.68, 0.8]
      let rects = ''
      heights.forEach((factor, i) => {
        const cw = w * 0.07
        const x = w * 0.16 + i * w * 0.15
        rects += `<rect x="${x}" y="${h - h * factor}" width="${cw}" height="${h * factor}" fill="${p.accent}" opacity="${0.5 + (i % 3) * 0.2}"/>`
      })
      return rects
    }
    case 'diagonal': {
      return `
        <polygon points="0,${h} ${w * 0.72},0 ${w},0 ${w},${h}" fill="${p.fg}" opacity="0.5"/>
        <polygon points="${w * 0.3},${h} ${w},${h * 0.22} ${w},${h}" fill="${p.accent}" opacity="0.7"/>`
    }
  }
}

/**
 * Load `src/seed/assets/<name>.jpg` cover-cropped to the target size, or fall
 * back to a generated placeholder composition.
 */
export async function imageBuffer(
  name: string,
  variant: Variant,
  palette: Palette,
  width: number,
  height: number,
): Promise<Buffer> {
  const assetPath = path.join(ASSETS_DIR, `${name}.jpg`)
  if (fs.existsSync(assetPath)) {
    return sharp(assetPath)
      .resize(width, height, { fit: 'cover' })
      .jpeg({ quality: 88, mozjpeg: true })
      .toBuffer()
  }
  return generateImage(variant, palette, width, height)
}

/** Render a quiet, architectural composition as a JPEG buffer. */
export async function generateImage(
  variant: Variant,
  palette: Palette,
  width: number,
  height: number,
): Promise<Buffer> {
  const svg = `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${palette.bg}"/>
      <stop offset="1" stop-color="${palette.fg}" stop-opacity="0.45"/>
    </linearGradient>
  </defs>
  <rect width="${width}" height="${height}" fill="url(#sky)"/>
  ${shapes(variant, width, height, palette)}
</svg>`

  return sharp(Buffer.from(svg)).jpeg({ quality: 82, mozjpeg: true }).toBuffer()
}
