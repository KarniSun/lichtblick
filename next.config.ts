import { withPayload } from '@payloadcms/next/withPayload'
import type { NextConfig } from 'next'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(__filename)

const nextConfig: NextConfig = {
  // Next dev blocks cross-origin /_next/* requests; without this, opening the
  // dev server from a phone via the LAN IP loads HTML but no JS/assets.
  allowedDevOrigins: ['192.168.178.29', 'localhost'],
  images: {
    localPatterns: [
      {
        pathname: '/api/media/file/**',
      },
    ],
    // Media files only change when the seed/CMS replaces them (new URL), so
    // let the optimizer cache serve repeat visits for a month instead of 4h.
    minimumCacheTTL: 2678400,
    // Source photos are ≤2528px; without this, retina viewports get bumped to
    // the default 3840 bucket and the browser decodes far larger files than
    // the layout slot needs - noticeable as scroll jank on image-heavy pages.
    deviceSizes: [640, 750, 828, 1080, 1200, 1600, 1920, 2048],
  },
  // NOTE: media cache headers are NOT set here. next.config headers() apply to
  // every response status, which made 404s browser-cacheable for a year. The
  // status-aware wrapper in src/app/(payload)/api/media/file/[...filename]/route.ts
  // sets immutable caching on 200s and no-store on errors instead.
  webpack: (webpackConfig) => {
    webpackConfig.resolve.extensionAlias = {
      '.cjs': ['.cts', '.cjs'],
      '.js': ['.ts', '.tsx', '.js', '.jsx'],
      '.mjs': ['.mts', '.mjs'],
    }

    return webpackConfig
  },
  turbopack: {
    root: path.resolve(dirname),
  },
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
