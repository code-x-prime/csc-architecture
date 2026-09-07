'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Check } from 'lucide-react'
import { Container } from '@/components/common'

const EASE = [0.22, 1, 0.36, 1] as const

const capabilities = [
  { label: 'Automated Testing', href: '/solutions/automated-software-testing' },
  { label: 'Functional Testing', href: '/solutions/functional-test' },
  { label: 'Performance Testing', href: '/solutions/performance-test-automation' },
  { label: 'Regression Testing', href: '/solutions/regression-test-automation' },
  { label: 'Security Testing', href: '/solutions/automated-software-testing' },
  { label: 'Cross-Browser Testing', href: '/solutions/automated-software-testing' },
]

/**
 * Engineering-flavoured block — a dark panel inset on paper, with a mono label
 * and a checklist that reads like a capability manifest rather than marketing.
 */
export function TestingBlock() {
  return (
    <section className="bg-paper border-border border-b py-20 sm:py-24">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.65, ease: EASE }}
          className="bg-navy relative isolate overflow-hidden rounded-2xl px-6 py-12 text-white sm:px-10 sm:py-14 lg:px-14"
        >
          {/* Grid texture */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage:
                'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
              backgroundSize: '44px 44px',
              maskImage: 'radial-gradient(ellipse 70% 90% at 20% 40%, black 25%, transparent 80%)',
              WebkitMaskImage: 'radial-gradient(ellipse 70% 90% at 20% 40%, black 25%, transparent 80%)',
            }}
          />

          <div className="relative grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-16">
            {/* ===============================================
                LEFT — STATEMENT
            =============================================== */}
            <div>
              <p className="font-mono text-[11px] font-bold tracking-[0.22em] text-white/50 uppercase">
                Quality <span className="text-primary">//</span> AI <span className="text-primary">//</span> Scale
              </p>

              <h2 className="border-primary mt-7 max-w-md border-l-2 pl-4 font-sans text-[clamp(1.75rem,3.4vw,2.5rem)] leading-[1.08] font-black tracking-[-0.03em] text-white text-balance sm:pl-6">
                Automated software testing
              </h2>

              <p className="mt-7 max-w-md pl-4 text-[15px] leading-[1.75] text-white/60 sm:pl-6">
                Our testing practice covers the full delivery lifecycle — ensuring quality, performance and reliability at
                every stage.
              </p>

              <div className="mt-9 pl-4 sm:pl-6">
                <Link
                  href="/solutions/automated-software-testing"
                  className="group bg-primary hover:bg-accent-hover inline-flex items-center gap-3 rounded-xl px-6 py-4 text-sm font-bold text-white transition-colors duration-300"
                >
                  Our testing services
                  <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>
            </div>

            {/* ===============================================
                RIGHT — CAPABILITY MANIFEST
            =============================================== */}
            <div className="rounded-xl border border-white/12 bg-white/[0.03] p-5 backdrop-blur-sm sm:p-6">
              <p className="font-mono text-[11px] font-bold tracking-[0.16em] text-white/40 uppercase">
                <span className="text-primary">//</span> Testing capabilities
              </p>

              <ul className="mt-5 divide-y divide-white/8">
                {capabilities.map((item, i) => (
                  <motion.li
                    key={item.label}
                    initial={{ opacity: 0, x: -8 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{ duration: 0.4, delay: i * 0.06, ease: EASE }}
                  >
                    <Link
                      href={item.href}
                      className="group flex items-center gap-3.5 py-3.5 transition-colors hover:text-white"
                    >
                      <span className="border-primary/50 text-primary group-hover:bg-primary flex h-5 w-5 shrink-0 items-center justify-center rounded border transition-colors duration-300 group-hover:text-white">
                        <Check size={12} strokeWidth={3} />
                      </span>
                      <span className="text-[14px] font-semibold tracking-tight text-white/75 transition-colors group-hover:text-white">
                        {item.label}
                      </span>
                      <ArrowRight
                        size={14}
                        className="text-primary ml-auto shrink-0 -translate-x-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
                      />
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  )
}

