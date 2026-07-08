'use server'

import { Resend } from 'resend'

export type ContactFormState = {
  message?: string
  status: 'error' | 'idle' | 'success'
  /** echoed back on error so the form keeps what the user typed */
  values?: { email: string; message: string; name: string }
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// Upper bounds so a scripted POST cannot flood the inbox or the Resend quota
// with multi-megabyte payloads. Mirrored as maxLength on the form inputs.
const MAX_NAME = 100
const MAX_MESSAGE = 5000
const MIN_MESSAGE = 10

// Collapse control characters (incl. CR/LF) to spaces so a name can never
// inject into the email subject header.
const stripControls = (input: string) => input.replace(/\p{Cc}+/gu, ' ').trim()

export async function sendContactMessage(
  _previous: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const name = stripControls(String(formData.get('name') ?? '')).slice(0, MAX_NAME)
  const email = String(formData.get('email') ?? '')
    .trim()
    .slice(0, MAX_NAME)
  const message = String(formData.get('message') ?? '').trim().slice(0, MAX_MESSAGE)
  const honeypot = String(formData.get('company') ?? '')

  // bots fill the hidden field - pretend everything went fine
  if (honeypot) {
    return { status: 'success', message: 'Vielen Dank für Ihre Nachricht.' }
  }

  const values = { email, message, name }

  if (!name || !EMAIL_PATTERN.test(email) || message.length < MIN_MESSAGE) {
    return {
      status: 'error',
      message: 'Bitte füllen Sie alle Felder aus (Nachricht mindestens 10 Zeichen).',
      values,
    }
  }

  const apiKey = process.env.RESEND_API_KEY

  if (!apiKey) {
    // No email provider configured. Fine for local dev; in production this is a
    // misconfiguration, so fail loudly instead of pretending it was sent.
    if (process.env.NODE_ENV === 'production') {
      console.error('[contact] RESEND_API_KEY not set in production; message not sent')
      return {
        status: 'error',
        message:
          'Die Nachricht konnte nicht gesendet werden. Bitte versuchen Sie es später erneut.',
        values,
      }
    }
    console.info('[contact] no RESEND_API_KEY - message not sent (dev):', { name, email })
    return { status: 'success', message: 'Vielen Dank für Ihre Nachricht.' }
  }

  // Never fall back to the visitor's own address: without an explicit recipient
  // that would turn the verified sending domain into an open relay.
  const to = process.env.CONTACT_TO_EMAIL
  if (!to) {
    console.error('[contact] CONTACT_TO_EMAIL not set; refusing to send')
    return {
      status: 'error',
      message: 'Die Nachricht konnte nicht gesendet werden. Bitte versuchen Sie es später erneut.',
      values,
    }
  }

  try {
    const resend = new Resend(apiKey)
    await resend.emails.send({
      from: process.env.CONTACT_FROM_EMAIL ?? 'Studio Lichtblick <onboarding@resend.dev>',
      to,
      replyTo: email,
      subject: `Kontaktanfrage von ${name}`,
      text: `Name: ${name}\nE-Mail: ${email}\n\n${message}`,
    })
    return { status: 'success', message: 'Vielen Dank für Ihre Nachricht.' }
  } catch (error) {
    console.error('[contact] send failed:', error)
    return {
      status: 'error',
      message: 'Die Nachricht konnte nicht gesendet werden. Bitte versuchen Sie es später erneut.',
      values,
    }
  }
}
