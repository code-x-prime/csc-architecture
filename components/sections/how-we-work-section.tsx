'use client'

import { process } from '@/data/site'
import { Section, Eyebrow } from '@/components/common'
import { ScannerCardStream } from '@/components/ui/scanner-card-stream'

const PROCESS_CARD_IMAGES = ['/images/process/assess.jpg', '/images/process/plan.jpg', '/images/process/execute.jpg', '/images/process/optimize.jpg']
const PROCESS_CARD_LABELS = process.map((step) => step.title)

export function HowWeWorkSection({
  eyebrow = 'How we work',
  title = 'A structured path from question to outcome.',
}: {
  eyebrow?: string
  title?: string
}) {
  return (
    <Section bleed className="bg-ink text-white">
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-8">
        <Eyebrow light>{eyebrow}</Eyebrow>
        <h2 className="mt-4 max-w-2xl font-sans text-[clamp(1.9rem,3.6vw,3rem)] leading-[1.05] font-bold tracking-tight text-white">
          {title}
        </h2>
      </div>

      <div className="mt-12 sm:mt-16">
        <ScannerCardStream
          cardImages={PROCESS_CARD_IMAGES}
          cardLabels={PROCESS_CARD_LABELS}
          cardWidth={300}
          cardHeight={190}
          cardGap={40}
        />
      </div>

      <div className="mx-auto mt-14 w-full max-w-7xl px-5 sm:mt-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {process.map((step) => (
            <div key={step.number}>
              <span className="text-primary text-xs font-bold tracking-widest">{step.number}</span>
              <h3 className="mt-1 font-sans text-xl font-bold tracking-tight text-white">{step.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-white/55">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  )
}
