'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X, FileText, Loader2, CheckCircle2, AlertCircle, ArrowRight } from 'lucide-react'

type Status = 'idle' | 'submitting' | 'sent' | 'error'

export function WhitePaperDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [status, setStatus] = useState<Status>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus('submitting')
    setErrorMessage('')

    const form = e.currentTarget
    const data = Object.fromEntries(new FormData(form).entries())

    // Honeypot tripped — silently drop the submission without alerting the bot.
    if (data.website) {
      setStatus('sent')
      form.reset()
      return
    }

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          service: 'Solutions',
          message: `White paper request — "The Rise of Agentic AI Operations".\n\nCompany: ${data.company || '—'}\nPhone: ${data.phone || '—'}`,
        }),
      })

      if (!res.ok) {
        const body = await res.json().catch(() => null)
        throw new Error(body?.error || 'Something went wrong. Please try again.')
      }

      setStatus('sent')
      form.reset()
    } catch (err) {
      setStatus('error')
      setErrorMessage(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
    }
  }

  const handleClose = () => {
    onClose()
    // Reset after the close animation finishes so it doesn't flash mid-close.
    setTimeout(() => setStatus('idle'), 300)
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-100 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm sm:p-8"
          onClick={handleClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative grid w-full max-w-3xl grid-cols-1 overflow-hidden rounded-3xl bg-white shadow-2xl sm:grid-cols-[0.85fr_1.15fr]"
          >
            <button
              type="button"
              onClick={handleClose}
              aria-label="Close"
              className="text-ink absolute top-4 right-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-black/5 shadow-md transition-colors hover:bg-black/10"
            >
              <X size={18} />
            </button>

            {/* LEFT — pitch */}
            <div className="bg-navy relative hidden flex-col justify-between overflow-hidden p-8 text-white sm:flex">
              <div aria-hidden className="bg-primary/25 pointer-events-none absolute -top-10 -left-10 h-56 w-56 rounded-full blur-[90px]" />
              <div className="relative">
                <span className="bg-primary/15 text-primary flex h-11 w-11 items-center justify-center rounded-xl">
                  <FileText size={20} />
                </span>
                <h3 className="mt-5 font-sans text-xl leading-tight font-bold">The Rise of Agentic AI Operations</h3>
                <p className="mt-3 text-[13.5px] leading-relaxed text-white/60">
                  A practical look at how organizations are layering autonomous AI agents over existing ERP and enterprise
                  systems — without a disruptive migration.
                </p>
              </div>
              <ul className="relative mt-8 flex flex-col gap-2.5 text-[12.5px] text-white/70">
                {['What agentic AI changes for ERP', 'Where to start for fastest value', 'How to avoid a rip-and-replace'].map((item) => (
                  <li key={item} className="flex items-center gap-2.5">
                    <span className="bg-primary h-1.5 w-1.5 shrink-0 rounded-full" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* RIGHT — form */}
            <div className="flex flex-col p-7 sm:p-8">
              {status === 'sent' ? (
                <div className="flex flex-1 flex-col items-center justify-center py-8 text-center">
                  <span className="bg-primary/10 text-primary flex h-14 w-14 items-center justify-center rounded-full">
                    <CheckCircle2 size={26} />
                  </span>
                  <h3 className="text-ink mt-5 text-lg font-bold">Request received</h3>
                  <p className="text-muted-foreground mt-2 max-w-xs text-[13.5px] leading-relaxed">
                    Thanks — our team will email you the white paper shortly.
                  </p>
                  <button
                    type="button"
                    onClick={handleClose}
                    className="text-primary mt-6 text-[13px] font-bold underline-offset-4 hover:underline"
                  >
                    Close
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div>
                    <h3 className="text-ink text-lg font-bold">Get the white paper</h3>
                    <p className="text-muted-foreground mt-1 text-[13px] leading-relaxed">
                      Tell us where to send it — we&apos;ll email your copy directly.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <Field label="Name" name="name" placeholder="Jane Smith" autoComplete="name" required />
                    <Field label="Email" name="email" type="email" placeholder="jane@company.com" autoComplete="email" required />
                  </div>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <Field label="Phone" name="phone" type="tel" placeholder="(312) 555-0100" autoComplete="tel" />
                    <Field label="Company" name="company" placeholder="Company name" autoComplete="organization" />
                  </div>

                  {/* Honeypot — hidden from real users, catches simple bots */}
                  <input
                    type="text"
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                    className="pointer-events-none absolute left-[-9999px] h-0 w-0 opacity-0"
                  />

                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="bg-primary hover:bg-accent-hover mt-2 inline-flex items-center justify-center gap-2.5 rounded-full px-6 py-3.5 text-sm font-bold text-white transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {status === 'submitting' ? (
                      <>
                        Sending <Loader2 size={16} className="animate-spin" />
                      </>
                    ) : (
                      <>
                        Send me the white paper <ArrowRight size={16} />
                      </>
                    )}
                  </button>

                  {status === 'error' && (
                    <p role="alert" className="flex items-center gap-2 text-xs text-red-600">
                      <AlertCircle size={14} /> {errorMessage}
                    </p>
                  )}
                </form>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function Field({
  label,
  name,
  type = 'text',
  placeholder,
  autoComplete,
  required = false,
}: {
  label: string
  name: string
  type?: string
  placeholder?: string
  autoComplete?: string
  required?: boolean
}) {
  return (
    <label className="text-ink flex flex-col gap-2 text-[13px] font-bold">
      {label}
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete}
        required={required}
        maxLength={type === 'email' ? 254 : 120}
        className="border-border bg-background text-foreground placeholder:text-muted-foreground/60 focus:border-primary w-full rounded-xl border px-4 py-3.5 text-[15px] font-normal outline-none transition-colors"
      />
    </label>
  )
}
