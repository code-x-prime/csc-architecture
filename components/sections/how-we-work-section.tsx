'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { process } from '@/data/site'
import { Container, SectionLabel } from '@/components/common'

const EASE = [0.22, 1, 0.36, 1] as const

/**
 * Process timeline. Desktop lays the steps along a horizontal rule that draws
 * itself as the section enters view; mobile folds the same rule down the left.
 */
export function HowWeWorkSection({
  eyebrow = 'How we work',
  title = 'A clear process. Real progress.',
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
        <div className="mx-auto max-w-2xl text-center">
          <SectionLabel index={index} className="justify-center">
            {eyebrow}
          </SectionLabel>
          <h2 className="text-ink mt-6 font-sans text-[clamp(1.75rem,3.4vw,2.5rem)] leading-[1.08] font-black tracking-[-0.03em] text-balance">
            {title}
          </h2>
        </div>

        <div ref={ref} className="relative mt-16 sm:mt-20">
          {/* Connecting rule — horizontal on desktop, vertical on mobile */}
          <div
            aria-hidden
            className="bg-border absolute top-[7px] left-[7px] hidden h-px w-full lg:block"
            style={{ width: 'calc(100% - 14px)' }}
          >
            <motion.span
              className="bg-primary absolute inset-y-0 left-0 block"
              initial={{ width: 0 }}
              animate={inView ? { width: '100%' } : {}}
              transition={{ duration: 1.4, ease: EASE, delay: 0.2 }}
            />
          </div>
          <div aria-hidden className="bg-border absolute top-0 bottom-0 left-[7px] w-px lg:hidden">
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
                className="relative pl-8 lg:pl-0"
              >
                {/* Node on the rule */}
                <span
                  aria-hidden
                  className="border-primary absolute top-0 left-0 block h-3.5 w-3.5 rounded-full border-2 bg-white"
                />

                <div className="lg:pt-8">
                  <span className="text-ink block text-[clamp(1.6rem,2.6vw,2.1rem)] leading-none font-black tracking-[-0.03em] tabular-nums">
                    {step.number}
                  </span>
                  <h3 className="text-ink mt-3 font-sans text-[15px] font-bold tracking-tight uppercase">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground mt-2.5 max-w-[26ch] text-[14px] leading-[1.65]">
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
