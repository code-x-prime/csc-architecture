'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  Layers,
  Workflow,
  Puzzle,
  Rocket,
  Truck,
  Users,
  Wrench,
  ShieldCheck,
  Server,
  ClipboardCheck,
  AlertTriangle,
  Handshake,
  FileText,
  ChevronDown,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react'
import { Container, Eyebrow, PrimaryButton } from '@/components/common'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const steps = [
  {
    icon: Layers,
    title: 'Preserve the core system',
    body: 'Keep your existing, highly customized ERP intact as a trusted source of data — the solid foundation agentic AI builds on, not something to rip out.',
  },
  {
    icon: Workflow,
    title: 'Layer agents on top',
    body: 'Autonomous agents sit over the ERP, automating and orchestrating business processes without touching the underlying system.',
  },
  {
    icon: Puzzle,
    title: 'Go composable',
    body: 'Assemble and reconfigure capabilities in modules — best-fit tools, integrated where you need flexibility and scale.',
  },
  {
    icon: Rocket,
    title: 'Free up capacity to innovate',
    body: 'Less manual effort and faster decisions mean budget and talent shift from keeping the lights on to strategic work.',
  },
]

const useCases = [
  { icon: Truck, title: 'Supply chain', body: 'Agents monitor disruptions, reroute shipments, and update inventory in real time.' },
  { icon: Users, title: 'HR & workforce', body: 'Automate onboarding, scheduling, and payroll; predict attrition from workforce data.' },
  { icon: Wrench, title: 'Predictive maintenance', body: 'Analyze equipment data to predict failures and schedule repairs before breakdowns.' },
  { icon: ShieldCheck, title: 'Security & compliance', body: 'Extract, validate, and route regulatory documents to ensure accuracy and compliance.' },
  { icon: Server, title: 'IT operations', body: 'Automate ticket triage and resolution; monitor systems and prevent outages proactively.' },
  { icon: ClipboardCheck, title: 'Procurement', body: 'Handle vendor emails, order updates, invoice approvals, and compliance checks.' },
  { icon: AlertTriangle, title: 'Fraud & risk', body: 'Continuously scan transactions for anomalies and automate fraud investigations.' },
  { icon: Handshake, title: 'Vendor management', body: 'Guide vendor onboarding, quote requests, and ongoing relationship management.' },
]

const faqs = [
  {
    q: 'What exactly is "Agentic AI Operations"?',
    a: 'It’s an operating model where autonomous AI agents reason, plan, and act across your existing ERP and business systems — turning your ERP from a static system of record into an active part of a broader, intelligent process layer. The core system stays exactly where it is; the agents do the coordinating.',
  },
  {
    q: 'Do we need to upgrade or migrate our ERP first?',
    a: 'No. That’s the point. Agents are deployed over the top of what you already run, so there’s no forced upgrade, migration, or replatforming project before you can start seeing value.',
  },
  {
    q: 'How is this different from the automation features built into our ERP?',
    a: 'Native ERP automation is confined to that one system. Agentic AI Operations works across your whole software and data landscape — the ERP, adjacent applications, and the data stores between them — so agents can coordinate a process end-to-end instead of stopping at the ERP’s edge.',
  },
  {
    q: 'How fast can we see results?',
    a: 'Because nothing about the core system changes, most engagements start with a scoped, high-impact process — something like procurement approvals or IT ticket triage — and show measurable results in weeks, not the quarters a traditional ERP project would take.',
  },
]

