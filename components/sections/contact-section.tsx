'use client'

import { useRef, useState } from 'react'
import { motion, useInView, type Variants } from 'framer-motion'
import { ArrowUpRight, Mail, MapPin, Phone, Loader2, CheckCircle2, AlertCircle } from 'lucide-react'
import { contact } from '@/data/site'
import { Container, Eyebrow } from '@/components/common'

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
  }),
}

export function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-white py-20 sm:py-28">
      {/* Decorative background */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 left-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/3 rounded-full bg-primary/10 blur-[150px]" />
        <div className="absolute -bottom-40 -left-32 hidden h-[380px] w-[380px] rounded-full border border-black/4 lg:block" />
        <div className="absolute -top-24 -right-24 hidden h-[320px] w-[320px] rounded-full border border-black/4 lg:block" />
      </div>
      <div aria-hidden className="absolute top-0 right-0 left-0 h-px bg-black/[0.07]" />

      <Container className="relative grid grid-cols-1 gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <motion.div initial="hidden" animate={isInView ? 'visible' : 'hidden'} custom={0} variants={fadeUp}>
          <Eyebrow>CSC contact</Eyebrow>
          <h2 className="text-ink mt-4 font-sans text-[clamp(2rem,3.8vw,3rem)] leading-[1.05] font-bold tracking-tight">
            Let&apos;s make the next step clear.
          </h2>
          <p className="text-muted-foreground mt-5 max-w-md text-lg leading-relaxed">
            Connect with Consulting Services Corporation about consulting, technology, staffing, or career support.
          </p>
          <div className="mt-10 flex flex-col gap-5">
            <ContactDetail icon={Mail} label="Email" value={contact.email} href={`mailto:${contact.email}`} />
            <ContactDetail icon={Phone} label="Phone" value={contact.phone} href={`tel:${contact.phone.replace(/[^\d+]/g, '')}`} />
            <ContactDetail icon={MapPin} label="Address" value={contact.address} />
          </div>
        </motion.div>

        <motion.div initial="hidden" animate={isInView ? 'visible' : 'hidden'} custom={0.14} variants={fadeUp}>
          <ContactForm />
        </motion.div>
      </Container>
    </section>
  )
}

function ContactDetail({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: typeof Mail
  label: string
  value: string
  href?: string
}) {
  return (
    <div className="border-border hover:border-primary/30 flex items-start gap-4 rounded-2xl border bg-white p-4 shadow-[0_5px_25px_rgba(0,0,0,0.025)] transition-colors duration-300">
      <span className="bg-primary/8 text-primary flex h-10 w-10 shrink-0 items-center justify-center rounded-xl">
        <Icon size={17} />
      </span>
      <div className="min-w-0">
        <p className="text-muted-foreground text-[10.5px] font-bold tracking-[0.16em] uppercase">{label}</p>
        {href ? (
          <a href={href} className="text-ink hover:text-primary mt-1 block text-[15px] font-bold transition-colors">
            {value}
          </a>
        ) : (
          <p className="text-ink mt-1 text-[15px] font-bold">{value}</p>
        )}
      </div>
    </div>
  )
}

type Status = 'idle' | 'submitting' | 'sent' | 'error'

function ContactForm() {
  const [status, setStatus] = useState<Status>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus('submitting')
    setErrorMessage('')

    const form = e.currentTarget
    const data = Object.fromEntries(new FormData(form).entries())

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
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

  return (
    <form
      onSubmit={handleSubmit}
      className="border-border flex flex-col gap-5 rounded-3xl border bg-white p-7 shadow-[0_5px_25px_rgba(0,0,0,0.025)] sm:p-9"
    >
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field label="Name" name="name" required />
        <Field label="Email" name="email" type="email" required />
      </div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field label="Phone" name="phone" />
        <Field label="Company" name="company" />
      </div>
      <label className="text-ink flex flex-col gap-2 text-[13px] font-bold">
        How can we help?
        <select
          name="service"
          defaultValue=""
          required
          className="border-border bg-background text-foreground focus:border-primary rounded-xl border px-4 py-3 text-[15px] font-normal outline-none transition-colors"
        >
          <option value="" disabled>
            Select an area
          </option>
          <option>Solutions</option>
          <option>How We Help</option>
          <option>Who We Help</option>
          <option>Careers</option>
        </select>
      </label>
      <label className="text-ink flex flex-col gap-2 text-[13px] font-bold">
        Message
        <textarea
          required
          name="message"
          rows={5}
          className="border-border bg-background text-foreground focus:border-primary resize-none rounded-xl border px-4 py-3 text-[15px] font-normal outline-none transition-colors"
        />
      </label>

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="bg-primary hover:bg-accent-hover inline-flex items-center justify-center gap-2.5 rounded-full px-6 py-3.5 text-sm font-bold text-white transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === 'submitting' ? (
          <>
            Sending <Loader2 size={16} className="animate-spin" />
          </>
        ) : status === 'sent' ? (
          <>
            Inquiry sent <CheckCircle2 size={16} />
          </>
        ) : (
          <>
            Send inquiry <ArrowUpRight size={16} />
          </>
        )}
      </button>

      {status === 'sent' && (
        <p role="status" className="text-muted-foreground flex items-center gap-2 text-xs">
          <CheckCircle2 size={14} className="text-primary" /> Thanks — your inquiry has been sent to our team.
        </p>
      )}
      {status === 'error' && (
        <p role="alert" className="flex items-center gap-2 text-xs text-red-600">
          <AlertCircle size={14} /> {errorMessage}
        </p>
      )}
    </form>
  )
}

function Field({ label, name, type = 'text', required = false }: { label: string; name: string; type?: string; required?: boolean }) {
  return (
    <label className="text-ink flex flex-col gap-2 text-[13px] font-bold">
      {label}
      <input
        name={name}
        type={type}
        required={required}
        className="border-border bg-background text-foreground focus:border-primary rounded-xl border px-4 py-3 text-[15px] font-normal outline-none transition-colors"
      />
    </label>
  )
}
