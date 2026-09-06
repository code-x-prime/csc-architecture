'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Sparkles } from 'lucide-react'
import { Container, Eyebrow, PrimaryButton, SecondaryButton } from '@/components/common'

export function AiTalentHero() {
  return (
    <section className="bg-navy relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.7) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.7) 1px, transparent 1px)',
          backgroundSize: '56px 56px',
          maskImage: 'radial-gradient(ellipse at 50% 0%, black, transparent 75%)',
        }}
      />
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="bg-primary/22 absolute top-1/4 right-1/4 h-[420px] w-[420px] translate-x-1/3 -translate-y-1/3 rounded-full blur-[140px]" />
        <div className="absolute bottom-0 left-0 h-[340px] w-[340px] -translate-x-1/4 translate-y-1/4 rounded-full bg-[#4fc3e8]/12 blur-[120px]" />
      </div>

      <Container className="relative z-10 flex min-h-[62vh] flex-col justify-center py-28 sm:py-32">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="border-primary/30 bg-primary/10 mb-7 inline-flex items-center gap-2.5 rounded-full border px-4 py-2 backdrop-blur-sm">
            <Sparkles size={13} className="text-primary" />
            <span className="text-[10.5px] font-bold tracking-[0.2em] text-white uppercase">AI-Powered IT Talent & Delivery</span>
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl font-sans text-[clamp(2.4rem,5.4vw,4rem)] leading-[1.05] font-extrabold tracking-tight text-white"
        >
          We staff AI roles — and deliver <span className="text-primary">AI-augmented outcomes</span> — on the platforms you already run on.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.16 }}
          className="mt-7 max-w-2xl text-lg leading-relaxed text-white/65"
        >
          Platform-certified talent paired with governance rigor for ServiceNow (ITSM / ITOM / IRM-GRC) and Salesforce —
          built for regulated, multi-vendor environments where audit exposure isn&apos;t an option.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.26 }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <PrimaryButton href="/contact">
            Talk to us about your platform <ArrowRight size={16} />
          </PrimaryButton>
          <SecondaryButton href="#platforms" light>
            See platform depth
          </SecondaryButton>
        </motion.div>
      </Container>
    </section>
  )
}
