// note: relative import - the @payload-config alias doesn't resolve under `payload run`
import { getPayload, type Payload } from 'payload'

import config from '../payload.config'

import { imageBuffer, PALETTES, type Palette, type Variant } from './images'
import { richText } from './richText'

// Production: set ADMIN_EMAIL and ADMIN_PASSWORD in the environment so the
// public demo credentials below never exist in a deployed database.
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@lichtblick.example'
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'lichtblick-demo'
const USING_DEMO_CREDENTIALS = !process.env.ADMIN_EMAIL && !process.env.ADMIN_PASSWORD

type ProjectSeed = {
  category: 'commercial' | 'interior' | 'residential'
  facts: { label: string; value: string }[]
  featured: boolean
  location: string
  materials: string[]
  palette: Palette
  quote: { attribution: string; text: string }
  summary: string
  text1: string[]
  text2: string[]
  title: string
  variants: [Variant, Variant, Variant]
  year: number
}

const PROJECTS: ProjectSeed[] = [
  {
    title: 'Haus am Waldrand',
    materials: ['Kalkputz, geglättet', 'Eiche, geölt', 'Sichtbeton, geschliffen'],
    location: 'Grünwald',
    year: 2024,
    category: 'residential',
    featured: true,
    palette: PALETTES[0],
    variants: ['arch', 'facade', 'diagonal'],
    summary:
      'Ein Wohnhaus am südlichen Stadtrand, das sich mit großen Öffnungen zum Wald hin ausrichtet und nach innen Ruhe schafft.',
    text1: [
      'Das Grundstück liegt am Übergang zwischen Siedlung und Wald. Der Entwurf nimmt diese Schwelle auf: Zur Straße zeigt sich das Haus geschlossen und ruhig, zum Garten öffnet es sich über die gesamte Breite.',
      'Sichtbeton, geölte Eiche und kalkverputzte Wände bilden eine reduzierte Materialpalette, die das wechselnde Licht des Tages aufnimmt.',
    ],
    text2: [
      'Die Räume sind entlang eines durchgehenden Erschließungsrückgrats organisiert. Jeder Wohnraum erhält eine eigene Beziehung zum Außenraum: eine Loggia, ein Hof, ein gerahmter Blick in die Baumkronen.',
    ],
    quote: {
      text: 'Wir wollten kein Haus, das sich in den Vordergrund drängt, sondern eines, das den Wald zu uns hereinlässt.',
      attribution: 'Bauherrin',
    },
    facts: [
      { label: 'Wohnfläche', value: '285 m²' },
      { label: 'Fertigstellung', value: '2024' },
      { label: 'Leistungsphasen', value: '1–8' },
    ],
  },
  {
    title: 'Atelier Schwabing',
    materials: ['Kalkfarbe', 'Fichtendielen, aufgearbeitet', 'Messing, patiniert'],
    location: 'München-Schwabing',
    year: 2023,
    category: 'interior',
    featured: true,
    palette: PALETTES[2],
    variants: ['disc', 'columns', 'facade'],
    summary:
      'Umbau einer Gründerzeit-Etage zu einem Atelier mit Galerie: Bestand und Einbauten treten in einen ruhigen Dialog.',
    text1: [
      'Die Etage eines Gründerzeithauses wurde von späteren Einbauten befreit und auf ihre tragende Struktur zurückgeführt. Neue Elemente (ein langes Regalmöbel, eine freistehende Teeküche) sind als eigenständige Körper eingestellt.',
    ],
    text2: [
      'Der originale Dielenboden wurde aufgearbeitet, die Haustechnik verschwindet vollständig in den neuen Möbelschichten. So bleibt der Raum als Ganzes lesbar.',
    ],
    quote: {
      text: 'Der Bestand gibt den Ton an. Alles, was wir hinzufügen, spricht leise.',
      attribution: 'Studio Lichtblick',
    },
    facts: [
      { label: 'Fläche', value: '160 m²' },
      { label: 'Fertigstellung', value: '2023' },
      { label: 'Bauzeit', value: '7 Monate' },
    ],
  },
  {
    title: 'Kontorhaus Sendling',
    materials: ['Brettsperrholz, Fichte', 'Linoleum', 'Stahl, gebürstet'],
    location: 'München-Sendling',
    year: 2024,
    category: 'commercial',
    featured: true,
    palette: PALETTES[1],
    variants: ['facade', 'diagonal', 'columns'],
    summary:
      'Ein Bürohaus in Holzhybridbauweise, dessen gestaffelte Fassade den Maßstab des Viertels aufnimmt.',
    text1: [
      'Das Kontorhaus ersetzt einen eingeschossigen Gewerbebau und vermittelt zwischen Blockrand und offener Bebauung. Die Fassade aus vorvergrautem Holz gliedert das Volumen in stehende Formate.',
      'Im Inneren erlaubt die Holzhybridkonstruktion stützenfreie Flächen, die sich flexibel unterteilen lassen.',
    ],
    text2: [
      'Ein zweigeschossiges Foyer mit Sitzstufen verbindet das Haus mit dem Quartier: tagsüber Arbeitsort, abends Veranstaltungsraum.',
    ],
    quote: {
      text: 'Nachhaltigkeit heißt hier vor allem: ein Haus, das man in fünfzig Jahren noch gern benutzt.',
      attribution: 'Projektleitung',
    },
    facts: [
      { label: 'BGF', value: '4.200 m²' },
      { label: 'Bauweise', value: 'Holzhybrid' },
      { label: 'Fertigstellung', value: '2024' },
    ],
  },
  {
    title: 'Villa Ammersee',
    materials: ['Muschelkalk', 'Nussbaum, geölt', 'Terrazzo, Bestand'],
    location: 'Herrsching',
    year: 2022,
    category: 'residential',
    featured: true,
    palette: PALETTES[4],
    variants: ['disc', 'arch', 'stairs'],
    summary:
      'Sanierung und Erweiterung einer Villa der 1920er Jahre am Hang über dem Ammersee.',
    text1: [
      'Die Villa aus den 1920er Jahren wurde behutsam saniert und um einen eingeschossigen Pavillon im Garten ergänzt. Alt und Neu bleiben klar unterscheidbar und teilen doch dieselbe Ruhe.',
    ],
    text2: [
      'Der Neubau nimmt die Traufhöhe der alten Gartenmauer auf und verschwindet fast in der Topographie. Vom Wohnraum aus bleibt der Blick über den See frei.',
    ],
    quote: {
      text: 'Man spürt an jeder Stelle, was das Haus schon erlebt hat, und was neu dazugekommen ist.',
      attribution: 'Bauherr',
    },
    facts: [
      { label: 'Wohnfläche', value: '340 m²' },
      { label: 'Baujahr Bestand', value: '1924' },
      { label: 'Fertigstellung', value: '2022' },
    ],
  },
  {
    title: 'Galerie im Lehel',
    materials: ['Estrich, geschliffen', 'Stahl, lackiert', 'Kalkfarbe'],
    location: 'München-Lehel',
    year: 2025,
    category: 'interior',
    featured: false,
    palette: PALETTES[3],
    variants: ['columns', 'disc', 'diagonal'],
    summary:
      'Ausbau einer ehemaligen Werkstatt zu einer Galerie mit wechselnden Ausstellungsformaten.',
    text1: [
      'Die ehemalige Werkstatt liegt im Hof eines Wohnblocks. Ihr rauer Charakter (Sheddach, Stahlbinder, geschliffener Estrich) wurde erhalten und durch ein präzises Lichtkonzept ergänzt.',
    ],
    text2: [
      'Mobile Wandelemente erlauben es, den Raum für jede Ausstellung neu zu konfigurieren, ohne die große Geste des Daches zu verstellen.',
    ],
    quote: {
      text: 'Der beste Ausstellungsraum ist einer, der der Kunst nicht im Weg steht.',
      attribution: 'Galeristin',
    },
    facts: [
      { label: 'Fläche', value: '420 m²' },
      { label: 'Fertigstellung', value: '2025' },
    ],
  },
  {
    title: 'Werkhalle Ost',
    materials: ['Fichte, unbehandelt', 'Beton, Bestand', 'Stahl, verzinkt'],
    location: 'München, Werksviertel',
    year: 2023,
    category: 'commercial',
    featured: false,
    palette: PALETTES[5],
    variants: ['stairs', 'facade', 'arch'],
    summary:
      'Umnutzung einer Industriehalle zu Studios und Werkstätten für die Kreativwirtschaft.',
    text1: [
      'Die Halle aus den 1960er Jahren wurde entkernt und mit einer eingestellten Holzstruktur neu organisiert: zwei Ebenen mit Studios, dazwischen ein durchgehender Luftraum.',
    ],
    text2: [
      'Alle neuen Einbauten sind reversibel. Die Halle bleibt als Raum erhalten, und kann in zwanzig Jahren wieder etwas anderes werden.',
    ],
    quote: {
      text: 'Wir bauen keine Flächen, wir bauen Möglichkeiten.',
      attribution: 'Studio Lichtblick',
    },
    facts: [
      { label: 'BGF', value: '2.800 m²' },
      { label: 'Baujahr Bestand', value: '1963' },
      { label: 'Fertigstellung', value: '2023' },
    ],
  },
]

