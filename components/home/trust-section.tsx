'use client'

import { Cpu, TrendingUp, Users } from 'lucide-react'
import { Container, Reveal, RevealText, RevealStagger } from '@/components/common'

/**
 * The three words in the section label are the firm's actual operating model,
 * so they are built out as pillars rather than left as decorative kerned text.
 */
const pillars = [
  {
    icon: Users,
    term: 'People',
    body: 'Practice leads who have done the work sit in the room with your team, not above it.',
    tone: 'text-primary border-primary/30 bg-accent-soft',
  },
  {
    icon: Cpu,
    term: 'Technology',
    body: 'Modern tooling applied where it earns its place — never for its own sake.',
    tone: 'text-blue border-blue/30 bg-blue-soft',
  },
  {
    icon: TrendingUp,
    term: 'Progress',
    body: 'Every engagement is measured against outcomes your team can point to.',
    tone: 'text-purple border-purple/30 bg-purple-soft',
  },
]

/**
 * Brand statement. The heavy centred pull-quote sits on the left of an
 * asymmetric split, with the operating model spelled out beside it, so the
 * section carries an argument rather than just a slogan.
 */
export function TrustSection() {
  return (
    <section className="bg-tint-teal border-border relative isolate overflow-hidden border-y">
      {/* Dot texture, held to the left behind the statement */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: 'radial-gradient(rgba(22,135,181,0.16) 1.2px, transparent 1.2px)',
          backgroundSize: '24px 24px',
          maskImage: 'radial-gradient(ellipse 50% 70% at 18% 45%, black 25%, transparent 76%)',
          WebkitMaskImage: 'radial-gradient(ellipse 50% 70% at 18% 45%, black 25%, transparent 76%)',
        }}
      />

      <Container className="relative py-20 sm:py-24 lg:py-28">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
          {/* ===============================================
              LEFT — THE STATEMENT
          =============================================== */}
          <div>
            <Reveal
              as="p"
              className="text-muted-foreground flex items-center gap-3 text-[10px] font-black tracking-[0.22em] uppercase sm:text-[11px]"
            >
              <span className="text-primary">02</span>
              <span aria-hidden className="bg-border h-px w-6" />
              Our belief
            </Reveal>

            {/* The quote mark sits in the flow above the statement so it stays
                attached to it at every width. */}
            <Reveal delay={0.08}>
              <span
                aria-hidden
                className="text-primary/25 mt-8 block font-serif text-[3.5rem] leading-[0.35] select-none sm:text-[4.5rem]"
              >
                &ldquo;
              </span>
            </Reveal>

            <RevealText
              text="A more human way to a more intelligent future."
              highlight="intelligent"
              className="text-ink mt-8 max-w-xl font-sans text-[clamp(1.75rem,4.6vw,3.1rem)] leading-[1.1] font-black tracking-[-0.03em] text-balance"
            />

            <Reveal delay={0.25}>
              <p className="text-muted-foreground mt-8 max-w-md text-[15px] leading-[1.8]">
                Technology alone does not move an organization forward. Neither does strategy on its own. The work that
                lasts comes from the three together — and that is how we staff every engagement.
              </p>

              <div className="mt-10 flex items-center gap-4">
                <span aria-hidden className="bg-primary h-0.5 w-10 shrink-0" />
                <p className="text-ink text-[11px] font-black tracking-[0.2em] uppercase">
                  Real partnership. Real progress.
                </p>
              </div>
            </Reveal>
          </div>

          {/* ===============================================
              RIGHT — THE OPERATING MODEL
          =============================================== */}
          <RevealStagger as="ul" stagger={0.1} className="border-border flex flex-col border-t lg:pt-2">
            {pillars.map(({ icon: Icon, term, body, tone }, i) => (
              <li key={term} className="border-border group border-b py-6">
                <div className="flex items-start gap-5">
                  <span
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border transition-transform duration-300 group-hover:scale-105 ${tone}`}
                  >
                    <Icon size={18} strokeWidth={1.75} />
                  </span>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-baseline gap-3">
                      <h3 className="text-ink font-sans text-[17px] leading-none font-black tracking-[-0.02em]">
                        {term}
                      </h3>
                      {i < pillars.length - 1 && (
                        <span aria-hidden className="text-purple/50 text-[13px] font-black">
                          ×
                        </span>
                      )}
                    </div>

                    <p className="text-muted-foreground mt-2.5 text-[13.5px] leading-[1.7]">{body}</p>
                  </div>
                </div>
              </li>
            ))}
          </RevealStagger>
        </div>
      </Container>
    </section>
  )
}
