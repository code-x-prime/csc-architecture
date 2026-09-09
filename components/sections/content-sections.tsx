'use client'

import { Check } from 'lucide-react'
import type { SitePage } from '@/data/site'
import { Container, SectionLabel, Reveal, RevealStagger } from '@/components/common'
import { cn } from '@/lib/utils'

/**
 * The body of an inner page. Sections alternate paper/white to give the page
 * the same vertical rhythm the home page has, and each one is laid out as an
 * asymmetric editorial split rather than a full-width block.
 */
export function ContentSections({ sections }: { sections: SitePage['sections'] }) {
  return (
    <>
      {sections.map((s, i) => (
        <section
          key={s.heading}
          className={cn('border-border border-b py-14 sm:py-18', i % 2 ? 'bg-paper' : 'bg-white')}
        >
          <Container className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(220px,0.85fr)_1.15fr] lg:gap-20">
            {/* ===============================================
                LEFT — INDEXED HEADING
            =============================================== */}
            <Reveal>
              <SectionLabel index={String(i + 2).padStart(2, '0')}>Overview</SectionLabel>
              <h2 className="text-ink border-primary mt-6 border-l-2 pl-4 font-sans text-[clamp(1.5rem,2.8vw,2.15rem)] leading-[1.12] font-black tracking-[-0.03em] text-balance sm:pl-6">
                {s.heading}
              </h2>
            </Reveal>

            {/* ===============================================
                RIGHT — BODY + CHECKLIST
            =============================================== */}
            <div>
              <Reveal delay={0.1}>
                <p className="text-muted-foreground text-[15px] leading-[1.8] sm:text-base">{s.body}</p>
              </Reveal>

              {s.items && (
                <RevealStagger stagger={0.06} y={16} as="ul" className="border-border mt-9 grid border-t sm:grid-cols-2">
                  {s.items.map((item) => (
                    <li
                      key={item}
                      className="border-border group flex items-start gap-3.5 border-b py-4 sm:odd:pr-6 sm:even:pl-6"
                    >
                      <span className="border-primary/40 text-primary mt-px flex h-5 w-5 shrink-0 items-center justify-center rounded border transition-colors duration-300 group-hover:bg-primary group-hover:text-white">
                        <Check size={12} strokeWidth={3} />
                      </span>
                      <span className="text-ink text-[14px] leading-snug font-semibold tracking-tight">{item}</span>
                    </li>
                  ))}
                </RevealStagger>
              )}
            </div>
          </Container>
        </section>
      ))}
    </>
  )
}
