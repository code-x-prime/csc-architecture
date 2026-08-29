import { cn } from '@/lib/utils'

export function Eyebrow({ children, light = false, className }: { children: React.ReactNode; light?: boolean; className?: string }) {
  return (
    <p
      className={cn(
        'inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.2em] uppercase',
        light ? 'text-accent' : 'text-ink',
        className,
      )}
    >
      <span className="bg-accent h-[2px] w-5" aria-hidden="true" />
      {children}
    </p>
  )
}
