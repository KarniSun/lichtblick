import type { Block } from 'payload'

export const FullImage: Block = {
  slug: 'fullImage',
  interfaceName: 'FullImageBlock',
  labels: { singular: 'Bild (volle Breite)', plural: 'Bilder (volle Breite)' },
  fields: [
    {
      name: 'image',
      label: 'Bild',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'caption',
      label: 'Bildunterschrift',
      type: 'text',
    },
  ],
}

export const TwoImage: Block = {
  slug: 'twoImage',
  interfaceName: 'TwoImageBlock',
  labels: { singular: 'Zwei Bilder', plural: 'Zwei Bilder' },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'imageOne',
          label: 'Bild links',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'imageTwo',
          label: 'Bild rechts',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'captionOne', label: 'Bildunterschrift links', type: 'text' },
        { name: 'captionTwo', label: 'Bildunterschrift rechts', type: 'text' },
      ],
    },
  ],
}

export const TextBlock: Block = {
  slug: 'textBlock',
  interfaceName: 'TextBlockBlock',
  labels: { singular: 'Text', plural: 'Texte' },
  fields: [
    {
      name: 'content',
      label: 'Inhalt',
      type: 'richText',
      required: true,
    },
  ],
}

export const Quote: Block = {
  slug: 'quote',
  interfaceName: 'QuoteBlock',
  labels: { singular: 'Zitat', plural: 'Zitate' },
  fields: [
    {
      name: 'text',
      label: 'Zitat',
      type: 'textarea',
      required: true,
    },
    {
      name: 'attribution',
      label: 'Quelle',
      type: 'text',
    },
  ],
}

export const Facts: Block = {
  slug: 'facts',
  interfaceName: 'FactsBlock',
  labels: { singular: 'Fakten', plural: 'Fakten' },
  fields: [
    {
      name: 'items',
      label: 'Einträge',
      labels: { singular: 'Eintrag', plural: 'Einträge' },
      type: 'array',
      minRows: 1,
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'label', label: 'Bezeichnung', type: 'text', required: true },
            { name: 'value', label: 'Wert', type: 'text', required: true },
          ],
        },
      ],
    },
  ],
}
