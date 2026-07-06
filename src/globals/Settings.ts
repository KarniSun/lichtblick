import type { GlobalConfig } from 'payload'

import { revalidateEverything } from '../hooks/revalidate'

export const Settings: GlobalConfig = {
  slug: 'settings',
  label: 'Einstellungen',
  access: {
    read: () => true,
  },
  hooks: {
    afterChange: [revalidateEverything],
  },
  fields: [
    {
      name: 'siteTitle',
      label: 'Seitentitel',
      type: 'text',
      required: true,
      defaultValue: 'Studio Lichtblick',
    },
    {
      name: 'nav',
      label: 'Navigation',
      labels: { singular: 'Navigationspunkt', plural: 'Navigationspunkte' },
      type: 'array',
      admin: {
        description: 'Die Links der Hauptnavigation.',
      },
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'label', label: 'Bezeichnung', type: 'text', required: true },
            { name: 'href', label: 'Link', type: 'text', required: true },
          ],
        },
      ],
    },
    {
      name: 'footer',
      label: 'Fußzeile',
      type: 'group',
      fields: [
        {
          name: 'address',
          label: 'Adresse',
          type: 'textarea',
        },
        {
          type: 'row',
          fields: [
            { name: 'email', label: 'E-Mail', type: 'text' },
            { name: 'phone', label: 'Telefon', type: 'text' },
          ],
        },
        {
          name: 'socialLinks',
          label: 'Social-Media-Links',
          labels: { singular: 'Link', plural: 'Links' },
          type: 'array',
          fields: [
            {
              type: 'row',
              fields: [
                { name: 'label', label: 'Bezeichnung', type: 'text', required: true },
                { name: 'url', label: 'URL', type: 'text', required: true },
              ],
            },
          ],
        },
      ],
    },
  ],
}
