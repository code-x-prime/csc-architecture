'use client'

import Link from 'next/link'
import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, Sparkles } from 'lucide-react'
import { IconChevronDown, IconLayoutGrid, type Icon } from '@tabler/icons-react'
import { nav } from '@/data/site'
import { Container } from '@/components/common'
import { cn } from '@/lib/utils'
import { ICONS, SECTION_META } from './mega-menu'

export function MobileMenu({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.22, ease: 'easeOut' }}
          className="overflow-hidden border-t border-black/[0.07] bg-white lg:hidden"
        >
          <Container className="flex max-h-[calc(100dvh-64px)] flex-col gap-1 overflow-y-auto py-5">
            <Link
              href="/solutions/agentic-ai-operations"
              onClick={onClose}
              className="border-border bg-accent-soft text-ink mb-3 flex items-center gap-2.5 rounded-xl border px-4 py-3.5 text-[13px] font-bold"
            >
              <span className="relative flex h-1.5 w-1.5 shrink-0">
                <span className="bg-primary absolute inline-flex h-full w-full animate-ping rounded-full opacity-70" />
                <span className="bg-primary relative inline-flex h-1.5 w-1.5 rounded-full" />
              </span>
              <Sparkles size={14} className="text-primary" />
              Agentic AI Operations
            </Link>

            {nav.map((group) => (
              <Disclosure
                key={group.label}
                label={group.label}
                items={group.items}
                onNavigate={onClose}
              />
            ))}

            <Link
              href="/contact"
              onClick={onClose}
              className="bg-ink hover:bg-primary group mt-4 flex w-full items-center justify-center gap-2.5 rounded-xl px-5 py-4 text-[13px] font-bold text-white transition-colors duration-300"
            >
              Let&apos;s talk
              <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </Container>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function Disclosure({
  label,
  items,
  onNavigate,
}: {
  label: string
  items: [string, string][]
  onNavigate: () => void
}) {
  const [open, setOpen] = useState(false)
  const GroupIcon: Icon = SECTION_META[label]?.icon ?? IconLayoutGrid

  return (
    <div className="border-b border-black/6">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex w-full items-center justify-between py-4 text-left text-[15px] font-bold text-ink"
      >
        <span className="flex items-center gap-3">
          <span className="bg-primary/8 text-primary flex h-8 w-8 shrink-0 items-center justify-center rounded-lg">
            <GroupIcon size={16} stroke={1.75} />
          </span>
          {label}
        </span>

        <IconChevronDown
          size={16}
          stroke={2}
          className={cn(
            'text-ink/40 transition-transform duration-200',
            open && 'rotate-180 text-primary',
          )}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="overflow-hidden"
          >
            <div className="flex flex-col gap-0.5 pb-3 pl-3">
              {items.map(([itemLabel, href]) => {
                const ItemIcon = ICONS[href]
                return (
                  <Link
                    key={href}
                    href={href}
                    onClick={onNavigate}
                    className="group flex items-center gap-2.5 rounded-md px-3 py-2.5 text-sm font-medium text-ink/60 transition-colors hover:bg-primary/5 hover:text-primary"
                  >
                    {ItemIcon && (
                      <ItemIcon size={15} stroke={1.75} className="text-ink/35 shrink-0 transition-colors group-hover:text-primary" />
                    )}
                    {itemLabel}
                  </Link>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
