'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, type Variants } from 'framer-motion'
import { ArrowRight, ArrowUpRight, Sparkles } from 'lucide-react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from '@/components/ui/carousel'
import { Container } from '@/components/common'
import type { HeroSlide } from './dark-hero'
import Autoplay from 'embla-carousel-autoplay'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const EASE = [0.22, 1, 0.36, 1] as const
const AUTOPLAY_MS = 6500

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.07, ease: EASE },
  }),
  exit: { opacity: 0, y: -10, transition: { duration: 0.25, ease: 'easeIn' } },
}

/** Standing proof points — the same on every slide, so they sit outside the cross-fade. */
const proofPoints = [
  { value: '20+', label: 'Years in practice' },
  { value: '10+', label: 'Industries served' },
  { value: '4.9', label: 'Client rating' },
]

/** Splits a title so the `highlight` substring can be tinted with the accent. */
function TitleWithHighlight({ title, highlight }: { title: string; highlight?: string }) {
  if (!highlight) return <>{title}</>
  const at = title.indexOf(highlight)
  if (at === -1) return <>{title}</>
  return (
    <>
      {title.slice(0, at)}
      <span className="text-primary">{highlight}</span>
      {title.slice(at + highlight.length)}
    </>
  )
}

export function SplitHero({
  eyebrow,
  title,
  description,
  image,
  imageAlt,
  ctaHref = '/contact',
  ctaLabel = "Here's how it works",
  secondaryHref,
  secondaryLabel = 'Calculate quote',
  slides,
}: {
  eyebrow: string
  title: string
  description: string
  image: string
  imageAlt?: string
  ctaHref?: string
  ctaLabel?: string
  secondaryHref?: string
  secondaryLabel?: string
  slides?: HeroSlide[]
}) {
  const heroSlides: HeroSlide[] =
    slides && slides.length > 0
      ? slides
      : [{ eyebrow, title, description, image, imageAlt, ctaHref, ctaLabel, secondaryHref, secondaryLabel }]

  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  const [paused, setPaused] = useState(false)
  const imageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!api) return
    const update = () => setCurrent(api.selectedScrollSnap())
    update()
    api.on('select', update)
    return () => {
      api.off('select', update)
    }
  }, [api])

  /* Scroll-linked drift on the hero imagery — subtle, and skipped entirely
     when the visitor prefers reduced motion. */
  useEffect(() => {
    const el = imageRef.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ctx = gsap.context(() => {
      gsap.to(el, {
        yPercent: 8,
        ease: 'none',
        scrollTrigger: { trigger: el, start: 'top top', end: 'bottom top', scrub: true },
      })
    }, el)

    return () => ctx.revert()
  }, [])

  const activeSlide = heroSlides[current] ?? heroSlides[0]
  const total = heroSlides.length

  return (
    <section className="bg-paper relative isolate">
      {/* The min-height only applies once the two columns sit side by side;
          stacked on mobile the content sets its own height. */}
      <div className="grid grid-cols-1 lg:min-h-[90vh] lg:grid-cols-[1.05fr_0.95fr]">
        {/* ================================================
            LEFT — editorial content, cross-fades per slide
        ================================================= */}
        <div className="relative order-2 flex items-center overflow-hidden py-12 sm:py-14 lg:order-1 lg:py-24">
          {/* Dot-grid texture, faded out towards the edges */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage: 'radial-gradient(rgba(16,33,43,0.11) 1.2px, transparent 1.2px)',
              backgroundSize: '24px 24px',
              maskImage: 'radial-gradient(ellipse 78% 68% at 28% 42%, black 38%, transparent 82%)',
              WebkitMaskImage: 'radial-gradient(ellipse 78% 68% at 28% 42%, black 38%, transparent 82%)',
            }}
          />

          <Container className="relative lg:pr-14">
            <AnimatePresence mode="wait">
              <motion.div key={current} initial="hidden" animate="show" exit="exit">
                {/* Eyebrow — indexed label */}
                <motion.p
                  custom={0}
                  variants={fadeUp}
                  className="text-muted-foreground flex items-center gap-3 text-[10px] font-black tracking-[0.22em] uppercase sm:text-[11px]"
                >
                  <span className="text-primary tabular-nums">{String(current + 1).padStart(2, '0')}</span>
                  <span aria-hidden className="bg-border h-px w-6" />
                  {activeSlide.eyebrow}
                </motion.p>

                <motion.h1
                  custom={1}
                  variants={fadeUp}
                  className="text-ink mt-6 max-w-xl font-sans text-[clamp(2rem,7vw,3.9rem)] leading-[0.98] font-black tracking-[-0.035em] uppercase text-balance"
                >
                  <TitleWithHighlight title={activeSlide.title} highlight={activeSlide.highlight} />
                </motion.h1>

                <motion.p
                  custom={2}
                  variants={fadeUp}
                  className="text-muted-foreground mt-7 max-w-md text-[15px] leading-[1.75] sm:text-base"
                >
                  {activeSlide.description}
                </motion.p>

                <motion.div custom={3} variants={fadeUp} className="mt-9 flex flex-wrap items-center gap-3">
                  <Link
                    href={activeSlide.ctaHref ?? ctaHref}
                    className="bg-ink hover:bg-primary group xs:flex-none xs:justify-start inline-flex flex-1 items-center justify-center gap-3 rounded-xl px-6 py-4 text-sm font-bold text-white transition-colors duration-300"
                  >
                    {activeSlide.ctaLabel ?? ctaLabel}
                    <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>

                  <Link
                    href="/solutions/agentic-ai-operations"
                    className="brand-gradient-soft border-blue/25 text-ink hover:border-purple/40 hover:shadow-[0_8px_24px_rgba(124,92,255,0.12)] group xs:flex-none xs:justify-start inline-flex flex-1 items-center justify-center gap-2.5 rounded-xl border px-5 py-4 text-sm font-bold transition-all duration-300"
                  >
                    <span className="relative flex h-2 w-2 shrink-0">
                      <span className="bg-purple absolute inline-flex h-full w-full animate-ping rounded-full opacity-70 motion-reduce:hidden" />
                      <span className="bg-purple relative inline-flex h-2 w-2 rounded-full" />
                    </span>
                    <Sparkles size={15} className="text-purple shrink-0" />
                    Agentic AI Operations
                  </Link>
                </motion.div>
              </motion.div>
            </AnimatePresence>

            {/* ============================================
                PROOF POINTS — constant across slides
            ============================================= */}
            <motion.dl
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5, ease: EASE }}
              className="border-border mt-12 grid max-w-md grid-cols-3 border-t"
            >
              {proofPoints.map((point, i) => (
                <div key={point.label} className="pt-5 pr-4">
                  <dd
                    className={`text-[clamp(1.35rem,2.6vw,1.75rem)] leading-none font-black tracking-[-0.03em] tabular-nums ${
                      ['text-primary', 'text-blue', 'text-purple'][i]
                    }`}
                  >
                    {point.value}
                  </dd>
                  <dt className="text-muted-foreground mt-2 text-[10px] leading-snug font-black tracking-[0.12em] uppercase">
                    {point.label}
                  </dt>
                </div>
              ))}
            </motion.dl>

            {/* ============================================
                SLIDE NAVIGATION — labelled, with progress
            ============================================= */}
            {total > 1 && (
              <div className="mt-10 max-w-md">
                <ul className="flex flex-col gap-px">
                  {heroSlides.map((s, i) => {
                    const isActive = i === current

                    return (
                      <li key={s.eyebrow + i}>
                        <button
                          type="button"
                          onClick={() => api?.scrollTo(i)}
                          aria-label={`Show slide ${i + 1}: ${s.eyebrow}`}
                          aria-current={isActive}
                          className="group flex w-full items-center gap-4 py-2.5 text-left"
                        >
                          <span
                            className={`text-[10px] font-black tracking-[0.16em] tabular-nums transition-colors duration-300 ${
                              isActive ? 'text-primary' : 'text-muted-foreground/60 group-hover:text-muted-foreground'
                            }`}
                          >
                            {String(i + 1).padStart(2, '0')}
                          </span>

                          <span
                            className={`flex-1 text-[12.5px] font-bold tracking-tight transition-colors duration-300 ${
                              isActive ? 'text-ink' : 'text-muted-foreground group-hover:text-ink/70'
                            }`}
                          >
                            {s.eyebrow}
                          </span>

                          {/* The bar fills over the autoplay interval on the active row */}
                          <span aria-hidden className="bg-border h-0.5 w-10 shrink-0 overflow-hidden sm:w-14">
                            {isActive && (
                              <motion.span
                                key={`${current}-${paused}`}
                                className="brand-gradient block h-full"
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
              </div>
            )}
          </Container>
        </div>

        {/* ================================================
            RIGHT — full-bleed image carousel
        ================================================= */}
        <div
          className="brand-gradient-soft relative order-1 min-h-[56vh] overflow-hidden lg:order-2 lg:min-h-[90vh]"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div ref={imageRef} className="absolute inset-x-0 -inset-y-8">
            <Carousel
              setApi={setApi}
              opts={{ loop: true, duration: 65, align: 'start' }}
              plugins={[Autoplay({ delay: AUTOPLAY_MS, stopOnInteraction: false, stopOnMouseEnter: true })]}
              className="absolute inset-0 h-full w-full **:h-full"
            >
              <CarouselContent className="ml-0 h-full">
                {heroSlides.map((slide, index) => (
                  <CarouselItem key={`${slide.title}-${index}`} className="relative h-full pl-0">
                    {slide.image && (
                      <Image
                        src={slide.image}
                        alt={slide.imageAlt ?? ''}
                        fill
                        priority={index === 0}
                        sizes="(min-width: 1024px) 48vw, 100vw"
                        className="object-cover"
                      />
                    )}
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>

          {/* Soft bottom fade so the overlaid card sits on a calm base without
              darkening the whole illustration. */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-linear-to-t from-black/45 to-transparent"
          />

          {(activeSlide.secondaryHref ?? secondaryHref) && (
            <Link
              href={activeSlide.secondaryHref ?? secondaryHref ?? '/contact'}
              className="group bg-navy/85 absolute top-6 right-6 z-10 inline-flex items-center gap-2 rounded-full px-5 py-3 text-[13px] font-semibold text-white shadow-lg backdrop-blur-md transition-colors duration-300 hover:bg-navy sm:top-8 sm:right-8"
            >
              {activeSlide.secondaryLabel ?? secondaryLabel}
              <ArrowUpRight
                size={14}
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </Link>
          )}

          {/* ============================================
              CAPABILITY CARD — what this slide covers
          ============================================= */}
          <div className="absolute inset-x-6 bottom-6 z-10 sm:inset-x-8 sm:bottom-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5, ease: EASE }}
              >
                {activeSlide.imageOverlay && (
                  <p className="max-w-[18ch] text-[clamp(1rem,1.8vw,1.4rem)] leading-[1.15] font-black tracking-[-0.02em] text-white uppercase">
                    {activeSlide.imageOverlay}
                  </p>
                )}

                {activeSlide.card && (
                  <div className="mt-5 rounded-xl border border-white/20 bg-white/10 p-4 backdrop-blur-md sm:p-5">
                    <p className="text-[10px] font-black tracking-[0.18em] text-white/70 uppercase">
                      {activeSlide.card.label}
                    </p>

                    <ul className="mt-3.5 flex flex-wrap gap-x-5 gap-y-2">
                      {activeSlide.card.items.map((item, i) => (
                        <li key={item} className="flex items-center gap-2">
                          <span
                            aria-hidden
                            className={`h-1.5 w-1.5 shrink-0 rounded-full ${
                              ['bg-primary', 'bg-blue', 'bg-purple'][i % 3]
                            }`}
                          />
                          <span className="text-[12.5px] font-semibold tracking-tight text-white">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      <p className="sr-only" aria-live="polite">
        {activeSlide.title}
      </p>
    </section>
  )
}
