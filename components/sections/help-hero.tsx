'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { howWeHelp } from '@/data/site'
import { Container, SectionLabel, RevealText, Reveal, Parallax } from '@/components/common'

/**
 * How-we-help hero. Deliberately the light counterpart to the dark, full-bleed
 * SolutionHero: a paper split with a framed portrait image and a sibling rail,
 * so the two sections of the site read as distinct places.
 */
export function HelpHero({
  eyebrow = 'How We Help',
  title,
  highlight,
  description,
  image,
  imageAlt,
  activeSlug,
  ctaHref = '/contact',
  ctaLabel = 'Start a conversation',
}: {
  eyebrow?: string
  title: string
  highlight?: string
  description: string
  image?: string
  imageAlt?: string
  activeSlug?: string
  ctaHref?: string
  ctaLabel?: string
}) {
  return (
    <section className="bg-paper border-border relative isolate overflow-hidden border-b">
      {/* Dot-grid texture behind the copy */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: 'radial-gradient(rgba(47,107,239,0.14) 1.2px, transparent 1.2px)',
          backgroundSize: '24px 24px',
          maskImage: 'radial-gradient(ellipse 55% 70% at 20% 40%, black 30%, transparent 78%)',
          WebkitMaskImage: 'radial-gradient(ellipse 55% 70% at 20% 40%, black 30%, transparent 78%)',
        }}
      />

      <Container className="relative">
        <div className="grid grid-cols-1 items-center gap-12 py-16 sm:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20 lg:py-24">
          {/* ===============================================
              LEFT — COPY
          =============================================== */}
          <div>
            <SectionLabel index="01">{eyebrow}</SectionLabel>

            <RevealText
              as="h1"
              text={title}
              highlight={highlight}
              highlightClassName="brand-gradient-text"
              className="text-ink brand-gradient-border mt-7 border-l-2 border-transparent pl-4 font-sans text-[clamp(2rem,4.6vw,3.25rem)] leading-[1.05] font-black tracking-[-0.035em] text-balance sm:pl-6"
            />

            <Reveal delay={0.15}>
              <p className="text-muted-foreground mt-8 max-w-xl pl-4 text-[15px] leading-[1.8] sm:pl-6 sm:text-base">
                {description}
              </p>

              <div className="mt-10 pl-4 sm:pl-6">
                <Link
                  href={ctaHref}
                  className="brand-gradient group inline-flex items-center gap-3 rounded-xl px-6 py-4 text-sm font-bold text-white shadow-[0_8px_28px_rgba(47,107,239,0.3)] transition-shadow duration-300 hover:shadow-[0_12px_36px_rgba(124,92,255,0.42)]"
                >
                  {ctaLabel}
                  <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>
            </Reveal>
          </div>

          {/* ===============================================
              RIGHT — FRAMED IMAGE
          =============================================== */}
          {image && (
            <Reveal delay={0.1}>
              <div className="bg-paper-deep relative aspect-4/5 w-full overflow-hidden rounded-2xl lg:aspect-[4/4.4]">
                <Parallax amount={24} className="absolute inset-x-0 -inset-y-10">
                  <Image
                    src={image}
                    alt={imageAlt ?? ''}
                    fill
                    priority
                    className="object-cover"
                    sizes="(min-width: 1024px) 45vw, 92vw"
                  />
                </Parallax>
                <div aria-hidden className="from-navy/45 absolute inset-0 bg-linear-to-t to-transparent" />

                <p className="absolute bottom-7 left-7 max-w-[15ch] text-[clamp(1rem,1.7vw,1.35rem)] leading-[1.2] font-black tracking-[-0.02em] text-white uppercase">
                  Strategy that reaches execution.
                </p>
              </div>
            </Reveal>
          )}
        </div>

        {/* ===============================================
            SIBLING RAIL — the rest of How We Help
        =============================================== */}
        <nav aria-label="How we help" className="border-border -mx-5 border-t px-5 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
          <ul className="scrollbar-none flex gap-1 overflow-x-auto py-4">
            {howWeHelp.map((item) => {
              const isActive = item.slug === activeSlug

              return (
                <li key={item.slug} className="shrink-0">
                  <Link
                    href={`/how-we-help/${item.slug}`}
                    aria-current={isActive ? 'page' : undefined}
                    className={
                      isActive
                        ? 'bg-ink inline-flex rounded-lg px-4 py-2.5 text-[12.5px] font-bold whitespace-nowrap text-white'
                        : 'text-muted-foreground hover:text-ink hover:bg-white inline-flex rounded-lg px-4 py-2.5 text-[12.5px] font-bold whitespace-nowrap transition-colors duration-200'
                    }
                  >
                    {item.title}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>
      </Container>
    </section>
  )
}
