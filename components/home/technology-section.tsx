'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Container, SectionLabel, RevealText, Parallax, PrimaryButton } from '@/components/common'

const EASE = [0.22, 1, 0.36, 1] as const

export function TechnologySection() {
  return (
    <section className="border-border border-b bg-white py-14 sm:py-18">
      <Container>
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
          {/* ===================================================
              LEFT — STATEMENT
          =================================================== */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.65, ease: EASE }}
          >
            <SectionLabel index="10">Technology / Transformation</SectionLabel>

            <RevealText
              text="Data. Technology. Human potential."
              highlight="Human potential."
              className="text-ink mt-7 max-w-lg font-sans text-[clamp(1.75rem,3.6vw,2.6rem)] leading-[1.08] font-black tracking-[-0.03em] text-balance"
            />

            <p className="text-muted-foreground mt-6 max-w-md text-[15px] leading-[1.75]">
              From BI analytics to customer engagement platforms and digital transformation strategy, we help teams turn
              technology into measurable business value and exceptional customer experiences.
            </p>

            <div className="mt-9">
              <PrimaryButton href="/solutions/technology-consulting">
                Explore our technology <ArrowRight size={16} />
              </PrimaryButton>
            </div>
          </motion.div>

          {/* ===================================================
              RIGHT — DASHBOARD IMAGERY
          =================================================== */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
            className="brand-gradient-soft border-border relative aspect-4/3 w-full overflow-hidden rounded-2xl border"
          >
            <Parallax amount={22} className="absolute inset-x-0 -inset-y-8">
              <Image
                src="/images/home/csc-home-digital-transformation.jpg"
                alt="Isometric illustration of enterprise data systems connected by glowing pipelines"
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 48vw, 92vw"
              />
            </Parallax>
          </motion.div>
        </div>
      </Container>
    </section>
  )
}
