import { Container, Eyebrow, ArrowLink, ImageReveal } from '@/components/common'
import { cn } from '@/lib/utils'

export function SplitImageSection({
  eyebrow,
  title,
  body,
  image,
  imageAlt,
  reverse = false,
  ctaHref,
  ctaLabel,
  muted = false,
}: {
  eyebrow: string
  title: string
  body: string
  image: string
  imageAlt: string
  reverse?: boolean
  ctaHref?: string
  ctaLabel?: string
  muted?: boolean
}) {
  return (
    <section className={cn('py-16 sm:py-20 ', muted && 'bg-muted')}>
      <Container className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div className={cn(reverse && 'lg:order-2')}>
          <ImageReveal src={image} alt={imageAlt} aspect="aspect-[16/11]" />
        </div>
        <div className={cn(reverse && 'lg:order-1')}>
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 className="text-ink mt-4 font-sans text-[clamp(1.9rem,3.6vw,2.8rem)] leading-[1.05] font-bold tracking-tight">{title}</h2>
          <p className="text-muted-foreground mt-5 max-w-lg text-lg leading-relaxed">{body}</p>
          {ctaHref && ctaLabel && (
            <div className="mt-7">
              <ArrowLink href={ctaHref}>{ctaLabel}</ArrowLink>
            </div>
          )}
        </div>
      </Container>
    </section>
  )
}
