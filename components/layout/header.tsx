'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import {
  ArrowUpRight,
  ChevronDown,
  Menu,
  X,
  Sparkles,
} from 'lucide-react'

import { nav } from '@/data/site'
import { PrimaryButton } from '@/components/common'
import { UtilityBar } from './utility-bar'
import { MegaMenu } from './mega-menu'
import { MobileMenu } from './mobile-menu'
import { cn } from '@/lib/utils'
import Image from 'next/image'

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

    window.addEventListener('scroll', handleScroll, {
      passive: true,
    })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  /* =========================================================
     LOCK BODY WHEN MOBILE MENU OPEN
  ========================================================== */

  useEffect(() => {
    document.body.style.overflow = mobileOpen
      ? 'hidden'
      : ''

    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  /* =========================================================
     ACTIVE MEGA MENU
  ========================================================== */

  const activeGroup = nav.find(
    (group) => group.label === openGroup,
  )

  return (
    <header
      className="sticky top-0 z-50 w-full"
      onMouseLeave={() => setOpenGroup(null)}
    >
      {/* =======================================================
          UTILITY BAR
      ======================================================== */}

      <div
        className={cn(
          'overflow-hidden transition-all duration-500',
          scrolled
            ? 'pointer-events-none h-0 opacity-0'
            : 'h-auto opacity-100',
        )}
      >
        <UtilityBar />
      </div>

      {/* =======================================================
          HEADER WRAPPER
      ======================================================== */}

      <div
        className={cn(
          'relative px-3 transition-all duration-500',
          'sm:px-5',
          'lg:px-6',
        )}
      >
        {/* =====================================================
            MAIN HEADER CONTAINER
        ====================================================== */}

        <div
          className={cn(
            'mx-auto max-w-[1480px]',
            'transition-all duration-500',
          )}
        >
          <div
            className={cn(
              'relative flex items-center justify-between',
              'transition-all duration-500',

              /* Base — solid white, no backdrop blur glow */
              'bg-white',

              /* Border */
              scrolled
                ? 'border border-black/[0.08]'
                : 'border-b border-black/[0.07]',

              /* Desktop */
              scrolled
                ? [
                  'mt-3',
                  'h-[68px]',
                  'rounded-2xl',
                  'px-3',
                  'shadow-[0_2px_10px_rgba(0,0,0,0.05)]',
                ].join(' ')
                : [
                  'h-[82px]',
                  'rounded-none',
                  'px-0',
                  'shadow-none',
                ].join(' '),

              /* Mobile menu */
              mobileOpen &&
              [
                'border-black/[0.09]',
                'shadow-[0_4px_16px_rgba(0,0,0,0.06)]',
                'lg:shadow-none',
              ].join(' '),

              'sm:px-4 lg:px-5',
            )}
          >
            {/* =================================================
                LOGO
            ================================================== */}

            <Link
              href="/"
              className="
                group
                flex
                shrink-0
                items-center
                gap-3
              "
              onClick={() => setMobileOpen(false)}
            >
              <Image
                width={160}
                height={40}
                src="/logo.png"
                alt="Consulting Services Corporation"
                className={cn(
                  'w-auto object-contain transition-all duration-300 group-hover:scale-[1.04]',
                  scrolled ? 'h-10' : 'h-14',
                )}
              />
            </Link>

            {/* =================================================
                DESKTOP NAVIGATION
            ================================================== */}

            <nav
              className="
                absolute
                left-1/2
                hidden
                -translate-x-1/2
                items-center
                gap-0.5
                lg:flex
              "
              aria-label="Main navigation"
            >
              {nav.map((group) => {
                const active =
                  openGroup === group.label

                return (
                  <div
                    key={group.label}
                    className="relative"
                    onMouseEnter={() =>
                      setOpenGroup(group.label)
                    }
                  >
                    <Link
                      href={group.href}
                      className={cn(
                        'group relative flex items-center gap-1.5',
                        'rounded-lg px-3.5 py-2.5',
                        'text-[12.5px] font-semibold',
                        'tracking-[-0.005em]',
                        'transition-all duration-250',

                        active
                          ? [
                            'bg-primary/[0.06]',
                            'text-primary',
                          ].join(' ')
                          : [
                            'text-ink/65',
                            'hover:bg-black/[0.035]',
                            'hover:text-ink',
                          ].join(' '),
                      )}
                    >
                      <span>{group.label}</span>

                      <ChevronDown
                        size={13}
                        strokeWidth={2}
                        className={cn(
                          'transition-all duration-300',

                          active
                            ? 'rotate-180 text-primary'
                            : [
                              'text-ink/35',
                              'group-hover:text-ink/65',
                            ].join(' '),
                        )}
                      />

                      {/* Active indicator */}
                      <span
                        className={cn(
                          'absolute bottom-1 left-1/2',
                          '-translate-x-1/2',
                          'h-1 w-1 rounded-full',
                          'bg-primary',
                          'transition-all duration-300',

                          active
                            ? 'scale-100 opacity-100'
                            : 'scale-0 opacity-0',
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

            <div className="ml-auto flex items-center gap-2 sm:gap-3">
              {/* Availability */}
              <div
                className="
                  hidden
                  items-center
                  gap-2
                  rounded-full
                  border
                  border-black/[0.08]
                  bg-white
                  px-3
                  py-2
                  xl:flex
                "
              >
                <span className="relative flex h-2 w-2">


                  <span
                    className="
                      relative
                      inline-flex
                      h-2
                      w-2
                      rounded-full
                      bg-emerald-500
                    "
                  />
                </span>

              </div>

              {/* Desktop CTA */}
              <div className="hidden lg:block">
                <PrimaryButton
                  href="/contact"
                  className="
                    group
                    relative
                    overflow-hidden
                    rounded-xl
                    px-4
                    py-2.5
                    text-[12px]
                    shadow-[0_3px_10px_rgba(0,0,0,0.05)]
                    transition-all
                    duration-300
                    hover:-translate-y-0.5
                    hover:shadow-[0_5px_14px_rgba(0,0,0,0.08)]
                  "
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Contact Us

                    <span
                      className="
                        flex
                        h-6
                        w-6
                        items-center
                        justify-center
                        rounded-full
                        bg-white/15
                        transition-transform
                        duration-300
                        group-hover:rotate-45
                      "
                    >
                      <ArrowUpRight size={13} />
                    </span>
                  </span>
                </PrimaryButton>
              </div>

              {/* Mobile Menu Button */}
              <button
                type="button"
                onClick={() =>
                  setMobileOpen((open) => !open)
                }
                aria-expanded={mobileOpen}
                aria-label={
                  mobileOpen
                    ? 'Close menu'
                    : 'Open menu'
                }
                className={cn(
                  'relative flex h-10 w-10 items-center justify-center',
                  'rounded-xl border',
                  'bg-white',
                  'shadow-sm',
                  'transition-all duration-300',
                  'lg:hidden',

                  mobileOpen
                    ? [
                      'border-primary/20',
                      'bg-primary/[0.05]',
                      'text-primary',
                    ].join(' ')
                    : [
                      'border-black/[0.08]',
                      'text-ink',
                      'hover:border-primary/25',
                      'hover:bg-primary/[0.035]',
                    ].join(' '),
                )}
              >
                {/* Menu */}
                <span
                  className={cn(
                    'absolute transition-all duration-300',
                    mobileOpen
                      ? 'scale-50 rotate-90 opacity-0'
                      : 'scale-100 rotate-0 opacity-100',
                  )}
                >
                  <Menu
                    size={19}
                    strokeWidth={1.8}
                  />
                </span>

                {/* Close */}
                <span
                  className={cn(
                    'absolute transition-all duration-300',
                    mobileOpen
                      ? 'scale-100 rotate-0 opacity-100'
                      : 'scale-50 -rotate-90 opacity-0',
                  )}
                >
                  <X
                    size={19}
                    strokeWidth={1.8}
                  />
                </span>
              </button>
            </div>

            {/* =================================================
                MEGA MENU — nested directly inside this relative
                bar so it always lines up under the nav, no matter
                what the scrolled/unscrolled margin is doing.
            ================================================== */}

            {activeGroup && (
              <div
                className={cn(
                  'absolute inset-x-0 top-full z-40',
                  scrolled ? 'pt-2' : 'pt-0',
                )}
              >
                <MegaMenu
                  label={activeGroup.label}
                  items={activeGroup.items}
                  open={!!openGroup}
                  rounded={scrolled}
                />
              </div>
            )}
          </div>

          {/* ===================================================
              MOBILE BRAND STRIP
          ==================================================== */}

          <div
            className={cn(
              'flex items-center justify-between',
              'border-x border-b',
              'bg-white',
              'px-4 py-2.5',
              'transition-all duration-300',
              'lg:hidden',

              scrolled
                ? [
                  'rounded-b-2xl',
                  'border-black/[0.07]',
                ].join(' ')
                : 'border-transparent',
            )}
          >
            <div className="flex items-center gap-2">
              <Sparkles
                size={11}
                className="text-primary"
              />

              <span
                className="
                  text-[8px]
                  font-bold
                  uppercase
                  tracking-[0.18em]
                  text-ink/40
                "
              >
                Strategic Consulting
              </span>
            </div>

            <Link
              href="/contact"
              onClick={() =>
                setMobileOpen(false)
              }
              className="
                group
                flex
                items-center
                gap-1
                text-[9px]
                font-bold
                uppercase
                tracking-[0.12em]
                text-primary
              "
            >
              Let's Talk

              <ArrowUpRight
                size={11}
                className="
                  transition-transform
                  duration-300
                  group-hover:translate-x-0.5
                  group-hover:-translate-y-0.5
                "
              />
            </Link>
          </div>
        </div>

      </div>

      {/* =======================================================
          MOBILE MENU
      ======================================================== */}

      <MobileMenu
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
      />
    </header>
  )
}