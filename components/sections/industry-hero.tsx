'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { industries } from '@/data/site'
import { Container, SectionLabel, RevealText, Reveal, Parallax } from '@/components/common'

/**
 * Industry hero. Where solution pages sit on a dark wash and how-we-help pages
 * on light paper, industry pages lead with full-bleed sector photography — the
 * context is the point, so the image carries the page.
 */
export function IndustryHero({
  eyebrow = 'Who We Help',
  title,
  highlight,
  description,
  image,
  imageAlt,
  activeSlug,
  ctaHref = '/contact',
  ctaLabel = 'Talk to our team',
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
    <section className="bg-navy relative isolate text-white">
      {/* ===============================================
          FULL-BLEED IMAGE BAND
      =============================================== */}
      <div className="relative min-h-[58vh] overflow-hidden sm:min-h-[64vh] lg:min-h-[72vh]">
        {image && (
          <div aria-hidden className="pointer-events-none absolute inset-0">
            <Parallax amount={34} className="absolute inset-x-0 -inset-y-12">
              <Image src={image} alt="" fill priority className="object-cover" sizes="100vw" />
            </Parallax>
            {/* Legibility scrim — heavier at the bottom where the type sits */}
            <div className="from-navy via-navy/55 absolute inset-0 bg-linear-to-t to-transparent" />
            <div className="from-navy/80 absolute inset-0 bg-linear-to-r to-transparent" />
          </div>
        )}

        <Container className="relative flex min-h-[58vh] flex-col justify-end py-16 sm:min-h-[64vh] sm:py-20 lg:min-h-[72vh] lg:py-24">
          <div className="max-w-3xl">
            <SectionLabel index="01" light>
              {eyebrow}
            </SectionLabel>

            <RevealText
              as="h1"
              text={title}
              highlight={highlight}
              highlightClassName="brand-gradient-text"
              className="mt-7 font-sans text-[clamp(2.1rem,5.6vw,3.9rem)] leading-[1.0] font-black tracking-[-0.035em] text-white uppercase text-balance"
            />

            <Reveal delay={0.15}>
              <p className="mt-7 max-w-xl text-[15px] leading-[1.8] text-white/70 sm:text-base">{description}</p>

              <div className="mt-9">
                <Link
                  href={ctaHref}
                  className="brand-gradient group inline-flex items-center gap-3 rounded-xl px-6 py-4 text-sm font-bold text-white shadow-[0_8px_28px_rgba(47,107,239,0.35)] transition-shadow duration-300 hover:shadow-[0_12px_36px_rgba(124,92,255,0.45)]"
                >
                  {ctaLabel}
                  <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>
            </Reveal>
          </div>
        </Container>
      </div>

      {/* ===============================================
          SECTOR RAIL — every industry, current one marked
      =============================================== */}
      <nav aria-label="Industries" className="border-t border-white/10 bg-black/25 backdrop-blur-sm">
        <Container>
          <ul className="scrollbar-none flex gap-1 overflow-x-auto py-3.5">
            {industries.map((item) => {
              const isActive = item.slug === activeSlug

              return (
                <li key={item.slug} className="shrink-0">
                  <Link
                    href={`/who-we-help/${item.slug}`}
                    aria-current={isActive ? 'page' : undefined}
                    className={
                      isActive
                        ? 'bg-primary inline-flex rounded-lg px-4 py-2.5 text-[12.5px] font-bold whitespace-nowrap text-white'
                        : 'inline-flex rounded-lg px-4 py-2.5 text-[12.5px] font-bold whitespace-nowrap text-white/55 transition-colors duration-200 hover:bg-white/8 hover:text-white'
                    }
                  >
                    {item.title}
                  </Link>
                </li>
              )
            })}
          </ul>
        </Container>
      </nav>
    </section>
  )
}
