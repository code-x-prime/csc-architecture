'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Section, Eyebrow, ArrowLink } from '@/components/common'
import { ServiceCard } from '@/components/cards'
import { solutionIcons, solutionImageIcons } from '@/data/site'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export function FeatureGrid({
  eyebrow,
  title,
  items,
  base,
  muted = false,
  ctaLabel = 'Explore the perspective',
}: {
  eyebrow: string
  title: string
  items: { title: string; slug: string; description: string; href?: string }[]
  base?: string
  muted?: boolean
  ctaLabel?: string
}) {
  const resolveHref = (item: { slug: string; href?: string }) => item.href ?? `/${base}/${item.slug}`

  const sectionRef = useRef<HTMLDivElement>(null)
  const leftRef = useRef<HTMLDivElement>(null)
  const stackRef = useRef<HTMLDivElement>(null)

  const cards = items.slice(0, 4)

  useEffect(() => {
    const section = sectionRef.current
    const left = leftRef.current
    const stack = stackRef.current
    if (!section || !left || !stack) return

    const mm = gsap.matchMedia()

    mm.add('(min-width: 1024px)', () => {
      const cardEls = gsap.utils.toArray<HTMLElement>('[data-stack-card]', stack)

      const pin = ScrollTrigger.create({
        trigger: section,
        start: 'top top+=88',
        end: () => `bottom bottom`,
        endTrigger: stack,
        pin: left,
        pinSpacing: false,
      })

      cardEls.forEach((card, i) => {
        if (i === 0) return

        gsap.fromTo(
          card,
          { scale: 0.94, opacity: 0.4 },
          {
            scale: 1,
            opacity: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              end: 'top 24%',
              scrub: true,
            },
          },
        )
      })

      return () => pin.kill()
    })

    return () => mm.revert()
  }, [])

  return (
    <Section muted={muted}>
      <div ref={sectionRef} className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(220px,0.8fr)_1.2fr] lg:items-start lg:gap-16">
        <div ref={leftRef} className="lg:pt-2">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 className="text-ink mt-4 font-sans text-[clamp(1.9rem,3.6vw,3rem)] leading-[1.05] font-bold tracking-tight">{title}</h2>
          <div className="mt-6">
            <ArrowLink href={resolveHref(cards[0])}>{ctaLabel}</ArrowLink>
          </div>
        </div>

        <div ref={stackRef} className="flex flex-col gap-4 sm:gap-6 lg:gap-24">
          {cards.map((item, i) => (
            <div
              key={item.slug}
              data-stack-card
              className="lg:sticky"
              style={{ top: `calc(6rem + ${i * 14}px)` }}
            >
              <ServiceCard
                href={resolveHref(item)}
                title={item.title}
                description={item.description}
                index={i}
                icon={base === 'solutions' ? solutionIcons[item.slug] : undefined}
                imageIcon={base === 'solutions' ? solutionImageIcons[item.slug] : undefined}
                featured={i === 0}
              />
            </div>
          ))}
        </div>
      </div>
    </Section>
  )
}
