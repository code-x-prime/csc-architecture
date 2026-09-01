'use client'

import { useState } from 'react'
import Image from 'next/image'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import { team } from '@/data/site'
import { Section, Eyebrow } from '@/components/common'
import { TeamCard } from '@/components/cards'

const ACCENTS = ['#1687b5', '#0b1f2a', '#c89b3c', '#1687b5', '#5a3fc0']

export function TeamGrid() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const active = activeIndex !== null ? team[activeIndex] : null
  const accent = activeIndex !== null ? ACCENTS[activeIndex % ACCENTS.length] : ACCENTS[0]

  return (
    <Section>
      <Eyebrow>Our team</Eyebrow>
      <h2 className="text-ink mt-4 max-w-2xl font-sans text-[clamp(1.9rem,3.6vw,2.8rem)] leading-[1.05] font-bold tracking-tight">
        Experience that moves work forward.
      </h2>
      <div className="mt-12 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
        {team.map((member, i) => (
          <TeamCard
            key={`${member.name}-${i}`}
            name={member.name}
            role={member.role}
            bio={member.bio}
            image={member.image}
            index={i}
            onOpen={() => setActiveIndex(i)}
          />
        ))}
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-100 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm sm:p-8"
            onClick={() => setActiveIndex(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.97 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative flex h-[85vh] max-h-[85vh] w-full max-w-3xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl sm:h-[88vh] sm:max-h-[88vh] sm:grid sm:grid-cols-[0.85fr_1.15fr]"
              style={{ borderTop: `4px solid ${accent}` }}
            >
              <button
                type="button"
                onClick={() => setActiveIndex(null)}
                aria-label="Close"
                className="text-ink absolute top-4 right-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 shadow-md transition-colors hover:bg-white sm:text-white sm:bg-black/20 sm:hover:bg-black/40"
              >
                <X size={18} />
              </button>

              <div
                className="relative h-56 shrink-0 overflow-hidden sm:h-full"
                style={active.image ? { background: `linear-gradient(160deg, ${accent}1a 0%, #0b1f2a 100%)` } : undefined}
              >
                {active.image ? (
                  <Image src={active.image} alt={active.name} fill className="object-contain object-bottom" sizes="(min-width: 640px) 35vw, 100vw" />
                ) : (
                  <div className="bg-navy absolute inset-0 flex items-center justify-center">
                    <span
                      className="flex h-24 w-24 items-center justify-center rounded-full border-2 text-3xl font-bold tracking-tight text-white"
                      style={{ borderColor: accent }}
                    >
                      {active.name
                        .split(' ')
                        .map((n) => n[0])
                        .join('')}
                    </span>
                  </div>
                )}
                <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent sm:hidden" />
                <div className="absolute right-4 bottom-4 left-4 sm:hidden">
                  <h3 className="text-xl font-bold text-white">{active.name}</h3>
                  <p className="mt-1 text-[11px] font-semibold tracking-[0.08em] text-white/80 uppercase">{active.role}</p>
                </div>
              </div>

              <div className="flex min-h-0 flex-1 flex-col overflow-y-auto p-6 sm:p-9">
                <div className="hidden sm:block">
                  <h3 className="text-ink font-sans text-2xl leading-tight font-bold tracking-tight">{active.name}</h3>
                  <p className="mt-1.5 text-[11.5px] font-bold tracking-widest uppercase" style={{ color: accent }}>
                    {active.role}
                  </p>
                  <span className="mt-4 mb-5 block h-0.5 w-10" style={{ background: accent }} />
                </div>
                <div className="text-muted-foreground flex flex-col gap-4 text-[14.5px] leading-relaxed whitespace-pre-line sm:mt-0 mt-4">
                  {active.bio}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  )
}
