import { cn } from '@/lib/utils'
import { Container } from './container'

export function Section({
  className,
  muted = false,
  dark = false,
  blue = false,
  bleed = false,
  children,
  id,
}: {
  className?: string
  muted?: boolean
  dark?: boolean
  blue?: boolean
  bleed?: boolean
  children: React.ReactNode
  id?: string
}) {
  return (
    <section
      id={id}
      className={cn(
        'py-16 sm:py-20 ',
        muted && 'bg-muted',
        dark && 'bg-navy text-white',
        blue && 'bg-primary text-white',
        className,
      )}
    >
      {bleed ? children : <Container>{children}</Container>}
    </section>
  )
}
