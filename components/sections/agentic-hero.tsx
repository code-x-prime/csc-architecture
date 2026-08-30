'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Sparkles, FileText } from 'lucide-react'
import { Container, Eyebrow, PrimaryButton, SecondaryButton } from '@/components/common'

/* ── Node network background — agents talking to systems ── */
function AgentNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let raf = 0
    let width = 0
    let height = 0

    type Node = { x: number; y: number; vx: number; vy: number; r: number }
    let nodes: Node[] = []

    const setSize = () => {
      width = canvas.clientWidth
      height = canvas.clientHeight
      canvas.width = width * devicePixelRatio
      canvas.height = height * devicePixelRatio
      ctx.scale(devicePixelRatio, devicePixelRatio)
    }

    const init = () => {
      setSize()
      const count = Math.max(18, Math.floor((width * height) / 45000))
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        r: Math.random() * 1.6 + 1,
      }))
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height)
      nodes.forEach((n) => {
        n.x += n.vx
        n.y += n.vy
        if (n.x < 0 || n.x > width) n.vx *= -1
        if (n.y < 0 || n.y > height) n.vy *= -1
      })

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i]
          const b = nodes[j]
          const dist = Math.hypot(a.x - b.x, a.y - b.y)
          if (dist < 150) {
            ctx.strokeStyle = `rgba(22,135,181,${0.16 * (1 - dist / 150)})`
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
          }
        }
      }

      nodes.forEach((n) => {
        ctx.fillStyle = 'rgba(79,195,232,0.85)'
        ctx.beginPath()
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2)
        ctx.fill()
      })

      raf = requestAnimationFrame(draw)
    }

    init()
    raf = requestAnimationFrame(draw)
    window.addEventListener('resize', init)
    return () => {
      window.removeEventListener('resize', init)
      cancelAnimationFrame(raf)
    }
  }, [])

  return <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 h-full w-full opacity-70" />
}

const chips = ['Supply chain', 'HR & workforce', 'Procurement', 'IT operations', 'Fraud detection', 'Predictive maintenance']

export function AgenticHero({ onRequestWhitePaper }: { onRequestWhitePaper?: () => void } = {}) {
  const [activeChip, setActiveChip] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setActiveChip((i) => (i + 1) % chips.length), 1800)
    return () => clearInterval(id)
  }, [])

  return (
    <section className="bg-navy relative overflow-hidden">
      <AgentNetwork />
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="bg-primary/25 absolute top-1/3 left-1/4 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[140px]" />
        <div className="absolute right-0 bottom-0 h-[380px] w-[380px] translate-x-1/4 translate-y-1/4 rounded-full bg-[#4fc3e8]/15 blur-[130px]" />
      </div>
      <div aria-hidden className="from-navy/80 absolute inset-0 bg-gradient-to-b via-transparent to-transparent" />

      <Container className="relative z-10 flex min-h-[78vh] flex-col justify-center py-28 sm:py-32">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="border-primary/30 bg-primary/10 mb-7 inline-flex items-center gap-2.5 rounded-full border px-4 py-2 backdrop-blur-sm">
            <Sparkles size={13} className="text-primary" />
            <span className="text-[10.5px] font-bold tracking-[0.2em] text-white uppercase">Agentic AI Operations</span>
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-4xl font-sans text-[clamp(2.6rem,6vw,4.6rem)] leading-[1.02] font-extrabold tracking-tight text-white"
        >
          Your ERP isn&apos;t going anywhere.{' '}
          <span className="text-primary">Neither should your budget for a rip-and-replace.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.16 }}
          className="mt-7 max-w-2xl text-lg leading-relaxed text-white/65"
        >
          Agentic AI Operations layers autonomous digital agents over the ERP and enterprise systems you already run —
          reasoning, deciding, and acting across processes without a disruptive migration, upgrade, or replatforming project.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.26 }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <PrimaryButton href="/contact">
            Talk to our team <ArrowRight size={16} />
          </PrimaryButton>
          <SecondaryButton href="#how-it-works" light>
            See how it works
          </SecondaryButton>
        </motion.div>

        {/* Live use-case ticker */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-14 flex flex-wrap items-center gap-2.5"
        >
          <span className="mr-1 text-[10.5px] font-bold tracking-[0.14em] text-white/35 uppercase">Agents already at work in</span>
          {chips.map((chip, i) => (
            <span
              key={chip}
              className={`rounded-full border px-3.5 py-1.5 text-[11.5px] font-semibold transition-all duration-500 ${
                i === activeChip ? 'border-primary bg-primary text-white' : 'border-white/12 text-white/45'
              }`}
            >
              {chip}
            </span>
          ))}
        </motion.div>
      </Container>

      <button
        type="button"
        onClick={onRequestWhitePaper}
        className="group relative z-10 mb-10 flex items-center gap-2 self-start pl-6 text-[13px] font-semibold text-white/50 transition-colors hover:text-white sm:pl-10"
      >
        <FileText size={14} />
        Read the white paper
        <ArrowRight size={13} className="transition-transform duration-300 group-hover:translate-x-1" />
      </button>
    </section>
  )
}
