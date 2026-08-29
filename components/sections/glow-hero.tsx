'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Container, PrimaryButton, SecondaryButton } from '@/components/common'

export function GlowHero({
  eyebrow,
  title,
  titleAccent,
  description,
  ctaHref = '/contact',
  ctaLabel = 'Start a conversation',
  secondaryHref,
  secondaryLabel,
}: {
  eyebrow: string
  title: string
  titleAccent?: string
  description: string
  ctaHref?: string
  ctaLabel?: string
  secondaryHref?: string
  secondaryLabel?: string
}) {
  return (
    <section className="bg-navy relative flex min-h-[50vh] items-center overflow-hidden">
      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
        aria-hidden
      />

      {/* Ambient glows */}
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.12, 0.22, 0.12] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="bg-primary pointer-events-none absolute -top-32 -left-32 h-[500px] w-[500px] rounded-full blur-[120px]"
        aria-hidden
      />
      <motion.div
        animate={{ scale: [1, 1.1, 1], opacity: [0.08, 0.16, 0.08] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
        className="bg-primary pointer-events-none absolute -right-20 -bottom-40 h-[400px] w-[400px] rounded-full blur-[100px]"
        aria-hidden
      />

      <Container className="relative z-10 py-20">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-16 mb-6 inline-flex items-center gap-2"
        >
          <div className="bg-primary h-px w-8" />
          <span className="text-primary text-[11px] font-bold tracking-[0.2em] uppercase">{eyebrow}</span>
          <div className="bg-primary h-px w-8" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
          className="max-w-3xl font-sans text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.0] font-bold tracking-[-0.03em] text-white"
        >
          {title} {titleAccent && <span className="text-primary">{titleAccent}</span>}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.2 }}
          className="mt-6 max-w-2xl font-sans text-lg leading-relaxed text-white/50"
        >
          {description}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.32 }}
          className="mt-10 flex flex-wrap gap-4"
        >
          <PrimaryButton href={ctaHref} className="rounded-xl px-8 py-4 text-[13px] font-bold tracking-[0.1em] uppercase">
            {ctaLabel}
            <ArrowRight className="h-4 w-4" />
          </PrimaryButton>
          {secondaryHref && secondaryLabel && (
            <SecondaryButton href={secondaryHref} light className="rounded-xl px-8 py-4 text-[13px] font-bold tracking-[0.1em] uppercase">
              {secondaryLabel}
            </SecondaryButton>
          )}
        </motion.div>
      </Container>
    </section>
  )
}
