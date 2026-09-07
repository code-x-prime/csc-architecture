'use client'

import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useInView, type Variants } from 'framer-motion'
import { Award, ShieldCheck, Users } from 'lucide-react'

import { team } from '@/data/site'
import { Container, SectionLabel, ArrowLink } from '@/components/common'

const EASE = [0.22, 1, 0.36, 1] as const

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: EASE },
  }),
}

const credentials = [
  { icon: Award, label: 'Recognized for excellence', detail: 'Award-winning delivery across practice areas' },
  { icon: ShieldCheck, label: 'ISO 27001 certified', detail: 'Information security held to audited standards' },
  { icon: Users, label: 'Deep industry expertise', detail: 'Practice leads with decades in their sectors' },
]

/**
 * Leadership credibility. The stats live in TrustedBySection, so this stays
 * restrained: portraits, names, and a small credentials panel.
 */
export function TrustLeadershipSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  // Show the whole practice leadership — the team page lists the same people,
  // and dropping one here made the section look like it was hiding somebody.
  const leads = team

  return (
    <section ref={sectionRef} className="border-border border-b bg-white py-20 sm:py-24">
      <Container>
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <motion.div initial="hidden" animate={isInView ? 'visible' : 'hidden'} custom={0} variants={fadeUp} className="max-w-2xl">
            <SectionLabel index="12">Trust &amp; leadership</SectionLabel>
            <h2 className="text-ink mt-6 font-sans text-[clamp(1.75rem,3.4vw,2.5rem)] leading-[1.08] font-black tracking-[-0.03em] text-balance">
              Experienced leaders. Stronger outcomes.
            </h2>
          </motion.div>

          <motion.div initial="hidden" animate={isInView ? 'visible' : 'hidden'} custom={0.1} variants={fadeUp}>
            <ArrowLink href="/team">Meet our leadership</ArrowLink>
          </motion.div>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-5">
          {leads.map((member, index) => (
            <motion.div
              key={member.name}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              custom={0.16 + index * 0.07}
              variants={fadeUp}
            >
              <Link href="/team" className="group block">
                <div className="bg-paper-deep relative aspect-4/5 w-full overflow-hidden rounded-xl">
                  {member.image && (
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      sizes="(min-width: 1024px) 18vw, 45vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                    />
                  )}
                </div>
                <h3 className="text-ink group-hover:text-primary mt-4 text-[13px] font-bold tracking-tight transition-colors">
                  {member.name}
                </h3>
                <p className="text-muted-foreground mt-1 text-[12px] leading-snug">{member.role}</p>
              </Link>
            </motion.div>
          ))}

        </div>

        {/* Credentials — a full-width band under the portraits, so the grid
            stays one clean row of people rather than people plus a panel. */}
        <motion.ul
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          custom={0.16 + leads.length * 0.07}
          variants={fadeUp}
          className="border-border mt-12 grid gap-px border-t sm:grid-cols-3"
        >
          {credentials.map(({ icon: Icon, label, detail }) => (
            <li key={label} className="border-border flex items-start gap-3.5 border-b py-5 sm:pr-8">
              <Icon size={17} className="text-primary mt-0.5 shrink-0" strokeWidth={1.75} />
              <div>
                <p className="text-ink text-[13px] leading-snug font-bold tracking-tight">{label}</p>
                <p className="text-muted-foreground mt-1 text-[12.5px] leading-snug">{detail}</p>
              </div>
            </li>
          ))}
        </motion.ul>
      </Container>
    </section>
  )
}
