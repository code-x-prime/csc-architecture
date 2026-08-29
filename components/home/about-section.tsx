'use client'

import { useRef } from 'react'
import { motion, useInView, type Variants } from 'framer-motion'
import { ArrowRight, ShieldCheck } from 'lucide-react'
import { VerticalCutReveal } from '@/components/ui/vertical-cut-reveal'
import { Container, PrimaryButton, SecondaryButton } from '@/components/common'

const fadeUp = (delay = 0): Variants => ({
  hidden: { opacity: 0, y: 28, filter: 'blur(6px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] } },
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
    <section ref={ref} className="bg-muted border-border border-t py-16 sm:py-20 lg:py-24">
      <Container>
        {/* Top bar: eyebrow + link */}
        <div className="mb-10 flex items-center justify-between">
          <motion.div variants={fadeUp(0)} initial="hidden" animate={isInView ? 'visible' : 'hidden'} className="flex items-center gap-2">
            <span className="text-primary inline-block animate-spin text-lg" aria-hidden="true">
              ✱
            </span>
            <span className="text-muted-foreground text-xs font-bold tracking-[0.2em] uppercase">Company overview</span>
          </motion.div>

          <motion.a
            variants={fadeUp(0.1)}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            href="/team"
            className="text-ink hover:text-primary flex items-center gap-1.5 text-sm font-semibold transition-colors"
          >
            Meet the team
            <ArrowRight size={15} />
          </motion.a>
        </div>

        {/* Featured image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97, filter: 'blur(8px)' }}
          animate={isInView ? { opacity: 1, scale: 1, filter: 'blur(0px)' } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative mb-6"
        >
          <div className="border-border absolute top-4 right-4 z-20 flex items-center gap-3 rounded-2xl border bg-white px-4 py-2 shadow-md">
            <div className="bg-accent-soft flex h-8 w-8 items-center justify-center rounded-lg">
              <ShieldCheck size={16} className="text-primary" />
            </div>
            <div>
              <p className="text-ink text-xs leading-none font-bold">Trusted advisor</p>
              <p className="text-muted-foreground mt-0.5 text-[10px]">since day one</p>
            </div>
          </div>

          <svg className="w-full" viewBox="0 0 100 40" style={{ display: 'block' }}>
            <defs>
              <clipPath id="about-clip" clipPathUnits="objectBoundingBox">
                <path d="M0.0998072 1H0.422076H0.749756C0.767072 1 0.774207 0.961783 0.77561 0.942675V0.807325C0.777053 0.743631 0.791844 0.731953 0.799059 0.734076H0.969813C0.996268 0.730255 1.00088 0.693206 0.999875 0.675159V0.0700637C0.999875 0.0254777 0.985045 0.00477707 0.977629 0H0.902473C0.854975 0 0.890448 0.138535 0.850165 0.138535H0.0204424C0.00408849 0.142357 0 0.180467 0 0.199045V0.410828C0 0.449045 0.0136283 0.46603 0.0204424 0.469745H0.0523086C0.0696245 0.471019 0.0735527 0.497877 0.0733523 0.511146V0.915605C0.0723903 0.983121 0.090588 1 0.0998072 1Z" />
              </clipPath>
            </defs>
            <image
              clipPath="url(#about-clip)"
              preserveAspectRatio="xMidYMid slice"
              width="100%"
              height="100%"
              href="/images/team/csc-hero-team.jpg"
            />
          </svg>
        </motion.div>

        {/* Capability strip */}
        <motion.div
          variants={fadeUp(0.3)}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="mb-12 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm"
        >
          {capabilities.map((item, i) => (
            <div key={item.value} className="contents">
              <div className="flex items-center gap-1.5">
                <span className="text-primary font-bold">{item.value}</span>
                <span className="text-muted-foreground">{item.label}</span>
              </div>
              {i < capabilities.length - 1 && <span className="text-border hidden sm:block">|</span>}
            </div>
          ))}
        </motion.div>

        {/* Main grid */}
        <div className="grid gap-10 md:grid-cols-3">
          <div className="md:col-span-2">
            <h2 className="text-ink mb-8 text-3xl leading-[1.1] font-bold tracking-tight sm:text-4xl md:text-5xl">
              {isInView && (
                <VerticalCutReveal
                  splitBy="words"
                  staggerDuration={0.08}
                  staggerFrom="first"
                  transition={{ type: 'spring', stiffness: 260, damping: 28, delay: 0.4 }}
                >
                  From complex questions to practical next steps.
                </VerticalCutReveal>
              )}
            </h2>

            <motion.div
              variants={fadeUp(0.5)}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              className="text-muted-foreground grid gap-6 text-sm leading-relaxed sm:grid-cols-2 sm:text-base"
            >
              <p>
                Consulting Services Corporation helps organizations move from complex questions to practical next steps. Our teams bring
                structure, perspective, and execution support to the work ahead.
              </p>
              <p>
                Every engagement starts with listening. We combine experienced collaboration with a focus on outcomes, so the path
                forward is both structured and genuinely actionable.
              </p>
            </motion.div>
          </div>

          <div className="flex flex-col justify-between md:col-span-1">
            <motion.div variants={fadeUp(0.6)} initial="hidden" animate={isInView ? 'visible' : 'hidden'} className="mb-6 text-right">
              <p className="text-primary text-2xl font-black tracking-widest uppercase">CSC</p>
              <p className="text-muted-foreground mt-1 text-sm">Consulting &amp; Technology Advisory</p>
            </motion.div>

            <motion.div variants={fadeUp(0.7)} initial="hidden" animate={isInView ? 'visible' : 'hidden'} className="mb-6">
              <p className="text-ink mb-1 text-sm font-semibold">Ready to talk through what comes next?</p>
              <p className="text-muted-foreground text-xs">We&apos;ll route your inquiry to the right conversation.</p>
            </motion.div>

            <motion.div variants={fadeUp(0.8)} initial="hidden" animate={isInView ? 'visible' : 'hidden'} className="flex flex-col gap-3">
              <SecondaryButton href="/contact" dark className="self-stretch sm:self-end">
                Contact Us
                <ArrowRight size={16} />
              </SecondaryButton>
              <PrimaryButton href="/solutions/bi-analytics" className="self-stretch sm:self-end">
                Explore Solutions
                <ArrowRight size={16} />
              </PrimaryButton>
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  )
}
