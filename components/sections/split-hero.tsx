'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { AnimatePresence, motion, type Variants } from 'framer-motion'
import { ArrowRight, ArrowUpRight, Sparkles } from 'lucide-react'

import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from '@/components/ui/carousel'
import { Container } from '@/components/common'
import type { HeroSlide } from './dark-hero'
import Autoplay from 'embla-carousel-autoplay'

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] },
  }),
  exit: { opacity: 0, y: -10, transition: { duration: 0.25, ease: 'easeIn' } },
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

  useEffect(() => {
    if (!api) return
    const update = () => setCurrent(api.selectedScrollSnap())
    update()
    api.on('select', update)
    return () => {
      api.off('select', update)
    }
  }, [api])

  const activeSlide = heroSlides[current] ?? heroSlides[0]

  return (
    <section className="relative isolate bg-white">
      <div className="grid min-h-[85vh] grid-cols-1 lg:grid-cols-2">
        {/* ================================================
            LEFT — fixed content, cross-fades on slide change
        ================================================= */}
        <div className="relative flex items-center overflow-hidden py-14 sm:py-20">
          {/* Dot-grid background */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage: 'radial-gradient(rgba(16,33,43,0.14) 1.5px, transparent 1.5px)',
              backgroundSize: '22px 22px',
              maskImage: 'radial-gradient(ellipse 80% 70% at 30% 45%, black 40%, transparent 85%)',
              WebkitMaskImage: 'radial-gradient(ellipse 80% 70% at 30% 45%, black 40%, transparent 85%)',
            }}
          />

          <Container className="relative lg:pr-8">
            <AnimatePresence mode="wait">
              <motion.div key={current} initial="hidden" animate="show" exit="exit">
                <motion.p custom={0} variants={fadeUp} className="text-primary text-[11px] font-bold tracking-[0.2em] uppercase">
                  {activeSlide.eyebrow}
                </motion.p>

                <motion.h1
                  custom={1}
                  variants={fadeUp}
                  className="text-ink mt-4 max-w-lg font-sans text-[clamp(2.4rem,5.2vw,3rem)] leading-[0.98] font-black tracking-[-0.03em] uppercase"
                >
                  {activeSlide.title}
                </motion.h1>

                <motion.div custom={2} variants={fadeUp} className="mt-8 flex flex-wrap items-center gap-3">
                  <Link
                    href={activeSlide.ctaHref ?? ctaHref}
                    className="bg-ink hover:bg-primary group inline-flex items-center gap-3 rounded-lg px-6 py-4 text-sm font-bold text-white transition-colors duration-300"
                  >
                    {activeSlide.ctaLabel ?? ctaLabel}
                    <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>

                  <Link
                    href="/solutions/agentic-ai-operations"
                    className="group inline-flex items-center gap-2 rounded-lg px-6 py-4 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-0.5"
                    style={{
                      background: 'linear-gradient(135deg, #2196c2 0%, #1687b5 60%, #0b1f2a 100%)',
                      boxShadow: '0 0 0 1px rgba(255,255,255,0.15), 0 0 22px rgba(22,135,181,0.55), 0 8px 20px rgba(11,31,42,0.25)',
                    }}
                  >
                    <span className="relative flex h-2 w-2 shrink-0">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
                    </span>
                    <Sparkles size={15} className="shrink-0" />
                    Agentic AI Operations
                  </Link>
                </motion.div>

                <motion.p custom={4} variants={fadeUp} className="text-muted-foreground mt-8 max-w-sm text-[15px] leading-relaxed">
                  {activeSlide.description}
                </motion.p>
              </motion.div>
            </AnimatePresence>

            {/* Step / slide progress — stays put, only the active number changes */}
            {heroSlides.length > 1 && (
              <div className="mt-14">
                <div className="border-border relative h-px w-full max-w-md overflow-hidden bg-black/10">
                  <motion.div
                    className="bg-ink absolute inset-y-0 left-0"
                    animate={{ width: `${((current + 1) / heroSlides.length) * 100}%` }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  />
                </div>
                <div className="mt-4 flex flex-wrap gap-x-8 gap-y-2">
                  {heroSlides.map((s, i) => (
                    <button
                      key={s.eyebrow + i}
                      type="button"
                      onClick={() => api?.scrollTo(i)}
                      className={`text-[13px] font-bold transition-colors duration-300 ${i === current ? 'text-ink' : 'text-muted-foreground hover:text-ink/70'
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
        <div className="relative min-h-[45vh] lg:min-h-[88vh]">
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

          {(activeSlide.secondaryHref ?? secondaryHref) && (
            <Link
              href={activeSlide.secondaryHref ?? secondaryHref ?? '/contact'}
              className="group absolute top-6 right-6 z-10 inline-flex items-center gap-2 rounded-full border border-white/60 bg-black/10 px-5 py-3 text-[13px] font-semibold text-white backdrop-blur-sm transition-colors duration-300 hover:bg-black/30 sm:top-8 sm:right-8"
            >
              {activeSlide.secondaryLabel ?? secondaryLabel}
              <ArrowUpRight size={14} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          )}
        </div>
      </div>

      <p className="sr-only" aria-live="polite">
        {activeSlide.title}
      </p>
    </section>
  )
}
