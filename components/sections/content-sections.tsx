'use client'

import { motion, type Variants } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'
import type { SitePage } from '@/data/site'
import { Container } from '@/components/common'
import { cn } from '@/lib/utils'

const reveal: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } },
}

export function ContentSections({ sections }: { sections: SitePage['sections'] }) {
  return (
    <>
      {sections.map((s, i) => (
        <motion.section
          key={s.heading}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={reveal}
          className={cn('border-border border-b py-16 sm:py-20 lg:py-24', i % 2 ? 'bg-muted' : 'bg-white')}
        >
          <Container className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(220px,0.8fr)_1.2fr] lg:gap-20">
            <div>
              <span className="text-accent text-xs font-bold tracking-widest">{String(i + 1).padStart(2, '0')}</span>
              <h2 className="text-ink mt-3 font-sans text-[clamp(1.7rem,3vw,2.4rem)] leading-tight font-bold tracking-tight">
                {s.heading}
              </h2>
            </div>
            <div>
              <p className="text-muted-foreground text-lg leading-relaxed">{s.body}</p>
              {s.items && (
                <ul className="mt-6 flex flex-col gap-0">
                  {s.items.map((item) => (
                    <li
                      key={item}
                      className="border-border text-ink flex items-center gap-3 border-t py-4 font-semibold first:border-t-0 lg:first:border-t"
                    >
                      <CheckCircle2 size={18} className="text-ink shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </Container>
        </motion.section>
      ))}
    </>
  )
}
