'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { team } from '@/data/site'
import { Container, SectionLabel, RevealText, Reveal } from '@/components/common'

/**
 * Company hero — the people are the subject, so the composition leads with a
 * stacked row of faces rather than a stock photograph. Deliberately lighter and
 * more personal than the solution, industry, and careers heroes.
 */
export function CompanyHero({
  eyebrow = 'Company',
  title,
  highlight,
  description,
  ctaHref = '/contact',
  ctaLabel = 'Start a conversation',
  secondaryHref,
  secondaryLabel,
  activePath,
}: {
  eyebrow?: string
  title: string
  highlight?: string
  description: string
  ctaHref?: string
  ctaLabel?: string
  secondaryHref?: string
  secondaryLabel?: string
  activePath?: string
}) {
  const faces = team.slice(0, 5)

  return (
    <section className="bg-paper border-border relative isolate overflow-hidden border-b">
      {/* Dot-grid texture */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: 'radial-gradient(rgba(124,92,255,0.13) 1.2px, transparent 1.2px)',
          backgroundSize: '24px 24px',
          maskImage: 'radial-gradient(ellipse 65% 65% at 50% 35%, black 30%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(ellipse 65% 65% at 50% 35%, black 30%, transparent 80%)',
        }}
      />

      <Container className="relative">
        <div className="mx-auto max-w-3xl py-16 text-center sm:py-20 lg:py-24">
          <SectionLabel index="01" className="justify-center">
            {eyebrow}
          </SectionLabel>

          <RevealText
            as="h1"
            text={title}
            highlight={highlight}
            highlightClassName="brand-gradient-text"
            className="text-ink mt-8 font-sans text-[clamp(2.1rem,5.2vw,3.6rem)] leading-[1.03] font-black tracking-[-0.035em] text-balance"
          />

          <Reveal delay={0.15}>
            <p className="text-muted-foreground mx-auto mt-7 max-w-xl text-[15px] leading-[1.8] sm:text-base">
              {description}
            </p>

            {/* Stacked faces — the team, at a glance */}
            <div className="mt-10 flex items-center justify-center gap-4">
              <ul className="flex -space-x-3">
                {faces.map((member) => (
                  <li key={member.name} className="relative">
                    <span className="bg-paper-deep ring-paper block h-11 w-11 overflow-hidden rounded-full ring-3">
                      {member.image ? (
                        <Image
                          src={member.image}
                          alt={member.name}
                          width={44}
                          height={44}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <span className="bg-navy flex h-full w-full items-center justify-center text-[11px] font-black text-white">
                          {member.name
                            .split(' ')
                            .map((n) => n[0])
                            .join('')}
                        </span>
                      )}
                    </span>
                  </li>
                ))}
              </ul>

              <p className="text-muted-foreground max-w-[18ch] text-left text-[12px] leading-snug font-bold tracking-tight">
                Practice leads with decades behind them
              </p>
            </div>

            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href={ctaHref}
                className="brand-gradient group inline-flex w-full items-center justify-center gap-3 rounded-xl px-6 py-4 text-sm font-bold text-white shadow-[0_8px_28px_rgba(47,107,239,0.3)] transition-shadow duration-300 hover:shadow-[0_12px_36px_rgba(124,92,255,0.42)] sm:w-auto"
              >
                {ctaLabel}
                <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>

              {secondaryHref && secondaryLabel && (
                <Link
                  href={secondaryHref}
                  className="border-border text-ink hover:border-primary/40 inline-flex w-full items-center justify-center gap-2 rounded-xl border bg-white px-6 py-4 text-sm font-bold transition-colors duration-300 sm:w-auto"
                >
                  {secondaryLabel}
                </Link>
              )}
            </div>
          </Reveal>
        </div>

        {/* Company rail */}
        <nav aria-label="Company" className="border-border flex justify-center gap-1 border-t py-4">
          {[
            ['Team', '/team'],
            ['Contact', '/contact'],
          ].map(([label, href]) => {
            const isActive = href === activePath

            return (
              <Link
                key={href}
                href={href}
                aria-current={isActive ? 'page' : undefined}
                className={
                  isActive
                    ? 'bg-ink inline-flex rounded-lg px-5 py-2.5 text-[12.5px] font-bold text-white'
                    : 'text-muted-foreground hover:text-ink inline-flex rounded-lg px-5 py-2.5 text-[12.5px] font-bold transition-colors duration-200 hover:bg-white'
                }
              >
                {label}
              </Link>
            )
          })}
        </nav>
      </Container>
    </section>
  )
}
