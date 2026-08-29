'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

/**
 * Belt-and-suspenders scroll reset. Next.js normally scrolls to the top on
 * navigation, but that can get suppressed by animation/layout side effects
 * elsewhere on the page — this guarantees every route change starts at the top.
 */
export function ScrollToTop() {
  const pathname = usePathname()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}
