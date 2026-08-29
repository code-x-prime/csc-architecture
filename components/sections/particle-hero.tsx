'use client'

import { useEffect, useRef } from 'react'
import { ArrowRight } from 'lucide-react'
import { Eyebrow, PrimaryButton, SecondaryButton } from '@/components/common'

export function ParticleHero({
  eyebrow,
  title,
  description,
  ctaHref = '/contact',
  ctaLabel = 'Start a conversation',
  secondaryHref,
  secondaryLabel,
  tag = 'Consulting Services Corporation',
  tagline = 'Practical thinking for complex work — from strategy through execution.',
}: {
  eyebrow: string
  title: string
  description: string
  ctaHref?: string
  ctaLabel?: string
  secondaryHref?: string
  secondaryLabel?: string
  tag?: string
  tagline?: string
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const setSize = () => {
      if (containerRef.current) {
        canvas.width = containerRef.current.clientWidth
        canvas.height = containerRef.current.clientHeight
      } else {
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
      }
    }
    setSize()

    type Particle = {
      x: number
      y: number
      speed: number
      opacity: number
      fadeDelay: number
      fadeStart: number
      fadingOut: boolean
    }

    let particles: Particle[] = []
    let raf = 0

    const count = () => Math.max(25, Math.floor((canvas.width * canvas.height) / 8000))

    const make = (): Particle => {
      const fadeDelay = Math.random() * 600 + 100
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        speed: Math.random() / 5 + 0.1,
        opacity: 0.7,
        fadeDelay,
        fadeStart: Date.now() + fadeDelay,
        fadingOut: false,
      }
    }

    const reset = (p: Particle) => {
      p.x = Math.random() * canvas.width
      p.y = Math.random() * canvas.height
      p.speed = Math.random() / 5 + 0.1
      p.opacity = 0.7
      p.fadeDelay = Math.random() * 600 + 100
      p.fadeStart = Date.now() + p.fadeDelay
      p.fadingOut = false
    }

    const init = () => {
      particles = []
      for (let i = 0; i < count(); i++) particles.push(make())
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach((p) => {
        p.y -= p.speed
        if (p.y < 0) reset(p)
        if (!p.fadingOut && Date.now() > p.fadeStart) p.fadingOut = true
        if (p.fadingOut) {
          p.opacity -= 0.008
          if (p.opacity <= 0) reset(p)
        }
        ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`
        ctx.fillRect(p.x, p.y, 0.8, Math.random() * 2 + 1)
      })
      raf = requestAnimationFrame(draw)
    }

    const onResize = () => {
      setSize()
      init()
    }

    window.addEventListener('resize', onResize)
    init()
    raf = requestAnimationFrame(draw)

    return () => {
      window.removeEventListener('resize', onResize)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <section
      ref={containerRef}
      className="particle-hero-root relative flex min-h-[70vh] w-full flex-col justify-between overflow-hidden bg-navy text-white md:min-h-[82vh]"
    >
      <style>{`
        .particle-hero-root, .particle-hero-root * {
          box-sizing: border-box;
        }
        .particle-hero-root .accent-lines {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 10;
        }
        .particle-hero-root .hline, .particle-hero-root .vline {
          position: absolute;
          background: rgba(255, 255, 255, 0.12);
          opacity: 0.5;
          will-change: transform, opacity;
        }
        .particle-hero-root .hline {
          height: 1px; left: 0; right: 0;
          transform: scaleX(0);
          transform-origin: 50% 50%;
          animation: csc-drawX 800ms cubic-bezier(.22,.61,.36,1) forwards;
        }
        .particle-hero-root .hline:nth-child(1){ top: 18%; animation-delay: 150ms; }
        .particle-hero-root .hline:nth-child(2){ top: 50%; animation-delay: 280ms; }
        .particle-hero-root .hline:nth-child(3){ top: 82%; animation-delay: 410ms; }
        .particle-hero-root .vline {
          width: 1px; top: 0; bottom: 0;
          transform: scaleY(0);
          transform-origin: 50% 0%;
          animation: csc-drawY 900ms cubic-bezier(.22,.61,.36,1) forwards;
        }
        .particle-hero-root .vline:nth-child(4){ left: 15%; animation-delay: 520ms; }
        .particle-hero-root .vline:nth-child(5){ left: 50%; animation-delay: 640ms; }
        .particle-hero-root .vline:nth-child(6){ left: 85%; animation-delay: 760ms; }
        .particle-hero-root .hline::after, .particle-hero-root .vline::after {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, transparent, rgba(22,135,181,.55), transparent);
          opacity: 0;
          animation: csc-shimmer 900ms ease-out forwards;
        }
        .particle-hero-root .hline:nth-child(1)::after{ animation-delay: 150ms; }
        .particle-hero-root .hline:nth-child(2)::after{ animation-delay: 280ms; }
        .particle-hero-root .hline:nth-child(3)::after{ animation-delay: 410ms; }
        .particle-hero-root .vline:nth-child(4)::after{ animation-delay: 520ms; }
        .particle-hero-root .vline:nth-child(5)::after{ animation-delay: 640ms; }
        .particle-hero-root .vline:nth-child(6)::after{ animation-delay: 760ms; }
        @keyframes csc-drawX {
          0% { transform: scaleX(0); opacity: 0; }
          60% { opacity: .9; }
          100% { transform: scaleX(1); opacity: .5; }
        }
        @keyframes csc-drawY {
          0% { transform: scaleY(0); opacity: 0; }
          60% { opacity: .9; }
          100% { transform: scaleY(1); opacity: .5; }
        }
        @keyframes csc-shimmer {
          0% { opacity: 0; }
          30% { opacity: .3; }
          100% { opacity: 0; }
        }
        .particle-hero-root .particle-canvas {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          mix-blend-mode: screen;
          opacity: .55;
          z-index: 5;
        }
      `}</style>

      {/* Ambient glow, matches the rest of the site's dark sections */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="bg-primary/20 absolute top-1/2 left-1/2 h-[560px] w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[140px]" />
      </div>

      {/* Particles */}
      <canvas ref={canvasRef} className="particle-canvas" />

      {/* Animated grid lines */}
      <div className="accent-lines">
        <div className="hline" />
        <div className="hline" />
        <div className="hline" />
        <div className="vline" />
        <div className="vline" />
        <div className="vline" />
      </div>

      {/* Center content */}
      <main className="relative z-20 mx-auto flex max-w-4xl flex-1 flex-col items-center justify-center px-5 py-24 text-center sm:px-6">
        <Eyebrow light className="justify-center">
          {eyebrow}
        </Eyebrow>

        <h1 className="mt-6 font-sans text-[clamp(2.4rem,6vw,4.75rem)] leading-[0.98] font-extrabold tracking-[-0.03em] text-white">
          {title}
        </h1>

        <p className="mt-6 max-w-2xl text-[15px] leading-relaxed text-white/60 sm:text-lg">{description}</p>

        <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
          <PrimaryButton href={ctaHref}>
            {ctaLabel} <ArrowRight size={16} />
          </PrimaryButton>
          {secondaryHref && secondaryLabel && (
            <SecondaryButton href={secondaryHref} light>
              {secondaryLabel}
            </SecondaryButton>
          )}
        </div>
      </main>

      {/* Bottom strip */}
      <div className="relative z-20 flex w-full flex-col items-center gap-1.5 border-t border-white/10 bg-[#0b1f2a]/70 px-5 py-6 text-center backdrop-blur-md">
        <span className="text-primary text-[11px] font-bold tracking-[0.16em] uppercase">{tag}</span>
        <span className="max-w-2xl text-[13px] font-medium text-white/50">{tagline}</span>
      </div>
    </section>
  )
}
