import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { de } from '@payloadcms/translations/languages/de'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Media } from './collections/Media'
import { Projects } from './collections/Projects'
import { Users } from './collections/Users'
import { Homepage } from './globals/Homepage'
import { Settings } from './globals/Settings'
import { StudioPage } from './globals/StudioPage'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    // Brand palette is light; a dark variant is intentionally not offered
    theme: 'light',
    components: {
      graphics: {
        Logo: '/components/admin/Logo#Logo',
        Icon: '/components/admin/Icon#Icon',
      },
    },
    importMap: {
      baseDir: path.resolve(dirname),
    },
    meta: {
      titleSuffix: ' - Studio Lichtblick',
    },
  },
  collections: [Projects, Media, Users],
  globals: [Settings, Homepage, StudioPage],
  editor: lexicalEditor(),
  // The frontend reads exclusively via the Payload local API; GraphQL is unused
  // attack surface (incl. auth mutations), so it is turned off entirely.
  graphQL: {
    disable: true,
  },
  i18n: {
    supportedLanguages: { de },
    fallbackLanguage: 'de',
  },
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: sqliteAdapter({
    client: {
      url: process.env.DATABASE_URL || 'file:./lichtblick.db',
    },
  }),
  sharp,
})
