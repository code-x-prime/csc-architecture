import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
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
import { industries, industryImages } from '@/data/site'
import { Section, Eyebrow, ArrowLink } from '@/components/common'

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

export function IndustryGrid() {
  return (
    <Section muted>
      <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
        <div>
          <Eyebrow>Who we help</Eyebrow>
          <h2 className="text-ink mt-4 max-w-2xl font-sans text-[clamp(1.9rem,3.6vw,3rem)] leading-[1.05] font-bold tracking-tight">
            Perspective shaped by real industry context.
          </h2>
        </div>
        <ArrowLink href={`/who-we-help/${industries[0].slug}`}>See all industries</ArrowLink>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {industries.map((industry) => {
          const Icon = ICONS[industry.slug] ?? IconBriefcase2

          return (
            <Link key={industry.slug} href={`/who-we-help/${industry.slug}`} className="group bg-navy relative aspect-4/3 overflow-hidden">
              <img
                src={industryImages[industry.slug]}
                alt={industry.title}
                className="size-full object-cover opacity-80 transition-all duration-500 group-hover:scale-105 group-hover:opacity-60"
              />
              <div className="from-navy via-navy/20 absolute inset-0 bg-linear-to-t to-transparent" />
              <div className="bg-primary/0 group-hover:bg-primary/20 absolute inset-0 transition-colors duration-300" />

              <span className="bg-white/10 text-white group-hover:bg-primary absolute top-5 left-5 flex h-11 w-11 items-center justify-center rounded-xl backdrop-blur-sm transition-colors duration-300">
                <Icon size={20} stroke={1.75} />
              </span>

              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5">
                <h3 className="font-sans text-lg font-bold tracking-tight text-white">{industry.title}</h3>
                <span className="group-hover:bg-primary inline-flex size-9 shrink-0 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                  <ArrowUpRight size={16} />
                </span>
              </div>
            </Link>
          )
        })}
      </div>
    </Section>
  )
}
