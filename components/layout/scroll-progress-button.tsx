'use client'

import { useEffect, useState } from 'react'
import { ArrowUp } from 'lucide-react'

const RADIUS = 20
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

export function ScrollProgressButton() {
  const [progress, setProgress] = useState(0)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    let ticking = false

    const update = () => {
      ticking = false
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const pct = docHeight > 0 ? Math.min(1, Math.max(0, scrollTop / docHeight)) : 0
      setProgress(pct)
      setVisible(scrollTop > 320)
    }

    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  const offset = CIRCUMFERENCE * (1 - progress)

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Scroll to top"
      className={`fixed right-5 bottom-24 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-[0_10px_30px_rgba(16,33,43,0.18)] transition-all duration-300 hover:scale-110 sm:right-6 sm:bottom-27 ${
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-3 opacity-0'
      }`}
    >
      <svg viewBox="0 0 48 48" className="absolute inset-0 h-full w-full -rotate-90">
        <circle cx="24" cy="24" r={RADIUS} fill="none" stroke="#dce5e9" strokeWidth="3" />
        <circle
          cx="24"
          cy="24"
          r={RADIUS}
          fill="none"
          stroke="#1687b5"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={offset}
          style={{ transition: 'stroke-dashoffset 100ms linear' }}
        />
      </svg>
      <ArrowUp size={17} className="text-ink relative" strokeWidth={2.5} />
    </button>
  )
}
