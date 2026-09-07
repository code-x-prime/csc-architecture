import { cn } from '@/lib/utils'

/**
 * Indexed section label — `01 — ABOUT`. The number and rule read as a running
 * index down the page, which is what ties the sections together visually.
 */
export function SectionLabel({
  index,
  children,
  light = false,
  className,
}: {
  index?: string
  children: React.ReactNode
  light?: boolean
  className?: string
}) {
  return (
    <p
      className={cn(
        'flex items-center gap-3 text-[11px] font-bold tracking-[0.22em] uppercase',
        light ? 'text-white/60' : 'text-muted-foreground',
        className,
      )}
    >
      {index && <span className={light ? 'text-white' : 'text-primary'}>{index}</span>}
      <span aria-hidden className={cn('h-px w-6', light ? 'bg-white/30' : 'bg-border')} />
      {children}
    </p>
  )
}
