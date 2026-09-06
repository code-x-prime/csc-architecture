'use client'

import { motion } from 'framer-motion'
import { ArrowRight, ArrowUpRight, FileText, Sparkles } from 'lucide-react'
import { Container } from '@/components/common'

const floatIn = (delay: number, x = 0, y = 20) => ({
  initial: { opacity: 0, x, y },
  animate: { opacity: 1, x: 0, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as const },
})

export function AgenticHero({ onRequestWhitePaper }: { onRequestWhitePaper?: () => void } = {}) {
  return (
    <section className="relative isolate overflow-hidden bg-white pt-28 pb-20 sm:pt-32">
      {/* Grid + radial color wash, matching the reference's light SaaS feel */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(rgba(16,33,43,0.14) 1px, transparent 1px), linear-gradient(90deg, rgba(16,33,43,0.14) 1px, transparent 1px)',
          backgroundSize: '44px 44px',
          maskImage: 'radial-gradient(ellipse 65% 60% at 50% 30%, black 40%, transparent 90%)',
          WebkitMaskImage: 'radial-gradient(ellipse 65% 60% at 50% 30%, black 40%, transparent 90%)',
        }}
      />
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="bg-primary/18 absolute top-10 left-1/2 h-[420px] w-[600px] -translate-x-1/2 rounded-full blur-[130px]" />
        <div className="absolute top-24 right-1/4 h-[280px] w-[280px] rounded-full bg-[#6d5bd0]/12 blur-[110px]" />
      </div>

      <Container className="relative z-10">
        {/* Floating cards — desktop only, mirrors the scattered UI-card motif */}
        <motion.div
          {...floatIn(0.5, -20, 12)}
          className="border-border absolute top-6 left-2 hidden w-52 rotate-[-3deg] rounded-2xl border bg-white p-4 shadow-[0_15px_35px_rgba(16,33,43,0.1)] lg:block"
        >
          <div className="flex items-center gap-2.5">
            <span className="bg-primary/10 text-primary flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[11px] font-bold">
              IT
            </span>
            <div className="min-w-0">
              <p className="text-ink truncate text-[12.5px] font-bold">ITSM Command Agent</p>
              <p className="text-muted-foreground text-[10.5px]">Live 6 weeks</p>
            </div>
          </div>
          <div className="bg-border mt-3 h-1.5 w-full overflow-hidden rounded-full">
            <div className="bg-primary h-full w-[92%] rounded-full" />
          </div>
          <p className="text-muted-foreground mt-1.5 text-[10px] font-semibold">92% tickets auto-resolved</p>
        </motion.div>

        <motion.div
          {...floatIn(0.65, 24, 30)}
          className="border-border absolute top-32 right-2 hidden w-48 rotate-[2.5deg] rounded-2xl border bg-white p-4 shadow-[0_15px_35px_rgba(16,33,43,0.1)] lg:block"
        >
          <div className="flex items-center gap-2.5">
            <span className="bg-primary/10 text-primary flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[11px] font-bold">
              50+
            </span>
            <div className="min-w-0">
              <p className="text-ink text-[12.5px] font-bold">Engagements</p>
              <p className="text-muted-foreground text-[10.5px]">Delivered to date</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          {...floatIn(0.58, 24, -24)}
          className="absolute top-64 right-4 hidden w-56 rotate-2 rounded-2xl p-4 text-white shadow-[0_20px_45px_rgba(22,135,181,0.35)] lg:block"
          style={{ background: 'linear-gradient(145deg, #1687b5 0%, #0b1f2a 100%)' }}
        >
          <p className="text-[10.5px] font-bold tracking-[0.08em] text-white/70 uppercase">Free Health Check</p>
          <p className="mt-1 text-[14px] font-bold">Book with our team</p>
          <div className="mt-2.5 flex gap-1.5">
            <span className="rounded-full bg-white/15 px-2.5 py-1 text-[10px] font-semibold">ITSM</span>
            <span className="rounded-full bg-white/15 px-2.5 py-1 text-[10px] font-semibold">GRC</span>
          </div>
        </motion.div>

        <motion.div
          {...floatIn(0.75, -30, -10)}
          className="bg-navy absolute top-[21rem] left-6 hidden items-center gap-2.5 rounded-full py-2 pr-4 pl-2 text-white shadow-lg lg:flex"
        >
          <span className="bg-primary flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[10px] font-bold">M</span>
          <div className="text-left">
            <p className="text-[11.5px] leading-none font-bold">Mohammad V.</p>
            <p className="text-[9.5px] leading-none text-white/50">Healthcare Practice CTO</p>
          </div>
        </motion.div>

        {/* Center content */}
        <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center pt-20 text-center lg:pt-24">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="bg-primary/8 text-primary mb-6 inline-flex items-center gap-2 rounded-full px-4 py-2">
              <Sparkles size={13} />
              <span className="text-[10.5px] font-bold tracking-[0.18em] uppercase">Agentic AI Operations</span>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="text-ink font-sans text-[clamp(2.4rem,5.6vw,4.2rem)] leading-[1.04] font-black tracking-tight"
          >
            Operationalize Agentic AI.
            <br />
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: 'linear-gradient(100deg, #1687b5 0%, #6d5bd0 60%, #1687b5 100%)' }}
            >
              Execute. Optimize. Scale.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.18 }}
            className="text-muted-foreground mt-6 max-w-xl text-lg leading-relaxed"
          >
            Most organizations don&apos;t have an AI ambition problem — they have a sustained-execution problem. We deploy
            autonomous agents over the systems you already run, then stay engaged to keep them delivering value.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.28 }}
            className="mt-9 flex flex-wrap items-center justify-center gap-3"
          >
            <a
              href="/contact"
              className="group bg-ink hover:bg-primary inline-flex items-center gap-2.5 rounded-full px-7 py-3.5 text-sm font-bold text-white transition-colors duration-300"
            >
              Talk to our team
              <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            <button
              type="button"
              onClick={onRequestWhitePaper}
              className="border-border text-ink hover:border-ink group inline-flex items-center gap-2.5 rounded-full border bg-white px-7 py-3.5 text-sm font-bold transition-colors duration-300"
            >
              <FileText size={15} />
              Read the white paper
            </button>
          </motion.div>
        </div>

        {/* Bottom strip — real credentials, not fabricated press mentions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="border-border relative z-10 mt-20 border-t pt-8"
        >
          <p className="text-muted-foreground text-center text-[10px] font-bold tracking-[0.2em] uppercase">
            Delivered by a certified team
          </p>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            {['PMP', 'CSM', 'Microsoft Solutions Architect', 'AWS Certified Professional', 'Google Certified Architect'].map((c) => (
              <span key={c} className="text-muted-foreground/70 text-[13px] font-semibold whitespace-nowrap">
                {c}
              </span>
            ))}
          </div>
        </motion.div>
      </Container>

      <a
        href="#how-it-works"
        className="text-muted-foreground hover:text-ink group relative z-10 mt-14 flex items-center justify-center gap-1.5 text-[12.5px] font-semibold transition-colors"
      >
        See how it works
        <ArrowUpRight size={13} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </a>
    </section>
  )
}
