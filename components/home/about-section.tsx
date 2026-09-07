'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useInView, type Variants } from 'framer-motion'
import { Container, SectionLabel, ArrowLink, RevealText, Parallax } from '@/components/common'

const EASE = [0.22, 1, 0.36, 1] as const

const fadeUp = (delay = 0): Variants => ({
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay, ease: EASE } },
})

const capabilities = [
  { value: 'Structured', label: 'Perspective before recommendation' },
  { value: 'Hands-on', label: 'Teams that work alongside yours' },
  { value: 'Outcome-led', label: 'Focused on measurable progress' },
]

export function AboutSection() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="bg-paper border-border border-b py-20 sm:py-24 lg:py-28">
      <Container>
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
          {/* =====================================================
              LEFT — EDITORIAL COPY
          ====================================================== */}
          <div>
            <motion.div variants={fadeUp(0)} initial="hidden" animate={isInView ? 'visible' : 'hidden'}>
              <SectionLabel index="04">About</SectionLabel>
            </motion.div>

            <RevealText
              text="We help ambitious organizations turn complexity into opportunity."
              highlight="opportunity."
              className="text-ink border-primary mt-7 max-w-xl border-l-2 pl-4 font-sans text-[clamp(1.75rem,3.4vw,2.6rem)] leading-[1.12] font-black tracking-[-0.03em] text-balance sm:pl-6"
            />

            <motion.div
              variants={fadeUp(0.16)}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              className="text-muted-foreground mt-8 grid max-w-xl gap-5 pl-4 text-[15px] leading-[1.75] sm:pl-6"
            >
              <p>
                Consulting Services Corporation helps organizations move from complex questions to practical next steps.
                Our teams bring structure, perspective, and execution support to the work ahead.
              </p>
              <p>
                Every engagement starts with listening. We combine experienced collaboration with a focus on outcomes, so
                the path forward is both structured and genuinely actionable.
              </p>
            </motion.div>

            {/* Capability strip on hairline rules */}
            <motion.ul
              variants={fadeUp(0.24)}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              className="border-border mt-10 ml-4 grid max-w-xl border-t sm:ml-6 sm:grid-cols-3"
            >
              {capabilities.map((item) => (
                <li key={item.value} className="border-border border-b py-4 sm:border-b-0 sm:pr-5">
                  <p className="text-primary text-[13px] font-black tracking-tight">{item.value}</p>
                  <p className="text-muted-foreground mt-1.5 text-[12px] leading-snug">{item.label}</p>
                </li>
              ))}
            </motion.ul>

            <motion.div
              variants={fadeUp(0.32)}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              className="mt-10 pl-4 sm:pl-6"
            >
              <ArrowLink href="/team">Our story</ArrowLink>
            </motion.div>
          </div>

          {/* =====================================================
              RIGHT — TALL PORTRAIT IMAGE WITH OVERLAY CARDS
          ====================================================== */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
            className="relative"
          >
            <div className="bg-paper-deep relative aspect-4/5 w-full overflow-hidden rounded-2xl">
              <Parallax amount={26} className="absolute inset-x-0 -inset-y-10">
                <Image
                  src="/images/team/csc-hero-team.jpg"
                  alt="CSC consultants collaborating in a light-filled office"
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 42vw, 90vw"
                />
              </Parallax>
              <div aria-hidden className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent" />
            </div>

            {/* Floating label — top right */}
            <div className="border-border/60 absolute top-6 right-6 rounded-xl border bg-white/90 px-4 py-3 backdrop-blur-sm">
              <p className="text-ink text-[10px] leading-relaxed font-black tracking-[0.18em] uppercase">
                Ideas
                <br />
                People
                <br />
                Impact
              </p>
            </div>

            {/* Floating caption — bottom right */}
            <div className="border-border/60 absolute right-6 bottom-6 max-w-[180px] rounded-xl border bg-white/90 px-4 py-3 backdrop-blur-sm">
              <p className="text-ink text-[13px] leading-snug font-bold tracking-tight">
                Building a brighter tomorrow, together.
              </p>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  )
}
