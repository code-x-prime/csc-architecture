'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import {
  motion,
  useInView,
  useMotionValue,
  animate,
  type Variants,
} from 'framer-motion'
import {
  ArrowUpRight,
  Check,
  Sparkles,
} from 'lucide-react'

import { team, industries } from '@/data/site'
import { Container } from '@/components/common'
import { TeamCard } from '@/components/cards'

/* =========================================================
   COUNT UP
========================================================= */

function CountUp({
  target,
  suffix = '',
  decimals = 0,
}: {
  target: number
  suffix?: string
  decimals?: number
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, {
    once: true,
    margin: '-80px',
  })

  const [display, setDisplay] = useState('0')

  const motionValue = useMotionValue(0)

  useEffect(() => {
    if (!inView) return

    const controls = animate(
      motionValue,
      target,
      {
        duration: 1.5,
        ease: [0.22, 1, 0.36, 1],

        onUpdate: (value) => {
          setDisplay(value.toFixed(decimals))
        },
      },
    )

    return () => controls.stop()
  }, [
    inView,
    motionValue,
    target,
    decimals,
  ])

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
  hidden: {
    opacity: 0,
    y: 24,
  },

  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,

    transition: {
      duration: 0.65,
      delay,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
}

/* =========================================================
   SECTION
========================================================= */

export function TrustLeadershipSection() {
  const sectionRef = useRef<HTMLElement>(null)

  const isInView = useInView(sectionRef, {
    once: true,
    margin: '-100px',
  })

  const stats = [
    {
      value: <CountUp target={team.length} />,
      label: 'Practice leads across the firm',
    },

    {
      value: <CountUp target={industries.length} />,
      label: 'Industries served nationwide',
    },

    {
      value: <CountUp target={20} suffix="+" />,
      label: 'Years led by our senior practice CTO',
    },

    {
      value: <CountUp target={5} suffix="+" />,
      label: 'Specialist certifications on our team',
    },
  ]

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-background text-ink"
    >
      {/* Top decorative line */}
      <div aria-hidden className="absolute top-0 right-0 left-0 h-px bg-black/[0.07]" />

      {/* Subtle background rings */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-[180px] -right-40 hidden h-[420px] w-[420px] rounded-full border border-black/[0.035] lg:block"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-[120px] -right-25 hidden h-[300px] w-[300px] rounded-full border border-black/[0.035] lg:block"
      />

      <Container className="relative py-16 sm:py-20  xl:py-32">
        {/* Section intro */}
        <div className="mb-12 flex flex-col gap-5 lg:mb-16 lg:flex-row lg:items-end lg:justify-between">
          <motion.div initial="hidden" animate={isInView ? 'visible' : 'hidden'} custom={0} variants={fadeUp} className="max-w-2xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-black/[0.08] bg-white px-3 py-1.5">
              <Sparkles size={11} className="text-primary" />
              <span className="text-[9px] font-bold tracking-[0.18em] text-ink/50 uppercase">People behind the work</span>
            </div>

            <h2 className="max-w-2xl text-[clamp(2.2rem,4.5vw,4.4rem)] leading-[0.98] font-bold tracking-[-0.045em] text-ink">
              Led by practitioners
              <span className="text-primary"> who&apos;ve done the work.</span>
            </h2>
          </motion.div>

          <motion.div initial="hidden" animate={isInView ? 'visible' : 'hidden'} custom={0.12} variants={fadeUp} className="max-w-md lg:pb-1">
            <p className="text-[13.5px] leading-6 text-ink/55 sm:text-[14px] sm:leading-6.5">
              Consulting Services Corporation is led by practice heads with decades of hands-on experience across healthcare, financial
              services, and technology. Our teams bring structure, perspective, and execution support to every engagement.
            </p>
          </motion.div>
        </div>

        {/* Stats row */}
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          custom={0.2}
          variants={fadeUp}
          className="grid grid-cols-2 gap-3 sm:grid-cols-4"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              custom={0.25 + index * 0.06}
              variants={fadeUp}
              className="group relative overflow-hidden rounded-2xl border border-black/[0.07] bg-white p-4 shadow-[0_5px_25px_rgba(0,0,0,0.025)] transition-all duration-300 hover:-translate-y-1 hover:border-primary/25 hover:shadow-[0_15px_35px_rgba(0,0,0,0.07)] sm:p-5"
            >
              <div className="text-[1.7rem] leading-none font-bold tracking-[-0.05em] text-ink transition-colors duration-300 group-hover:text-primary sm:text-[2.1rem]">
                {stat.value}
              </div>
              <p className="mt-3 text-[10.5px] leading-4.5 font-medium text-ink/45 transition-colors duration-300 group-hover:text-ink/65 sm:text-[11px]">
                {stat.label}
              </p>
              <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-primary transition-all duration-500 group-hover:w-full" />
            </motion.div>
          ))}
        </motion.div>

        {/* Team grid */}
        <div className="mt-10 sm:mt-12">
          <motion.div
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            custom={0.32}
            variants={fadeUp}
            className="mb-5 flex items-center justify-between"
          >
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              <span className="text-[9px] font-bold tracking-[0.18em] text-ink/40 uppercase">Practice leadership</span>
            </div>

            <Link
              href="/team"
              className="group inline-flex items-center gap-1.5 text-[10.5px] font-bold tracking-widest text-ink/50 uppercase transition-colors hover:text-primary"
            >
              Meet the team
              <ArrowUpRight size={12} className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </motion.div>

          <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial="hidden"
                animate={isInView ? 'visible' : 'hidden'}
                custom={0.38 + index * 0.06}
                variants={fadeUp}
              >
                <TeamCard name={member.name} role={member.role} bio={member.bio} image={member.image} index={index} href="/team" />
              </motion.div>
            ))}

            {/* Closing statement card */}
            <motion.div
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              custom={0.38 + team.length * 0.06}
              variants={fadeUp}
              className="flex flex-col justify-between gap-6 rounded-2xl bg-navy p-5 text-white sm:p-6"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10">
                <Check size={16} className="text-primary" />
              </div>

              <p className="text-[13px] leading-relaxed text-white/70">
                Experience that combines strategic perspective with practical execution — across healthcare, financial services, and
                technology.
              </p>

              <Link
                href="/team"
                className="group inline-flex items-center gap-1.5 text-[11px] font-bold tracking-widest text-white uppercase transition-colors hover:text-primary"
              >
                View full team
                <ArrowUpRight size={13} className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </motion.div>
          </div>
        </div>
      </Container>

      {/* Bottom line */}
      <div aria-hidden className="absolute right-0 bottom-0 left-0 h-px bg-black/[0.07]" />
    </section>
  )
}
