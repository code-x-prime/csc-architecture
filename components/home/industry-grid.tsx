'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import {
  IconVaccine,
  IconStethoscope,
  IconDeviceLaptop,
  IconBriefcase2,
  IconBuildingBank,
  IconShieldCheck,
  IconShoppingCart,
  IconDroplet,
  IconPackage,
  IconAntenna,
  IconBuildingFactory2,
  type Icon,
} from '@tabler/icons-react'
import { industries } from '@/data/site'
import { Container, SectionLabel, ArrowLink, Reveal, RevealStagger } from '@/components/common'

const ICONS: Record<string, Icon> = {
  'biotech-pharma': IconVaccine,
  'health-care': IconStethoscope,
  technology: IconDeviceLaptop,
  'professional-services': IconBriefcase2,
  banking: IconBuildingBank,
  insurance: IconShieldCheck,
  retail: IconShoppingCart,
  'oil-and-gas': IconDroplet,
  'consumer-products': IconPackage,
  telecommunication: IconAntenna,
  manufacturing: IconBuildingFactory2,
}

/** Tiles cycle through the three brand colours on hover, keyed by position. */
const TILE_TONES = [
  { rule: 'bg-primary', icon: 'group-hover:text-primary', bg: 'hover:bg-tint-teal' },
  { rule: 'bg-blue', icon: 'group-hover:text-blue', bg: 'hover:bg-tint-blue' },
  { rule: 'bg-purple', icon: 'group-hover:text-purple', bg: 'hover:bg-tint-purple' },
]

/**
 * Compact industry tiles. This is a scan, not a feature — hairline borders and
 * a hover-revealed descriptor keep it quiet next to the heavier sections.
 */
export function IndustryGrid() {
  return (
    <section className="border-border border-b bg-white py-20 sm:py-24">
      <Container>
        <Reveal className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <SectionLabel index="08">Industries</SectionLabel>
            <h2 className="text-ink mt-6 max-w-2xl font-sans text-[clamp(1.75rem,3.4vw,2.5rem)] leading-[1.08] font-black tracking-[-0.03em] text-balance">
              Industries we serve
            </h2>
          </div>
          <ArrowLink href={`/who-we-help/${industries[0].slug}`}>View all industries</ArrowLink>
        </Reveal>

        <RevealStagger
          stagger={0.05}
          y={18}
          className="border-border mt-12 grid grid-cols-2 border-t border-l sm:grid-cols-3 lg:grid-cols-4"
        >
          {industries.map((industry, i) => {
            const Icon = ICONS[industry.slug] ?? IconBriefcase2
            const tone = TILE_TONES[i % TILE_TONES.length]

            return (
              <Link
                key={industry.slug}
                href={`/who-we-help/${industry.slug}`}
                className={`group border-border relative flex min-h-36 flex-col justify-between border-r border-b p-5 transition-colors duration-300 sm:p-6 ${tone.bg}`}
              >
                {/* Accent rule that draws in on hover */}
                <span
                  aria-hidden
                  className={`absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100 ${tone.rule}`}
                />

                <Icon
                  size={22}
                  stroke={1.6}
                  className={`text-muted-foreground transition-colors duration-300 ${tone.icon}`}
                />

                <div className="mt-6 flex items-end justify-between gap-3">
                  <h3 className="text-ink font-sans text-[14px] leading-snug font-bold tracking-tight">
                    {industry.title}
                  </h3>
                  <ArrowRight
                    size={15}
                    className={`text-muted-foreground shrink-0 -translate-x-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 ${tone.icon}`}
                  />
                </div>
              </Link>
            )
          })}
        </RevealStagger>
      </Container>
    </section>
  )
}
