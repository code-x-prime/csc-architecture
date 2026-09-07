'use client'

import { Container, Reveal, RevealText } from '@/components/common'

/**
 * Brand statement — a deliberate breath between the hero and the content
 * sections. No cards, no decoration; the whitespace is the design.
 */
export function TrustSection() {
  return (
    <section className="bg-paper border-border border-y">
      <Container className="py-20 sm:py-28 lg:py-32">
        <div className="mx-auto max-w-4xl text-center">
          <Reveal as="p" className="text-muted-foreground text-[10px] font-black tracking-[0.24em] uppercase sm:text-[11px] sm:tracking-[0.28em]">
            People <span className="text-primary">×</span> Technology <span className="text-primary">×</span> Progress
          </Reveal>

          {/* The quote mark sits in the normal flow above the statement rather
              than absolutely beside it, so it stays attached at every width. */}
          <Reveal delay={0.08}>
            <span
              aria-hidden
              className="text-primary/25 mt-8 block font-serif text-[4rem] leading-[0.4] select-none sm:text-[5.5rem]"
            >
              &ldquo;
            </span>
          </Reveal>

          <RevealText
            text="A more human way to a more intelligent future."
            highlight="intelligent"
            className="text-ink mt-8 font-sans text-[clamp(1.75rem,5.5vw,3.5rem)] leading-[1.12] font-black tracking-[-0.03em] text-balance sm:mt-10"
          />

          <Reveal delay={0.25}>
            <span aria-hidden className="bg-border mx-auto mt-10 block h-px w-16 sm:mt-12" />
            <p className="text-muted-foreground mt-6 text-[10px] font-black tracking-[0.2em] uppercase sm:text-[11px] sm:tracking-[0.24em]">
              Real partnership. Real progress.
            </p>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
