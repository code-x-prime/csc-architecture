'use client'

import { useEffect, useState } from 'react'
import { ArrowUp } from 'lucide-react'
import { contact } from '@/data/site'

const RADIUS = 19
const CIRCUMFERENCE = 2 * Math.PI * RADIUS
const MESSAGE = "Hi CSC team, I'd like to talk about a consulting engagement."

function whatsappHref() {
  const digits = contact.phone.replace(/[^\d]/g, '')
  // US numbers in data/site.ts are 10-digit local format — prefix the country code.
  const withCountryCode = digits.length === 10 ? `1${digits}` : digits
  return `https://wa.me/${withCountryCode}?text=${encodeURIComponent(MESSAGE)}`
}

/**
 * The page's floating actions, kept in one stack so they share a single
 * position and spacing rule. Previously each button positioned itself, which
 * left them crowding each other at small widths.
 */
export function FloatingDock() {
  const [progress, setProgress] = useState(0)
  const [showScrollTop, setShowScrollTop] = useState(false)

  useEffect(() => {
    let ticking = false

    const update = () => {
      ticking = false
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      setProgress(docHeight > 0 ? Math.min(1, Math.max(0, scrollTop / docHeight)) : 0)
      setShowScrollTop(scrollTop > 320)
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

  return (
    <div className="fixed right-4 bottom-4 z-50 flex flex-col items-center gap-3 sm:right-6 sm:bottom-6">
      {/* ===============================================
          SCROLL TO TOP — appears once the page has moved
      =============================================== */}
      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Scroll to top"
        aria-hidden={!showScrollTop}
        tabIndex={showScrollTop ? 0 : -1}
        className={`group border-border relative flex h-11 w-11 items-center justify-center rounded-full border bg-white shadow-[0_6px_20px_rgba(16,33,43,0.12)] transition-all duration-300 hover:shadow-[0_10px_26px_rgba(16,33,43,0.18)] sm:h-12 sm:w-12 ${
          showScrollTop ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-2 opacity-0'
        }`}
      >
        <svg viewBox="0 0 48 48" className="absolute inset-0 h-full w-full -rotate-90" aria-hidden>
          <circle cx="24" cy="24" r={RADIUS} fill="none" stroke="transparent" strokeWidth="2.5" />
          <circle
            cx="24"
            cy="24"
            r={RADIUS}
            fill="none"
            stroke="#1687b5"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={CIRCUMFERENCE * (1 - progress)}
            style={{ transition: 'stroke-dashoffset 100ms linear' }}
          />
        </svg>
        <ArrowUp
          size={16}
          strokeWidth={2.5}
          className="text-ink group-hover:text-primary relative transition-all duration-300 group-hover:-translate-y-0.5"
        />
      </button>

      {/* ===============================================
          WHATSAPP
      =============================================== */}
      <a
        href={whatsappHref()}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat with CSC on WhatsApp"
        className="group relative flex h-13 w-13 items-center justify-center rounded-full bg-[#25D366] shadow-[0_8px_24px_rgba(37,211,102,0.4)] transition-all duration-300 hover:scale-105 hover:shadow-[0_12px_32px_rgba(37,211,102,0.55)] sm:h-14 sm:w-14"
      >
        <span
          aria-hidden
          className="absolute inset-0 rounded-full bg-[#25D366] opacity-50 [animation:dock-ping_2.6s_cubic-bezier(0,0,0.2,1)_infinite] motion-reduce:hidden"
        />
        <svg viewBox="0 0 32 32" className="relative h-6.5 w-6.5 fill-white sm:h-7 sm:w-7" aria-hidden>
          <path d="M16.004 3C9.377 3 4.001 8.373 4.001 15c0 2.223.606 4.363 1.756 6.24L4 29l7.94-1.703A11.95 11.95 0 0 0 16.004 27C22.63 27 28 21.627 28 15S22.63 3 16.004 3Zm0 21.818a9.77 9.77 0 0 1-4.98-1.36l-.357-.212-4.71 1.01 1.006-4.59-.233-.373A9.79 9.79 0 0 1 5.2 15c0-5.966 4.85-10.818 10.804-10.818 5.955 0 10.805 4.852 10.805 10.818 0 5.966-4.85 10.818-10.805 10.818Zm5.923-8.096c-.324-.163-1.917-.947-2.214-1.056-.297-.108-.514-.163-.73.163-.216.325-.838 1.056-1.028 1.273-.19.217-.378.244-.703.081-.324-.163-1.368-.505-2.606-1.612-.963-.86-1.614-1.923-1.803-2.248-.19-.325-.02-.5.142-.663.145-.145.325-.379.487-.568.163-.19.216-.325.324-.542.108-.217.054-.407-.027-.57-.081-.163-.73-1.766-1-2.42-.264-.634-.532-.548-.73-.558l-.622-.011c-.216 0-.567.081-.865.407-.297.325-1.135 1.11-1.135 2.706s1.162 3.138 1.325 3.355c.163.217 2.286 3.49 5.538 4.895.774.334 1.377.534 1.848.684.777.247 1.484.212 2.043.129.623-.093 1.917-.784 2.187-1.542.27-.758.27-1.407.19-1.542-.081-.135-.297-.217-.622-.38Z" />
        </svg>

        {/* Label unfurls on hover at desktop widths */}
        <span className="bg-ink pointer-events-none absolute right-full mr-3 hidden rounded-lg px-3 py-2 text-[12px] font-bold whitespace-nowrap text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100 lg:block">
          Chat on WhatsApp
        </span>
      </a>

      <style>{`
        @keyframes dock-ping {
          0% { transform: scale(1); opacity: 0.45; }
          75%, 100% { transform: scale(1.55); opacity: 0; }
        }
      `}</style>
    </div>
  )
}
