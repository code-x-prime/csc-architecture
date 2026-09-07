'use client'

import { useEffect, useRef, type ElementType, type ReactNode } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { cn } from '@/lib/utils'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const EASE = 'power3.out'

/**
 * True when the visitor has asked for reduced motion. Every helper here bails
 * out to a plain, immediately-visible render in that case rather than shipping
 * a shortened animation.
 */
function prefersReducedMotion() {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/* =========================================================
   REVEAL — fade + rise as the element scrolls into view
========================================================= */

export function Reveal({
  children,
  as: Tag = 'div',
  delay = 0,
  y = 28,
  className,
}: {
  children: ReactNode
  as?: ElementType
  delay?: number
  y?: number
  className?: string
}) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (prefersReducedMotion()) {
      gsap.set(el, { opacity: 1, y: 0 })
      return
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { opacity: 0, y },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          delay,
          ease: EASE,
          scrollTrigger: { trigger: el, start: 'top 88%', once: true },
        },
      )
    }, el)

    return () => ctx.revert()
  }, [delay, y])

  return (
    <Tag ref={ref} className={className} style={{ opacity: 0 }}>
      {children}
    </Tag>
  )
}

/* =========================================================
   STAGGER — reveals direct children one after another
========================================================= */

export function RevealStagger({
  children,
  as: Tag = 'div',
  stagger = 0.09,
  y = 26,
  className,
}: {
  children: ReactNode
  as?: ElementType
  stagger?: number
  y?: number
  className?: string
}) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const targets = Array.from(el.children) as HTMLElement[]
    if (targets.length === 0) return

    if (prefersReducedMotion()) {
      gsap.set(targets, { opacity: 1, y: 0 })
      return
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        targets,
        { opacity: 0, y },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger,
          ease: EASE,
          scrollTrigger: { trigger: el, start: 'top 85%', once: true },
        },
      )
    }, el)

    return () => ctx.revert()
  }, [stagger, y])

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  )
}

/* =========================================================
   SPLIT TEXT — reveals a heading word by word
========================================================= */

export function RevealText({
  text,
  as: Tag = 'h2',
  highlight,
  delay = 0,
  className,
  highlightClassName = 'text-primary',
}: {
  text: string
  as?: ElementType
  highlight?: string
  delay?: number
  className?: string
  highlightClassName?: string
}) {
  const ref = useRef<HTMLElement>(null)

  const highlightWords = highlight ? highlight.split(' ') : []
  const words = text.split(' ')
  // Locate the highlight run so the matching words can be tinted in place.
  const highlightStart = highlight ? words.findIndex((_, i) => words.slice(i, i + highlightWords.length).join(' ') === highlight) : -1

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const targets = el.querySelectorAll<HTMLElement>('[data-word]')
    if (targets.length === 0) return

    if (prefersReducedMotion()) {
      gsap.set(targets, { opacity: 1, y: 0 })
      return
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        targets,
        { opacity: 0, y: '0.5em' },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          delay,
          stagger: 0.045,
          ease: EASE,
          scrollTrigger: { trigger: el, start: 'top 87%', once: true },
        },
      )
    }, el)

    return () => ctx.revert()
  }, [delay, text])

  return (
    <Tag ref={ref} className={className}>
      {words.map((word, i) => {
        const isHighlighted =
          highlightStart !== -1 && i >= highlightStart && i < highlightStart + highlightWords.length

        return (
          <span key={`${word}-${i}`} className="inline-block overflow-hidden align-bottom">
            <span
              data-word
              className={cn('inline-block', isHighlighted && highlightClassName)}
              style={{ opacity: 0 }}
            >
              {word}
            </span>
            {i < words.length - 1 && <span className="inline-block">&nbsp;</span>}
          </span>
        )
      })}
    </Tag>
  )
}

/* =========================================================
   PARALLAX — gentle scroll-linked drift for imagery
========================================================= */

export function Parallax({
  children,
  amount = 40,
  className,
}: {
  children: ReactNode
  amount?: number
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el || prefersReducedMotion()) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { y: -amount },
        {
          y: amount,
          ease: 'none',
          scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true },
        },
      )
    }, el)

    return () => ctx.revert()
  }, [amount])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
