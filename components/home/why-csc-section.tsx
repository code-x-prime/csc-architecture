'use client'

import { motion } from 'framer-motion'
import { Container, SectionLabel, RevealText } from '@/components/common'

const EASE = [0.22, 1, 0.36, 1] as const

const values = [
  {
    title: 'Client-centric',
    description: 'Your goals lead the work. We bring clarity to complex problems before recommending a path forward.',
    tone: 'text-primary bg-primary/15 border-primary/30',
  },
  {
    title: 'Innovation at scale',
    description: 'Modern technology applied where it earns its place — not for its own sake.',
    tone: 'text-blue bg-blue/15 border-blue/30',
  },
  {
    title: 'Global expertise',
    description: 'A diverse team of practice leads, and with it a genuinely broader perspective.',
    tone: 'text-purple bg-purple/15 border-purple/30',
  },
  {
    title: 'Measurable impact',
    description: 'Every engagement is built around progress your team can point to.',
    tone: 'text-white brand-gradient border-transparent',
  },
]

/**
 * The page's one full-dark moment — deliberately placed mid-scroll to break the
 * paper/white rhythm and carry the brand statement at full weight.
 */
export function WhyCscSection({ index = '07' }: { index?: string }) {
  return (
    <section className="bg-navy relative isolate overflow-hidden py-20 text-white sm:py-28">
      {/* Faint dot-grid, masked to the left where the headline sits */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: 'radial-gradient(rgba(255,255,255,0.12) 1.2px, transparent 1.2px)',
          backgroundSize: '26px 26px',
          maskImage: 'radial-gradient(ellipse 60% 80% at 12% 50%, black 30%, transparent 78%)',
          WebkitMaskImage: 'radial-gradient(ellipse 60% 80% at 12% 50%, black 30%, transparent 78%)',
        }}
      />

      {/* Two colour glows — teal from the left, purple from the right, so the
          whole band reads as lit rather than a single flat navy. */}
      <div
        aria-hidden
        className="bg-primary pointer-events-none absolute -top-32 -left-40 h-125 w-125 rounded-full opacity-20 blur-[150px]"
      />
      <div
        aria-hidden
        className="bg-purple pointer-events-none absolute -right-40 -bottom-40 h-125 w-125 rounded-full opacity-25 blur-[140px]"
      />
      {/* A thin gradient seam along the very top edge */}
      <div aria-hidden className="brand-gradient absolute inset-x-0 top-0 h-0.5 opacity-70" />

      <Container className="relative grid grid-cols-1 gap-14 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-20">
        {/* ===================================================
            LEFT — STATEMENT
        =================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.65, ease: EASE }}
        >
          <SectionLabel index={index} light>
            Why CSC
          </SectionLabel>
          <RevealText
            text="More than technology. A brighter tomorrow."
            highlight="A brighter tomorrow."
            highlightClassName="brand-gradient-text"
            className="mt-8 font-sans text-[clamp(2rem,4.4vw,3.25rem)] leading-[1.02] font-black tracking-[-0.035em] text-white uppercase text-balance"
          />
          <p className="mt-8 max-w-md text-[15px] leading-[1.75] text-white/60">
            Consulting Services Corporation helps organizations move from complex questions to practical next steps — with
            teams that stay engaged from strategy through execution.
          </p>
        </motion.div>

        {/* ===================================================
            RIGHT — VALUE LIST
        =================================================== */}
        <ul className="divide-y divide-white/10 border-t border-white/10">
          {values.map((value, i) => (
            <motion.li
              key={value.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5, delay: i * 0.09, ease: EASE }}
              className="group relative -mx-4 flex gap-5 rounded-xl px-4 py-6 transition-colors duration-300 hover:bg-white/[0.04]"
            >
              {/* Numbered badge tinted per value */}
              <span
                aria-hidden
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border text-[12px] font-black tabular-nums transition-transform duration-300 group-hover:scale-110 ${value.tone}`}
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              <div>
                <h3 className="text-[12px] font-black tracking-[0.16em] text-white uppercase">{value.title}</h3>
                <p className="mt-2 max-w-sm text-[14px] leading-[1.65] text-white/55">{value.description}</p>
              </div>
            </motion.li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
