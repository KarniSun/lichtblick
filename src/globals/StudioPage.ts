import type { GlobalConfig } from 'payload'

import { revalidateEverything } from '../hooks/revalidate'

export const StudioPage: GlobalConfig = {
  slug: 'studio-page',
  label: 'Studio-Seite',
  access: {
    read: () => true,
  },
  hooks: {
    afterChange: [revalidateEverything],
  },
  fields: [
    {
      name: 'heading',
      label: 'Überschrift',
      type: 'text',
      required: true,
      defaultValue: 'Studio',
    },
    {
      name: 'intro',
      label: 'Einleitung',
      type: 'richText',
    },
    {
      name: 'team',
      label: 'Team',
      labels: { singular: 'Teammitglied', plural: 'Teammitglieder' },
      type: 'array',
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'name', label: 'Name', type: 'text', required: true },
            { name: 'role', label: 'Rolle', type: 'text' },
          ],
        },
        {
          name: 'portrait',
          label: 'Porträt',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },
    {
      name: 'contactHeading',
      label: 'Überschrift Kontakt',
      type: 'text',
      defaultValue: 'Kontakt',
    },
  ],
}
