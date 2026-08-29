'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { motion, useInView, useMotionValue, animate, type Variants } from 'framer-motion'
import { team } from '@/data/site'
import { Container } from '@/components/common'

/* =========================================================
   COUNT UP
========================================================= */

function CountUp({ target, suffix = '', decimals = 0 }: { target: number; suffix?: string; decimals?: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [display, setDisplay] = useState('0')
  const motionValue = useMotionValue(0)

  useEffect(() => {
    if (!inView) return
    const controls = animate(motionValue, target, {
      duration: 1.4,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (value) => setDisplay(value.toFixed(decimals)),
    })
    return () => controls.stop()
  }, [inView, motionValue, target, decimals])

  return (
    <span ref={ref}>
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
    transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
  }),
}

const stats = [
  { value: <CountUp target={20} suffix="+ yrs." />, label: 'Average experience across our practice leads' },
  { value: <CountUp target={10} suffix=" mins." />, label: 'Industry-leading, guaranteed response time' },
  { value: '< 2 mins.', label: 'Average response time to critical issues' },
  { value: <CountUp target={4.9} decimals={1} suffix="/5.0" />, label: 'Overall average client satisfaction rating' },
]

export function TrustedBySection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })
  const lead = team[0]

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-primary text-white">
      <Container className="relative py-16 sm:py-20 lg:py-24">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
          {/* =====================================================
              LEFT — CONTENT
          ====================================================== */}
          <div>
            <motion.h2
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              custom={0}
              variants={fadeUp}
              className="text-[clamp(2rem,4vw,3rem)] leading-[1.05] font-bold tracking-tight text-white"
            >
              Trusted by teams who need clarity, not guesswork.
            </motion.h2>

            <motion.p
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              custom={0.1}
              variants={fadeUp}
              className="mt-5 max-w-lg text-[14.5px] leading-relaxed text-white/80"
            >
              Consulting Services Corporation brings decades of hands-on practice leadership to every engagement. We&apos;re proud to
              support organizations across healthcare, financial services, and technology. Clients choose us for our depth and stay
              for the results.
            </motion.p>

            <motion.div
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              custom={0.2}
              variants={fadeUp}
              className="mt-10 grid grid-cols-2 gap-x-8 gap-y-8"
            >
              {stats.map((stat) => (
                <div key={stat.label}>
                  <span className="block h-[2px] w-6 bg-white/40" aria-hidden />
                  <div className="mt-3 text-[1.9rem] leading-none font-bold tracking-tight text-white">{stat.value}</div>
                  <p className="mt-2 max-w-[180px] text-[12.5px] leading-snug text-white/70">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* =====================================================
              RIGHT — PHOTO
          ====================================================== */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.75, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto aspect-4/5 w-full max-w-md overflow-hidden rounded-2xl sm:max-w-lg lg:max-w-none"
          >
            <Image
              src={lead.image}
              alt={lead.name}
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 45vw, 90vw"
              priority
            />

            <div className="absolute right-5 bottom-5 left-5 rounded-lg bg-ink/70 px-4 py-3 backdrop-blur-sm">
              <p className="text-[11px] font-bold tracking-[0.08em] text-white uppercase">{lead.name}</p>
              <p className="mt-0.5 text-[11.5px] text-white/75">{lead.role}</p>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  )
}
