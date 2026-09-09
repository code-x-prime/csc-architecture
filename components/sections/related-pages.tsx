'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Container, SectionLabel, Reveal, RevealStagger } from '@/components/common'

export function RelatedPages({ links, index = '09' }: { links?: string[]; index?: string }) {
  if (!links?.length) return null

  return (
    <section className="bg-paper border-border border-b py-14 sm:py-18">
      <Container>
        <Reveal className="max-w-2xl">
          <SectionLabel index={index}>More to explore</SectionLabel>
          <h2 className="text-ink mt-6 font-sans text-[clamp(1.75rem,3.4vw,2.5rem)] leading-[1.08] font-black tracking-[-0.03em] text-balance">
            Keep the conversation moving.
          </h2>
        </Reveal>

        <RevealStagger
          stagger={0.06}
          y={18}
          className="border-border mt-12 grid grid-cols-1 border-t border-l sm:grid-cols-2 lg:grid-cols-3"
        >
          {links.map((href) => (
            <Link
              key={href}
              href={href}
              className="group border-border hover:bg-white relative flex items-center justify-between gap-4 border-r border-b p-6 transition-colors duration-300"
            >
              {/* Accent rule that draws in on hover */}
              <span
                aria-hidden
                className="bg-primary absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100"
              />

              <span className="text-ink group-hover:text-primary text-[15px] font-bold tracking-tight capitalize transition-colors duration-300">
                {href.split('/').pop()?.replaceAll('-', ' ')}
              </span>

              <ArrowRight
                size={16}
                className="text-muted-foreground group-hover:text-primary shrink-0 transition-all duration-300 group-hover:translate-x-1"
              />
            </Link>
          ))}
        </RevealStagger>
      </Container>
    </section>
  )
}
