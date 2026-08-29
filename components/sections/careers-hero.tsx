'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Users, Briefcase, TrendingUp, ShieldCheck, Award, ArrowDown, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: 'easeOut' as const },
})

const stats = [
  { value: '20+', label: 'Years in Practice', icon: Briefcase },
  { value: '10+', label: 'Industries Served', icon: Users },
  { value: '50+', label: 'Engagements Delivered', icon: TrendingUp },
]

function HeroButton({
  href,
  children,
  variant = 'primary',
}: {
  href: string
  children: React.ReactNode
  variant?: 'primary' | 'outline'
}) {
  return (
    <Link
      href={href}
      style={variant === 'primary' ? { background: 'linear-gradient(155deg, #2196c2 0%, #1687b5 55%, #0b1f2a 100%)' } : undefined}
      className={cn(
        'group relative inline-flex items-center justify-center gap-3 overflow-hidden px-9 py-[1.05rem] text-[0.82rem] font-black tracking-[0.1em] uppercase transition-all duration-300 select-none',
        variant === 'primary'
          ? 'text-white shadow-[0_4px_18px_rgba(11,44,95,0.32),inset_0_1px_0_rgba(255,255,255,0.1)] hover:-translate-y-[3px] hover:shadow-[0_12px_32px_rgba(11,44,95,0.48),inset_0_1px_0_rgba(255,255,255,0.14)]'
          : 'border-ink text-ink before:bg-ink border-2 bg-transparent before:absolute before:inset-0 before:origin-left before:scale-x-0 before:transition-transform before:duration-350 hover:-translate-y-[3px] hover:text-white hover:shadow-[0_8px_24px_rgba(11,44,95,0.2)] hover:before:scale-x-100 [&>span]:relative [&>span]:z-10',
      )}
    >
      {variant === 'primary' && (
        <span
          className="pointer-events-none absolute inset-0 -translate-x-full transition-transform duration-700 ease-out group-hover:translate-x-full"
          style={{ background: 'linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.22) 50%, transparent 70%)' }}
        />
      )}
      <span className="relative z-10 flex items-center gap-3">
        {children}
        <ArrowRight className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover:translate-x-1.5" />
      </span>
    </Link>
  )
}

