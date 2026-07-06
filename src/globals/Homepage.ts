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
      name: 'heroProject',
      label: 'Hero-Projekt',
      type: 'relationship',
      relationTo: 'projects',
      admin: {
        description:
          'Das Titelbild dieses Projekts wird zum Hero der Startseite. Ohne Auswahl wird das neueste hervorgehobene Projekt verwendet.',
      },
    },
    {
      name: 'heroStatement',
      label: 'Leitsatz',
      type: 'text',
      required: true,
      defaultValue: 'Innenräume aus Kalkputz, Holz und Licht. Für Wohnen und Arbeit.',
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
