'use client'

import { useCallback, useEffect, useState } from 'react'
import Image from 'next/image'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import { team } from '@/data/site'
import { Container, SectionLabel, Reveal, RevealStagger } from '@/components/common'
import { TeamCard } from '@/components/cards'

const EASE = [0.22, 1, 0.36, 1] as const

export function TeamGrid({ index = '02' }: { index?: string }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const active = activeIndex !== null ? team[activeIndex] : null

  const close = useCallback(() => setActiveIndex(null), [])

  /* Escape closes the bio, and the page behind it stays put while it is open. */
  useEffect(() => {
    if (activeIndex === null) return

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [activeIndex, close])

  return (
    <section className="bg-paper border-border border-b py-20 sm:py-24">
      <Container>
        <Reveal className="max-w-2xl">
          <SectionLabel index={index}>Our team</SectionLabel>
          <h2 className="text-ink mt-6 font-sans text-[clamp(1.75rem,3.4vw,2.5rem)] leading-[1.08] font-black tracking-[-0.03em] text-balance">
            Experience that moves work forward.
          </h2>
          <p className="text-muted-foreground mt-6 max-w-lg text-[15px] leading-[1.75]">
            Practice leads who have done the work themselves — and who stay involved from strategy through delivery.
          </p>
        </Reveal>

        {/* Five practice leads fit one row at lg, so no card is left stranded. */}
        <RevealStagger className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {team.map((member, i) => (
            <div key={`${member.name}-${i}`} className="h-full">
              <TeamCard
                name={member.name}
                role={member.role}
                bio={member.bio}
                image={member.image}
                onOpen={() => setActiveIndex(i)}
              />
            </div>
          ))}
        </RevealStagger>
      </Container>

      {/* ===============================================
          BIO DIALOG
      =============================================== */}
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-100 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm sm:p-8"
            onClick={close}
            role="dialog"
            aria-modal="true"
            aria-label={`${active.name} — biography`}
          >
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 14, scale: 0.98 }}
              transition={{ duration: 0.25, ease: EASE }}
              onClick={(e) => e.stopPropagation()}
              className="border-primary relative flex max-h-[88vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl border-t-4 bg-white sm:grid sm:grid-cols-[0.8fr_1.2fr]"
            >
              <button
                type="button"
                onClick={close}
                aria-label="Close biography"
                className="text-ink absolute top-4 right-4 z-20 flex h-9 w-9 items-center justify-center rounded-lg bg-white/90 backdrop-blur-sm transition-colors hover:bg-white sm:bg-black/25 sm:text-white sm:hover:bg-black/45"
              >
                <X size={17} />
              </button>

              {/* Portrait */}
              <div className="bg-paper-deep relative h-56 shrink-0 overflow-hidden sm:h-auto">
                {active.image ? (
                  <Image
                    src={active.image}
                    alt={active.name}
                    fill
                    className="object-cover"
                    sizes="(min-width: 640px) 34vw, 100vw"
                  />
                ) : (
                  <div className="bg-navy absolute inset-0 flex items-center justify-center">
                    <span className="border-primary flex h-24 w-24 items-center justify-center rounded-full border-2 text-3xl font-black tracking-tight text-white">
                      {active.name
                        .split(' ')
                        .map((n) => n[0])
                        .join('')}
                    </span>
                  </div>
                )}

                {/* Name overlays the portrait on mobile, where the column stacks */}
                <div
                  aria-hidden
                  className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent sm:hidden"
                />
                <div className="absolute right-5 bottom-5 left-5 sm:hidden">
                  <h3 className="text-xl leading-tight font-black tracking-[-0.02em] text-white">{active.name}</h3>
                  <p className="mt-1.5 text-[10px] font-black tracking-[0.16em] text-white/80 uppercase">
                    {active.role}
                  </p>
                </div>
              </div>

              {/* Bio */}
              <div className="flex min-h-0 flex-1 flex-col overflow-y-auto p-6 sm:p-9">
                <div className="hidden sm:block">
                  <h3 className="text-ink font-sans text-[clamp(1.35rem,2.4vw,1.75rem)] leading-tight font-black tracking-[-0.03em]">
                    {active.name}
                  </h3>
                  <p className="text-primary mt-2 text-[11px] font-black tracking-[0.16em] uppercase">{active.role}</p>
                  <span aria-hidden className="bg-primary mt-5 mb-6 block h-0.5 w-10" />
                </div>

                <div className="text-muted-foreground mt-4 flex flex-col gap-4 text-[14.5px] leading-[1.75] whitespace-pre-line sm:mt-0">
                  {active.bio}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