export function CareersHero({
  eyebrow = 'Careers at CSC',
  title,
  titleAccent,
  titleEnd,
  description,
  image,
  imageAlt,
  ctaHref = '/contact',
  ctaLabel = 'Talk to our team',
  secondaryHref = '/careers/find-a-job',
  secondaryLabel = 'Open Roles',
}: {
  eyebrow?: string
  title: string
  titleAccent?: string
  titleEnd?: string
  description: string
  image: string
  imageAlt?: string
  ctaHref?: string
  ctaLabel?: string
  secondaryHref?: string
  secondaryLabel?: string
}) {
  return (
    <section className="relative flex min-h-screen flex-col overflow-hidden bg-white">
      {/* Navy right panel */}
      <div
        className="bg-navy pointer-events-none absolute top-0 right-0 bottom-0 hidden w-[52%] lg:block"
        style={{ clipPath: 'polygon(12% 0, 100% 0, 100% 100%, 0% 100%)' }}
      />
      <div
        className="pointer-events-none absolute top-0 right-0 bottom-0 hidden w-[52%] opacity-[0.04] lg:block"
        style={{
          clipPath: 'polygon(12% 0, 100% 0, 100% 100%, 0% 100%)',
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.9) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      {/* Accent divider line */}
      <div
        className="pointer-events-none absolute top-0 bottom-0 hidden lg:block"
        style={{
          left: '48.4%',
          width: '3px',
          zIndex: 1,
          background: 'linear-gradient(to bottom, transparent 5%, #1687b5 20%, #1687b5 80%, transparent 95%)',
          transform: 'skewX(-4.5deg)',
          opacity: 0.5,
        }}
      />

      {/* Top-left glow */}
      <div
        className="pointer-events-none absolute top-0 left-0 h-[500px] w-[500px]"
        style={{ background: 'radial-gradient(ellipse at top left, rgba(22,135,181,0.07), transparent 65%)' }}
      />

      {/* Mobile top bar */}
      <div className="bg-primary absolute top-0 right-0 left-0 h-[3px] lg:hidden" />

      {/* MAIN CONTENT */}
      <div className="relative z-10 flex flex-1 items-center">
        <div className="w-full px-5 pt-24 pb-8 sm:px-8 md:px-12 md:pt-40 md:pb-12 xl:px-20">
          <div className="grid min-h-[calc(100vh-10rem)] items-center gap-12 lg:grid-cols-[50%_50%] xl:gap-16">
            {/* LEFT — COPY */}
            <div className="flex flex-col justify-center">
              <motion.div {...fadeUp(0)} className="mb-7">
                <div className="border-primary/30 bg-primary/5 inline-flex items-center gap-3 border px-4 py-2.5">
                  <span className="relative flex h-2 w-2 shrink-0">
                    <span className="bg-primary absolute inline-flex h-full w-full animate-ping opacity-60" />
                    <span className="bg-primary relative inline-flex h-2 w-2" />
                  </span>
                  <span className="text-ink text-[10px] font-black tracking-[0.22em] uppercase">{eyebrow}</span>
                </div>
              </motion.div>

              <motion.h1
                {...fadeUp(0.08)}
                className="text-ink mb-6 font-sans leading-[1.02] font-bold tracking-tight"
                style={{ fontSize: 'clamp(2.9rem, 6.5vw, 5.2rem)' }}
              >
                {title}
                {titleAccent && (
                  <>
                    <br />
                    <span
                      className="inline-block bg-clip-text text-transparent"
                      style={{ backgroundImage: 'linear-gradient(105deg, #10212b 0%, #1687b5 48%, #10212b 100%)' }}
                    >
                      {titleAccent}
                    </span>
                  </>
                )}
                {titleEnd && (
                  <>
                    <br />
                    {titleEnd}
                  </>
                )}
              </motion.h1>

              <motion.p {...fadeUp(0.16)} className="text-ink/50 mb-10 max-w-lg text-base leading-relaxed md:text-[1.05rem]">
                {description}
              </motion.p>

              <motion.div {...fadeUp(0.24)} className="mb-10 flex flex-col gap-3 sm:flex-row">
                <HeroButton href={ctaHref} variant="primary">
                  {ctaLabel}
                </HeroButton>
                <HeroButton href={secondaryHref} variant="outline">
                  {secondaryLabel}
                </HeroButton>
              </motion.div>

              <motion.div {...fadeUp(0.32)} className="border-border flex flex-wrap items-center gap-5 border-t pt-7 sm:gap-7">
                {[
                  { icon: ShieldCheck, label: 'Trusted Partner' },
                  { icon: Award, label: '10+ Industries' },
                ].map(({ icon: Icon, label }) => (
                  <div key={label} className="text-ink/40 flex items-center gap-2 text-[10px] font-black tracking-[0.2em] uppercase">
                    <Icon className="text-primary h-3.5 w-3.5 shrink-0" />
                    {label}
                  </div>
                ))}
                <div className="bg-border hidden h-3.5 w-px sm:block" />
                <span className="text-ink/40 text-[10px] font-black tracking-[0.2em] uppercase">Nationwide Network</span>
              </motion.div>
            </div>

            {/* RIGHT — VISUAL */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="relative mt-8 flex items-center justify-center lg:mt-0 lg:h-[620px] xl:h-[680px]"
            >
              <motion.div
                initial={{ opacity: 0, x: 45 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.9, delay: 0.28, ease: 'easeOut' }}
                className="relative mx-auto w-[78%] overflow-hidden sm:w-[60%] lg:w-[76%]"
                style={{ aspectRatio: '3/4', boxShadow: '0 40px 100px -20px rgba(0,0,0,0.5), 0 0 0 1px rgba(22,135,181,0.15)' }}
              >
                <Image src={image} alt={imageAlt ?? ''} fill className="object-cover object-center" priority sizes="(max-width: 768px) 80vw, 35vw" />
                <div
                  className="absolute inset-0"
                  style={{ background: 'linear-gradient(to top, rgba(11,31,42,0.88) 0%, rgba(11,31,42,0.2) 55%, transparent 100%)' }}
                />

                <div className="border-primary/70 absolute top-5 left-5 z-10 h-6 w-6 border-t-2 border-l-2" />
                <div className="border-primary/70 absolute right-5 bottom-5 z-10 h-6 w-6 border-r-2 border-b-2" />

                <div className="absolute right-5 bottom-5 left-5 z-10">
                  <div
                    className="p-4 sm:p-5"
                    style={{ background: 'rgba(255,255,255,0.07)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.12)' }}
                  >
                    <div className="mb-3 flex items-center justify-between">
                      <div>
                        <div className="mb-1 text-[9px] font-black tracking-[0.2em] text-white/45 uppercase">Client Retention</div>
                        <div className="font-sans text-2xl leading-none text-white">92%</div>
                      </div>
                      <div
                        className="flex h-9 w-9 items-center justify-center"
                        style={{ background: 'rgba(22,135,181,0.22)', border: '1px solid rgba(22,135,181,0.38)' }}
                      >
                        <TrendingUp className="text-primary h-4 w-4" />
                      </div>
                    </div>
                    <div className="h-[2px] w-full bg-white/10">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: '92%' }}
                        transition={{ duration: 1.5, delay: 1.1, ease: 'easeOut' }}
                        className="bg-primary relative h-full"
                      >
                        <div className="absolute top-1/2 right-0 h-2.5 w-2.5 -translate-y-1/2 bg-white" />
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Floating card — top left */}
              <motion.div
                initial={{ opacity: 0, x: -26 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.6, ease: 'easeOut' }}
                className="absolute top-[6%] left-0 z-20 lg:-left-[3%]"
              >
                <motion.div
                  animate={{ y: [-8, 8, -8] }}
                  transition={{ repeat: Infinity, duration: 7, ease: 'easeInOut' }}
                  className="w-[145px] bg-white p-4 sm:w-[158px] sm:p-5"
                  style={{ boxShadow: '0 20px 48px -12px rgba(11,44,95,0.22)', border: '1px solid rgba(226,232,240,0.9)' }}
                >
                  <div
                    className="mb-3.5 flex h-9 w-9 items-center justify-center"
                    style={{ background: 'linear-gradient(135deg, #2196c2 0%, #1687b5 55%, #0b1f2a 100%)' }}
                  >
                    <Briefcase className="h-[17px] w-[17px] text-white" />
                  </div>
                  <div className="text-ink mb-1 font-sans text-[1.65rem] leading-none">10+</div>
                  <div className="text-ink/35 text-[9px] font-black tracking-[0.18em] uppercase">Industries Served</div>
                </motion.div>
              </motion.div>

              {/* Floating card — mid right */}
              <motion.div
                initial={{ opacity: 0, x: 26 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.78, ease: 'easeOut' }}
                className="absolute top-[38%] right-0 z-20 lg:-right-[2%]"
              >
                <motion.div
                  animate={{ y: [8, -8, 8] }}
                  transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
                  className="bg-navy w-[145px] p-4 sm:w-[158px] sm:p-5"
                  style={{ boxShadow: '0 20px 48px -12px rgba(11,44,95,0.55)', border: '1px solid rgba(22,135,181,0.18)' }}
                >
                  <div
                    className="mb-3.5 flex h-9 w-9 items-center justify-center"
                    style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)' }}
                  >
                    <Users className="text-primary h-[17px] w-[17px]" />
                  </div>
                  <div className="mb-1 font-sans text-[1.65rem] leading-none text-white">20+</div>
                  <div className="text-[9px] font-black tracking-[0.18em] text-white/30 uppercase">Years in Practice</div>
                </motion.div>
              </motion.div>

              {/* Scroll cue */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 0.6 }}
                className="absolute bottom-2 left-0 hidden flex-col items-center gap-1.5 lg:flex"
              >
                <motion.div animate={{ y: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 1.9, ease: 'easeInOut' }}>
                  <ArrowDown className="h-3 w-3 text-white/25" />
                </motion.div>
                <span className="text-[8px] font-black tracking-[0.25em] text-white/20 uppercase" style={{ writingMode: 'vertical-lr' }}>
                  Scroll
                </span>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* BOTTOM STATS BAR */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, delay: 0.9, ease: 'easeOut' }}
        className="border-border relative z-10 border-t bg-white"
      >
        <div className="w-full px-5 sm:px-8 md:px-12 xl:px-20">
          <div className="divide-border grid grid-cols-3 divide-x">
            {stats.map(({ value, label, icon: Icon }) => (
              <div
                key={label}
                className="hover:bg-muted group flex cursor-default items-center gap-3 px-3 py-4 transition-colors duration-200 sm:gap-4 sm:px-6 sm:py-5"
              >
                <div className="bg-primary/10 flex h-8 w-8 shrink-0 items-center justify-center sm:h-9 sm:w-9">
                  <Icon className="text-primary h-4 w-4 sm:h-[17px] sm:w-[17px]" />
                </div>
                <div className="min-w-0">
                  <div className="text-ink truncate font-sans text-lg leading-none sm:text-xl">{value}</div>
                  <div className="text-ink/35 mt-0.5 truncate text-[9px] font-black tracking-[0.16em] uppercase sm:text-[10px]">{label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  )
}
