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
  IconRobot,
  IconUserBolt,
  type Icon,
} from '@tabler/icons-react'
import { cn } from '@/lib/utils'

export const ICONS: Record<string, Icon> = {
  '/solutions/agentic-ai-operations': IconRobot,
  '/solutions/ai-powered-it-talent': IconUserBolt,
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
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
          className={cn(
            'border-border absolute inset-x-0 top-full z-40 border-b bg-white shadow-[0_16px_40px_rgba(11,31,42,0.10)]',
            rounded && 'rounded-b-2xl',
          )}
        >
          {/* Aligned to the same container the header bar uses, so the panel
              lines up with the nav rather than spanning edge to edge. */}
          <div className="mx-auto grid w-full max-w-7xl gap-10 px-5 py-10 sm:px-6 lg:grid-cols-[260px_1fr] lg:gap-14 lg:px-8">
            {/* =========================================
                LEFT — SECTION INTRO
            ========================================== */}
            <div className="hidden flex-col justify-between lg:flex">
              <div>
                <p className="text-muted-foreground flex items-center gap-3 text-[10px] font-black tracking-[0.22em] uppercase">
                  <SectionIcon size={15} stroke={1.75} className="text-primary" />
                  <span aria-hidden className="bg-border h-px w-5" />
                  Explore
                </p>

                <p className="text-ink mt-5 font-sans text-[22px] leading-tight font-black tracking-[-0.03em]">
                  {label}
                </p>

                <p className="text-muted-foreground mt-3 max-w-[24ch] text-[13px] leading-[1.65]">
                  {meta?.blurb ?? 'Explore what we offer in this area.'}
                </p>
              </div>

              <Link
                href={items[0]?.[1] ?? '/'}
                className="group text-primary hover:text-accent-hover mt-8 inline-flex items-center gap-2 text-[12.5px] font-bold tracking-tight transition-colors"
              >
                View all in {label}
                <IconArrowRight
                  size={14}
                  stroke={2.25}
                  className="shrink-0 transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
            </div>

            {/* =========================================
                RIGHT — LINK GRID
            ========================================== */}
            <div>
              <p className="text-muted-foreground mb-5 text-[10px] font-black tracking-[0.22em] uppercase lg:hidden">
                {label}
              </p>

              <div className="border-border grid grid-cols-2 border-t border-l sm:grid-cols-3">
                {items.map(([itemLabel, href]) => {
                  const Icon = ICONS[href] ?? IconArrowUpRight

                  return (
                    <Link
                      key={href}
                      href={href}
                      className="group border-border hover:bg-paper relative flex items-start gap-3 border-r border-b p-4 transition-colors duration-200"
                    >
                      {/* Accent rule that draws in on hover */}
                      <span
                        aria-hidden
                        className="bg-primary absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100"
                      />

                      <Icon
                        size={18}
                        stroke={1.6}
                        className="text-muted-foreground group-hover:text-primary mt-px shrink-0 transition-colors duration-200"
                      />

                      <span className="text-ink group-hover:text-primary min-w-0 flex-1 text-[13px] leading-snug font-bold tracking-tight transition-colors duration-200">
                        {itemLabel}
                      </span>

                      <IconArrowUpRight
                        size={14}
                        className="text-primary mt-px shrink-0 -translate-x-1 opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100"
                      />
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
