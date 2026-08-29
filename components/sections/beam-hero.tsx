'use client'

import { useEffect, useState, type CSSProperties } from 'react'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  FlaskConical,
  HeartPulse,
  Cpu,
  Briefcase,
  Landmark,
  ShieldCheck,
  ShoppingBag,
  Fuel,
  Package,
  Radio,
  Factory,
  type LucideIcon,
} from 'lucide-react'
import Link from 'next/link'
import { industries } from '@/data/site'

const industryIcons: Record<string, LucideIcon> = {
  'biotech-pharma': FlaskConical,
  'health-care': HeartPulse,
  technology: Cpu,
  'professional-services': Briefcase,
  banking: Landmark,
  insurance: ShieldCheck,
  retail: ShoppingBag,
  'oil-and-gas': Fuel,
  'consumer-products': Package,
  telecommunication: Radio,
  manufacturing: Factory,
}

/* ── Animated beam background, CSC blue ── */
function BeamBackground() {
  const [beams, setBeams] = useState<
    Array<{
      id: number
      type: 'primary' | 'secondary'
      style: CSSProperties
    }>
  >([])

  useEffect(() => {
    const generated = Array.from({ length: 50 }).map((_, i) => {
      const dur = Math.random() * 3 + 5
      return {
        id: i,
        type: (Math.random() < 0.15 ? 'secondary' : 'primary') as 'primary' | 'secondary',
        style: {
          left: `${Math.random() * 100}%`,
          width: `${Math.floor(Math.random() * 2) + 1}px`,
          animationDelay: `${Math.random() * 6}s`,
          animationDuration: `${dur}s, ${dur}s`,
        } as CSSProperties,
      }
    })
    setBeams(generated)
  }, [])

  return (
    <>
      <style>{`
        .beam-scene {
          position: absolute;
          inset: 0;
          background: #0b1f2a;
          overflow: hidden;
        }
        .beam-grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(22,135,181,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(22,135,181,0.1) 1px, transparent 1px);
          background-size: 52px 52px;
          animation: beamMoveGrid 8s linear infinite;
        }
        .beam-floor {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 70%;
          height: 60%;
          background: radial-gradient(ellipse at 20% 100%, rgba(22,135,181,0.2) 0%, rgba(11,31,42,0) 65%);
          animation: beamFloorGlow 5s ease-in-out infinite alternate;
        }
        .beam-container {
          position: absolute;
          inset: 0;
          left: 0;
          width: 55%;
          pointer-events: none;
        }
        .beam {
          position: absolute;
          bottom: 0;
          height: 60%;
          border-radius: 2px;
          animation: beamRise var(--rise-dur, 7s) linear infinite,
                     beamFade var(--fade-dur, 7s) linear infinite;
        }
        .beam.primary {
          background: linear-gradient(to top, rgba(22,135,181,0.9), rgba(22,135,181,0.4) 60%, transparent);
          box-shadow: 0 0 8px rgba(22,135,181,0.6);
        }
        .beam.secondary {
          background: linear-gradient(to top, rgba(255,255,255,0.6), rgba(120,200,230,0.35) 50%, transparent);
          box-shadow: 0 0 12px rgba(80,190,230,0.4);
        }
        @keyframes beamRise {
          0%   { transform: translateY(0%); opacity: 0; }
          10%  { opacity: 1; }
          100% { transform: translateY(-180%); opacity: 0; }
        }
        @keyframes beamFade {
          0%, 100% { opacity: 0; }
          5%, 85%  { opacity: 0.9; }
        }
        @keyframes beamFloorGlow {
          0%   { transform: scale(0.95); opacity: 0.7; }
          100% { transform: scale(1.05); opacity: 1; }
        }
        @keyframes beamMoveGrid {
          from { background-position: 0 0; }
          to   { background-position: -52px -52px; }
        }
        @keyframes orbitSpin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes orbitSpinReverse {
          from { transform: rotate(360deg); }
          to   { transform: rotate(0deg); }
        }
      `}</style>

      <div className="beam-scene">
        <div className="beam-grid" />
        <div className="beam-floor" />
        <div className="beam-container">
          {beams.map((b) => (
            <div key={b.id} className={`beam ${b.type}`} style={b.style} />
          ))}
        </div>
      </div>
    </>
  )
}

