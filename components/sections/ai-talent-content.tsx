'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowUpRight, ShieldCheck, Layers, Users, ArrowRight, CheckCircle2 } from 'lucide-react'
import { Container, PrimaryButton } from '@/components/common'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const differentiators = [
  'Platform certification paired with governance rigor — evidence-based reporting, explicit assumption logging, accountability mapping',
  'Delivery experience in regulated, multi-vendor environments',
  'Operational discipline behind every placement — structured trackers, Go/No-Go governance, RAID hygiene',
]

const engagementModels = [
  { title: 'Staff augmentation', body: 'Drop platform-certified AI talent straight into your existing team and delivery cadence.' },
  { title: 'Managed delivery pods', body: 'A dedicated, accountable pod running your AI-on-platform workstream end to end.' },
  { title: 'Embedded governance support', body: 'Governance and RAID discipline embedded alongside delivery — not bolted on after.' },
]

function BentoGrid() {
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const cards = gsap.utils.toArray<HTMLElement>('[data-bento-card]', gridRef.current!)
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cards,
        { opacity: 0, y: 32 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: { trigger: gridRef.current, start: 'top 80%' },
        },
      )
    }, gridRef)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={gridRef} id="platforms" className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-3 md:auto-rows-[minmax(200px,auto)]">
      {/* ServiceNow — hero card */}
      <div
        data-bento-card
        className="border-primary/20 relative overflow-hidden rounded-3xl border bg-linear-to-br from-[#123a4d] via-[#0b1f2a] to-[#0b1f2a] p-8 text-white opacity-0 sm:p-10 md:col-span-2 md:row-span-2"
      >
        <div aria-hidden className="bg-primary/25 pointer-events-none absolute -top-10 -right-10 h-64 w-64 rounded-full blur-[110px]" />
        <div className="relative">
          <span className="bg-primary/15 text-primary inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[10.5px] font-bold tracking-[0.14em] uppercase">
            <Layers size={13} /> ServiceNow
          </span>
          <h3 className="mt-4 font-sans text-2xl leading-tight font-bold sm:text-3xl">ITSM / ITOM / IRM-GRC</h3>
          <p className="mt-4 max-w-xl text-[14.5px] leading-relaxed text-white/65">
            Release management playbooks. BCM architectures aligned to ISO 22301. IRM/GRC frameworks built for regulated
            banking (FSA, BOJ, Banking Act, FIEA). We bring the platform depth and the governance fluency AI-on-ITSM
            initiatives need to move from pilot to production without creating audit exposure.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {['Release management', 'ISO 22301', 'FSA', 'BOJ', 'Banking Act', 'FIEA'].map((tag) => (
              <span key={tag} className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-[11.5px] font-semibold text-white/75">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Salesforce card */}
      <div data-bento-card className="border-border relative flex flex-col justify-between overflow-hidden rounded-3xl border bg-white p-7 opacity-0">
        <div>
          <span className="bg-primary/8 text-primary inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[10.5px] font-bold tracking-[0.14em] uppercase">
            <Users size={13} /> Salesforce
          </span>
          <p className="text-muted-foreground mt-4 text-[13.5px] leading-relaxed">
            Multi-vendor modernization experience spanning Salesforce, ServiceNow, Crossfuze, Gearset, Perficient, and
            FullPress — with executive-level synthesis across parallel workstreams. AI-on-Salesforce projects need talent
            who reconcile the CRM roadmap with the rest of the stack, not just configure flows in isolation.
          </p>
        </div>
        <div className="mt-6 flex flex-wrap gap-1.5">
          {['Salesforce', 'ServiceNow', 'Crossfuze', 'Gearset', 'Perficient', 'FullPress'].map((tag) => (
            <span key={tag} className="border-border text-ink/70 rounded-full border px-2.5 py-1 text-[10.5px] font-semibold">
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Engagement models card */}
      <div data-bento-card className="bg-muted relative flex flex-col justify-between overflow-hidden rounded-3xl p-7 opacity-0">
        <div>
          <h3 className="text-ink font-sans text-lg font-bold tracking-tight">Engagement models</h3>
          <p className="text-muted-foreground mt-2 text-[13px] leading-relaxed">
            Matched to where your AI initiative stands today.
          </p>
        </div>
        <div className="mt-5 flex flex-col gap-3">
          {engagementModels.map((m) => (
            <div key={m.title}>
              <p className="text-ink text-[13.5px] font-bold">{m.title}</p>
              <p className="text-muted-foreground mt-0.5 text-[12px] leading-relaxed">{m.body}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA card */}
      <a
        href="/contact"
        data-bento-card
        className="group relative flex flex-col justify-between overflow-hidden rounded-3xl bg-linear-to-br from-[#1687b5] to-[#0b1f2a] p-7 text-white opacity-0 transition-transform duration-300 hover:-translate-y-1"
      >
        <div className="flex items-start justify-between">
          <span className="rounded-full bg-white/15 px-3 py-1.5 text-[10.5px] font-bold tracking-[0.14em] uppercase backdrop-blur-sm">
            Ready to scope?
          </span>
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15 transition-transform duration-300 group-hover:rotate-45">
            <ArrowUpRight size={16} />
          </span>
        </div>
        <h3 className="mt-4 font-sans text-xl leading-tight font-bold">
          Talk to us about the right team for your platform.
        </h3>
      </a>
    </div>
  )
}

export function AiTalentContent() {
  return (
    <>
      {/* Bento grid — ServiceNow / Salesforce / engagement models / CTA */}
      <section className="bg-white py-20 sm:py-24">
        <Container>
          <div className="max-w-2xl">
            <span className="text-primary text-[10.5px] font-bold tracking-[0.2em] uppercase">Platform depth</span>
            <h2 className="text-ink mt-4 font-sans text-[clamp(1.9rem,3.6vw,2.8rem)] leading-[1.08] font-bold tracking-tight">
              Where our talent operates.
            </h2>
          </div>
          <BentoGrid />
        </Container>
      </section>

      {/* What sets our talent apart */}
      <section className="bg-muted py-20 sm:py-24">
        <Container>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <div>
              <span className="bg-primary/8 text-primary inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[11px] font-bold tracking-[0.1em] uppercase">
                <ShieldCheck size={13} /> What sets us apart
              </span>
              <h2 className="text-ink mt-4 font-sans text-[clamp(1.9rem,3.2vw,2.4rem)] leading-[1.08] font-bold tracking-tight">
                Talent that carries the governance, not just the certification.
              </h2>
            </div>
            <div className="flex flex-col gap-5">
              {differentiators.map((item) => (
                <div key={item} className="border-border flex items-start gap-4 rounded-2xl border bg-white p-5">
                  <span className="bg-primary/8 text-primary flex h-9 w-9 shrink-0 items-center justify-center rounded-xl">
                    <CheckCircle2 size={18} />
                  </span>
                  <p className="text-ink text-[14.5px] leading-relaxed font-medium">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Final CTA */}
      <section className="bg-navy relative overflow-hidden py-20 sm:py-24">
        <div aria-hidden className="bg-primary/20 pointer-events-none absolute top-1/2 left-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full blur-[140px]" />
        <Container className="relative flex flex-col items-center text-center">
          <h2 className="max-w-2xl font-sans text-[clamp(1.9rem,3.6vw,2.8rem)] leading-[1.1] font-bold tracking-tight text-white">
            Ready to scope your AI-ITSM or AI-Salesforce need?
          </h2>
          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-white/60">
            Talk to us about the right team for your platform.
          </p>
          <div className="mt-8">
            <PrimaryButton href="/contact">
              Talk to us <ArrowRight size={16} />
            </PrimaryButton>
          </div>
        </Container>
      </section>
    </>
  )
}
