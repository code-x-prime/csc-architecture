'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Eyebrow, PrimaryButton } from '@/components/common'

export function TechnologySection() {
  return (
    <section className="relative overflow-hidden bg-white">
      <motion.div
        initial={{ opacity: 0, scale: 1.04 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="relative h-[560px] w-full sm:h-[520px] lg:h-[620px]"
      >
        <img
          src="/images/home/csc-home-digital-transformation.jpg"
          alt="Business analyst reviewing an enterprise data dashboard in a city office at night"
          className="absolute inset-0 size-full object-cover"
        />

        <div className="from-navy/95 via-navy/55 absolute inset-0 bg-linear-to-t to-transparent sm:bg-linear-to-r sm:to-transparent" />

        <div className="relative flex h-full items-end sm:items-center">
          <div className="max-w-xl px-6 pb-10 sm:px-10 sm:pb-0 lg:px-16">
            <Eyebrow light>Technology &amp; transformation</Eyebrow>
            <h2 className="mt-4 font-sans text-[clamp(1.7rem,4vw,2.6rem)] leading-[1.08] font-bold tracking-tight text-white">
              Aligning technology investment with the outcomes that matter.
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-white/75">
              From BI analytics to customer engagement platforms and digital transformation strategy, we help teams turn technology into
              measurable business value.
            </p>
            <div className="mt-7">
              <PrimaryButton href="/solutions/technology-consulting">
                Explore technology consulting <ArrowRight size={16} />
              </PrimaryButton>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
