'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { process, processIcons } from '@/data/site'
import { Container, SectionLabel, Icon, Reveal } from '@/components/common'

const EASE = [0.22, 1, 0.36, 1] as const

/**
 * Delivery process for an inner page — the same connected timeline the home
 * page uses, so the two read as one system.
 */
export function ProcessRibbon({
  eyebrow = 'How we work',
  title = 'A structured path from question to outcome.',
  index = '06',
}: {
  eyebrow?: string
  title?: string
  index?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section className="border-border border-b bg-white py-20 sm:py-24">
      <Container>
        <Reveal className="max-w-2xl">
          <SectionLabel index={index}>{eyebrow}</SectionLabel>
          <h2 className="text-ink mt-6 font-sans text-[clamp(1.75rem,3.4vw,2.5rem)] leading-[1.08] font-black tracking-[-0.03em] text-balance">
            {title}
          </h2>
        </Reveal>

        <div ref={ref} className="relative mt-16">
          {/* Connecting rule — horizontal on desktop, vertical on mobile */}
          <div
            aria-hidden
            className="bg-border absolute top-6 left-6 hidden h-px lg:block"
            style={{ width: 'calc(100% - 3rem)' }}
          >
            <motion.span
              className="bg-primary absolute inset-y-0 left-0 block"
              initial={{ width: 0 }}
              animate={inView ? { width: '100%' } : {}}
              transition={{ duration: 1.4, ease: EASE, delay: 0.2 }}
            />
          </div>
          <div aria-hidden className="bg-border absolute top-0 bottom-0 left-6 w-px lg:hidden">
            <motion.span
              className="bg-primary absolute inset-x-0 top-0 block"
              initial={{ height: 0 }}
              animate={inView ? { height: '100%' } : {}}
              transition={{ duration: 1.4, ease: EASE, delay: 0.2 }}
            />
          </div>

          <ol className="relative grid grid-cols-1 gap-10 lg:grid-cols-4 lg:gap-8">
            {process.map((step, i) => (
              <motion.li
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: 0.3 + i * 0.14, ease: EASE }}
                className="relative flex gap-5 lg:flex-col lg:gap-0"
              >
                <div className="border-border text-ink hover:border-primary relative z-10 flex size-12 shrink-0 items-center justify-center rounded-full border bg-white transition-colors duration-300 lg:mb-7">
                  <Icon src={processIcons[step.number]} className="size-5" />
                </div>

                <div>
                  <span className="text-ink block text-[clamp(1.4rem,2.2vw,1.8rem)] leading-none font-black tracking-[-0.03em] tabular-nums">
                    {step.number}
                  </span>
                  <h3 className="text-ink mt-3 font-sans text-[15px] font-bold tracking-tight uppercase">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground mt-2.5 max-w-[28ch] text-[14px] leading-[1.65]">
                    {step.description}
                  </p>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  )
}
