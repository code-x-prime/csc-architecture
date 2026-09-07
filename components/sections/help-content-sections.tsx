'use client'

import { ArrowRight } from 'lucide-react'
import type { SitePage } from '@/data/site'
import { Container, SectionLabel, Reveal, RevealStagger } from '@/components/common'

/**
 * Body layout for How We Help pages. Where solution pages use a two-column
 * label/body split, this stacks each section as a wide numbered band with the
 * detail items running as a bordered rail underneath — a different reading
 * rhythm for a different part of the site.
 */
export function HelpContentSections({ sections }: { sections: SitePage['sections'] }) {
  return (
    <section className="border-border border-b bg-white py-20 sm:py-24">
      <Container>
        <Reveal className="max-w-2xl">
          <SectionLabel index="02">What this looks like</SectionLabel>
          <h2 className="text-ink mt-6 font-sans text-[clamp(1.75rem,3.4vw,2.5rem)] leading-[1.08] font-black tracking-[-0.03em] text-balance">
            The work, in practice.
          </h2>
        </Reveal>

        <div className="mt-14 flex flex-col">
          {sections.map((s, i) => (
            <Reveal
              key={s.heading}
              delay={i * 0.06}
              className="border-border group border-t py-10 last:border-b sm:py-12"
            >
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-[auto_1fr_1fr] lg:gap-14">
                {/* Index and heading sit on one line until the row splits into
                    three columns at lg, so mobile does not stack them apart. */}
                <div className="flex items-baseline gap-5 lg:contents">
                  <span className="text-border group-hover:text-primary/40 shrink-0 text-[clamp(2rem,5vw,4rem)] leading-[0.8] font-black tracking-[-0.05em] tabular-nums transition-colors duration-500">
                    {String(i + 1).padStart(2, '0')}
                  </span>

                  <h3 className="text-ink font-sans text-[clamp(1.15rem,2.4vw,1.75rem)] leading-[1.15] font-black tracking-[-0.03em] text-balance lg:pt-1">
                    {s.heading}
                  </h3>
                </div>

                {/* Body + items */}
                <div className="lg:pt-1.5">
                  <p className="text-muted-foreground text-[15px] leading-[1.8]">{s.body}</p>

                  {s.items && (
                    <RevealStagger
                      as="ul"
                      stagger={0.05}
                      y={14}
                      className="mt-7 flex flex-wrap gap-2"
                    >
                      {s.items.map((item) => (
                        <li
                          key={item}
                          className="border-border bg-paper text-ink hover:border-primary/40 inline-flex items-center gap-2 rounded-lg border px-3.5 py-2 text-[13px] font-semibold tracking-tight transition-colors duration-300"
                        >
                          <span aria-hidden className="bg-primary h-1.5 w-1.5 shrink-0 rounded-full" />
                          {item}
                        </li>
                      ))}
                    </RevealStagger>
                  )}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}

/**
 * Closing band for How We Help pages — a wide accent statement that solution
 * pages do not have, giving the section its own ending.
 */
export function HelpOutcomeBand({
  title = 'Change that holds after the engagement ends.',
  body = 'Our programs are built to transfer capability, not dependency — so the framework keeps working once our team steps back.',
  ctaHref = '/contact',
  ctaLabel = 'Talk it through',
  index = '05',
}: {
  title?: string
  body?: string
  ctaHref?: string
  ctaLabel?: string
  index?: string
}) {
  return (
    <section className="bg-paper border-border border-b py-20 sm:py-24">
      <Container>
        <Reveal>
          <div className="bg-navy relative isolate overflow-hidden rounded-2xl px-6 py-12 text-white sm:px-10 sm:py-14 lg:px-14">
            {/* Dot texture */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{
                backgroundImage: 'radial-gradient(rgba(255,255,255,0.12) 1.2px, transparent 1.2px)',
                backgroundSize: '26px 26px',
                maskImage: 'radial-gradient(ellipse 55% 80% at 80% 50%, black 25%, transparent 78%)',
                WebkitMaskImage: 'radial-gradient(ellipse 55% 80% at 80% 50%, black 25%, transparent 78%)',
              }}
            />

            <div className="relative grid grid-cols-1 gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:gap-16">
              <div>
                <SectionLabel index={index} light>
                  Outcome
                </SectionLabel>
                <h2 className="mt-7 max-w-xl font-sans text-[clamp(1.6rem,3.2vw,2.35rem)] leading-[1.12] font-black tracking-[-0.03em] text-white text-balance">
                  {title}
                </h2>
              </div>

              <div>
                <p className="max-w-md text-[15px] leading-[1.75] text-white/60">{body}</p>
                <a
                  href={ctaHref}
                  className="group bg-primary hover:bg-accent-hover mt-8 inline-flex items-center gap-3 rounded-xl px-6 py-4 text-sm font-bold text-white transition-colors duration-300"
                >
                  {ctaLabel}
                  <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
