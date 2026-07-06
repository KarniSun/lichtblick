import Image from 'next/image'
import React from 'react'

import type {
  FactsBlock,
  FullImageBlock,
  Project,
  QuoteBlock,
  TextBlockBlock,
  TwoImageBlock,
} from '@/payload-types'

import { RichText } from '@/components/RichText'
import { Reveal } from '@/components/Reveal'
import { resolveImage, type ResolvedImage } from '@/lib/media'
import { cn } from '@/lib/utils'

type LayoutBlock = NonNullable<Project['layout']>[number]

function BlockImage({
  caption,
  captionClassName,
  className,
  image,
  sizes,
}: {
  caption?: string | null
  captionClassName?: string
  className?: string
  image: ResolvedImage | null
  sizes: string
}) {
  if (!image) return null

  return (
    <figure className={className}>
      <div className="relative overflow-hidden bg-line">
        <Image
          alt={image.alt}
          className="h-auto w-full"
          height={image.height}
          sizes={sizes}
          src={image.url}
          width={image.width}
        />
      </div>
      {caption && <figcaption className={cn('label mt-3', captionClassName)}>{caption}</figcaption>}
    </figure>
  )
}

function FullImageComponent({ block }: { block: FullImageBlock }) {
  return (
    <Reveal>
      {/* mobile: edge-to-edge, caption keeps the page inset */}
      <BlockImage
        caption={block.caption}
        captionClassName="px-6 md:px-0"
        className="-mx-6 md:mx-0"
        image={resolveImage(block.image, 'large')}
        sizes="(max-width: 1400px) 100vw, 1400px"
      />
    </Reveal>
  )
}

function TwoImageComponent({ block }: { block: TwoImageBlock }) {
  return (
    // mobile: offset pair - first image bleeds left, second bleeds right
    <div className="grid gap-8 md:grid-cols-2 md:gap-8">
      <Reveal className="-ml-6 w-[calc(82%+1.5rem)] md:ml-0 md:w-auto">
        <BlockImage
          caption={block.captionOne}
          captionClassName="pl-6 md:pl-0"
          image={resolveImage(block.imageOne, 'card')}
          sizes="(max-width: 768px) 88vw, 50vw"
        />
      </Reveal>
      <Reveal className="-mr-6 ml-auto w-[calc(82%+1.5rem)] md:ml-0 md:mr-0 md:w-auto" delay={120}>
        <BlockImage
          caption={block.captionTwo}
          captionClassName="pr-6 md:pr-0"
          image={resolveImage(block.imageTwo, 'card')}
          sizes="(max-width: 768px) 88vw, 50vw"
        />
      </Reveal>
    </div>
  )
}

function TextBlockComponent({ block }: { block: TextBlockBlock }) {
  return (
    <Reveal className="mx-auto max-w-2xl">
      <RichText data={block.content} />
    </Reveal>
  )
}

function QuoteComponent({ block }: { block: QuoteBlock }) {
  return (
    <Reveal className="mx-auto max-w-3xl text-center">
      <blockquote className="font-display text-2xl leading-snug tracking-tight md:text-3xl">
        „{block.text}“
      </blockquote>
      {block.attribution && <p className="label mt-5">{block.attribution}</p>}
    </Reveal>
  )
}

function FactsComponent({ block }: { block: FactsBlock }) {
  if (!block.items?.length) return null

  return (
    <Reveal className="mx-auto max-w-2xl">
      <dl>
        {block.items.map((item) => (
          <div
            className="flex items-baseline justify-between gap-6 border-t border-line py-3 last:border-b"
            key={item.id ?? item.label}
          >
            <dt className="label">{item.label}</dt>
            <dd className="text-sm">{item.value}</dd>
          </div>
        ))}
      </dl>
    </Reveal>
  )
}

export function RenderBlocks({ blocks }: { blocks: LayoutBlock[] | null | undefined }) {
  if (!blocks?.length) return null

  return (
    <div className="space-y-16 md:space-y-24">
      {blocks.map((block) => {
        switch (block.blockType) {
          case 'fullImage':
            return <FullImageComponent block={block} key={block.id} />
          case 'twoImage':
            return <TwoImageComponent block={block} key={block.id} />
          case 'textBlock':
            return <TextBlockComponent block={block} key={block.id} />
          case 'quote':
            return <QuoteComponent block={block} key={block.id} />
          case 'facts':
            return <FactsComponent block={block} key={block.id} />
          default:
            return null
        }
      })}
    </div>
  )
}
