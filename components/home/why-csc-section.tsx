'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Compass, Users, Workflow, Target } from 'lucide-react'
import { Container, Eyebrow, PrimaryButton } from '@/components/common'
import { cn } from '@/lib/utils'

const values = [
  {
    icon: Compass,
    title: 'Structured perspective',
    description: 'We bring clarity to complex, ambiguous problems before recommending a path forward.',
    className: 'sm:col-span-2',
  },
  {
    icon: Users,
    title: 'Practical collaboration',
    description: 'Our teams work alongside yours, not at a distance — sharing context and ownership throughout every engagement.',
    className: '',
  },
  {
    icon: Workflow,
    title: 'Execution support',
    description: 'We stay engaged through delivery, not just strategy and planning.',
    className: '',
  },
  {
    icon: Target,
    title: 'Outcome focused',
    description: 'Every engagement is built around measurable, meaningful progress that your team can point to.',
    className: 'sm:col-span-2',
  },
]

function PlusCorners() {
  return (
    <>
      <PlusIcon className="absolute -top-2.5 -left-2.5" />
      <PlusIcon className="absolute -top-2.5 -right-2.5" />
      <PlusIcon className="absolute -bottom-2.5 -left-2.5" />
      <PlusIcon className="absolute -bottom-2.5 -right-2.5" />
    </>
  )
}

function PlusIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      width={14}
      height={14}
      strokeWidth="1.5"
      stroke="currentColor"
      className={cn('text-border bg-white', className)}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
    </svg>
  )
}

export function WhyCscSection() {
  return (
    <section className="bg-white py-16 sm:py-20 ">
      <Container className="grid grid-cols-1 gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <Eyebrow>Why CSC</Eyebrow>
          <h2 className="text-ink mt-4 font-sans text-[clamp(1.9rem,3.8vw,3rem)] leading-[1.05] font-bold tracking-tight">
            A consulting partner built for practical progress.
          </h2>
          <p className="text-muted-foreground mt-5 max-w-md text-lg leading-relaxed">
            Consulting Services Corporation helps organizations move from complex questions to practical next steps — with teams that stay
            engaged from strategy through execution.
          </p>
          <div className="mt-8">
            <PrimaryButton href="/contact">
              Start a conversation <ArrowRight size={16} />
            </PrimaryButton>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 px-3 pt-3 sm:grid-cols-2 sm:gap-8">
          {values.map((value, i) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, ease: 'easeOut', delay: i * 0.08 }}
              className={cn(
                'group border-border relative flex min-h-42.5 flex-col justify-between rounded-lg border border-dashed bg-white p-6 transition-colors duration-300 hover:border-primary/40',
                value.className,
              )}
            >
              <PlusCorners />
              <div className="relative z-10">
                <span className="bg-primary/8 text-primary flex h-11 w-11 items-center justify-center rounded-xl transition-colors duration-300 group-hover:bg-primary group-hover:text-white">
                  <value.icon size={20} strokeWidth={1.75} />
                </span>
                <h3 className="text-ink mt-4 font-sans text-lg font-bold tracking-tight">{value.title}</h3>
                <p className="text-muted-foreground mt-2 text-sm leading-relaxed">{value.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  )
}
