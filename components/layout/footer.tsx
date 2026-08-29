'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { ArrowUpRight, Mail, MapPin, Phone, Clock } from 'lucide-react'
import { IconBrandLinkedin, IconBrandFacebook, IconBrandX } from '@tabler/icons-react'
import { animate, useInView, useMotionValue } from 'framer-motion'

import { contact, solutions } from '@/data/site'
import { Container } from '@/components/common'
import { FooterBackgroundGradient } from '@/components/ui/hover-footer'

const navigate: [string, string][] = [
  ['Home', '/'],
  ['About', '/team'],
  ['Solutions', '/solutions/bi-analytics'],
  ['Careers', '/careers/find-a-job'],
  ['Contact', '/contact'],
]

const social = [
  { icon: IconBrandLinkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
  { icon: IconBrandFacebook, href: 'https://facebook.com', label: 'Facebook' },
  { icon: IconBrandX, href: 'https://twitter.com', label: 'X' },
]

export function Footer() {
  return (
    <footer className="bg-muted px-4 pt-4 pb-4 sm:px-6 lg:px-8">
      <div className="border-border relative mx-auto max-w-7xl overflow-hidden rounded-4xl border bg-white shadow-[0_20px_60px_rgba(16,33,43,0.06)]">
        <FooterBackgroundGradient />

        {/* ============================================================
            TOP — statement + CTA, stat strip
        ============================================================ */}
        <div className="relative border-b border-black/6">
          <Container className="flex flex-col gap-10 py-14 lg:flex-row lg:items-end lg:justify-between lg:py-16">
            <div className="max-w-xl">
              <p className="text-primary text-[10.5px] font-bold tracking-[0.2em] uppercase">Consulting Services Corporation</p>
              <h2 className="text-ink mt-3 font-sans text-[clamp(1.8rem,3.2vw,2.4rem)] leading-[1.15] font-bold tracking-tight">
                Practical thinking for complex work — from strategy through execution.
              </h2>
              <Link
                href="/contact"
                className="group border-ink text-ink hover:bg-ink mt-6 inline-flex items-center gap-2.5 rounded-full border px-6 py-3 text-sm font-bold transition-all duration-300 hover:text-white"
              >
                Start a conversation
                <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>

            <div className="grid grid-cols-3 gap-6 sm:gap-12">
              <FooterStat target={20} suffix="+" label="Years leading practice work" />
              <FooterStat target={10} suffix="+" label="Industries served" />
              <FooterStat target={50} suffix="+" label="Engagements delivered" />
            </div>
          </Container>
        </div>

        {/* ============================================================
            MIDDLE — brand + link columns + contact card
        ============================================================ */}
        <Container className="relative py-14 lg:py-16">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[0.9fr_0.7fr_0.7fr_1fr] lg:gap-8">
            {/* Brand */}
            <div>
              <Link href="/" className="group inline-flex items-center gap-3">
                <img src="/logo.png" alt="Consulting Services Corporation" className="h-16 w-auto object-contain" />

              </Link>

              <p className="text-muted-foreground mt-5 max-w-xs text-[13px] leading-6.5">
                Helping organizations move from complex questions to practical next steps.
              </p>

              <div className="mt-6 flex items-center gap-2.5">
                {social.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    aria-label={item.label}
                    target="_blank"
                    rel="noreferrer"
                    className="border-border text-muted-foreground hover:border-primary hover:text-primary flex h-9 w-9 items-center justify-center rounded-full border bg-white transition-colors duration-300"
                  >
                    <item.icon size={15} />
                  </a>
                ))}
              </div>
            </div>

            {/* Navigate */}
            <FooterColumn title="Navigate">
              {navigate.map(([label, href]) => (
                <Link
                  key={href}
                  href={href}
                  className="text-muted-foreground hover:text-ink inline-flex items-center text-[13.5px] font-medium transition-all duration-200 hover:translate-x-1"
                >
                  {label}
                </Link>
              ))}
            </FooterColumn>

            {/* Solutions */}
            <FooterColumn title="Solutions">
              {solutions.slice(0, 5).map((item) => (
                <Link
                  key={item.slug}
                  href={`/solutions/${item.slug}`}
                  className="text-muted-foreground hover:text-ink inline-flex items-center text-[13.5px] font-medium transition-all duration-200 hover:translate-x-1"
                >
                  {item.title}
                </Link>
              ))}
            </FooterColumn>

            {/* Contact card */}
            <div className="border-border rounded-2xl border bg-white p-5">
              <p className="text-ink text-[11px] font-bold tracking-[0.16em] uppercase">Get in touch</p>
              <div className="mt-4 flex flex-col gap-3.5">
                <a href={`mailto:${contact.email}`} className="group flex items-start gap-3">
                  <Mail size={15} className="text-primary mt-0.5 shrink-0" />
                  <span className="text-muted-foreground group-hover:text-ink text-[13px] leading-5 transition-colors">
                    {contact.email}
                  </span>
                </a>
                <a href={`tel:${contact.phone.replace(/[^\d+]/g, '')}`} className="group flex items-start gap-3">
                  <Phone size={15} className="text-primary mt-0.5 shrink-0" />
                  <span className="text-muted-foreground group-hover:text-ink text-[13px] leading-5 transition-colors">
                    {contact.phone}
                  </span>
                </a>
                <div className="flex items-start gap-3">
                  <MapPin size={15} className="text-primary mt-0.5 shrink-0" />
                  <span className="text-muted-foreground text-[13px] leading-5">{contact.address}</span>
                </div>
                <div className="flex items-start gap-3">
                  <Clock size={15} className="text-primary mt-0.5 shrink-0" />
                  <span className="text-muted-foreground text-[13px] leading-5">Mon–Fri, 9:00 AM – 5:00 PM</span>
                </div>
              </div>
            </div>
          </div>
        </Container>

        {/* ============================================================
            BOTTOM BAR
        ============================================================ */}
        <div className="relative border-t border-black/6">
          <Container className="flex flex-col gap-3 py-6 sm:flex-row sm:items-center sm:justify-between">
            <span className="text-muted-foreground text-center text-[11px] font-medium sm:text-left">
              © {new Date().getFullYear()} Consulting Services Corporation. All rights reserved.
            </span>

            <div className="flex flex-wrap items-center justify-center gap-4 sm:justify-end">
              <Link href="/privacy" className="text-muted-foreground hover:text-ink text-[11px] font-medium transition-colors">
                Privacy
              </Link>
              <span className="bg-border h-3 w-px" />
              <Link href="/terms" className="text-muted-foreground hover:text-ink text-[11px] font-medium transition-colors">
                Terms
              </Link>
              <span className="bg-border h-3 w-px" />
              <span className="text-muted-foreground text-[11px] font-medium">
                Designed by{' '}
                <a
                  href="https://groxmedia.in/"
                  target="_blank"
                  rel="noreferrer"
                  className="text-ink font-semibold underline decoration-black/20 underline-offset-2 transition-colors hover:text-primary hover:decoration-primary"
                >
                  Grox Media
                </a>
              </span>
            </div>
          </Container>
        </div>
      </div>
    </footer>
  )
}

function FooterColumn({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="text-ink text-[11px] font-bold tracking-[0.16em] uppercase">{title}</h3>
      <div className="mt-5 flex flex-col gap-3.5">{children}</div>
    </div>
  )
}

function FooterStat({ target, suffix = '', label }: { target: number; suffix?: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-40px' })
  const motionValue = useMotionValue(0)
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!isInView) return
    const controls = animate(motionValue, target, {
      duration: 1.4,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (value) => setDisplay(Math.round(value)),
    })
    return () => controls.stop()
  }, [isInView, motionValue, target])

  return (
    <div ref={ref}>
      <div className="text-ink font-sans text-[1.9rem] leading-none font-bold tracking-tight sm:text-[2.2rem]">
        {display}
        {suffix}
      </div>
      <p className="text-muted-foreground mt-2 max-w-32 text-[11.5px] leading-4.5 font-medium">{label}</p>
    </div>
  )
}
