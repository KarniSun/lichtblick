'use client'

import { useActionState } from 'react'

import { sendContactMessage, type ContactFormState } from '@/app/(frontend)/studio/actions'

const initialState: ContactFormState = { status: 'idle' }

const fieldClasses =
  'w-full border-b border-line bg-transparent py-3 text-base outline-none transition-colors placeholder:text-muted/60 focus:border-ink'

export function ContactForm() {
  const [state, formAction, pending] = useActionState(sendContactMessage, initialState)

  if (state.status === 'success') {
    return (
      <p className="border-t border-line pt-6 font-display text-xl tracking-tight">
        {state.message}
      </p>
    )
  }

  return (
    <form action={formAction} className="space-y-8">
      {/* honeypot */}
      <input
        aria-hidden="true"
        autoComplete="off"
        className="hidden"
        name="company"
        tabIndex={-1}
        type="text"
      />

      <div>
        <label className="label mb-2 block" htmlFor="contact-name">
          Name
        </label>
        <input
          className={fieldClasses}
          defaultValue={state.values?.name}
          id="contact-name"
          name="name"
          required
          type="text"
        />
      </div>

      <div>
        <label className="label mb-2 block" htmlFor="contact-email">
          E-Mail
        </label>
        <input
          className={fieldClasses}
          defaultValue={state.values?.email}
          id="contact-email"
          name="email"
          required
          type="email"
        />
      </div>

      <div>
        <label className="label mb-2 block" htmlFor="contact-message">
          Nachricht
        </label>
        <textarea
          className={fieldClasses}
          defaultValue={state.values?.message}
          id="contact-message"
          minLength={10}
          name="message"
          required
          rows={5}
        />
      </div>

      {state.status === 'error' && <p className="text-sm text-umber">{state.message}</p>}

      <button
        className="border border-nussbaum px-8 py-3 text-sm transition-colors hover:bg-nussbaum hover:text-kalk disabled:opacity-50"
        disabled={pending}
        type="submit"
      >
        {pending ? 'Wird gesendet…' : 'Nachricht senden'}
      </button>
    </form>
  )
}
