import type { CollectionAfterChangeHook, CollectionAfterDeleteHook, GlobalAfterChangeHook } from 'payload'

import { revalidatePath } from 'next/cache'

// Revalidation runs inside the Next.js runtime. When Payload runs outside of it
// (CLI scripts, seeding), revalidatePath throws - set context.disableRevalidate.

export const revalidateProject: CollectionAfterChangeHook = ({ doc, previousDoc, req }) => {
  if (req.context?.disableRevalidate) return doc

  try {
    revalidatePath('/')
    revalidatePath('/work')
    if (doc?.slug) revalidatePath(`/work/${doc.slug}`)
    if (previousDoc?.slug && previousDoc.slug !== doc?.slug) {
      revalidatePath(`/work/${previousDoc.slug}`)
    }
  } catch {
    // outside the Next.js request lifecycle - nothing to revalidate
  }

  return doc
}

export const revalidateProjectDelete: CollectionAfterDeleteHook = ({ doc, req }) => {
  if (req.context?.disableRevalidate) return doc

  try {
    revalidatePath('/')
    revalidatePath('/work')
    if (doc?.slug) revalidatePath(`/work/${doc.slug}`)
  } catch {
    // outside the Next.js request lifecycle
  }

  return doc
}

export const revalidateEverything: GlobalAfterChangeHook = ({ doc, req }) => {
  if (req.context?.disableRevalidate) return doc

  try {
    revalidatePath('/', 'layout')
  } catch {
    // outside the Next.js request lifecycle
  }

  return doc
}
