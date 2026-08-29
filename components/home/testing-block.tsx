'use client'

import { useEffect, useRef, useState, type MouseEvent } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { solutions, heroImages } from '@/data/site'
import { Section, Eyebrow, ArrowLink } from '@/components/common'
import { cn } from '@/lib/utils'

export function TestingBlock() {
  const testing = solutions.filter((s) => ['functional-test', 'performance-test-automation', 'regression-test-automation'].includes(s.slug))

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [smoothPosition, setSmoothPosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)
  const listRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<number | null>(null)

  useEffect(() => {
    const lerp = (start: number, end: number, factor: number) => start + (end - start) * factor

    const animate = () => {
      setSmoothPosition((prev) => ({
        x: lerp(prev.x, mousePosition.x, 0.15),
        y: lerp(prev.y, mousePosition.y, 0.15),
      }))
      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
    }
  }, [mousePosition])

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (listRef.current) {
      const rect = listRef.current.getBoundingClientRect()
      setMousePosition({ x: e.clientX - rect.left, y: e.clientY - rect.top })
    }
  }

  return (
    <Section muted>
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(220px,0.8fr)_1.2fr] lg:gap-16">
        <div>
          <Eyebrow>Automated Software Testing</Eyebrow>
          <h2 className="text-ink mt-4 font-sans text-[clamp(1.9rem,3.6vw,3rem)] leading-[1.05] font-bold tracking-tight">
            Confidence in software quality, built to scale.
          </h2>
          <p className="text-muted-foreground mt-5 max-w-md text-lg leading-relaxed">
            Our automated testing practice covers the full delivery lifecycle — from functional coverage to performance and regression
            protection.
          </p>
          <div className="mt-6">
            <ArrowLink href="/solutions/automated-software-testing">Explore automated testing</ArrowLink>
          </div>
        </div>

        {/* Hover-preview list — desktop only */}
        <div
          ref={listRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setIsVisible(false)}
          className="relative hidden lg:block"
        >
          {/* Floating image preview */}
          <div
            className="pointer-events-none absolute z-20 overflow-hidden rounded-xl shadow-2xl"
            style={{
              transform: `translate3d(${smoothPosition.x + 24}px, ${smoothPosition.y - 110}px, 0)`,
              opacity: isVisible ? 1 : 0,
              scale: isVisible ? 1 : 0.92,
              transition: 'opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1), scale 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          >
            <div className="bg-muted relative h-[170px] w-[260px] overflow-hidden rounded-xl">
              {testing.map((item, index) => (
                <img
                  key={item.slug}
                  src={heroImages[`solutions/${item.slug}`]}
                  alt={item.title}
                  className="absolute inset-0 size-full object-cover transition-all duration-500 ease-out"
                  style={{
                    opacity: hoveredIndex === index ? 1 : 0,
                    scale: hoveredIndex === index ? 1 : 1.08,
                    filter: hoveredIndex === index ? 'none' : 'blur(8px)',
                  }}
                />
              ))}
              <div className="from-navy/25 absolute inset-0 bg-gradient-to-t to-transparent" />
            </div>
          </div>

          <div>
            {testing.map((item, index) => (
              <a
                key={item.slug}
                href={`/solutions/${item.slug}`}
                className="group relative block"
                onMouseEnter={() => {
                  setHoveredIndex(index)
                  setIsVisible(true)
                }}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div className="border-border relative border-t py-6 first:border-t-0">
                  <div
                    className={cn(
                      'bg-white/70 absolute inset-0 -mx-4 scale-95 rounded-lg px-4 opacity-0 transition-all duration-300 ease-out',
                      hoveredIndex === index && 'scale-100 opacity-100',
                    )}
                  />
                  <div className="relative flex items-start justify-between gap-4">
                    <div className="min-w-0 flex-1">
                      <div className="inline-flex items-center gap-2">
                        <h3 className="text-ink text-xl font-bold tracking-tight">
                          <span className="relative">
                            {item.title}
                            <span
                              className={cn(
                                'bg-ink absolute -bottom-0.5 left-0 h-px w-0 transition-all duration-300 ease-out',
                                hoveredIndex === index && 'w-full',
                              )}
                            />
                          </span>
                        </h3>
                        <ArrowUpRight
                          size={16}
                          className={cn(
                            'text-muted-foreground -translate-x-2 translate-y-2 opacity-0 transition-all duration-300 ease-out',
                            hoveredIndex === index && 'translate-x-0 translate-y-0 opacity-100',
                          )}
                        />
                      </div>
                      <p className="text-muted-foreground mt-1 text-sm leading-relaxed">{item.description}</p>
                    </div>
                    <span className="text-primary shrink-0 font-mono text-xs font-bold tabular-nums">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>
                </div>
              </a>
            ))}
            <div className="border-border border-t" />
          </div>
        </div>

        {/* Static card grid — mobile / tablet */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:hidden">
          {testing.map((item, index) => (
            <a
              key={item.slug}
              href={`/solutions/${item.slug}`}
              className="group border-border bg-card block overflow-hidden rounded-xl border"
            >
              <div className="bg-muted aspect-[16/10] overflow-hidden">
                <img
                  src={heroImages[`solutions/${item.slug}`]}
                  alt={item.title}
                  className="size-full object-cover transition-transform duration-500 group-active:scale-105"
                />
              </div>
              <div className="p-4">
                <span className="text-primary font-mono text-xs font-bold tabular-nums">{String(index + 1).padStart(2, '0')}</span>
                <h3 className="text-ink mt-1 text-base font-bold tracking-tight">{item.title}</h3>
                <p className="text-muted-foreground mt-1 text-sm leading-relaxed">{item.description}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </Section>
  )
}
