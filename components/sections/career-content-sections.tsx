'use client'

import { useState } from 'react'
import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, Check, Minus, Plus } from 'lucide-react'
import type { SitePage } from '@/data/site'
import { Container, SectionLabel, Reveal, RevealStagger } from '@/components/common'

const EASE = [0.22, 1, 0.36, 1] as const

/**
 * Body layout for Careers pages — an accordion. Candidates and hiring managers
 * scan for the one thing they came for rather than reading top to bottom, so
 * the sections open on demand instead of stacking as walls of text.
 */
export function CareerContentSections({ sections }: { sections: SitePage['sections'] }) {
  // The first section carries the overview, so it starts open.
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section className="border-border border-b bg-white py-20 sm:py-24">
      <Container>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          {/* ===============================================
              LEFT — STICKY HEADING
          =============================================== */}
          <Reveal className="lg:sticky lg:top-32 lg:self-start">
            <SectionLabel index="02">What to expect</SectionLabel>
            <h2 className="text-ink mt-6 font-sans text-[clamp(1.75rem,3.4vw,2.5rem)] leading-[1.08] font-black tracking-[-0.03em] text-balance">
              How this works.
            </h2>
            <p className="text-muted-foreground mt-6 max-w-sm text-[15px] leading-[1.75]">
              Open a section to see the detail. Prefer to just talk it through? That works too.
            </p>

            <Link
              href="/contact"
              className="text-primary hover:text-accent-hover group mt-7 inline-flex items-center gap-2 text-[13px] font-bold tracking-tight transition-colors"
            >
              Start a conversation
              <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </Reveal>

          {/* ===============================================
              RIGHT — ACCORDION
          =============================================== */}
          <div className="border-border border-t">
            {sections.map((s, i) => {
              const isOpen = openIndex === i

              return (
                <div key={s.heading} className="border-border border-b">
                  <h3>
                    <button
                      type="button"
                      onClick={() => setOpenIndex(isOpen ? null : i)}
                      aria-expanded={isOpen}
                      className="group flex w-full items-center gap-5 py-6 text-left"
                    >
                      <span
                        className={
                          isOpen
                            ? 'text-primary text-[11px] font-black tracking-[0.18em] tabular-nums transition-colors'
                            : 'text-muted-foreground group-hover:text-ink text-[11px] font-black tracking-[0.18em] tabular-nums transition-colors'
                        }
                      >
                        {String(i + 1).padStart(2, '0')}
                      </span>

                      <span
                        className={
                          isOpen
                            ? 'text-ink flex-1 font-sans text-[clamp(1.05rem,2vw,1.4rem)] leading-tight font-black tracking-[-0.025em]'
                            : 'text-ink/75 group-hover:text-ink flex-1 font-sans text-[clamp(1.05rem,2vw,1.4rem)] leading-tight font-black tracking-[-0.025em] transition-colors'
                        }
                      >
                        {s.heading}
                      </span>

                      <span
                        aria-hidden
                        className={
                          isOpen
                            ? 'border-primary bg-primary flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border text-white transition-colors duration-300'
                            : 'border-border text-muted-foreground group-hover:border-primary/40 group-hover:text-primary flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border transition-colors duration-300'
                        }
                      >
                        {isOpen ? <Minus size={15} strokeWidth={2.5} /> : <Plus size={15} strokeWidth={2.5} />}
                      </span>
                    </button>
                  </h3>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: EASE }}
                        className="overflow-hidden"
                      >
                        <div className="pb-8 sm:pl-13">
                          <p className="text-muted-foreground text-[15px] leading-[1.8]">{s.body}</p>

                          {s.items && (
                            <ul className="mt-6 flex flex-col gap-2.5">
                              {s.items.map((item) => (
                                <li key={item} className="flex items-start gap-3">
                                  <span className="border-primary/40 text-primary mt-px flex h-5 w-5 shrink-0 items-center justify-center rounded border">
                                    <Check size={12} strokeWidth={3} />
                                  </span>
                                  <span className="text-ink text-[14px] leading-snug font-semibold tracking-tight">
                                    {item}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            })}
          </div>
        </div>
      </Container>
    </section>
  )
}

const candidateSteps = [
  { step: 'Tell us your story', body: 'Share your background, strengths, and what you want next.' },
  { step: 'We match, not spray', body: 'Roles we put in front of you fit your goals, not just a keyword.' },
  { step: 'Prep and introduce', body: 'You go in briefed, with real context on the team and the work.' },
  { step: 'Stay in touch', body: 'We check in after you land — the relationship does not end at the offer.' },
]

const employerSteps = [
  { step: 'Understand the need', body: 'Role, team, timeline, and what success actually looks like.' },
  { step: 'Source deliberately', body: 'A shortlist built on fit, not a stack of loosely matched resumes.' },
  { step: 'Screen and brief', body: 'Candidates arrive vetted, with context on why they fit.' },
  { step: 'Support the landing', body: 'We stay engaged through onboarding so the placement holds.' },
]

/**
 * Track-specific process rail. Candidates and hiring organizations get a
 * genuinely different set of steps rather than one generic sequence.
 */
export function CareerTrackBand({ isCandidate, index = '03' }: { isCandidate: boolean; index?: string }) {
  const steps = isCandidate ? candidateSteps : employerSteps

  return (
    <section className="bg-paper border-border border-b py-20 sm:py-24">
      <Container>
        <Reveal className="max-w-2xl">
          <SectionLabel index={index}>{isCandidate ? 'For candidates' : 'For organizations'}</SectionLabel>
          <h2 className="text-ink mt-6 font-sans text-[clamp(1.75rem,3.4vw,2.5rem)] leading-[1.08] font-black tracking-[-0.03em] text-balance">
            {isCandidate ? 'From conversation to offer.' : 'From brief to placement.'}
          </h2>
        </Reveal>

        <RevealStagger className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((item, i) => (
            <div key={item.step} className="h-full">
              <article className="group border-border hover:border-primary/40 relative h-full overflow-hidden rounded-xl border bg-white p-6 transition-all duration-300 hover:-translate-y-1">
                <span
                  aria-hidden
                  className="bg-primary absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100"
                />

                <span className="text-border group-hover:text-primary/40 block text-[2.5rem] leading-[0.8] font-black tracking-[-0.05em] tabular-nums transition-colors duration-500">
                  {String(i + 1).padStart(2, '0')}
                </span>

                <h3 className="text-ink mt-6 font-sans text-[15px] leading-snug font-bold tracking-tight">{item.step}</h3>
                <p className="text-muted-foreground mt-2.5 text-[13.5px] leading-[1.65]">{item.body}</p>
              </article>
            </div>
          ))}
        </RevealStagger>
      </Container>
    </section>
  )
}
