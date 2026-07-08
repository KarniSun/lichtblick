import type { CollectionConfig, FieldHook } from 'payload'

import { Facts, FullImage, Quote, TextBlock, TwoImage } from '../blocks'
import { revalidateProject, revalidateProjectDelete } from '../hooks/revalidate'
import { slugify } from '../lib/slug'

const formatSlug: FieldHook = ({ data, value }) => {
  if (typeof value === 'string' && value.length > 0) {
    return slugify(value)
  }

  // no slug provided (create, or cleared on update) - derive it from the title
  if (typeof data?.title === 'string' && data.title.length > 0) {
    return slugify(data.title)
  }

  return value
}

export const Projects: CollectionConfig = {
  slug: 'projects',
  labels: {
    singular: 'Projekt',
    plural: 'Projekte',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'location', 'year', '_status'],
  },
  access: {
    // Public visitors only see published projects; logged-in editors see drafts too
    read: ({ req }) => {
      if (req.user) return true
      return { _status: { equals: 'published' } }
    },
  },
  versions: {
    drafts: true,
  },
  hooks: {
    afterChange: [revalidateProject],
    afterDelete: [revalidateProjectDelete],
  },
  fields: [
    {
      name: 'title',
      label: 'Titel',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      label: 'Slug',
      type: 'text',
      unique: true,
      index: true,
      admin: {
        position: 'sidebar',
        description: 'Wird beim Erstellen aus dem Titel erzeugt; kann angepasst werden.',
      },
      hooks: {
        beforeValidate: [formatSlug],
      },
    },
    {
      name: 'featured',
      label: 'Auf der Startseite zeigen',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
      },
    },
    {
      type: 'row',
      fields: [
        {
          name: 'location',
          label: 'Ort',
          type: 'text',
          required: true,
        },
        {
          name: 'year',
          label: 'Jahr',
          type: 'number',
          required: true,
          min: 1900,
          max: 2100,
        },
        {
          name: 'category',
          label: 'Kategorie',
          type: 'select',
          required: true,
          options: [
            { label: 'Wohnen', value: 'residential' },
            { label: 'Gewerbe', value: 'commercial' },
            { label: 'Interieur', value: 'interior' },
          ],
        },
      ],
    },
    {
      name: 'heroImage',
      label: 'Titelbild',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'summary',
      label: 'Kurzbeschreibung',
      type: 'textarea',
      admin: {
        description: 'Ein bis zwei Sätze, erscheint in Übersichten und als SEO-Beschreibung.',
      },
    },
    {
      name: 'materials',
      label: 'Materialindex',
      labels: {
        singular: 'Material',
        plural: 'Materialien',
      },
      type: 'array',
      admin: {
        description:
          'Kleine Labels, die auf der Startseite neben den Projektbildern erscheinen (z. B. „Eiche, geölt“). Die Reihenfolge folgt der Bildreihenfolge.',
      },
      fields: [
        {
          name: 'label',
          label: 'Bezeichnung',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'layout',
      label: 'Aufbau',
      type: 'blocks',
      blocks: [FullImage, TwoImage, TextBlock, Quote, Facts],
      admin: {
        description:
          'Der Inhalt der Projektseite, frei aus Blöcken zusammenstellbar, in beliebiger Reihenfolge.',
      },
    },
  ],
}
