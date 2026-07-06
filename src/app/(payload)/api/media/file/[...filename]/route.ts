import config from '@payload-config'
import { REST_GET } from '@payloadcms/next/routes'

// More specific than Payload's /api/[...slug] catch-all, so media file
// requests land here. Purpose: cache successful file responses aggressively
// WITHOUT making errors cacheable. A next.config headers() rule applies to
// every status - during a reseed window a browser could cache a 404 for a
// year and the image would stay "missing" until the cache is cleared.
//
// Uploads are content-stable (unique filenames, collisions suffixed), so
// long-lived immutable caching is correct for 200s. Caveat stays: reseeding
// with changed assets reuses deterministic filenames - hard-refresh after.

const restGet = REST_GET(config)

type RouteContext = { params: Promise<{ filename: string[] }> }

async function serveFile(req: Request, filename: string[]): Promise<Response> {
  const res = await restGet(req as Parameters<typeof restGet>[0], {
    params: Promise.resolve({ slug: ['media', 'file', ...filename] }),
  } as Parameters<typeof restGet>[1])

  const headers = new Headers(res.headers)
  if (res.ok) {
    headers.set('Cache-Control', 'public, max-age=31536000, immutable')
  } else {
    headers.set('Cache-Control', 'no-store')
  }

  return new Response(res.body, { headers, status: res.status, statusText: res.statusText })
}

export async function GET(req: Request, ctx: RouteContext) {
  const { filename } = await ctx.params
  return serveFile(req, filename)
}

// Payload's router only serves files for GET; without this, HEAD requests
// (curl -I, some monitors) get a JSON 404 even though the file exists.
export async function HEAD(req: Request, ctx: RouteContext) {
  const { filename } = await ctx.params
  const getReq = new Request(req.url, { headers: req.headers, method: 'GET' })
  const res = await serveFile(getReq, filename)
  return new Response(null, { headers: res.headers, status: res.status, statusText: res.statusText })
}
