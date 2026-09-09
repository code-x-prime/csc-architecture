'use client'

import Image from 'next/image'
import { ArrowUpRight, Check } from 'lucide-react'
import type { SitePage } from '@/data/site'
import { Container, SectionLabel, Reveal, RevealStagger, Parallax } from '@/components/common'

/**
 * Body layout for industry pages. Solution pages use a label/body split and
 * how-we-help pages use numbered bands; this one uses bordered cards on a
 * hairline grid, so each of the three page families reads differently.
 */
export function IndustryContentSections({ sections }: { sections: SitePage['sections'] }) {
  return (
    <section className="bg-paper border-border border-b py-14 sm:py-18">
      <Container>
        <Reveal className="max-w-2xl">
          <SectionLabel index="02">Sector context</SectionLabel>
          <h2 className="text-ink mt-6 font-sans text-[clamp(1.75rem,3.4vw,2.5rem)] leading-[1.08] font-black tracking-[-0.03em] text-balance">
            Where we make the difference.
          </h2>
        </Reveal>

        {/* Two columns rather than three: pages carry four sections, which
            fills a 2×2 grid cleanly instead of leaving an orphan card. */}
        <RevealStagger stagger={0.08} className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {sections.map((s, i) => (
            <article
              key={s.heading}
              className="group border-border hover:border-primary/40 relative flex flex-col overflow-hidden rounded-xl border bg-white p-6 transition-all duration-300 hover:-translate-y-1 sm:p-7"
            >
              {/* Accent rule that draws in on hover */}
              <span
                aria-hidden
                className="bg-primary absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100"
              />

              <div className="flex items-start justify-between gap-4">
                <span className="text-muted-foreground text-[11px] font-black tracking-[0.18em] tabular-nums">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <ArrowUpRight
                  size={16}
                  className="text-muted-foreground group-hover:text-primary shrink-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </div>

              <h3 className="text-ink mt-7 font-sans text-[17px] leading-snug font-bold tracking-tight text-balance">
                {s.heading}
              </h3>

              <p className="text-muted-foreground mt-3.5 text-[14px] leading-[1.7]">{s.body}</p>

              {s.items && (
                <ul className="border-border mt-6 flex flex-col border-t pt-1">
                  {s.items.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 py-2">
                      <Check size={13} strokeWidth={3} className="text-primary mt-1 shrink-0" />
                      <span className="text-ink text-[13px] leading-snug font-semibold tracking-tight">{item}</span>
                    </li>
                  ))}
                </ul>
              )}
            </article>
          ))}
        </RevealStagger>
      </Container>
    </section>
  )
}

/**
 * Wide statement band with sector imagery — the industry pages' equivalent of
 * the outcome band on how-we-help pages, but image-led to match the family.
 */
export function IndustryFocusBand({
  title,
  body,
  image,
  imageAlt,
  index = '03',
}: {
  title: string
  body: string
  image?: string
  imageAlt?: string
  index?: string
}) {
  return (
    <section className="border-border border-b bg-white py-14 sm:py-18">
      <Container>
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          {/* Image first on desktop — the sector leads */}
          {image && (
            <Reveal className="order-2 lg:order-1">
              <div className="bg-paper-deep relative aspect-4/3 w-full overflow-hidden rounded-2xl">
                <Parallax amount={22} className="absolute inset-x-0 -inset-y-8">
                  <Image
                    src={image}
                    alt={imageAlt ?? ''}
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 42vw, 92vw"
                  />
                </Parallax>
                <div aria-hidden className="from-navy/40 absolute inset-0 bg-linear-to-t to-transparent" />
              </div>
            </Reveal>
          )}

          <Reveal delay={0.1} className="order-1 lg:order-2">
            <SectionLabel index={index}>Industry focus</SectionLabel>
            <h2 className="text-ink border-primary mt-6 max-w-xl border-l-2 pl-4 font-sans text-[clamp(1.6rem,3.2vw,2.35rem)] leading-[1.12] font-black tracking-[-0.03em] text-balance sm:pl-6">
              {title}
            </h2>
            <p className="text-muted-foreground mt-6 max-w-lg pl-4 text-[15px] leading-[1.8] sm:pl-6">{body}</p>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
