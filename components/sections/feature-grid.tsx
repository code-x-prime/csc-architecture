'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { Container, SectionLabel, ArrowLink, Reveal, RevealStagger } from '@/components/common'
import { solutionIcons } from '@/data/site'

/** Cards cycle teal → blue → purple so a grid of them reads as a set, not a wall. */
const CARD_TONES = [
  { rule: 'bg-primary', border: 'group-hover:border-primary/45', num: 'group-hover:text-primary', arrow: 'group-hover:text-primary' },
  { rule: 'bg-blue', border: 'group-hover:border-blue/45', num: 'group-hover:text-blue', arrow: 'group-hover:text-blue' },
  { rule: 'bg-purple', border: 'group-hover:border-purple/45', num: 'group-hover:text-purple', arrow: 'group-hover:text-purple' },
]

/**
 * Solutions grid — equal-height bordered tiles on a hairline grid. Cards reveal
 * with a short stagger; hover lifts the tile and draws an accent rule on top.
 */
export function FeatureGrid({
  eyebrow,
  title,
  description,
  items,
  base,
  index = '05',
  ctaLabel = 'Explore all solutions',
  bg = 'bg-tint-purple',
}: {
  eyebrow: string
  title: string
  description?: string
  items: { title: string; slug: string; description: string; href?: string }[]
  base?: string
  index?: string
  ctaLabel?: string
  bg?: string
}) {
  const resolveHref = (item: { slug: string; href?: string }) => item.href ?? `/${base}/${item.slug}`
  const cards = items.slice(0, 6)

  return (
    <section className={`border-border border-b py-20 sm:py-24 ${bg}`}>
      <Container>
        <Reveal className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div className="max-w-2xl">
            <SectionLabel index={index}>{eyebrow}</SectionLabel>
            <h2 className="text-ink mt-6 font-sans text-[clamp(1.75rem,3.4vw,2.5rem)] leading-[1.08] font-black tracking-[-0.03em] text-balance">
              {title}
            </h2>
            {description && (
              <p className="text-muted-foreground mt-5 max-w-lg text-[15px] leading-[1.7]">{description}</p>
            )}
          </div>
          {cards[0] && <ArrowLink href={resolveHref(cards[0])}>{ctaLabel}</ArrowLink>}
        </Reveal>

        <RevealStagger className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((item, i) => {
            const icon = base === 'solutions' ? solutionIcons[item.slug] : undefined
            const tone = CARD_TONES[i % CARD_TONES.length]

            return (
              <div key={item.slug} className="h-full">
                <Link
                  href={resolveHref(item)}
                  className={`group border-border relative flex h-full flex-col overflow-hidden rounded-xl border bg-white p-6 transition-all duration-300 hover:-translate-y-1 sm:p-7 ${tone.border}`}
                >
                  {/* Accent rule that draws in on hover */}
                  <span
                    aria-hidden
                    className={`absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100 ${tone.rule}`}
                  />

                  <div className="flex items-start justify-between gap-4">
                    <span
                      className={`text-muted-foreground text-[11px] font-black tracking-[0.18em] tabular-nums transition-colors duration-300 ${tone.num}`}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    {icon && (
                      <Image
                        src={icon}
                        alt=""
                        width={24}
                        height={24}
                        aria-hidden
                        className="shrink-0 opacity-45 transition-opacity duration-300 group-hover:opacity-90"
                      />
                    )}
                  </div>

                  <h3 className="text-ink mt-8 font-sans text-[17px] leading-snug font-bold tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground mt-3 text-[14px] leading-[1.65]">{item.description}</p>

                  <div className="mt-auto pt-8">
                    <ArrowRight
                      size={16}
                      className={`text-muted-foreground transition-all duration-300 group-hover:translate-x-1 ${tone.arrow}`}
                    />
                  </div>
                </Link>
              </div>
            )
          })}
        </RevealStagger>
      </Container>
    </section>
  )
}
