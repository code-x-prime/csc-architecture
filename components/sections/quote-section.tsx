'use client'

import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { Container, SectionLabel, Reveal } from '@/components/common'
import { testimonials } from '@/data/site'

const EASE = [0.22, 1, 0.36, 1] as const
const AUTOPLAY_MS = 9000

const items = testimonials.slice(0, 5)

/**
 * Client testimonials. Laid out as an asymmetric split — the quote holds the
 * wide column while a numbered rail on the left lets a reader jump between
 * voices — rather than one centred block that reads as filler.
 */
export function QuoteSection({ index = '13' }: { index?: string }) {
  const [current, setCurrent] = useState(0)
  const [paused, setPaused] = useState(false)

  const go = useCallback((delta: number) => {
    setCurrent((prev) => (prev + delta + items.length) % items.length)
  }, [])

  useEffect(() => {
    if (paused || items.length < 2) return
    const id = setInterval(() => go(1), AUTOPLAY_MS)
    return () => clearInterval(id)
  }, [paused, go])

  const active = items[current]

  return (
    <section
      className="bg-navy relative isolate overflow-hidden py-20 text-white sm:py-24"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-roledescription="carousel"
      aria-label="Client testimonials"
    >
      {/* Dot texture behind the rail */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: 'radial-gradient(rgba(255,255,255,0.1) 1.2px, transparent 1.2px)',
          backgroundSize: '26px 26px',
          maskImage: 'radial-gradient(ellipse 45% 70% at 12% 50%, black 20%, transparent 75%)',
          WebkitMaskImage: 'radial-gradient(ellipse 45% 70% at 12% 50%, black 20%, transparent 75%)',
        }}
      />

      <Container className="relative">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16">
          {/* ===============================================
              LEFT — HEADING AND VOICE RAIL
          =============================================== */}
          <div className="flex flex-col">
            <Reveal>
              <SectionLabel index={index} light>
                Testimonials
              </SectionLabel>
              <h2 className="mt-7 max-w-xs font-sans text-[clamp(1.6rem,3vw,2.2rem)] leading-[1.1] font-black tracking-[-0.03em] text-white text-balance">
                In their words.
              </h2>
            </Reveal>

            {/* Voice rail — names double as the carousel controls */}
            {items.length > 1 && (
              <ul className="mt-10 flex flex-col border-t border-white/10">
                {items.map((item, i) => {
                  const isActive = i === current

                  return (
                    <li key={item.name + i} className="border-b border-white/10">
                      <button
                        type="button"
                        onClick={() => setCurrent(i)}
                        aria-current={isActive}
                        className="group flex w-full items-center gap-4 py-3.5 text-left"
                      >
                        <span
                          className={
                            isActive
                              ? 'text-primary text-[11px] font-black tracking-[0.16em] tabular-nums'
                              : 'text-white/30 group-hover:text-white/60 text-[11px] font-black tracking-[0.16em] tabular-nums transition-colors'
                          }
                        >
                          {String(i + 1).padStart(2, '0')}
                        </span>

                        <span
                          className={
                            isActive
                              ? 'flex-1 text-[13px] leading-snug font-bold tracking-tight text-white'
                              : 'flex-1 text-[13px] leading-snug font-bold tracking-tight text-white/45 transition-colors group-hover:text-white/75'
                          }
                        >
                          {item.name}
                        </span>

                        {/* Progress bar doubles as the active marker */}
                        <span aria-hidden className="h-0.5 w-8 shrink-0 overflow-hidden bg-white/15">
                          {isActive && (
                            <motion.span
                              key={current}
                              className="bg-primary block h-full"
                              initial={{ width: '0%' }}
                              animate={{ width: '100%' }}
                              transition={{ duration: paused ? 0 : AUTOPLAY_MS / 1000, ease: 'linear' }}
                            />
                          )}
                        </span>
                      </button>
                    </li>
                  )
                })}
              </ul>
            )}
          </div>

          {/* ===============================================
              RIGHT — THE QUOTE
          =============================================== */}
          <div className="flex flex-col justify-center lg:pl-10">
            <span
              aria-hidden
              className="text-primary/30 font-serif text-[4.5rem] leading-[0.5] select-none sm:text-[6rem]"
            >
              &ldquo;
            </span>

            <div className="mt-10 min-h-64 sm:min-h-56">
              <AnimatePresence mode="wait">
                <motion.blockquote
                  key={current}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.5, ease: EASE }}
                >
                  <p className="text-[clamp(1.2rem,2.5vw,1.9rem)] leading-[1.4] font-black tracking-[-0.025em] text-white/90 text-balance">
                    {active.text}
                  </p>

                  <footer className="mt-9 flex items-center gap-4">
                    <span aria-hidden className="bg-primary h-8 w-0.5 shrink-0" />
                    <div>
                      <p className="text-[12px] font-black tracking-[0.16em] text-white uppercase">{active.name}</p>
                      <p className="mt-1.5 text-[13px] text-white/50">{active.role}</p>
                    </div>
                  </footer>
                </motion.blockquote>
              </AnimatePresence>
            </div>

            {/* Arrows */}
            {items.length > 1 && (
              <div className="mt-10 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => go(-1)}
                  aria-label="Previous testimonial"
                  className="hover:border-primary hover:text-primary flex h-11 w-11 items-center justify-center rounded-lg border border-white/20 text-white/60 transition-colors duration-300"
                >
                  <ArrowLeft size={16} />
                </button>
                <button
                  type="button"
                  onClick={() => go(1)}
                  aria-label="Next testimonial"
                  className="hover:border-primary hover:text-primary flex h-11 w-11 items-center justify-center rounded-lg border border-white/20 text-white/60 transition-colors duration-300"
                >
                  <ArrowRight size={16} />
                </button>

                <span className="ml-2 text-[11px] font-black tracking-[0.16em] text-white/35 tabular-nums">
                  {String(current + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
                </span>
              </div>
            )}
          </div>
        </div>
      </Container>

      <p className="sr-only" aria-live="polite">
        {active.name}: {active.text}
      </p>
    </section>
  )
}
