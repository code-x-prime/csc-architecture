'use client'

import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'
import {
  IconChartBar,
  IconCode,
  IconUsersGroup,
  IconBriefcase2,
  IconArrowUpRight,
  IconArrowRight,
  IconFlask,
  IconGauge,
  IconRepeat,
  IconBulb,
  IconTargetArrow,
  IconSchool,
  IconRoute,
  IconVaccine,
  IconStethoscope,
  IconDeviceLaptop,
  IconBuildingBank,
  IconShieldCheck,
  IconShoppingCart,
  IconDroplet,
  IconPackage,
  IconAntenna,
  IconBuildingFactory2,
  IconSearch,
  IconUserSearch,
  IconUserCheck,
  IconClockHour4,
  IconCompass,
  IconUsers,
  IconMail,
  IconSparkles,
  IconLayoutGrid,
  type Icon,
} from '@tabler/icons-react'
import { cn } from '@/lib/utils'

export const ICONS: Record<string, Icon> = {
  '/solutions/bi-analytics': IconChartBar,
  '/solutions/technology-consulting': IconCode,
  '/solutions/customer-engagement-technology': IconUsersGroup,
  '/solutions/mergers-and-acquisitions': IconBriefcase2,
  '/solutions/automated-software-testing': IconFlask,
  '/solutions/functional-test': IconGauge,
  '/solutions/performance-test-automation': IconGauge,
  '/solutions/regression-test-automation': IconRepeat,

  '/how-we-help/great-framework': IconBulb,
  '/how-we-help/business-simulation': IconTargetArrow,
  '/how-we-help/change-management': IconRoute,
  '/how-we-help/innovation-digital-transformation': IconSparkles,
  '/how-we-help/strategic-execution': IconTargetArrow,
  '/how-we-help/learning-programs': IconSchool,

  '/who-we-help/biotech-pharma': IconVaccine,
  '/who-we-help/health-care': IconStethoscope,
  '/who-we-help/technology': IconDeviceLaptop,
  '/who-we-help/professional-services': IconBriefcase2,
  '/who-we-help/banking': IconBuildingBank,
  '/who-we-help/insurance': IconShieldCheck,
  '/who-we-help/retail': IconShoppingCart,
  '/who-we-help/oil-and-gas': IconDroplet,
  '/who-we-help/consumer-products': IconPackage,
  '/who-we-help/telecommunication': IconAntenna,
  '/who-we-help/manufacturing': IconBuildingFactory2,

  '/careers/find-a-job': IconSearch,
  '/careers/find-talent': IconUserSearch,
  '/careers/permanent-placements': IconUserCheck,
  '/careers/temp-contract-staff-augmentation': IconClockHour4,
  '/careers/career-consulting': IconCompass,

  '/team': IconUsers,
  '/contact': IconMail,
}

export const SECTION_META: Record<string, { icon: Icon; blurb: string }> = {
  Solutions: {
    icon: IconLayoutGrid,
    blurb: 'Technology, data, and testing solutions built around measurable business outcomes.',
  },
  'How We Help': {
    icon: IconBulb,
    blurb: 'Frameworks and programs that turn strategy into execution across your organization.',
  },
  'Who We Help': {
    icon: IconUsersGroup,
    blurb: 'Industry-specific expertise across regulated, technical, and consumer-facing sectors.',
  },
  Careers: {
    icon: IconCompass,
    blurb: 'Opportunities and talent solutions for both candidates and hiring organizations.',
  },
  Company: {
    icon: IconUsers,
    blurb: 'Meet the team behind Consulting Services Corporation and get in touch.',
  },
}

export function MegaMenu({
  label,
  items,
  open,
  rounded = false,
}: {
  label: string
  items: [string, string][]
  open: boolean
  rounded?: boolean
}) {
  const meta = SECTION_META[label]
  const SectionIcon = meta?.icon ?? IconLayoutGrid

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.18, ease: 'easeOut' }}
          className={cn(
            'border-border shadow-ink/10 absolute inset-x-0 top-full z-40 overflow-hidden border-t bg-white shadow-2xl',
            rounded && 'rounded-2xl border-t-0',
          )}
        >
          <div className="mx-auto flex w-full max-w-370">
            {/* =========================================
                LEFT — SECTION INTRO
            ========================================== */}

            <div className="from-ink to-ink/90 relative hidden w-72 shrink-0 flex-col justify-between overflow-hidden bg-linear-to-br p-8 text-white lg:flex">
              <div
                className="pointer-events-none absolute -top-16 -right-16 h-48 w-48 rounded-full bg-white/6 blur-2xl"
                aria-hidden
              />

              <div className="relative">
                <span className="bg-primary/90 flex h-11 w-11 items-center justify-center rounded-xl shadow-lg shadow-black/20 ring-1 ring-white/15">
                  <SectionIcon size={21} stroke={1.75} />
                </span>

                <p className="mt-6 text-[21px] font-bold tracking-[-0.02em]">{label}</p>

                <p className="mt-2.5 text-[13px] leading-relaxed text-white/55">
                  {meta?.blurb ?? 'Explore what we offer in this area.'}
                </p>
              </div>

              <Link
                href={items[0]?.[1] ?? '/'}
                className="group border-primary/40 bg-primary/15 hover:bg-primary/90 relative inline-flex items-center justify-between gap-2 rounded-xl border px-4 py-3 text-[12.5px] font-bold tracking-wide text-white transition-colors"
              >
                View all in {label}
                <IconArrowRight
                  size={15}
                  stroke={2}
                  className="shrink-0 transition-transform duration-200 group-hover:translate-x-0.5"
                />
              </Link>
            </div>

            {/* =========================================
                RIGHT — LINK GRID
            ========================================== */}

            <div className="flex-1 px-6 py-8 sm:px-8 lg:px-10">
              <p className="text-muted-foreground mb-5 text-[10.5px] font-bold tracking-[0.2em] uppercase lg:hidden">
                {label}
              </p>

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-4">
                {items.map(([itemLabel, href]) => {
                  const Icon = ICONS[href] ?? IconArrowUpRight

                  return (
                    <Link
                      key={href}
                      href={href}
                      className="group border-border/70 hover:border-primary/25 hover:bg-accent-soft/50 relative flex flex-col gap-3 rounded-2xl border bg-white p-4 transition-all duration-150 hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(0,0,0,0.07)]"
                    >
                      <span className="bg-accent-soft text-primary group-hover:bg-primary flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-colors group-hover:text-white">
                        <Icon size={19} stroke={1.75} />
                      </span>

                      <span className="text-ink group-hover:text-primary flex items-center justify-between gap-2 text-[13.5px] leading-tight font-semibold transition-colors">
                        {itemLabel}
                        <IconArrowUpRight
                          size={14}
                          className="text-muted-foreground group-hover:text-primary shrink-0 opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
                        />
                      </span>
                    </Link>
                  )
                })}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
