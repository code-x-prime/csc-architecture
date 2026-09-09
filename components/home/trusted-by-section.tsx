'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { motion, useInView, useMotionValue, animate, type Variants } from 'framer-motion'
import { team } from '@/data/site'
import { Container, SectionLabel } from '@/components/common'

const EASE = [0.22, 1, 0.36, 1] as const

/* =========================================================
   COUNT UP
========================================================= */

function CountUp({ target, suffix = '', prefix = '', decimals = 0 }: { target: number; suffix?: string; prefix?: string; decimals?: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [display, setDisplay] = useState((0).toFixed(decimals))
  const motionValue = useMotionValue(0)

  useEffect(() => {
    if (!inView) return
    const controls = animate(motionValue, target, {
      duration: 1.4,
      ease: EASE,
      onUpdate: (value) => setDisplay(value.toFixed(decimals)),
    })
    return () => controls.stop()
  }, [inView, motionValue, target, decimals])

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {display}
      {suffix}
    </span>
  )
}

/* =========================================================
   ANIMATION
========================================================= */

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: EASE },
  }),
}

const stats = [
  { value: <CountUp target={20} suffix="+" />, unit: 'yrs.', label: 'Average experience across practice leads' },
  { value: <CountUp target={10} />, unit: 'mins.', label: 'Guaranteed first response time' },
  { value: <CountUp target={2} prefix="< " />, unit: 'mins.', label: 'Response to critical issues' },
  { value: <CountUp target={4.9} decimals={1} />, unit: '/ 5.0', label: 'Average client satisfaction rating' },
]

export function TrustedBySection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })
  const lead = team[0]

  return (
    <section ref={sectionRef} className="border-border relative overflow-hidden border-b bg-white">
      <Container className="relative py-14 sm:py-18">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
          {/* =====================================================
              LEFT — HEADING + STATS
          ====================================================== */}
          <div>
            <motion.div initial="hidden" animate={isInView ? 'visible' : 'hidden'} custom={0} variants={fadeUp}>
              <SectionLabel index="03">Trusted by</SectionLabel>
              <h2 className="text-ink mt-6 max-w-lg font-sans text-[clamp(1.75rem,3.4vw,2.5rem)] leading-[1.08] font-black tracking-[-0.03em] uppercase text-balance">
                Trusted by industry leaders around the world
              </h2>
            </motion.div>

            <motion.p
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              custom={0.1}
              variants={fadeUp}
              className="text-muted-foreground mt-6 max-w-lg text-[15px] leading-[1.7]"
            >
              Consulting Services Corporation brings decades of hands-on practice leadership to every engagement. Clients
              choose us for our depth and stay for the results.
            </motion.p>

            {/* 2 × 2 stat grid on hairline rules */}
            <motion.dl
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              custom={0.2}
              variants={fadeUp}
              className="border-border mt-12 grid grid-cols-2 border-t border-l"
            >
              {stats.map((stat, i) => {
                const unitTone = ['text-primary', 'text-blue', 'text-purple', 'text-primary'][i]
                return (
                  <div key={stat.label} className="border-border border-r border-b p-5 sm:p-6">
                    <dd className="text-ink flex items-baseline gap-1.5 text-[clamp(1.75rem,3.2vw,2.4rem)] leading-none font-black tracking-[-0.03em]">
                      {stat.value}
                      <span className={`text-[0.9rem] font-bold ${unitTone}`}>{stat.unit}</span>
                    </dd>
                    <dt className="text-muted-foreground mt-3 max-w-[190px] text-[11px] font-bold tracking-[0.1em] uppercase">
                      {stat.label}
                    </dt>
                  </div>
                )
              })}
            </motion.dl>
          </div>

          {/* =====================================================
              RIGHT — PORTRAIT + ATTRIBUTED QUOTE
          ====================================================== */}
          <motion.figure
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.75, delay: 0.25, ease: EASE }}
            className="relative"
          >
            <div className="bg-paper-deep relative aspect-4/5 w-full overflow-hidden rounded-2xl">
              <Image
                src={lead.image ?? '/images/team/csc-hero-team.jpg'}
                alt={lead.name}
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 45vw, 90vw"
              />
            </div>

            <figcaption className="border-border mt-7 border-l-2 border-l-transparent pl-0">
              <blockquote className="border-primary text-ink border-l-2 pl-5 text-[clamp(1rem,1.6vw,1.2rem)] leading-[1.5] font-bold tracking-[-0.01em] text-balance">
                &ldquo;Our focus is simple — create real value for our clients, every day.&rdquo;
              </blockquote>
              <div className="mt-5 pl-5">
                <p className="text-ink text-[12px] font-bold tracking-[0.14em] uppercase">{lead.name}</p>
                <p className="text-muted-foreground mt-1 text-[13px]">{lead.role}</p>
              </div>
            </figcaption>
          </motion.figure>
        </div>
      </Container>
    </section>
  )
}
