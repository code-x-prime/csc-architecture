'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, ArrowDown } from 'lucide-react'
import { Container, SectionLabel, RevealText, Reveal, Parallax } from '@/components/common'

/**
 * Solution page hero — a dark editorial band that carries the same typography
 * and hairline language as the home page, with the page's own imagery behind
 * it rather than a generated particle field.
 */
export function SolutionHero({
  eyebrow,
  title,
  highlight,
  description,
  image,
  imageAlt,
  ctaHref = '/contact',
  ctaLabel = 'Start a conversation',
  secondaryHref,
  secondaryLabel,
  tag = 'Solutions',
}: {
  eyebrow: string
  title: string
  highlight?: string
  description: string
  image?: string
  imageAlt?: string
  ctaHref?: string
  ctaLabel?: string
  secondaryHref?: string
  secondaryLabel?: string
  tag?: string
}) {
  return (
    <section className="bg-navy relative isolate overflow-hidden text-white">
      {/* Background imagery, held well back so the type stays the subject */}
      {image && (
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <Parallax amount={30} className="absolute inset-x-0 -inset-y-12">
            <Image src={image} alt="" fill priority className="object-cover opacity-25" sizes="100vw" />
          </Parallax>
          <div className="from-navy via-navy/85 to-navy/70 absolute inset-0 bg-linear-to-r" />
          <div className="from-navy absolute inset-0 bg-linear-to-t to-transparent" />
        </div>
      )}

      {/* Dot-grid texture */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: 'radial-gradient(rgba(255,255,255,0.12) 1.2px, transparent 1.2px)',
          backgroundSize: '26px 26px',
          maskImage: 'radial-gradient(ellipse 60% 70% at 15% 40%, black 25%, transparent 75%)',
          WebkitMaskImage: 'radial-gradient(ellipse 60% 70% at 15% 40%, black 25%, transparent 75%)',
        }}
      />

      {/* Colour glows + a gradient seam so the dark band reads as lit */}
      <div
        aria-hidden
        className="bg-blue pointer-events-none absolute -top-40 right-1/4 h-96 w-96 rounded-full opacity-20 blur-[150px]"
      />
      <div
        aria-hidden
        className="bg-purple pointer-events-none absolute -bottom-40 right-0 h-96 w-96 rounded-full opacity-25 blur-[140px]"
      />
      <div aria-hidden className="brand-gradient absolute inset-x-0 top-0 h-0.5 opacity-70" />

      <Container className="relative flex min-h-[62vh] flex-col justify-center py-20 sm:py-24 lg:min-h-[70vh]">
        <div className="max-w-3xl">
          <SectionLabel index="01" light>
            {eyebrow}
          </SectionLabel>

          <RevealText
            as="h1"
            text={title}
            highlight={highlight}
            highlightClassName="brand-gradient-text"
            className="mt-8 font-sans text-[clamp(2.1rem,5.6vw,3.75rem)] leading-[1.0] font-black tracking-[-0.035em] text-white uppercase text-balance"
          />

          <Reveal delay={0.15}>
            <p className="mt-8 max-w-xl text-[15px] leading-[1.75] text-white/60 sm:text-base">{description}</p>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <Link
                href={ctaHref}
                className="brand-gradient group inline-flex items-center justify-center gap-3 rounded-xl px-6 py-4 text-sm font-bold text-white shadow-[0_8px_28px_rgba(47,107,239,0.35)] transition-shadow duration-300 hover:shadow-[0_12px_36px_rgba(124,92,255,0.45)]"
              >
                {ctaLabel}
                <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>

              {secondaryHref && secondaryLabel && (
                <Link
                  href={secondaryHref}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/25 px-6 py-4 text-sm font-bold text-white transition-colors duration-300 hover:border-white/50 hover:bg-white/5"
                >
                  {secondaryLabel}
                </Link>
              )}
            </div>
          </Reveal>
        </div>
      </Container>

      {/* Bottom strip — brand line and a scroll cue */}
      <div className="relative border-t border-white/10 bg-black/20 backdrop-blur-sm">
        <Container className="flex items-center justify-between gap-6 py-5">
          <p className="text-[10px] font-black tracking-[0.22em] text-white/50 uppercase">
            <span className="text-primary">{tag}</span>
            <span aria-hidden className="mx-3 text-white/20">
              /
            </span>
            Consulting Services Corporation
          </p>

          <span className="hidden items-center gap-2 text-[10px] font-black tracking-[0.2em] text-white/40 uppercase sm:inline-flex">
            Scroll
            <ArrowDown size={12} className="animate-bounce" />
          </span>
        </Container>
      </div>
    </section>
  )
}
