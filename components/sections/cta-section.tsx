'use client'

import Link from 'next/link'
import { ArrowRight, Clock, MessageSquare, Phone } from 'lucide-react'
import { Container, SectionLabel, RevealText, Reveal } from '@/components/common'
import { contact } from '@/data/site'

/** What a visitor actually wants to know before they reach out. */
const assurances = [
  { icon: Clock, label: 'One business day', detail: 'Typical first response', tone: 'text-primary border-primary/40' },
  { icon: MessageSquare, label: 'No sales script', detail: 'A practitioner, not a rep', tone: 'text-blue border-blue/40' },
]

/**
 * Closing CTA. Laid out as an asymmetric split rather than centred text: the
 * ask sits on the left, and the right column answers the question a visitor
 * has before contacting anyone — what happens next, and how fast.
 */
export function CTASection({
  eyebrow = 'Connect with CSC',
  title,
  description = 'Tell us what you are working through. We will point you at the right person, whether or not that turns into an engagement.',
  href = '/contact',
  cta = 'Talk to our team',
  index,
}: {
  eyebrow?: string
  title: string
  description?: string
  href?: string
  cta?: string
  index?: string
}) {
  const telHref = `tel:${contact.phone.replace(/[^\d+]/g, '')}`

  return (
    <section className="bg-navy relative isolate overflow-hidden py-20 text-white sm:py-24">
      {/* Dot-grid, pulled to the right so it sits behind the panel not the type */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: 'radial-gradient(rgba(255,255,255,0.12) 1.2px, transparent 1.2px)',
          backgroundSize: '26px 26px',
          maskImage: 'radial-gradient(ellipse 55% 75% at 82% 50%, black 20%, transparent 76%)',
          WebkitMaskImage: 'radial-gradient(ellipse 55% 75% at 82% 50%, black 20%, transparent 76%)',
        }}
      />

      {/* Colour glow — teal-blue-purple, low and to the left */}
      <div
        aria-hidden
        className="brand-gradient pointer-events-none absolute -bottom-48 -left-32 h-125 w-125 rounded-full opacity-25 blur-[130px]"
      />

      <Container className="relative">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-end lg:gap-20">
          {/* ===============================================
              LEFT — THE ASK
          =============================================== */}
          <div>
            <SectionLabel index={index} light>
              {eyebrow}
            </SectionLabel>

            <RevealText
              text={title}
              className="mt-8 max-w-2xl font-sans text-[clamp(2rem,4.6vw,3.4rem)] leading-[1.03] font-black tracking-[-0.035em] text-white text-balance"
            />

            {description && (
              <Reveal delay={0.15}>
                <p className="mt-7 max-w-lg text-[15px] leading-[1.75] text-white/60 sm:text-base">{description}</p>
              </Reveal>
            )}

            <Reveal delay={0.2}>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Link
                  href={href}
                  className="brand-gradient group inline-flex items-center justify-center gap-3 rounded-xl px-7 py-4 text-sm font-bold text-white shadow-[0_8px_28px_rgba(47,107,239,0.35)] transition-shadow duration-300 hover:shadow-[0_12px_36px_rgba(124,92,255,0.45)]"
                >
                  {cta}
                  <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                </Link>

                <a
                  href={telHref}
                  className="inline-flex items-center justify-center gap-2.5 rounded-xl border border-white/25 px-7 py-4 text-sm font-bold text-white transition-colors duration-300 hover:border-white/50 hover:bg-white/5"
                >
                  <Phone size={15} strokeWidth={2} />
                  {contact.phone}
                </a>
              </div>
            </Reveal>
          </div>

          {/* ===============================================
              RIGHT — WHAT HAPPENS NEXT
          =============================================== */}
          <Reveal delay={0.25}>
            <div className="rounded-2xl border border-white/12 bg-white/[0.03] p-6 backdrop-blur-sm sm:p-7">
              <p className="text-[10px] font-black tracking-[0.2em] text-white/40 uppercase">What happens next</p>

              <ul className="mt-6 divide-y divide-white/8">
                {assurances.map(({ icon: Icon, label, detail, tone }) => (
                  <li key={label} className="flex items-start gap-4 py-4 first:pt-0 last:pb-0">
                    <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border ${tone}`}>
                      <Icon size={16} strokeWidth={1.9} />
                    </span>
                    <div>
                      <p className="text-[14px] leading-snug font-bold tracking-tight text-white">{label}</p>
                      <p className="mt-1 text-[12.5px] leading-snug text-white/50">{detail}</p>
                    </div>
                  </li>
                ))}
              </ul>

              <a
                href={`mailto:${contact.email}`}
                className="group mt-6 flex items-center justify-between gap-3 border-t border-white/10 pt-5"
              >
                <span className="text-[13px] font-semibold text-white/60 transition-colors group-hover:text-white">
                  {contact.email}
                </span>
                <ArrowRight
                  size={14}
                  className="text-primary shrink-0 transition-transform duration-300 group-hover:translate-x-1"
                />
              </a>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
