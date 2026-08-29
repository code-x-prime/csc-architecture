import { cn } from '@/lib/utils'
import { Eyebrow } from './eyebrow'

export function SectionHeading({
  eyebrow,
  title,
  description,
  light = false,
  align = 'left',
  size = 'md',
  className,
}: {
  eyebrow?: string
  title: string
  description?: string
  light?: boolean
  align?: 'left' | 'center'
  size?: 'sm' | 'md' | 'lg'
  className?: string
}) {
  const scale = {
    sm: 'text-[clamp(1.6rem,3vw,2.2rem)]',
    md: 'text-[clamp(1.9rem,3.6vw,3rem)]',
    lg: 'text-[clamp(2.2rem,4.8vw,4rem)]',
  }[size]

  return (
    <div className={cn('max-w-3xl', align === 'center' && 'mx-auto text-center', className)}>
      {eyebrow && <Eyebrow light={light}>{eyebrow}</Eyebrow>}
      <h2 className={cn('mt-4 font-sans leading-[1.05] font-bold tracking-tight', scale, light ? 'text-white' : 'text-ink')}>{title}</h2>
      {description && (
        <p className={cn('mt-5 text-lg leading-relaxed', light ? 'text-white/70' : 'text-muted-foreground')}>{description}</p>
      )}
    </div>
  )
}
