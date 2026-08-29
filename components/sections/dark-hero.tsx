'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { motion, type Variants } from 'framer-motion'
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  Sparkles,
} from 'lucide-react'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/components/ui/carousel'

import {
  Container,
  Eyebrow,
  PrimaryButton,
  SecondaryButton,
} from '@/components/common'

import Autoplay from 'embla-carousel-autoplay'

/* ================================================================
   ANIMATION
================================================================ */

const fadeUp: Variants = {
  hidden: {
    opacity: 0,
    y: 22,
  },

  show: (i = 0) => ({
    opacity: 1,
    y: 0,

    transition: {
      duration: 0.65,
      delay: i * 0.08,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
}

const imageReveal: Variants = {
  hidden: {
    opacity: 0,
    scale: 1.06,
  },

  show: {
    opacity: 1,
    scale: 1,

    transition: {
      duration: 1.1,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

/* ================================================================
   TITLE HIGHLIGHT
================================================================ */

function renderTitle(title: string, highlight?: string) {
  if (!highlight) return title

  const index = title
    .toLowerCase()
    .indexOf(highlight.toLowerCase())

  if (index === -1) return title

  return (
    <>
      {title.slice(0, index)}

      <span className="relative inline-block text-primary">
        {title.slice(index, index + highlight.length)}

        <span
          aria-hidden
          className="
            absolute
            -bottom-1
            left-0
            h-[2px]
            w-full
            rounded-full
            bg-primary/60
            sm:-bottom-1.5
          "
        />
      </span>

      {title.slice(index + highlight.length)}
    </>
  )
}

/* ================================================================
   HERO TYPES
================================================================ */

export type HeroSlide = {
  eyebrow: string

  title: string

  highlight?: string

  description: string

  image: string

  imageAlt?: string

  ctaHref?: string

  ctaLabel?: string

  secondaryHref?: string

  secondaryLabel?: string

  card?: {
    label: string
    items: string[]
  }
}

/* ================================================================
   HERO
================================================================ */

export function DarkHero({
  eyebrow,
  title,
  highlight,
  description,
  ctaHref = '/contact',
  ctaLabel = 'Start a conversation',
  secondaryHref,
  secondaryLabel,
  image,
  imageAlt,
  card,
  cinematic = false,
  slides,
}: {
  eyebrow: string
  title: string
  highlight?: string
  description: string

  ctaHref?: string
  ctaLabel?: string

  secondaryHref?: string
  secondaryLabel?: string

  image?: string
  imageAlt?: string

  card?: {
    label: string
    items: string[]
  }

  cinematic?: boolean

  slides?: HeroSlide[]
}) {
  /* ==============================================================
     FALLBACK SINGLE SLIDE
  ============================================================== */

  const heroSlides: HeroSlide[] =
    slides && slides.length > 0
      ? slides
      : [
        {
          eyebrow,
          title,
          highlight,
          description,
          image: image ?? '',
          imageAlt,
          ctaHref,
          ctaLabel,
          secondaryHref,
          secondaryLabel,
          card,
        },
      ]

  /* ==============================================================
     CAROUSEL STATE
  ============================================================== */

  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    if (!api) return

    const updateCurrent = () => {
      setCurrent(api.selectedScrollSnap())
    }

    updateCurrent()

    api.on('select', updateCurrent)

    return () => {
      api.off('select', updateCurrent)
    }
  }, [api])

  /* ==============================================================
     RENDER
  ============================================================== */

  return (
    <section
      className="
        group
        relative
        isolate
        overflow-hidden
        bg-[#07101d]
        text-white
      "
    >
      <Carousel
        setApi={setApi}
        opts={{
          loop: true,
          duration: 50,
          align: 'start',
        }}
        plugins={[
          Autoplay({
            delay: 3500,
            stopOnInteraction: false,
            stopOnMouseEnter: false,
          }),
        ]}
        className="w-full"
      >
        <CarouselContent className="ml-0">
          {heroSlides.map((slide, index) => (
            <CarouselItem
              key={`${slide.title}-${index}`}
              className="relative ml-0 min-h-[80vh] pl-0"
            >
              {/* ==================================================
                  BACKGROUND IMAGE
              =================================================== */}

              {slide.image && (
                <motion.div
                  key={`image-${index}-${current}`}
                  initial="hidden"
                  animate="show"
                  variants={imageReveal}
                  className="absolute inset-0 -z-30"
                >
                  <Image
                    src={slide.image}
                    alt={slide.imageAlt ?? ''}
                    fill
                    priority={index === 0}
                    sizes="100vw"
                    className="
                      object-cover
                      object-[72%_center]
                      sm:object-[74%_center]
                      lg:object-[76%_center]
                    "
                  />
                </motion.div>
              )}

              {/* ==================================================
                  CINEMATIC DARK LAYER
              =================================================== */}

              <div
                aria-hidden
                className="
                  absolute
                  inset-0
                  -z-20
                  bg-gradient-to-r
                  from-[#07101d]
                  via-[#07101d]/92
                  via-38%
                  to-[#07101d]/0
                  lg:via-44%
                "
              />

              <div
                aria-hidden
                className="
                  absolute
                  inset-0
                  -z-20
                  bg-gradient-to-t
                  from-[#07101d]/70
                  via-transparent
                  to-[#07101d]/10
                "
              />

              {/* Mobile image darkening */}
              <div
                aria-hidden
                className="
                  absolute
                  inset-0
                  -z-20
                  bg-[#07101d]/35
                  sm:hidden
                "
              />

              {/* ==================================================
                  PURPLE / PRIMARY GLOW
              =================================================== */}

              <div
                aria-hidden
                className="
                  pointer-events-none
                  absolute
                  -right-48
                  top-1/2
                  -z-10
                  h-[500px]
                  w-[500px]
                  -translate-y-1/2
                  rounded-full
                  bg-primary/15
                  blur-[130px]
                "
              />

              <div
                aria-hidden
                className="
                  pointer-events-none
                  absolute
                  right-[12%]
                  top-[18%]
                  -z-10
                  h-40
                  w-40
                  rounded-full
                  bg-primary/10
                  blur-[80px]
                "
              />

              {/* ==================================================
                  SUBTLE GRID
              =================================================== */}

              <div
                aria-hidden
                className="
                  pointer-events-none
                  absolute
                  inset-0
                  -z-10
                  opacity-[0.035]
                "
                style={{
                  backgroundImage:
                    'linear-gradient(rgba(255,255,255,0.7) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.7) 1px, transparent 1px)',
                  backgroundSize: '64px 64px',
                  maskImage:
                    'linear-gradient(to bottom, black, transparent 85%)',
                }}
              />

              {/* ==================================================
                  DECORATIVE CORNER
              =================================================== */}

              <div
                aria-hidden
                className="
                  pointer-events-none
                  absolute
                  right-[6%]
                  top-[15%]
                  hidden
                  lg:block
                "
              >
                <div className="relative h-24 w-24">
                  <span className="absolute right-0 top-0 h-px w-24 bg-white/15" />

                  <span className="absolute right-0 top-0 h-24 w-px bg-white/15" />

                  <span className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-primary shadow-[0_0_18px_rgba(255,255,255,0.5)]" />
                </div>
              </div>

              {/* ==================================================
                  MAIN CONTENT
              =================================================== */}

              <Container
                className="
                  relative
                  z-10
                  flex
                  min-h-[88vh]
                  items-center
                  py-28
                  sm:py-32
                "
              >
                <div className="grid w-full items-center lg:grid-cols-[minmax(0,700px)_1fr]">

                  {/* ==================================================
                      LEFT CONTENT
                  =================================================== */}

                  <div className="relative z-20 max-w-175">

                    {/* Eyebrow */}
                    <motion.div
                      key={`eyebrow-${index}-${current}`}
                      initial="hidden"
                      animate="show"
                      custom={0}
                      variants={fadeUp}
                    >
                      <div
                        className="
                          inline-flex
                          items-center
                          gap-2.5
                          rounded-full
                          border
                          border-white/10
                          bg-white/[0.055]
                          px-3
                          py-1.5
                          backdrop-blur-xl
                          sm:px-3.5
                          sm:py-2
                        "
                      >
                        <span
                          className="
                            flex
                            h-5
                            w-5
                            items-center
                            justify-center
                            rounded-full
                            bg-primary/15
                            sm:h-6
                            sm:w-6
                          "
                        >
                          <Sparkles
                            size={11}
                            className="text-primary"
                          />
                        </span>

                        <Eyebrow light>
                          {slide.eyebrow}
                        </Eyebrow>
                      </div>
                    </motion.div>

                    {/* Heading */}
                    <motion.h1
                      key={`title-${index}-${current}`}
                      initial="hidden"
                      animate="show"
                      custom={1}
                      variants={fadeUp}
                      className="
                        mt-6
                        max-w-175
                        font-sans
                        text-[clamp(2.9rem,6.2vw,4.75rem)]
                        font-extrabold
                        leading-[0.92]
                        tracking-[-0.055em]
                        text-white
                        sm:mt-7
                        lg:mt-8
                      "
                    >
                      {renderTitle(
                        slide.title,
                        slide.highlight
                      )}
                    </motion.h1>

                    {/* Description */}
                    <motion.p
                      key={`description-${index}-${current}`}
                      initial="hidden"
                      animate="show"
                      custom={2}
                      variants={fadeUp}
                      className="
                        mt-5
                        max-w-[570px]
                        text-[13.5px]
                        leading-6
                        text-white/60
                        sm:mt-6
                        sm:text-[15px]
                        sm:leading-6.5
                     
                      "
                    >
                      {slide.description}
                    </motion.p>

                    {/* ==================================================
                        MINI DIVIDER
                    =================================================== */}

                    <motion.div
                      initial={{ width: 0, opacity: 0 }}
                      animate={{
                        width: 42,
                        opacity: 1,
                      }}
                      transition={{
                        delay: 0.35,
                        duration: 0.5,
                      }}
                      className="
                        mt-6
                        h-[2px]
                        rounded-full
                        bg-primary
                        sm:mt-7
                      "
                    />

                    {/* ==================================================
                        FEATURE HIGHLIGHTS
                    =================================================== */}

                    <motion.div
                      key={`features-${index}-${current}`}
                      initial="hidden"
                      animate="show"
                      custom={3}
                      variants={fadeUp}
                      className="
                        mt-6
                        grid
                        max-w-[610px]
                        grid-cols-1
                        gap-3
                        sm:mt-7
                        sm:grid-cols-3
                        sm:gap-2
                      "
                    >
                      {[
                        {
                          title: 'Practical',
                          text: 'Clear next steps',
                        },
                        {
                          title: 'Strategic',
                          text: 'Better decisions',
                        },
                        {
                          title: 'Focused',
                          text: 'Measurable progress',
                        },
                      ].map((feature) => (
                        <div
                          key={feature.title}
                          className="
                            flex
                            items-center
                            gap-2.5
                            rounded-lg
                            border
                            border-white/[0.07]
                            bg-white/[0.025]
                            px-3
                            py-2.5
                            backdrop-blur-sm
                          "
                        >
                          <span
                            className="
                              flex
                              h-6
                              w-6
                              shrink-0
                              items-center
                              justify-center
                              rounded-full
                              bg-primary/10
                            "
                          >
                            <Check
                              size={11}
                              className="text-primary"
                            />
                          </span>

                          <div className="min-w-0">
                            <p className="truncate text-[10px] font-bold uppercase tracking-[0.08em] text-white/75">
                              {feature.title}
                            </p>

                            <p className="mt-0.5 truncate text-[9px] text-white/35">
                              {feature.text}
                            </p>
                          </div>
                        </div>
                      ))}
                    </motion.div>

                    {/* ==================================================
                        CTA + TRUST
                    =================================================== */}

                    <motion.div
                      key={`cta-${index}-${current}`}
                      initial="hidden"
                      animate="show"
                      custom={4}
                      variants={fadeUp}
                      className="
                        mt-8
                        flex
                        flex-col
                        gap-5
                        sm:mt-9
                      "
                    >
                      <div
                        className="
                          flex
                          flex-col
                          gap-3
                          sm:flex-row
                        "
                      >
                        <PrimaryButton
                          href={slide.ctaHref ?? '/contact'}
                          className="
                            group
                            min-h-14
                            justify-center
                            rounded-xl
                            px-6
                            text-[15px]
                            shadow-[0_14px_40px_rgba(0,0,0,0.2)]
                            transition-all
                            duration-300
                            hover:-translate-y-1
                            hover:shadow-[0_18px_50px_rgba(0,0,0,0.28)]
                            sm:min-h-15
                            sm:px-7
                          "
                        >
                          <span>
                            {slide.ctaLabel ??
                              'Start a conversation'}
                          </span>

                          <span
                            className="
                              flex
                              h-7
                              w-7
                              items-center
                              justify-center
                              rounded-full
                              bg-white/15
                              transition-transform
                              duration-300
                              group-hover:rotate-45
                            "
                          >
                            <ArrowUpRight size={15} />
                          </span>
                        </PrimaryButton>

                        {slide.secondaryHref &&
                          slide.secondaryLabel && (
                            <SecondaryButton
                              href={slide.secondaryHref}
                              light
                              className="
                                min-h-14
                                justify-center
                                rounded-xl
                                border-white/15
                                bg-white/[0.035]
                                px-6
                                text-[15px]
                                backdrop-blur-md
                                transition-all
                                duration-300
                                hover:-translate-y-1
                                hover:bg-white/8
                                sm:min-h-15
                                sm:px-7
                              "
                            >
                              {slide.secondaryLabel}
                            </SecondaryButton>
                          )}
                      </div>

                      <div
                        className="
                          flex
                          flex-wrap
                          items-center
                          gap-x-5
                          gap-y-2.5
                          border-t
                          border-white/8
                          pt-5
                        "
                      >
                        <div className="flex items-center gap-2">
                          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-400/10">
                            <Check
                              size={10}
                              className="text-emerald-400"
                            />
                          </span>

                          <span className="text-[9px] font-bold uppercase tracking-[0.12em] text-white/35">
                            Practical thinking
                          </span>
                        </div>

                        <span className="hidden h-3 w-px bg-white/10 sm:block" />

                        <div className="flex items-center gap-2">
                          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10">
                            <Check
                              size={10}
                              className="text-primary"
                            />
                          </span>

                          <span className="text-[9px] font-bold uppercase tracking-[0.12em] text-white/35">
                            Complex work
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  {/* ==================================================
                      RIGHT FLOATING CARD
                  =================================================== */}

                  {slide.card && (
                    <motion.div
                      key={`card-${index}-${current}`}
                      initial={{
                        opacity: 0,
                        x: 30,
                        scale: 0.97,
                      }}
                      animate={{
                        opacity: 1,
                        x: 0,
                        scale: 1,
                      }}
                      transition={{
                        duration: 0.75,
                        delay: 0.35,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="
                        absolute
                        bottom-28
                        right-0
                        hidden
                        w-72.5
                        overflow-hidden
                        rounded-3xl
                        border
                        border-white/15
                        bg-[#08101d]/75
                        p-6
                        shadow-[0_25px_80px_rgba(0,0,0,0.35)]
                        backdrop-blur-2xl
                        xl:block
                      "
                    >
                      {/* Card glow */}
                      <div
                        aria-hidden
                        className="
                          pointer-events-none
                          absolute
                          -right-16
                          -top-16
                          h-32
                          w-32
                          rounded-full
                          bg-primary/20
                          blur-[50px]
                        "
                      />

                      <div className="relative">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_10px_rgba(255,255,255,0.5)]" />

                            <span className="text-[8px] font-bold uppercase tracking-[0.18em] text-white/40">
                              {slide.card.label}
                            </span>
                          </div>

                          <ArrowUpRight
                            size={13}
                            className="text-white/25"
                          />
                        </div>

                        <div className="my-4 h-px bg-white/10" />

                        <ul className="flex flex-col gap-3">
                          {slide.card.items.map((item) => (
                            <li
                              key={item}
                              className="flex items-center gap-2.5"
                            >
                              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-primary/15 bg-primary/[0.08]">
                                <Check
                                  size={10}
                                  className="text-primary"
                                />
                              </span>

                              <span className="text-[11px] font-semibold text-white/65">
                                {item}
                              </span>
                            </li>
                          ))}
                        </ul>

                        <div className="mt-5 border-t border-white/10 pt-4">
                          <span className="text-[8px] font-bold uppercase tracking-[0.16em] text-white/25">
                            Consulting Services Corporation
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              </Container>

              {/* ==================================================
                  IMAGE EDGE LINE
              =================================================== */}

              <div
                aria-hidden
                className="
                  pointer-events-none
                  absolute
                  bottom-0
                  left-0
                  right-0
                  h-px
                  bg-gradient-to-r
                  from-transparent
                  via-primary/60
                  to-transparent
                "
              />
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* ========================================================
            SLIDER CONTROLS
        ========================================================= */}

        {heroSlides.length > 1 && (
          <>
            {/* Bottom center control */}
            <div
              className="
                absolute
                bottom-6
                left-1/2
                z-40
                flex
                -translate-x-1/2
                items-center
                gap-1.5
                rounded-full
                border
                border-white/10
                bg-[#07101d]/65
                p-1.5
                backdrop-blur-xl
                sm:bottom-7
              "
            >
              <CarouselPrevious
                className="
                  static
                  h-8
                  w-8
                  translate-x-0
                  translate-y-0
                  border-0
                  bg-white/[0.05]
                  text-white/60
                  hover:bg-white/10
                  hover:text-white
                "
              >
                <ArrowLeft size={13} />
              </CarouselPrevious>

              {/* Progress dots */}
              <div className="flex items-center gap-1 px-2">
                {heroSlides.map((_, slideIndex) => {
                  const active =
                    slideIndex === current

                  return (
                    <button
                      key={slideIndex}
                      type="button"
                      aria-label={`Go to slide ${slideIndex + 1}`}
                      onClick={() =>
                        api?.scrollTo(slideIndex)
                      }
                      className="
                        group
                        flex
                        h-5
                        items-center
                        justify-center
                      "
                    >
                      <span
                        className={`
                          block
                          rounded-full
                          transition-all
                          duration-300
                          ${active
                            ? 'h-1.5 w-7 bg-primary'
                            : 'h-1.5 w-1.5 bg-white/25 group-hover:bg-white/50'
                          }
                        `}
                      />
                    </button>
                  )
                })}
              </div>

              <CarouselNext
                className="
                  static
                  h-8
                  w-8
                  translate-x-0
                  translate-y-0
                  border-0
                  bg-primary/90
                  text-white
                  hover:bg-primary
                "
              >
                <ArrowRight size={13} />
              </CarouselNext>
            </div>
          </>
        )}
      </Carousel>

      {/* ==========================================================
          SCROLL INDICATOR
      =========================================================== */}

      {cinematic && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            delay: 1.2,
            duration: 0.6,
          }}
          className="
            absolute
            bottom-7
            left-7
            z-30
            hidden
            flex-col
            items-center
            gap-2
            lg:flex
          "
        >
          <span className="text-[8px] font-bold uppercase tracking-[0.22em] text-white/25">
            Scroll
          </span>

          <span className="flex h-8 w-5 items-center justify-center rounded-full border border-white/10">
            <motion.span
              animate={{
                y: [0, 4, 0],
                opacity: [0.3, 1, 0.3],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <ArrowDown
                size={9}
                className="text-white/45"
              />
            </motion.span>
          </span>
        </motion.div>
      )}
    </section>
  )
}