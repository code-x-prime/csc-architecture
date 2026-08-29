'use client'

import { motion } from 'framer-motion'
import { Container, Eyebrow, ArrowLink } from '@/components/common'

export function IntroSection({
  eyebrow,
  title,
  body,
  ctaHref,
  ctaLabel,
}: {
  eyebrow: string
  title: string
  body: string
  ctaHref?: string
  ctaLabel?: string
}) {
  return (
    <section className="border-border border-b bg-white py-16 sm:py-20 lg:py-24">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(220px,0.9fr)_1.4fr] lg:gap-20"
        >
          <div>
            <Eyebrow>{eyebrow}</Eyebrow>
            <h2 className="text-ink mt-4 font-sans text-[clamp(1.9rem,3.8vw,3.2rem)] leading-[1.05] font-bold tracking-tight">{title}</h2>
          </div>
          <div>
            <p className="text-muted-foreground max-w-2xl text-lg leading-relaxed">{body}</p>
            {ctaHref && ctaLabel && (
              <div className="mt-6">
                <ArrowLink href={ctaHref}>{ctaLabel}</ArrowLink>
              </div>
            )}
          </div>
        </motion.div>
      </Container>
    </section>
  )
}
