import type { GlobalConfig } from 'payload'

import { revalidateEverything } from '../hooks/revalidate'

export const Homepage: GlobalConfig = {
  slug: 'homepage',
  label: 'Startseite',
  access: {
    read: () => true,
  },
  hooks: {
    afterChange: [revalidateEverything],
  },
  fields: [
    {
      name: 'heroImage',
      label: 'Hero-Bild',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description:
          'Eigenes Bild für den Hero der Startseite. Ohne Auswahl wird das Titelbild des Hero-Projekts verwendet.',
      },
    },
    {
      name: 'heroProject',
      label: 'Hero-Projekt',
      type: 'relationship',
      relationTo: 'projects',
      admin: {
        description:
          'Ohne eigenes Hero-Bild wird das Titelbild dieses Projekts zum Hero der Startseite. Ohne Auswahl wird das neueste hervorgehobene Projekt verwendet.',
      },
    },
    {
      name: 'heroStatement',
      label: 'Leitsatz',
      type: 'text',
      required: true,
      defaultValue: 'Räume aus Kalkputz, Holz und ruhigem Licht. Zum Wohnen, Arbeiten und Ankommen.',
      admin: {
        description: 'Eine Zeile, unten links im Hero: leise, kein Werbeslogan.',
      },
    },
    {
      name: 'philosophyHeading',
      label: 'Überschrift Haltung',
      type: 'text',
      defaultValue: 'Haltung',
    },
    {
      name: 'philosophy',
      label: 'Haltung',
      type: 'textarea',
      admin: {
        description: 'Zwei bis drei Sätze zur Arbeitsweise des Studios.',
      },
    },
  ],
}
