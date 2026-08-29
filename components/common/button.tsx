import Link from 'next/link'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { cn } from '@/lib/utils'

const base =
  'group inline-flex items-center justify-center gap-2.5 rounded-full px-7 py-3.5 text-sm font-semibold tracking-tight shadow-[0_4px_14px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(0,0,0,0.12)] focus-visible:outline-offset-4 [&_svg]:transition-transform [&_svg]:duration-300 hover:[&_svg]:translate-x-1'

type CommonProps = { href?: string; children: React.ReactNode; className?: string; onClick?: () => void; type?: 'submit' | 'button' }

function renderAs({ href, children, className, onClick, type }: CommonProps, cls: string) {
  if (href)
    return (
      <Link href={href} className={cn(base, cls, className)}>
        {children}
      </Link>
    )
  return (
    <button type={type ?? 'button'} onClick={onClick} className={cn(base, cls, className)}>
      {children}
    </button>
  )
}

export function PrimaryButton(props: CommonProps) {
  return renderAs(props, 'bg-primary text-white hover:bg-accent-hover')
}

export function SecondaryButton(props: CommonProps & { light?: boolean; dark?: boolean }) {
  const { light, dark, ...rest } = props
  return renderAs(
    rest,
    dark
      ? 'bg-ink text-white shadow-[0_4px_14px_rgba(0,0,0,0.18)] hover:bg-ink/90'
      : light
        ? 'border border-white/40 text-white hover:border-white hover:bg-white/10'
        : 'border border-border text-ink hover:border-primary hover:text-primary',
  )
}

export function ArrowLink({
  href,
  children,
  light = false,
  className,
}: {
  href: string
  children: React.ReactNode
  light?: boolean
  className?: string
}) {
  return (
    <Link
      href={href}
      className={cn(
        'group inline-flex items-center gap-2 text-sm font-semibold tracking-tight',
        light ? 'text-white' : 'text-primary',
        className,
      )}
    >
      <span className="border-primary/40 group-hover:border-primary border-b-2 pb-0.5 transition-colors">{children}</span>
      <ArrowUpRight
        size={16}
        className="text-primary transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
      />
    </Link>
  )
}

export { ArrowLink as ArrowButton }
