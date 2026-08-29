'use client'

import Image from 'next/image'
import { motion, type Variants } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Container, Eyebrow, PrimaryButton, SecondaryButton } from '@/components/common'

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 26 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut', delay: i * 0.08 } }),
}

export function EditorialHero({
  eyebrow,
  title,
  description,
  ctaHref = '/contact',
  ctaLabel = 'Start a conversation',
  secondaryHref,
  secondaryLabel,
  image,
  imageAlt,
}: {
  eyebrow: string
  title: string
  description: string
  ctaHref?: string
  ctaLabel?: string
  secondaryHref?: string
  secondaryLabel?: string
  image?: string
  imageAlt?: string
}) {
  if (image) {
    return (
      <section className="border-border border-b bg-white pt-20 sm:pt-24 lg:pt-0">
        <Container className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
          <div className="lg:py-24">
            <motion.div initial="hidden" animate="show" custom={0} variants={fadeUp}>
              <Eyebrow>{eyebrow}</Eyebrow>
            </motion.div>
            <motion.h1
              initial="hidden"
              animate="show"
              custom={1}
              variants={fadeUp}
              className="text-ink mt-5 font-sans text-[clamp(2.2rem,5vw,3.6rem)] leading-[1.02] font-bold tracking-tight"
            >
              {title}
            </motion.h1>
            <motion.p
              initial="hidden"
              animate="show"
              custom={2}
              variants={fadeUp}
              className="text-muted-foreground mt-6 max-w-xl text-lg leading-relaxed"
            >
              {description}
            </motion.p>
            <motion.div initial="hidden" animate="show" custom={3} variants={fadeUp} className="mt-9 flex flex-wrap items-center gap-4">
              <PrimaryButton href={ctaHref}>
                {ctaLabel} <ArrowRight size={16} />
              </PrimaryButton>
              {secondaryHref && secondaryLabel && <SecondaryButton href={secondaryHref}>{secondaryLabel}</SecondaryButton>}
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="bg-muted relative aspect-[4/3] overflow-hidden lg:aspect-auto lg:h-full lg:min-h-[420px]"
          >
            <Image src={image} alt={imageAlt ?? ''} fill priority className="object-cover" />
          </motion.div>
        </Container>
      </section>
    )
  }

  return (
    <section className="border-border border-b bg-white py-20 sm:py-24 lg:py-32">
      <Container>
        <motion.div initial="hidden" animate="show" custom={0} variants={fadeUp}>
          <Eyebrow>{eyebrow}</Eyebrow>
        </motion.div>
        <motion.h1
          initial="hidden"
          animate="show"
          custom={1}
          variants={fadeUp}
          className="text-ink mt-5 max-w-4xl font-sans text-[clamp(2.4rem,6.2vw,4.75rem)] leading-[0.98] font-bold tracking-tight"
        >
          {title}
        </motion.h1>
        <motion.p
          initial="hidden"
          animate="show"
          custom={2}
          variants={fadeUp}
          className="text-muted-foreground mt-6 max-w-2xl text-lg leading-relaxed sm:text-xl"
        >
          {description}
        </motion.p>
        <motion.div initial="hidden" animate="show" custom={3} variants={fadeUp} className="mt-9 flex flex-wrap items-center gap-4">
          <PrimaryButton href={ctaHref}>
            {ctaLabel} <ArrowRight size={16} />
          </PrimaryButton>
          {secondaryHref && secondaryLabel && <SecondaryButton href={secondaryHref}>{secondaryLabel}</SecondaryButton>}
        </motion.div>
      </Container>
    </section>
  )
}
