'use client'

import { motion } from 'framer-motion'
import { Quote } from 'lucide-react'
import { Container, Eyebrow } from '@/components/common'
import { testimonials } from '@/data/site'

const firstColumn = testimonials.slice(0, 3)
const secondColumn = testimonials.slice(3, 6)
const thirdColumn = testimonials.slice(6, 9)

function TestimonialsColumn({
  items,
  duration = 18,
  className,
}: {
  items: typeof testimonials
  duration?: number
  className?: string
}) {
  return (
    <div className={className}>
      <motion.ul
        animate={{ translateY: '-50%' }}
        transition={{ duration, repeat: Infinity, ease: 'linear', repeatType: 'loop' }}
        className="m-0 flex list-none flex-col gap-5 p-0"
      >
        {[0, 1].map((repeatIndex) => (
          <div key={repeatIndex} className="flex flex-col gap-5">
            {items.map((item, i) => (
              <motion.li
                key={`${repeatIndex}-${i}`}
                aria-hidden={repeatIndex === 1}
                whileHover={{
                  y: -6,
                  scale: 1.02,
                  transition: { type: 'spring', stiffness: 350, damping: 20 },
                }}
                className="group border-border hover:border-primary/30 relative w-full max-w-xs cursor-default overflow-hidden rounded-2xl border bg-linear-to-br from-white to-accent-soft p-7 shadow-[0_5px_25px_rgba(0,0,0,0.025)] transition-shadow duration-300 hover:shadow-[0_20px_45px_rgba(0,0,0,0.1)]"
              >
                <span className="bg-primary/10 text-primary group-hover:bg-primary flex h-11 w-11 items-center justify-center rounded-xl transition-colors duration-300 group-hover:text-white">
                  <Quote size={19} strokeWidth={1.75} />
                </span>
                <p className="text-ink/75 mt-5 text-[14px] leading-relaxed">{item.text}</p>
                <div className="border-border/70 mt-6 border-t pt-4">
                  <p className="text-ink text-[13px] font-bold tracking-tight">{item.name}</p>
                  <p className="text-muted-foreground mt-0.5 text-[11.5px]">{item.role}</p>
                </div>

                <span className="bg-primary/0 group-hover:bg-primary absolute bottom-0 left-0 h-[3px] w-full transition-colors duration-300" />
              </motion.li>
            ))}
          </div>
        ))}
      </motion.ul>
    </div>
  )
}

export function QuoteSection() {
  return (
    <section className="bg-muted relative overflow-hidden py-16 sm:py-20 lg:py-24">
      <Container>
        <div className="mx-auto mb-12 flex max-w-lg flex-col items-center text-center sm:mb-16">
          <Eyebrow>Testimonials</Eyebrow>
          <h2 className="text-ink mt-4 font-sans text-[clamp(1.9rem,3.6vw,3rem)] leading-[1.05] font-bold tracking-tight">
            What clients say about working with CSC.
          </h2>
        </div>

        <div
          className="flex max-h-[640px] justify-center gap-5 overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)]"
          role="region"
          aria-label="Scrolling testimonials"
        >
          <TestimonialsColumn items={firstColumn} duration={16} />
          <TestimonialsColumn items={secondColumn} duration={20} className="hidden md:block" />
          <TestimonialsColumn items={thirdColumn} duration={18} className="hidden lg:block" />
        </div>
      </Container>
    </section>
  )
}
