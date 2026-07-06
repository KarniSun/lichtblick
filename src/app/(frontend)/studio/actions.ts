'use server'

import { Resend } from 'resend'

export type ContactFormState = {
  message?: string
  status: 'error' | 'idle' | 'success'
  /** echoed back on error so the form keeps what the user typed */
  values?: { email: string; message: string; name: string }
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function sendContactMessage(
  _previous: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const name = String(formData.get('name') ?? '').trim()
  const email = String(formData.get('email') ?? '').trim()
  const message = String(formData.get('message') ?? '').trim()
  const honeypot = String(formData.get('company') ?? '')

  // bots fill the hidden field - pretend everything went fine
  if (honeypot) {
    return { status: 'success', message: 'Vielen Dank für Ihre Nachricht.' }
  }

  const values = { email, message, name }

  if (!name || !EMAIL_PATTERN.test(email) || message.length < 10) {
    return {
      status: 'error',
      message: 'Bitte füllen Sie alle Felder aus (Nachricht mindestens 10 Zeichen).',
      values,
    }
  }

  const apiKey = process.env.RESEND_API_KEY

  if (!apiKey) {
    // dev fallback: no email provider configured
    console.info('[contact] no RESEND_API_KEY - message not sent:', { name, email, message })
    return { status: 'success', message: 'Vielen Dank für Ihre Nachricht.' }
  }

  try {
    const resend = new Resend(apiKey)
    await resend.emails.send({
      from: process.env.CONTACT_FROM_EMAIL ?? 'Studio Lichtblick <onboarding@resend.dev>',
      to: process.env.CONTACT_TO_EMAIL ?? email,
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
