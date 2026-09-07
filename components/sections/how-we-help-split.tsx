'use client'

import { useCallback, useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import { howWeHelp } from '@/data/site'
import { Container, SectionLabel } from '@/components/common'

const EASE = [0.22, 1, 0.36, 1] as const
const AUTOPLAY_MS = 7000

const CATEGORIES: Record<string, string> = {
  'great-framework': 'Strategy',
  'business-simulation': 'Enablement',
  'change-management': 'Transformation',
  'innovation-digital-transformation': 'Innovation',
}

/**
 * How-we-help carousel — a framed image alongside one card at a time, so each
 * offering gets read rather than skimmed as a grid of four.
 */
export function HowWeHelpSplit({
  eyebrow = 'How we help',
  title = 'Ways we help teams move forward.',
  image = '/images/home/csc-home-strategy.jpg',
  imageAlt = 'Consulting team reviewing a strategic framework around a whiteboard',
  index: sectionIndex = '09',
}: {
  eyebrow?: string
  title?: string
  image?: string
  imageAlt?: string
  index?: string
}) {
  const items = howWeHelp.slice(0, 4)

  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)

  const go = useCallback(
    (delta: number) => setIndex((prev) => (prev + delta + items.length) % items.length),
    [items.length],
  )

  useEffect(() => {
    if (paused || items.length < 2) return
    const id = setInterval(() => go(1), AUTOPLAY_MS)
    return () => clearInterval(id)
  }, [paused, go, items.length])

  const active = items[index]

  return (
    <section className="bg-paper border-border border-b py-20 sm:py-24">
      <Container>
        <div className="max-w-2xl">
          <SectionLabel index={sectionIndex}>{eyebrow}</SectionLabel>
          <h2 className="text-ink mt-6 font-sans text-[clamp(1.75rem,3.4vw,2.5rem)] leading-[1.08] font-black tracking-[-0.03em] text-balance">
            {title}
          </h2>
        </div>

        <div
          className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          aria-roledescription="carousel"
          aria-label="Ways we help"
        >
          {/* =============================================
              LEFT — FRAMED IMAGE
          ============================================== */}
          <div className="bg-navy relative h-[300px] overflow-hidden rounded-2xl sm:h-[400px] lg:h-auto lg:min-h-[420px]">
            <Image
              src={image}
              alt={imageAlt}
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 48vw, 100vw"
            />
            <div aria-hidden className="from-navy/85 absolute inset-0 bg-linear-to-t to-transparent" />

            <p className="absolute bottom-7 left-7 max-w-[14ch] text-[clamp(1.1rem,1.9vw,1.5rem)] leading-[1.15] font-black tracking-[-0.02em] text-white uppercase">
              Solving today for a brighter tomorrow.
            </p>
          </div>

          {/* =============================================
              RIGHT — CAROUSEL CARD
          ============================================== */}
          <div className="border-border flex flex-col rounded-2xl border bg-white p-7 sm:p-9">
            <div className="flex items-center justify-between gap-4">
              <span className="text-muted-foreground text-[12px] font-black tracking-[0.16em] tabular-nums">
                {String(index + 1).padStart(2, '0')}{' '}
                <span className="text-border">/</span>{' '}
                {String(items.length).padStart(2, '0')}
              </span>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => go(-1)}
                  aria-label="Previous"
                  className="border-border text-muted-foreground hover:border-primary hover:text-primary flex h-9 w-9 items-center justify-center rounded-lg border transition-colors duration-300"
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  type="button"
                  onClick={() => go(1)}
                  aria-label="Next"
                  className="border-border text-muted-foreground hover:border-primary hover:text-primary flex h-9 w-9 items-center justify-center rounded-lg border transition-colors duration-300"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>

            <div className="mt-10 min-h-[190px] flex-1">
              <AnimatePresence mode="wait">
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.45, ease: EASE }}
                >
                  <p className="text-primary text-[10px] font-black tracking-[0.2em] uppercase">
                    {CATEGORIES[active.slug] ?? 'Consulting'}
                  </p>

                  <h3 className="text-ink mt-4 font-sans text-[clamp(1.35rem,2.4vw,1.85rem)] leading-[1.15] font-black tracking-[-0.025em]">
                    {active.title}
                  </h3>

                  <p className="text-muted-foreground mt-4 max-w-md text-[15px] leading-[1.7]">{active.description}</p>

                  <Link
                    href={`/how-we-help/${active.slug}`}
                    className="text-primary hover:text-accent-hover group mt-7 inline-flex items-center gap-2 text-[13px] font-bold tracking-tight transition-colors"
                  >
                    Learn more
                    <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Progress rail */}
            <div className="border-border mt-8 flex gap-2 border-t pt-6">
              {items.map((item, i) => (
                <button
                  key={item.slug}
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-label={`Show ${item.title}`}
                  aria-current={i === index}
                  className="group flex-1 py-1"
                >
                  <span
                    className={`block h-0.5 rounded-full transition-colors duration-300 ${
                      i === index ? 'bg-primary' : 'bg-border group-hover:bg-muted-foreground/40'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </Container>

      <p className="sr-only" aria-live="polite">
        {active.title}
      </p>
    </section>
  )
}
