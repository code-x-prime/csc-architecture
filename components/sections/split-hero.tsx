'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, type Variants } from 'framer-motion'
import { ArrowDown, ArrowRight, ArrowUpRight, Sparkles } from 'lucide-react'

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

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.07, ease: EASE },
  }),
  exit: { opacity: 0, y: -10, transition: { duration: 0.25, ease: 'easeIn' } },
}

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
      <div className="grid grid-cols-1 lg:min-h-[88vh] lg:grid-cols-2">
        {/* ================================================
            LEFT — editorial content, cross-fades per slide
        ================================================= */}
        <div className="relative order-2 flex items-center overflow-hidden py-16 sm:py-20 lg:order-1 lg:py-24">
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

          <Container className="relative lg:pr-12">
            <AnimatePresence mode="wait">
              <motion.div key={current} initial="hidden" animate="show" exit="exit">
                {/* Eyebrow — indexed, mono-ish label */}
                <motion.p
                  custom={0}
                  variants={fadeUp}
                  className="text-muted-foreground flex items-center gap-3 text-[11px] font-bold tracking-[0.22em] uppercase"
                >
                  <span className="text-primary">{String(current + 1).padStart(2, '0')}</span>
                  <span aria-hidden className="bg-border h-px w-6" />
                  {activeSlide.eyebrow}
                </motion.p>

                <motion.h1
                  custom={1}
                  variants={fadeUp}
                  className="text-ink mt-6 max-w-xl font-sans text-[clamp(2rem,7vw,3.75rem)] leading-[0.98] font-black tracking-[-0.035em] uppercase text-balance"
                >
                  <TitleWithHighlight title={activeSlide.title} highlight={activeSlide.highlight} />
                </motion.h1>

                <motion.p
                  custom={2}
                  variants={fadeUp}
                  className="text-muted-foreground mt-7 max-w-md text-[15px] leading-[1.7]"
                >
                  {activeSlide.description}
                </motion.p>

                <motion.div custom={3} variants={fadeUp} className="mt-9 flex flex-wrap items-center gap-3">
                  <Link
                    href={activeSlide.ctaHref ?? ctaHref}
                    className="bg-ink hover:bg-primary group inline-flex flex-1 items-center justify-center gap-3 rounded-xl px-6 py-4 text-sm font-bold text-white transition-colors duration-300 xs:flex-none xs:justify-start"
                  >
                    {activeSlide.ctaLabel ?? ctaLabel}
                    <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>

                  <Link
                    href="/solutions/agentic-ai-operations"
                    className="border-border bg-card text-ink hover:border-primary/40 group inline-flex flex-1 items-center justify-center gap-2.5 rounded-xl border px-5 py-4 text-sm font-bold transition-all duration-300 hover:-translate-y-0.5 xs:flex-none xs:justify-start"
                  >
                    <span className="relative flex h-2 w-2 shrink-0">
                      <span className="bg-primary absolute inline-flex h-full w-full animate-ping rounded-full opacity-70" />
                      <span className="bg-primary relative inline-flex h-2 w-2 rounded-full" />
                    </span>
                    <Sparkles size={15} className="text-primary shrink-0" />
                    Agentic AI Operations
                  </Link>
                </motion.div>
              </motion.div>
            </AnimatePresence>

            {/* Slide progress — persistent, only the fill and active label change */}
            {total > 1 && (
              <div className="mt-14 max-w-md">
                <div className="text-muted-foreground mb-3 flex items-baseline gap-1.5 text-[11px] font-bold tracking-[0.18em] tabular-nums">
                  <span className="text-ink">{String(current + 1).padStart(2, '0')}</span>
                  <span aria-hidden>/</span>
                  <span>{String(total).padStart(2, '0')}</span>
                </div>
                <div className="relative h-px w-full overflow-hidden bg-black/10">
                  <motion.div
                    className="bg-primary absolute inset-y-0 left-0"
                    animate={{ width: `${((current + 1) / total) * 100}%` }}
                    transition={{ duration: 0.5, ease: EASE }}
                  />
                </div>
                <div className="mt-4 flex flex-wrap gap-x-7 gap-y-2">
                  {heroSlides.map((s, i) => (
                    <button
                      key={s.eyebrow + i}
                      type="button"
                      onClick={() => api?.scrollTo(i)}
                      aria-label={`Show slide ${i + 1}: ${s.eyebrow}`}
                      aria-current={i === current}
                      className={`text-[12px] font-bold tracking-wide transition-colors duration-300 ${
                        i === current ? 'text-ink' : 'text-muted-foreground hover:text-ink/70'
                      }`}
                    >
                      {String(i + 1).padStart(2, '0')}. {s.eyebrow}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </Container>
        </div>

        {/* ================================================
            RIGHT — full-bleed image carousel
        ================================================= */}
        <div className="relative order-1 min-h-[52vh] overflow-hidden lg:order-2 lg:min-h-[88vh]">
          <div ref={imageRef} className="absolute inset-x-0 -inset-y-8">
            <Carousel
              setApi={setApi}
              opts={{ loop: true, duration: 65, align: 'start' }}
              plugins={[Autoplay({ delay: 6500, stopOnInteraction: false, stopOnMouseEnter: false })]}
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
                        sizes="(min-width: 1024px) 50vw, 100vw"
                        className="object-cover"
                      />
                    )}
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>

          {/* Legibility scrim for the overlaid links and statement */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/35 via-black/5 to-black/60"
          />

          {(activeSlide.secondaryHref ?? secondaryHref) && (
            <Link
              href={activeSlide.secondaryHref ?? secondaryHref ?? '/contact'}
              className="group absolute top-6 right-6 z-10 inline-flex items-center gap-2 rounded-full border border-white/50 bg-white/10 px-5 py-3 text-[13px] font-semibold text-white backdrop-blur-md transition-colors duration-300 hover:bg-white/20 sm:top-8 sm:right-8"
            >
              {activeSlide.secondaryLabel ?? secondaryLabel}
              <ArrowUpRight
                size={14}
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </Link>
          )}

          {/* Bottom-left statement, tied to the active slide */}
          <div className="pointer-events-none absolute inset-x-6 bottom-6 z-10 flex items-end justify-between gap-6 sm:inset-x-8 sm:bottom-8">
            <AnimatePresence mode="wait">
              {activeSlide.imageOverlay && (
                <motion.p
                  key={current}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.5, ease: EASE }}
                  className="max-w-[16ch] text-[clamp(1.1rem,2vw,1.6rem)] leading-[1.15] font-black tracking-[-0.02em] text-white uppercase"
                >
                  {activeSlide.imageOverlay}
                </motion.p>
              )}
            </AnimatePresence>

            <span className="ml-auto hidden items-center gap-2 text-[11px] font-bold tracking-[0.2em] text-white/80 uppercase lg:inline-flex">
              Scroll
              <ArrowDown size={13} className="animate-bounce" />
            </span>
          </div>
        </div>
      </div>

      <p className="sr-only" aria-live="polite">
        {activeSlide.title}
      </p>
    </section>
  )
}
