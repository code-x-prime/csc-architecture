'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { ArrowRight, ChevronDown, Menu, Sparkles, X } from 'lucide-react'

import { nav } from '@/data/site'
import { UtilityBar } from './utility-bar'
import { MegaMenu } from './mega-menu'
import { MobileMenu } from './mobile-menu'
import { cn } from '@/lib/utils'

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [openGroup, setOpenGroup] = useState<string | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)

  /* =========================================================
     SCROLL
  ========================================================== */

  useEffect(() => {
    let ticking = false

    const evaluate = () => {
      ticking = false
      // Hysteresis: enter "scrolled" only past 96px, exit only below 48px.
      // This stops the header flickering back and forth when the scroll
      // position hovers right around a single threshold.
      setScrolled((prev) => {
        const y = window.scrollY
        if (!prev && y > 96) return true
        if (prev && y < 48) return false
        return prev
      })
    }

    const handleScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(evaluate)
    }

    evaluate()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  /* =========================================================
     LOCK BODY WHEN MOBILE MENU OPEN
  ========================================================== */

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  /* =========================================================
     ESCAPE CLOSES WHATEVER IS OPEN
  ========================================================== */

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return
      setOpenGroup(null)
      setMobileOpen(false)
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  const activeGroup = nav.find((group) => group.label === openGroup)

  return (
    <header className="sticky top-0 z-50 w-full" onMouseLeave={() => setOpenGroup(null)}>
      {/* =======================================================
          UTILITY BAR — collapses away on scroll
      ======================================================== */}
      <div
        className={cn(
          'overflow-hidden transition-all duration-500',
          scrolled ? 'pointer-events-none h-0 opacity-0' : 'h-auto opacity-100',
        )}
      >
        <UtilityBar />
      </div>

      {/* =======================================================
          MAIN BAR
      ======================================================== */}
      <div
        className={cn(
          'relative border-b bg-white/90 backdrop-blur-md transition-all duration-300',
          scrolled ? 'border-border shadow-[0_1px_16px_rgba(11,31,42,0.06)]' : 'border-transparent',
        )}
      >
        <div className="mx-auto flex w-full max-w-7xl items-center gap-4 px-5 sm:px-6 lg:px-8">
          {/* =================================================
              LOGO
          ================================================== */}
          {/* The vertical padding lives on the link, not the image — putting it
              on the image ate into its own height and shrank the mark. */}
          <Link
            href="/"
            className={cn(
              'flex shrink-0 items-center transition-all duration-300',
              scrolled ? 'py-3.5' : 'py-5',
            )}
            onClick={() => setMobileOpen(false)}
          >
            <Image
              width={220}
              height={60}
              src="/logo.png"
              alt="Consulting Services Corporation"
              priority
              className={cn('w-auto object-contain transition-all duration-300', scrolled ? 'h-8' : 'h-11')}
            />
          </Link>

          {/* =================================================
              DESKTOP NAVIGATION
          ================================================== */}
          <nav className="ml-auto hidden items-center lg:flex" aria-label="Main navigation">
            {nav.map((group) => {
              const active = openGroup === group.label

              return (
                <div
                  key={group.label}
                  className="relative"
                  onMouseEnter={() => setOpenGroup(group.label)}
                  onFocus={() => setOpenGroup(group.label)}
                >
                  <Link
                    href={group.href}
                    aria-expanded={active}
                    className={cn(
                      'group relative flex items-center gap-1.5 px-3.5 py-6 text-[13px] font-bold tracking-tight transition-colors duration-200',
                      active ? 'text-primary' : 'text-ink/70 hover:text-ink',
                    )}
                  >
                    {group.label}
                    <ChevronDown
                      size={13}
                      strokeWidth={2.25}
                      className={cn('transition-transform duration-300', active && 'text-primary rotate-180')}
                    />

                    {/* Underline indicator */}
                    <span
                      aria-hidden
                      className={cn(
                        'bg-primary absolute inset-x-3 bottom-4 h-0.5 origin-left transition-transform duration-300',
                        active ? 'scale-x-100' : 'scale-x-0',
                      )}
                    />
                  </Link>
                </div>
              )
            })}
          </nav>

          {/* =================================================
              RIGHT ACTIONS
          ================================================== */}
          <div className="ml-auto flex items-center gap-2.5 lg:ml-6">
            {/* Agentic AI pill */}
            <Link
              href="/solutions/agentic-ai-operations"
              className="border-border text-ink hover:border-primary/40 hover:bg-accent-soft group hidden items-center gap-2 rounded-lg border px-3.5 py-2.5 text-[12.5px] font-bold transition-colors duration-300 sm:inline-flex"
            >
              <span className="relative flex h-1.5 w-1.5 shrink-0">
                <span className="bg-primary absolute inline-flex h-full w-full animate-ping rounded-full opacity-70" />
                <span className="bg-primary relative inline-flex h-1.5 w-1.5 rounded-full" />
              </span>
              <Sparkles size={13} className="text-primary" />
              Agentic AI
            </Link>

            {/* Desktop CTA */}
            <Link
              href="/contact"
              className="bg-ink hover:bg-primary group hidden items-center gap-2.5 rounded-lg px-5 py-3 text-[12.5px] font-bold text-white transition-colors duration-300 lg:inline-flex"
            >
              Let&apos;s talk
              <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>

            {/* Mobile menu button */}
            <button
              type="button"
              onClick={() => setMobileOpen((open) => !open)}
              aria-expanded={mobileOpen}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              className={cn(
                'border-border relative flex h-10 w-10 items-center justify-center rounded-lg border transition-colors duration-300 lg:hidden',
                mobileOpen ? 'border-primary/30 bg-accent-soft text-primary' : 'text-ink hover:border-primary/30',
              )}
            >
              <span
                className={cn(
                  'absolute transition-all duration-300',
                  mobileOpen ? 'scale-50 rotate-90 opacity-0' : 'scale-100 rotate-0 opacity-100',
                )}
              >
                <Menu size={19} strokeWidth={1.9} />
              </span>
              <span
                className={cn(
                  'absolute transition-all duration-300',
                  mobileOpen ? 'scale-100 rotate-0 opacity-100' : 'scale-50 -rotate-90 opacity-0',
                )}
              >
                <X size={19} strokeWidth={1.9} />
              </span>
            </button>
          </div>
        </div>

        {/* =====================================================
            MEGA MENU
        ====================================================== */}
        {activeGroup && (
          <div className="absolute inset-x-0 top-full z-40">
            <MegaMenu label={activeGroup.label} items={activeGroup.items} open={!!openGroup} rounded={false} />
          </div>
        )}
      </div>

      {/* =======================================================
          MOBILE MENU
      ======================================================== */}
      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </header>
  )
}
