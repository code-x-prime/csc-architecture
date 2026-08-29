'use client'

import { useRef } from 'react'
import { motion, useInView, type Variants } from 'framer-motion'
import { ArrowRight, Phone } from 'lucide-react'
import { Container, Eyebrow, PrimaryButton, SecondaryButton } from '@/components/common'
import { contact } from '@/data/site'

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] },
  }),
}

export function CTASection({
  eyebrow = 'Connect with CSC',
  title,
  description,
  href = '/contact',
  cta = 'Talk to our team',
}: {
  eyebrow?: string
  title: string
  description?: string
  href?: string
  cta?: string
}) {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-navy py-24 ">
      {/* Decorative background */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        {/* faint moving grid */}
        <div
          className="absolute inset-0 opacity-[0.07] [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)] animate-cta-grid"
          style={{
            backgroundImage:
              'linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)',
            backgroundSize: '56px 56px',
          }}
        />

        <motion.div
          className="absolute top-1/2 left-1/2 h-[560px] w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/25 blur-[140px]"
          animate={{ scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute -top-40 -right-20 h-[380px] w-[380px] rounded-full bg-accent/20 blur-[120px]"
          animate={{ x: [0, -30, 0], y: [0, 20, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />

        <div className="absolute -top-32 -right-32 hidden h-[420px] w-[420px] rounded-full border border-white/[0.06] lg:block" />
        <div className="absolute -top-10 -right-10 hidden h-[260px] w-[260px] rounded-full border border-white/[0.06] lg:block" />
        <div className="absolute -bottom-32 -left-32 hidden h-[380px] w-[380px] rounded-full border border-white/[0.06] lg:block" />
      </div>
      <div aria-hidden className="absolute top-0 right-0 left-0 h-px bg-white/[0.08]" />
      <div aria-hidden className="absolute right-0 bottom-0 left-0 h-px bg-white/[0.08]" />

      <Container className="relative flex flex-col items-center text-center">
        <motion.div initial="hidden" animate={isInView ? 'visible' : 'hidden'} custom={0} variants={fadeUp}>
          <Eyebrow light className="justify-center">
            {eyebrow}
          </Eyebrow>
        </motion.div>

        <motion.h2
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          custom={0.1}
          variants={fadeUp}
          className="mt-6 max-w-4xl font-sans text-[clamp(2.4rem,6vw,5rem)] leading-[1.02] font-bold tracking-[-0.03em] text-white"
        >
          {title}
        </motion.h2>

        {description && (
          <motion.p
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            custom={0.18}
            variants={fadeUp}
            className="mt-6 max-w-2xl text-lg leading-relaxed text-white/60 sm:text-xl"
          >
            {description}
          </motion.p>
        )}

        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          custom={0.28}
          variants={fadeUp}
          className="mt-10 flex flex-col items-center gap-4 sm:flex-row"
        >
          <PrimaryButton href={href} className="px-9 py-4 text-base">
            {cta} <ArrowRight size={18} />
          </PrimaryButton>
          <SecondaryButton href={`tel:${contact.phone.replace(/[^\d+]/g, '')}`} light className="px-9 py-4 text-base">
            <Phone size={16} /> {contact.phone}
          </SecondaryButton>
        </motion.div>
      </Container>
    </section>
  )
}