/* ── Orbiting industry constellation ── */
function IndustryOrbit({ activeSlug }: { activeSlug?: string }) {
  const radius1 = 108
  const radius2 = 172
  const inner = industries.slice(0, 5)
  const outer = industries.slice(5, 11)

  return (
    <div className="relative hidden h-[380px] w-[380px] shrink-0 items-center justify-center lg:flex xl:h-[440px] xl:w-[440px]">
      {/* Orbit rings */}
      <div className="absolute rounded-full border border-white/10" style={{ width: radius1 * 2, height: radius1 * 2 }} />
      <div className="absolute rounded-full border border-white/[0.07]" style={{ width: radius2 * 2, height: radius2 * 2 }} />

      {/* Center mark */}
      <motion.div
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 flex h-20 w-20 items-center justify-center rounded-2xl"
        style={{
          background: 'linear-gradient(155deg, #2196c2 0%, #1687b5 55%, #0b1f2a 100%)',
          boxShadow: '0 0 60px rgba(22,135,181,0.5), 0 20px 40px rgba(0,0,0,0.4)',
        }}
      >
        <span className="text-lg font-black tracking-tight text-white">CSC</span>
      </motion.div>

      {/* Inner ring of icons — spins slowly */}
      <div className="absolute inset-0" style={{ animation: 'orbitSpin 60s linear infinite' }}>
        {inner.map((industry, i) => {
          const angle = (i / inner.length) * 2 * Math.PI - Math.PI / 2
          const x = Math.cos(angle) * radius1
          const y = Math.sin(angle) * radius1
          const Icon = industryIcons[industry.slug]
          const active = industry.slug === activeSlug
          return (
            <div
              key={industry.slug}
              className="absolute top-1/2 left-1/2"
              style={{ transform: `translate(${x}px, ${y}px) translate(-50%, -50%)` }}
            >
              <div style={{ animation: 'orbitSpinReverse 60s linear infinite' }}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.06 }}
                  className="flex h-11 w-11 items-center justify-center rounded-full"
                  style={
                    active
                      ? { background: '#1687b5', boxShadow: '0 0 24px rgba(22,135,181,0.7)' }
                      : { background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)' }
                  }
                >
                  {Icon && <Icon size={17} className={active ? 'text-white' : 'text-white/55'} strokeWidth={1.75} />}
                </motion.div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Outer ring of icons — spins the other way, slower */}
      <div className="absolute inset-0" style={{ animation: 'orbitSpinReverse 90s linear infinite' }}>
        {outer.map((industry, i) => {
          const angle = (i / outer.length) * 2 * Math.PI - Math.PI / 2
          const x = Math.cos(angle) * radius2
          const y = Math.sin(angle) * radius2
          const Icon = industryIcons[industry.slug]
          const active = industry.slug === activeSlug
          return (
            <div
              key={industry.slug}
              className="absolute top-1/2 left-1/2"
              style={{ transform: `translate(${x}px, ${y}px) translate(-50%, -50%)` }}
            >
              <div style={{ animation: 'orbitSpin 90s linear infinite' }}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.5 + i * 0.06 }}
                  className="flex h-10 w-10 items-center justify-center rounded-full"
                  style={
                    active
                      ? { background: '#1687b5', boxShadow: '0 0 24px rgba(22,135,181,0.7)' }
                      : { background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)' }
                  }
                >
                  {Icon && <Icon size={15} className={active ? 'text-white' : 'text-white/40'} strokeWidth={1.75} />}
                </motion.div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

/* ── BeamHero ── */
export function BeamHero({
  badge = 'Who We Help',
  title,
  titleAccent,
  description,
  ctaHref = '/contact',
  ctaLabel = 'Start a conversation',
  secondaryHref,
  secondaryLabel,
  activeSlug,
}: {
  badge?: string
  title: string
  titleAccent?: string
  description: string
  ctaHref?: string
  ctaLabel?: string
  secondaryHref?: string
  secondaryLabel?: string
  activeSlug?: string
}) {
  return (
    <section className="relative w-full overflow-hidden" style={{ minHeight: '80vh' }}>
      <BeamBackground />

      {/* Top accent line */}
      <div
        className="absolute top-0 right-0 left-0 z-10 h-[2px]"
        style={{ background: 'linear-gradient(90deg, transparent, #1687b5 30%, #1687b5 70%, transparent)' }}
      />
      <div className="pointer-events-none absolute inset-0 z-10 ring-1 ring-white/5" />

      <div className="relative z-20 mx-auto flex min-h-[80vh] w-full max-w-7xl flex-col items-center gap-12 px-6 py-24 lg:flex-row lg:items-center lg:justify-between lg:gap-8 lg:px-10">
        {/* LEFT — copy */}
        <div className="w-full max-w-xl text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6 inline-flex items-center gap-3 rounded-full px-3 py-2"
            style={{ background: 'rgba(22,135,181,0.14)', border: '1px solid rgba(22,135,181,0.35)', backdropFilter: 'blur(8px)' }}
          >
            <span
              className="inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-extrabold tracking-[0.12em] uppercase"
              style={{ background: '#1687b5', color: '#fff' }}
            >
              {badge}
            </span>
            <span className="pr-1 text-[13px] font-medium text-white/75">Consulting Services Corporation</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="mb-6 font-sans leading-[1.02] font-black tracking-[-0.04em] text-white"
            style={{
              fontSize: 'clamp(2.6rem, 5.2vw, 4rem)',
              textShadow: '0 0 40px rgba(22,135,181,0.3), 0 2px 20px rgba(0,0,0,0.8)',
            }}
          >
            {title}
            {titleAccent && <span style={{ color: '#4fc3e8', textShadow: '0 0 32px rgba(22,135,181,0.6)' }}> {titleAccent}</span>}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.22 }}
            className="mx-auto mb-10 max-w-xl font-sans text-[15px] leading-[1.75] font-light lg:mx-0"
            style={{ color: 'rgba(255,255,255,0.65)' }}
          >
            {description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.32 }}
            className="flex flex-col items-center justify-center gap-3 sm:flex-row lg:justify-start"
          >
            <Link href={ctaHref} className="w-full no-underline sm:w-auto">
              <motion.span
                whileHover={{ y: -2, boxShadow: '0 14px 36px rgba(22,135,181,0.5)' }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex w-full items-center justify-center gap-2.5 rounded-xl border-none px-5 py-2.5 text-[15px] font-bold text-white transition-colors duration-200 sm:w-auto"
                style={{ background: '#1687b5', boxShadow: '0 6px 24px rgba(22,135,181,0.4)' }}
              >
                {ctaLabel}
                <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
              </motion.span>
            </Link>

            {secondaryHref && secondaryLabel && (
              <Link href={secondaryHref} className="w-full no-underline sm:w-auto">
                <motion.span
                  whileHover={{ y: -2, borderColor: 'rgba(22,135,181,0.6)', color: '#fff' }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl border-none px-5 py-2.5 text-[15px] font-bold text-white/80 transition-all duration-200 sm:w-auto"
                  style={{ background: 'rgba(255,255,255,0.06)', border: '1.5px solid rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)' }}
                >
                  {secondaryLabel}
                </motion.span>
              </Link>
            )}
          </motion.div>
        </div>

        {/* RIGHT — orbiting industry constellation */}
        <IndustryOrbit activeSlug={activeSlug} />
      </div>

      <div
        className="pointer-events-none absolute right-0 bottom-0 left-0 z-10 h-24"
        style={{ background: 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.05))' }}
      />
    </section>
  )
}