function StepGrid() {
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const cards = gsap.utils.toArray<HTMLElement>('[data-step-card]', gridRef.current!)
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cards,
        { opacity: 0, y: 36, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: { trigger: gridRef.current, start: 'top 82%' },
        },
      )
    }, gridRef)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={gridRef} className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {steps.map((step, i) => {
        const Icon = step.icon
        return (
          <div
            key={step.title}
            data-step-card
            className="border-border hover:border-primary/30 group relative rounded-2xl border bg-white p-6 opacity-0 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_15px_35px_rgba(0,0,0,0.06)]"
          >
            <span className="text-primary/15 absolute top-4 right-5 font-sans text-4xl font-black">{String(i + 1).padStart(2, '0')}</span>
            <span className="bg-primary/8 text-primary flex h-11 w-11 items-center justify-center rounded-xl transition-colors duration-300 group-hover:bg-primary group-hover:text-white">
              <Icon size={20} strokeWidth={1.75} />
            </span>
            <h3 className="text-ink mt-4 font-sans text-lg font-bold tracking-tight">{step.title}</h3>
            <p className="text-muted-foreground mt-2 text-[13.5px] leading-relaxed">{step.body}</p>
          </div>
        )
      })}
    </div>
  )
}

function UseCaseGrid() {
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const cards = gsap.utils.toArray<HTMLElement>('[data-usecase-card]', gridRef.current!)
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cards,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.06,
          ease: 'power2.out',
          scrollTrigger: { trigger: gridRef.current, start: 'top 85%' },
        },
      )
    }, gridRef)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={gridRef} className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {useCases.map((uc) => {
        const Icon = uc.icon
        return (
          <div
            key={uc.title}
            data-usecase-card
            className="border-border hover:border-primary/30 rounded-xl border bg-white p-5 opacity-0 transition-colors duration-300"
          >
            <Icon size={18} className="text-primary" strokeWidth={1.75} />
            <h3 className="text-ink mt-3 text-[14px] font-bold tracking-tight">{uc.title}</h3>
            <p className="text-muted-foreground mt-1.5 text-[12.5px] leading-relaxed">{uc.body}</p>
          </div>
        )
      })}
    </div>
  )
}

