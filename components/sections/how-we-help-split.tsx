import Link from 'next/link'
import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import { IconBulb, IconTargetArrow, IconRoute, IconSparkles, type Icon } from '@tabler/icons-react'
import { howWeHelp } from '@/data/site'
import { Container } from '@/components/common'

const ICONS: Record<string, Icon> = {
  'great-framework': IconBulb,
  'business-simulation': IconTargetArrow,
  'change-management': IconRoute,
  'innovation-digital-transformation': IconSparkles,
}

export function HowWeHelpSplit({
  eyebrow = 'How we help',
  title = 'Ways we help teams move forward.',
  image = '/images/home/csc-home-strategy.jpg',
  imageAlt = 'Consulting team reviewing a strategic framework around a whiteboard',
}: {
  eyebrow?: string
  title?: string
  image?: string
  imageAlt?: string
}) {
  const items = howWeHelp.slice(0, 4)

  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24">
      <Container>
        <div className="mb-10 sm:mb-12">
          <p className="text-primary text-[11px] font-bold tracking-[0.2em] uppercase">
            <span className="bg-primary mr-2 inline-block h-[2px] w-5 align-middle" aria-hidden />
            {eyebrow}
          </p>
          <h2 className="text-ink mt-4 max-w-xl font-sans text-[clamp(1.9rem,3.6vw,3rem)] leading-[1.05] font-bold tracking-tight italic">
            {title}
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_1.15fr] lg:gap-8">
          {/* Left — feature image */}
          <div className="group relative h-[320px] overflow-hidden rounded-2xl sm:h-[420px] lg:h-full lg:min-h-[480px]">
            <Image
              src={image}
              alt={imageAlt}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(min-width: 1024px) 45vw, 100vw"
            />
          </div>

          {/* Right — stacked detail cards */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {items.map((item, i) => {
              const Icon = ICONS[item.slug] ?? IconBulb

              return (
                <Link
                  key={item.slug}
                  href={`/how-we-help/${item.slug}`}
                  className="group border-border hover:border-primary/30 relative flex min-h-[190px] flex-col justify-between overflow-hidden rounded-2xl border bg-linear-to-br from-white to-accent-soft p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_15px_35px_rgba(0,0,0,0.08)]"
                >
                  <div className="flex items-start justify-between">
                    <span className="bg-primary/10 text-primary flex h-10 w-10 items-center justify-center rounded-xl transition-colors duration-300 group-hover:bg-primary group-hover:text-white">
                      <Icon size={19} stroke={1.75} />
                    </span>
                    <span className="border-border text-ink group-hover:border-primary group-hover:bg-primary flex h-9 w-9 items-center justify-center rounded-full border transition-all duration-300 group-hover:text-white">
                      <ArrowUpRight size={15} />
                    </span>
                  </div>

                  <div>
                    <span className="text-accent text-xs font-bold tracking-widest">{String(i + 1).padStart(2, '0')}</span>
                    <h3 className="text-ink group-hover:text-primary mt-1 text-lg font-bold tracking-tight transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground mt-2 line-clamp-2 text-[13px] leading-relaxed">{item.description}</p>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </Container>
    </section>
  )
}
