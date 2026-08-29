'use client'

import { motion } from 'framer-motion'
import { process, processIcons } from '@/data/site'
import { Section, Eyebrow, Icon } from '@/components/common'

export function ProcessRibbon({
  eyebrow = 'How we work',
  title = 'A structured path from question to outcome.',
}: {
  eyebrow?: string
  title?: string
}) {
  return (
    <Section>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="text-ink mt-4 max-w-2xl font-sans text-[clamp(1.9rem,3.6vw,3rem)] leading-[1.05] font-bold tracking-tight">{title}</h2>

      <div className="relative mt-14">
        <div className="bg-border absolute top-6 right-0 left-0 hidden h-px lg:block" aria-hidden="true" />
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-4 lg:gap-8">
          {process.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, ease: 'easeOut', delay: i * 0.08 }}
              className="group relative flex gap-5 lg:flex-col lg:gap-0"
            >
              <div className="border-border text-ink group-hover:border-primary group-hover:text-primary relative z-10 flex size-12 shrink-0 items-center justify-center rounded-full border bg-white transition-colors duration-300 lg:mb-6">
                <Icon src={processIcons[step.number]} className="size-6" />
              </div>
              <div className="lg:pl-0">
                <span className="text-accent text-xs font-bold tracking-widest">{step.number}</span>
                <h3 className="text-ink mt-1 font-sans text-xl font-bold tracking-tight">{step.title}</h3>
                <p className="text-muted-foreground mt-2 text-[15px] leading-relaxed">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  )
}
