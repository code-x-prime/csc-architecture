'use client'

import { motion } from 'framer-motion'
import { Container, SectionLabel, RevealText } from '@/components/common'

const EASE = [0.22, 1, 0.36, 1] as const

const values = [
  {
    title: 'Client-centric',
    description: 'Your goals lead the work. We bring clarity to complex problems before recommending a path forward.',
  },
  {
    title: 'Innovation at scale',
    description: 'Modern technology applied where it earns its place — not for its own sake.',
  },
  {
    title: 'Global expertise',
    description: 'A diverse team of practice leads, and with it a genuinely broader perspective.',
  },
  {
    title: 'Measurable impact',
    description: 'Every engagement is built around progress your team can point to.',
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
              className="group relative flex gap-5 py-6"
            >
              {/* Accent indicator — grows on hover */}
              <span
                aria-hidden
                className="bg-primary mt-1.5 h-4 w-0.5 shrink-0 transition-all duration-300 group-hover:h-6"
              />
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
