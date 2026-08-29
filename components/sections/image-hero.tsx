'use client'

import Image from 'next/image'
import { motion, type Variants } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Container, Eyebrow, PrimaryButton, SecondaryButton } from '@/components/common'

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 26 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.65, ease: 'easeOut', delay: i * 0.08 } }),
}

export function ImageHero({
  eyebrow,
  title,
  description,
  image,
  imageAlt,
  ctaHref = '/contact',
  ctaLabel = 'Start a conversation',
  secondaryHref,
  secondaryLabel,
}: {
  eyebrow: string
  title: string
  description: string
  image: string
  imageAlt?: string
  ctaHref?: string
  ctaLabel?: string
  secondaryHref?: string
  secondaryLabel?: string
}) {
  return (
    <section className="relative isolate flex min-h-[70vh] items-end overflow-hidden md:min-h-[82vh]">
      {/* Background image */}
      <motion.div
        initial={{ opacity: 0, scale: 1.06 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0 -z-20"
      >
        <Image src={image} alt={imageAlt ?? ''} fill priority sizes="100vw" className="object-cover" />
      </motion.div>

      {/* Overlays for text legibility */}
      <div aria-hidden className="bg-navy/35 absolute inset-0 -z-10" />
      <div aria-hidden className="from-navy via-navy/70 absolute inset-0 -z-10 bg-linear-to-t to-transparent" />
      <div aria-hidden className="from-navy/95 via-navy/55 absolute inset-0 -z-10 bg-linear-to-r to-transparent" />

      <Container className="relative z-10 py-16 sm:py-20">
        <motion.div initial="hidden" animate="show" custom={0} variants={fadeUp}>
          <Eyebrow light>{eyebrow}</Eyebrow>
        </motion.div>

        <motion.h1
          initial="hidden"
          animate="show"
          custom={1}
          variants={fadeUp}
          className="mt-5 max-w-3xl font-sans text-[clamp(2.4rem,5.6vw,4.2rem)] leading-[1.02] font-bold tracking-tight text-white"
          style={{ textShadow: '0 2px 24px rgba(0,0,0,0.45)' }}
        >
          {title}
        </motion.h1>

        <motion.p
          initial="hidden"
          animate="show"
          custom={2}
          variants={fadeUp}
          className="mt-6 max-w-xl text-lg leading-relaxed text-white/80"
          style={{ textShadow: '0 1px 12px rgba(0,0,0,0.4)' }}
        >
          {description}
        </motion.p>

        <motion.div initial="hidden" animate="show" custom={3} variants={fadeUp} className="mt-9 flex flex-wrap items-center gap-4">
          <PrimaryButton href={ctaHref}>
            {ctaLabel} <ArrowRight size={16} />
          </PrimaryButton>
          {secondaryHref && secondaryLabel && (
            <SecondaryButton href={secondaryHref} light>
              {secondaryLabel}
            </SecondaryButton>
          )}
        </motion.div>
      </Container>
    </section>
  )
}
