import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'

import { RichText as LexicalRichText } from '@payloadcms/richtext-lexical/react'

import { cn } from '@/lib/utils'

type Props = {
  className?: string
  data: SerializedEditorState
}

export function RichText({ className, data }: Props) {
  return <LexicalRichText className={cn('rich-text', className)} data={data} />
}