export function AgenticContent({ onRequestWhitePaper }: { onRequestWhitePaper?: () => void } = {}) {
  const [openFaq, setOpenFaq] = useState<number | null>(0)

  return (
    <>
      {/* Problem statement */}
      <section className="border-border border-b bg-white py-20 sm:py-24">
        <Container className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative aspect-4/5 w-full overflow-hidden rounded-3xl shadow-[0_25px_60px_rgba(11,31,42,0.18)]"
          >
            <Image
              src="/images/solutions/csc-agentic-ai-visual.jpg"
              alt="Autonomous AI agents orchestrating enterprise systems"
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 40vw, 90vw"
            />
            <div className="from-navy/70 absolute inset-0 bg-linear-to-t via-transparent to-transparent" />
            <div className="border-primary/25 absolute bottom-5 left-5 flex items-center gap-2 rounded-full border bg-white/10 px-4 py-2 backdrop-blur-md">
              <span className="bg-primary relative flex h-2 w-2 rounded-full">
                <span className="bg-primary absolute inline-flex h-full w-full animate-ping rounded-full opacity-60" />
              </span>
              <span className="text-[11px] font-bold tracking-[0.08em] text-white uppercase">Agents live across systems</span>
            </div>
          </motion.div>

          <div>
            <Eyebrow>The problem</Eyebrow>
            <h2 className="text-ink mt-4 font-sans text-[clamp(1.9rem,3.6vw,2.8rem)] leading-[1.08] font-bold tracking-tight">
              Traditional ERP has peaked.
            </h2>
            <div className="text-muted-foreground mt-6 flex flex-col gap-5 text-[15.5px] leading-relaxed">
              <p>
                ERP has been the backbone of enterprise operations for decades — but it&apos;s rigid and monolithic by
                design. It remains a static system of record, lacking the agility modern organizations need to stay
                competitive in a fast-changing landscape.
              </p>
              <p>
                Vendor roadmaps march to the tune of upgrades, migrations, and replatforming — locking you into rising
                support costs and technology constraints. Any AI or automation features built into the system stay
                confined to it, offering little value across the rest of your IT ecosystem.
              </p>
              <p>
                Agentic AI Operations takes a different path: deployed over your existing systems, it acts as an
                intelligent, dynamic layer that runs processes faster, better, and cheaper — without disrupting
                operations or your technology stack.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* 4-step model */}
      <section id="how-it-works" className="bg-muted py-20 sm:py-24">
        <Container>
          <div className="max-w-2xl">
            <Eyebrow>A new model for future-ready IT</Eyebrow>
            <h2 className="text-ink mt-4 font-sans text-[clamp(1.9rem,3.6vw,2.8rem)] leading-[1.08] font-bold tracking-tight">
              Four moves to agentic operations.
            </h2>
          </div>
          <StepGrid />
        </Container>
      </section>

      {/* White paper banner */}
      <section id="white-paper" className="bg-navy relative overflow-hidden py-16 sm:py-20">
        <div aria-hidden className="bg-primary/20 pointer-events-none absolute top-1/2 right-0 h-72 w-72 -translate-y-1/2 translate-x-1/3 rounded-full blur-[110px]" />
        <Container className="relative flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
          <div className="max-w-xl">
            <span className="text-primary text-[10.5px] font-bold tracking-[0.2em] uppercase">White paper</span>
            <h3 className="mt-3 font-sans text-2xl leading-tight font-bold text-white sm:text-3xl">
              The rise of agentic operations in the enterprise
            </h3>
            <p className="mt-3 text-[14.5px] leading-relaxed text-white/60">
              A practical look at how organizations are layering AI agents over existing systems to modernize without the
              cost and risk of a full ERP replacement.
            </p>
          </div>
          <button
            type="button"
            onClick={onRequestWhitePaper}
            className="bg-primary hover:bg-accent-hover group inline-flex shrink-0 items-center gap-2.5 rounded-full px-7 py-3.5 text-sm font-semibold text-white shadow-[0_4px_14px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-0.5"
          >
            <FileText size={16} /> Request the white paper
          </button>
        </Container>
      </section>

      {/* Use cases */}
      <section className="bg-white py-20 sm:py-24">
        <Container>
          <div className="max-w-2xl">
            <Eyebrow>Where agents create value first</Eyebrow>
            <h2 className="text-ink mt-4 font-sans text-[clamp(1.9rem,3.6vw,2.8rem)] leading-[1.08] font-bold tracking-tight">
              Use cases across the business.
            </h2>
          </div>
          <UseCaseGrid />
        </Container>
      </section>

      {/* FAQ */}
      <section className="border-border border-t bg-white py-20 sm:py-24">
        <Container className="grid grid-cols-1 gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
          <div>
            <Eyebrow>FAQs</Eyebrow>
            <h2 className="text-ink mt-4 font-sans text-[clamp(1.9rem,3.2vw,2.4rem)] leading-[1.08] font-bold tracking-tight">
              Common questions.
            </h2>
          </div>
          <div className="flex flex-col">
            {faqs.map((faq, i) => {
              const open = openFaq === i
              return (
                <div key={faq.q} className="border-border border-b">
                  <button
                    type="button"
                    onClick={() => setOpenFaq(open ? null : i)}
                    className="flex w-full items-center justify-between gap-4 py-5 text-left"
                  >
                    <span className="text-ink text-[15px] font-bold">{faq.q}</span>
                    <ChevronDown
                      size={18}
                      className={`text-ink/40 shrink-0 transition-transform duration-300 ${open ? 'text-primary rotate-180' : ''}`}
                    />
                  </button>
                  {open && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      transition={{ duration: 0.25 }}
                      className="text-muted-foreground overflow-hidden pb-5 text-[14px] leading-relaxed"
                    >
                      {faq.a}
                    </motion.p>
                  )}
                </div>
              )
            })}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <PrimaryButton href="/contact">
                Talk to our team <ArrowRight size={16} />
              </PrimaryButton>
              <span className="text-muted-foreground inline-flex items-center gap-1.5 text-[12.5px]">
                <CheckCircle2 size={14} className="text-primary" /> No obligation, no sales pitch
              </span>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