async function createImage(
  payload: Payload,
  name: string,
  alt: string,
  variant: Variant,
  palette: Palette,
  width: number,
  height: number,
): Promise<number> {
  const data = await imageBuffer(name, variant, palette, width, height)
  const media = await payload.create({
    collection: 'media',
    data: { alt },
    file: {
      data,
      mimetype: 'image/jpeg',
      name: `${name}.jpg`,
      size: data.length,
    },
    context: { disableRevalidate: true },
  })
  return media.id as number
}

async function seed() {
  const payload = await getPayload({ config })

  const existing = await payload.count({ collection: 'projects' })
  if (existing.totalDocs > 0) {
    payload.logger.info('Projects already exist - skipping seed. Delete lichtblick.db to reseed.')
    process.exit(0)
  }

  // Admin user for the Payload admin panel
  const users = await payload.find({ collection: 'users', limit: 1 })
  if (users.totalDocs === 0) {
    await payload.create({
      collection: 'users',
      data: { email: ADMIN_EMAIL, password: ADMIN_PASSWORD },
    })
    // never print an env-provided password into (deployment) logs
    payload.logger.info(
      USING_DEMO_CREDENTIALS
        ? `Created admin user ${ADMIN_EMAIL} / ${ADMIN_PASSWORD}`
        : `Created admin user ${ADMIN_EMAIL} (password from environment)`,
    )
  }

  let heroProjectId: number | undefined

  for (const [index, seed] of PROJECTS.entries()) {
    payload.logger.info(`Seeding project: ${seed.title}`)

    const slugBase = seed.title
      .toLowerCase()
      .replace(/ä/g, 'ae')
      .replace(/ö/g, 'oe')
      .replace(/ü/g, 'ue')
      .replace(/ß/g, 'ss')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')

    const [heroId, detailAId, detailBId, fullId] = await Promise.all([
      createImage(payload, `${slugBase}-hero`, `${seed.title}, Außenansicht`, seed.variants[0], seed.palette, 2400, 1600),
      createImage(payload, `${slugBase}-detail-a`, `${seed.title}, Detail`, seed.variants[1], seed.palette, 1500, 1875),
      createImage(payload, `${slugBase}-detail-b`, `${seed.title}, Innenraum`, seed.variants[2], seed.palette, 1500, 1875),
      createImage(payload, `${slugBase}-full`, `${seed.title}, Perspektive`, seed.variants[1], seed.palette, 2400, 1500),
    ])

    const project = await payload.create({
      collection: 'projects',
      draft: false,
      data: {
        _status: 'published',
        title: seed.title,
        slug: slugBase,
        featured: seed.featured,
        location: seed.location,
        year: seed.year,
        category: seed.category,
        heroImage: heroId,
        summary: seed.summary,
        materials: seed.materials.map((label) => ({ label })),
        layout: [
          { blockType: 'textBlock', content: richText(...seed.text1) },
          {
            blockType: 'twoImage',
            imageOne: detailAId,
            imageTwo: detailBId,
            captionOne: 'Detail',
            captionTwo: 'Innenraum',
          },
          { blockType: 'quote', text: seed.quote.text, attribution: seed.quote.attribution },
          { blockType: 'fullImage', image: fullId, caption: `${seed.title}, ${seed.location}` },
          { blockType: 'textBlock', content: richText(...seed.text2) },
          { blockType: 'facts', items: seed.facts },
        ],
      },
      context: { disableRevalidate: true },
    })

    if (index === 0) heroProjectId = project.id as number
  }

  await payload.updateGlobal({
    slug: 'settings',
    data: {
      siteTitle: 'Studio Lichtblick',
      nav: [
        { label: 'Projekte', href: '/work' },
        { label: 'Studio', href: '/studio' },
        { label: 'Kontakt', href: '/studio#kontakt' },
      ],
      footer: {
        address: 'Studio Lichtblick GmbH\nMusterstraße 12\n80331 München',
        email: 'studio@lichtblick.example',
        phone: '+49 89 000000',
        socialLinks: [{ label: 'Instagram', url: 'https://instagram.com' }],
      },
    },
    context: { disableRevalidate: true },
  })

  // dedicated homepage hero (src/seed/assets/homepage-hero.jpg), independent of the projects
  const homepageHeroId = await createImage(
    payload,
    'homepage-hero',
    'Wohnraum im Altbau, Kalkputz, Holz und warmes Licht',
    'arch',
    PALETTES[0],
    2400,
    1600,
  )

  await payload.updateGlobal({
    slug: 'homepage',
    data: {
      heroImage: homepageHeroId,
      heroProject: heroProjectId,
      heroStatement: 'Räume aus Kalkputz, Holz und warmem Licht. Zum Wohnen, Arbeiten und Ankommen.',
      heroTextTone: 'light',
      philosophyHeading: 'Haltung',
      philosophy:
        'Wir beginnen mit dem, was da ist: dem Licht, dem Bestand, den Proportionen. Materialien wählen wir so, dass sie altern dürfen: Eiche, Kalkputz, Stein. Was ein Raum braucht, bleibt. Alles andere lassen wir weg.',
    },
    context: { disableRevalidate: true },
  })

  await payload.updateGlobal({
    slug: 'studio-page',
    data: {
      heading: 'Studio',
      intro: richText(
        'Studio Lichtblick ist ein Büro für Architektur und Innenarchitektur in München. Wir arbeiten an Wohnhäusern, Umbauten und Räumen für Arbeit und Kultur, vom ersten Entwurf bis zum letzten Detail.',
        'Unsere Projekte entstehen im Dialog: mit dem Ort, mit dem Bestand und mit den Menschen, für die wir bauen.',
      ),
      team: [
        { name: 'Anna Muster', role: 'Gründung, Architektur' },
        { name: 'Jonas Beck', role: 'Projektleitung' },
        { name: 'Lea Hofmann', role: 'Innenarchitektur' },
      ],
      contactHeading: 'Kontakt',
    },
    context: { disableRevalidate: true },
  })

  payload.logger.info('Seed complete.')
  process.exit(0)
}

// top-level await - `payload run` exits once the module finishes evaluating,
// so the seed must complete before then
try {
  await seed()
} catch (error) {
  console.error(error)
  process.exit(1)
}
