'use client'

import { motion } from 'framer-motion'
import {
  FlaskConical,
  HeartPulse,
  Cpu,
  Briefcase,
  Landmark,
  ShieldCheck,
  ShoppingBag,
  Fuel,
  Package,
  Radio,
  Factory,
  type LucideIcon,
} from 'lucide-react'
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import { TextRoll } from '@/components/ui/text-roll'
import { Container, Eyebrow } from '@/components/common'
import { industries } from '@/data/site'
import Autoplay from 'embla-carousel-autoplay'

const industryIcons: Record<string, LucideIcon> = {
  'biotech-pharma': FlaskConical,
  'health-care': HeartPulse,
  technology: Cpu,
  'professional-services': Briefcase,
  banking: Landmark,
  insurance: ShieldCheck,
  retail: ShoppingBag,
  'oil-and-gas': Fuel,
  'consumer-products': Package,
  telecommunication: Radio,
  manufacturing: Factory,
}

export function TrustSection() {
  return (
    <section className="border-border border-b bg-white">
      <Container className="py-14 sm:py-16">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <Eyebrow>Who we help</Eyebrow>
          <h2 className="text-ink mt-3 max-w-xl text-lg font-bold tracking-tight sm:text-xl lg:text-2xl">
            <TextRoll>Organizations across every industry rely on CSC</TextRoll>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }}
          className="mt-8"
        >
          <Carousel
            opts={{ loop: true, align: 'start' }}
            plugins={[Autoplay({ delay: 2000, stopOnInteraction: false, stopOnMouseEnter: true })]}
            className="w-full"
          >
            <CarouselContent>
              {industries.map((industry) => {
                const Icon = industryIcons[industry.slug]
                return (
                  <CarouselItem key={industry.slug} className="basis-1/2 sm:basis-1/3 lg:basis-1/5">
                    <div className="group hover:border-primary/30 hover:bg-accent-soft flex h-24 flex-col items-center justify-center gap-2 rounded-xl border border-transparent p-4 transition-colors">
                      {Icon && <Icon size={22} strokeWidth={1.75} className="text-ink/50 group-hover:text-primary transition-colors" />}
                      <span className="text-ink/70 group-hover:text-primary text-center text-[13px] font-bold tracking-tight whitespace-nowrap transition-colors sm:text-sm">
                        {industry.title}
                      </span>
                    </div>
                  </CarouselItem>
                )
              })}
            </CarouselContent>
          </Carousel>
        </motion.div>
      </Container>
    </section>
  )
}
