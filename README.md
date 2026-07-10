# Studio Lichtblick

Portfolio demo: a fictional Munich interior architecture studio, built with **Next.js (App Router)** and **Payload CMS 3** (self-hosted, block-based layouts). Purpose: pitch material for design agencies.

## Stack

- Next.js 16 (App Router, Turbopack), Payload 3 runs natively inside the same app
- Payload CMS 3 with SQLite (`@payloadcms/db-sqlite`), no external database needed locally
- Tailwind CSS 4 with custom design tokens. Palette: Kalkputz `#EDE8E0` / Nussbaum `#3B2E27` / Rauchquarz `#A69B8D` / Patina `#5C6B5D` (accent only, never large fills). Type: Fraunces (display) + Hanken Grotesk (body)
- Contact form via React server action + Resend (falls back to console logging without an API key)
- Imagery: AI-generated architectural photography, seeded from `src/seed/assets/` (a sharp-based generator produces abstract placeholders as fallback if an asset is missing)

## Highlights

- Editorial frontend: asymmetric project spreads with a sticky metadata column, edge-bleed images, and a CMS-driven material index whose labels fade in beside the images
- The admin panel is fully on-brand: German UI, the site's palette and fonts, Studio Lichtblick wordmark, WCAG AA text contrast (better than Payload's default theme)
- Lighthouse on the production build: 99 performance / 100 accessibility / 100 best practices / 100 SEO (LCP 0.8s, CLS 0)
- Draft/publish with instant revalidation: publishing in the CMS updates the live pages immediately

## Getting started

```bash
pnpm install
pnpm seed      # creates the SQLite db, admin user, and 6 demo projects
pnpm dev
```

- Site: http://localhost:3000
- Admin: http://localhost:3000/admin, `admin@lichtblick.example` / `lichtblick-demo`
  (local demo credentials only; for deployments, set `ADMIN_EMAIL` and `ADMIN_PASSWORD`
  in the environment before seeding and these defaults are never used)

To reseed from scratch: stop the server, delete `lichtblick.db`, `media/`, and `.next/cache/images`, then run `pnpm seed` and hard-refresh the browser (media filenames are deterministic and cached aggressively).

## Content model

- **Projects** (collection, drafts enabled): title, slug, hero image, location, year, category, summary, a `featured` flag for the homepage, a `materials` array (the material index: label order follows image order), and a flexible `layout` blocks field with Full-width Image, Two Images, Text, Pull Quote, and Facts blocks. Publishing revalidates the affected pages via `afterChange` hooks.
- **Media**: uploads with `card`/`large` sizes and focal point; served with status-aware cache headers (immutable on success, no-store on errors)
- **Globals**: `Einstellungen` (site title, nav, footer/contact data), `Startseite` (hero project + statement, philosophy), `Studio-Seite` (intro, team, contact heading)

## Pages

| Route | Content |
|---|---|
| `/` | Full-bleed hero (CMS-selected project, no overlay/CTA), editorial featured spreads with material index, approach section |
| `/work` | All projects, filterable by category (`?kategorie=...`) |
| `/work/[slug]` | Case study built from layout blocks, prev/next navigation |
| `/studio` | Studio intro, team, working contact form (`#kontakt`) |
| `/impressum`, `/datenschutz` | German legal pages (demo placeholders, noindex) |

## Environment

See `.env.example`. By default the contact form runs in demo mode: it validates and confirms submissions but sends nothing and stores nothing (no visitor data is collected). Setting `RESEND_API_KEY` + `CONTACT_TO_EMAIL` switches on real email delivery (`CONTACT_FROM_EMAIL` optional).

## Deploying to Vercel (checklist)

Frontend + Payload CMS deploy as one Vercel project. The two stateful pieces attach as services because serverless compute is ephemeral: a **Turso** (libSQL) database — the same `db-sqlite` adapter, just a remote URL — and **Vercel Blob** for uploads. The `file:` database and local `/media` folder are dev-only.

1. **Create the services:** a Turso database (get its `libsql://…turso.io` URL + a read-write auth token) and a Vercel Blob store (get `BLOB_READ_WRITE_TOKEN`).
2. **Seed the database once, before the URL is public.** Payload's first-user registration means whoever first reaches `/admin` on an empty DB can claim the admin account — so seed first. Run locally against the remote services (keeps secrets in your shell, not in files):
   ```
   DATABASE_URL='libsql://…turso.io' DATABASE_AUTH_TOKEN='…' \
   BLOB_READ_WRITE_TOKEN='…' ADMIN_EMAIL='you@example.com' ADMIN_PASSWORD='…' \
   pnpm seed
   ```
   This creates the schema, uploads media to Blob, and creates the admin with your credentials.
3. **Deploy:** import the repo into Vercel, set the env vars below, and (for a German audience) set the function region to Frankfurt/Dublin near the database. `PAYLOAD_SECRET` (fresh), `DATABASE_URL`, `DATABASE_AUTH_TOKEN`, `BLOB_READ_WRITE_TOKEN`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`, `NEXT_PUBLIC_SITE_URL`; optionally `RESEND_API_KEY` + `CONTACT_TO_EMAIL` for real contact-form delivery.

Schema changes after launch use Payload migrations (`payload migrate:create` → `payload migrate`); the initial deploy needs none because seeding establishes the schema.

## Development notes

- Frontend Payload queries pass `overrideAccess: false` so drafts never leak to the public site.
- The `@payload-config` alias does not resolve under `payload run`; scripts in `src/seed/` import the config relatively and must use top-level `await` (the runner exits after module evaluation).
- Admin theming lives in `src/app/(payload)/custom.scss`; logo/icon components in `src/components/admin/`. Run `pnpm generate:importmap` after changing admin components, `pnpm generate:types` after schema changes.
