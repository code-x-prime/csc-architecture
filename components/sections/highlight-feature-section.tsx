import Image from 'next/image'
import { Container, PrimaryButton } from '@/components/common'
import { ArrowRight } from 'lucide-react'

export function HighlightFeatureSection({
  eyebrow,
  title,
  body,
  image,
  imageAlt,
  ctaHref = '/contact',
  ctaLabel = 'Talk to our team',
}: {
  eyebrow: string
  title: string
  body: string
  image?: string
  imageAlt?: string
  ctaHref?: string
  ctaLabel?: string
}) {
  return (
    <section className="bg-muted text-ink py-16 sm:py-20 lg:py-24">
      <Container className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        <div>
          <p className="text-primary text-[11px] font-semibold tracking-[0.2em] uppercase">{eyebrow}</p>
          <h2 className="text-ink mt-4 font-sans text-[clamp(1.9rem,3.8vw,3.2rem)] leading-[1.05] font-bold tracking-tight">{title}</h2>
          <p className="text-muted-foreground mt-5 max-w-xl text-lg leading-relaxed">{body}</p>
          <div className="mt-8">
            <PrimaryButton href={ctaHref}>
              {ctaLabel} <ArrowRight size={16} />
            </PrimaryButton>
          </div>
        </div>
        {image ? (
          <div className="border-border relative hidden aspect-[4/5] overflow-hidden rounded-2xl border shadow-[0_20px_60px_rgba(16,33,43,0.1)] lg:block">
            <Image src={image} alt={imageAlt ?? ''} fill className="object-cover" sizes="(min-width: 1024px) 40vw, 100vw" />
          </div>
        ) : (
          <div aria-hidden className="border-border hidden h-64 border-2 lg:block" />
        )}
      </Container>
    </section>
  )
}
