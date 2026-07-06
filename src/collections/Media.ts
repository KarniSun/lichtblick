import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  labels: {
    singular: 'Medium',
    plural: 'Medien',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'alt',
      label: 'Alternativtext',
      type: 'text',
      required: true,
      admin: {
        description: 'Kurze Bildbeschreibung für Screenreader und Suchmaschinen.',
      },
    },
  ],
  upload: {
    focalPoint: true,
    imageSizes: [
      {
        name: 'card',
        width: 1080,
        withoutEnlargement: true,
      },
      {
        name: 'large',
        width: 2000,
        withoutEnlargement: true,
      },
    ],
  },
}
