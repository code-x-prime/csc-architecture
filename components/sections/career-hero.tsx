'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Briefcase, UserRound } from 'lucide-react'
import { careers } from '@/data/site'
import { Container, SectionLabel, RevealText, Reveal, Parallax } from '@/components/common'

/** Careers splits cleanly into two audiences; the hero makes that the design. */
const CANDIDATE_SLUGS = new Set(['find-a-job', 'career-consulting'])

/**
 * Careers hero — a two-track composition. The page's own track is the wide,
 * image-led panel; the other track sits alongside as a dark invitation, so a
 * visitor who landed on the wrong side of the site can cross over immediately.
 */
export function CareerHero({
  title,
  highlight,
  description,
  image,
  activeSlug,
}: {
  title: string
  highlight?: string
  description: string
  image?: string
  activeSlug?: string
}) {
  const isCandidate = activeSlug ? CANDIDATE_SLUGS.has(activeSlug) : true

  const track = isCandidate
    ? { label: 'For candidates', icon: UserRound }
    : { label: 'For organizations', icon: Briefcase }

  const crossover = isCandidate
    ? { label: 'Hiring instead?', title: 'Find talent', href: '/careers/find-talent', icon: Briefcase }
    : { label: 'Looking for a role?', title: 'Find a job', href: '/careers/find-a-job', icon: UserRound }

  const TrackIcon = track.icon
  const CrossIcon = crossover.icon

  return (
    <section className="bg-paper border-border relative isolate overflow-hidden border-b">
      <Container className="relative">
        {/* Track marker */}
        <div className="pt-16 sm:pt-20">
          <SectionLabel index="01">Careers</SectionLabel>
        </div>

        <div className="grid grid-cols-1 gap-8 pt-8 pb-16 lg:grid-cols-[1.25fr_0.75fr] lg:gap-6 lg:pb-20">
          {/* ===============================================
              MAIN TRACK — image panel with copy laid over it
          =============================================== */}
          <div className="bg-navy relative isolate min-h-[420px] overflow-hidden rounded-2xl text-white sm:min-h-[480px] lg:min-h-[540px]">
            {image && (
              <div aria-hidden className="pointer-events-none absolute inset-0">
                {/* Full-bleed illustration, then a navy wash that stays clear at
                    the top and turns solid over the lower half for the copy. */}
                <Parallax amount={20} className="absolute inset-x-0 -inset-y-8">
                  <Image src={image} alt="" fill priority className="object-cover" sizes="(min-width: 1024px) 62vw, 92vw" />
                </Parallax>
                <div className="from-navy from-25% via-navy/70 to-navy/10 absolute inset-0 bg-linear-to-t" />
              </div>
            )}

            <div className="relative flex h-full flex-col justify-end p-7 sm:p-10">
              <span className="border-primary/50 bg-primary/15 text-primary mb-6 inline-flex w-fit items-center gap-2 rounded-full border px-3.5 py-1.5 text-[10px] font-black tracking-[0.18em] uppercase backdrop-blur-sm">
                <TrackIcon size={12} strokeWidth={2.5} />
                {track.label}
              </span>

              <RevealText
                as="h1"
                text={title}
                highlight={highlight}
                highlightClassName="brand-gradient-text"
                className="max-w-2xl font-sans text-[clamp(2rem,4.8vw,3.4rem)] leading-[1.02] font-black tracking-[-0.035em] text-white uppercase text-balance"
              />

              <Reveal delay={0.15}>
                <p className="mt-6 max-w-lg text-[15px] leading-[1.75] text-white/70">{description}</p>

                <div className="mt-8">
                  <Link
                    href="/contact"
                    className="brand-gradient group inline-flex items-center gap-3 rounded-xl px-6 py-4 text-sm font-bold text-white shadow-[0_8px_28px_rgba(47,107,239,0.35)] transition-shadow duration-300 hover:shadow-[0_12px_36px_rgba(124,92,255,0.45)]"
                  >
                    {isCandidate ? 'Send us your resume' : 'Tell us what you need'}
                    <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </div>
              </Reveal>
            </div>
          </div>

          {/* ===============================================
              SIDE COLUMN — crossover card + sibling links
          =============================================== */}
          <div className="flex flex-col gap-4">
            {/* Crossover to the other audience */}
            <Reveal>
              <Link
                href={crossover.href}
                className="group border-border hover:border-primary/40 hover:shadow-[0_10px_28px_rgba(11,31,42,0.08)] block rounded-2xl border bg-white p-6 transition-all duration-300"
              >
                <span className="bg-accent-soft text-primary flex h-11 w-11 items-center justify-center rounded-xl">
                  <CrossIcon size={19} strokeWidth={1.75} />
                </span>

                <p className="text-muted-foreground mt-5 text-[10px] font-black tracking-[0.18em] uppercase">
                  {crossover.label}
                </p>
                <p className="text-ink group-hover:text-primary mt-2 font-sans text-[20px] leading-tight font-black tracking-[-0.02em] transition-colors">
                  {crossover.title}
                </p>

                <ArrowRight
                  size={16}
                  className="text-muted-foreground group-hover:text-primary mt-5 transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
            </Reveal>

            {/* The rest of Careers */}
            <Reveal delay={0.1} className="border-border flex-1 rounded-2xl border bg-white p-6">
              <p className="text-muted-foreground text-[10px] font-black tracking-[0.18em] uppercase">
                All career services
              </p>

              <ul className="border-border mt-5 flex flex-col border-t">
                {careers.map((item) => {
                  const isActive = item.slug === activeSlug

                  return (
                    <li key={item.slug} className="border-border border-b last:border-b-0">
                      <Link
                        href={`/careers/${item.slug}`}
                        aria-current={isActive ? 'page' : undefined}
                        className="group flex items-center justify-between gap-3 py-3.5"
                      >
                        <span
                          className={
                            isActive
                              ? 'text-primary text-[13.5px] leading-snug font-bold tracking-tight'
                              : 'text-muted-foreground group-hover:text-ink text-[13.5px] leading-snug font-bold tracking-tight transition-colors'
                          }
                        >
                          {item.title}
                        </span>

                        {isActive ? (
                          <span aria-hidden className="bg-primary h-1.5 w-1.5 shrink-0 rounded-full" />
                        ) : (
                          <ArrowRight
                            size={14}
                            className="text-muted-foreground group-hover:text-primary shrink-0 -translate-x-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
                          />
                        )}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  )
}
