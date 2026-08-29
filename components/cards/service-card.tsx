import Link from 'next/link'
import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Icon } from '@/components/common'

export function ServiceCard({
  href,
  eyebrow,
  title,
  description,
  index,
  icon,
  imageIcon,
  featured = false,
}: {
  href: string
  eyebrow?: string
  title: string
  description: string
  index?: number
  icon?: string
  imageIcon?: string
  featured?: boolean
}) {
  if (imageIcon) {
    return (
      <Link
        href={href}
        className="group border-border relative flex max-h-[min(560px,72vh)] flex-col overflow-hidden rounded-2xl border bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(15,23,42,0.1)]"
      >
        <div className="from-primary via-primary/85 to-ink relative aspect-video w-full shrink-0 overflow-hidden bg-linear-to-br p-4">
          <div className="relative h-full w-full overflow-hidden rounded-xl shadow-[0_18px_40px_rgba(0,0,0,0.22)]">
            <Image
              src={imageIcon}
              alt=""
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              sizes="(min-width: 1024px) 25vw, 50vw"
            />
          </div>
        </div>

        <div className="flex flex-1 flex-col p-5">
          {index !== undefined && (
            <span className="text-accent text-xs font-bold tracking-widest">{String(index + 1).padStart(2, '0')}</span>
          )}
          {eyebrow && <p className="text-muted-foreground mt-1.5 text-[11px] font-bold tracking-[0.18em] uppercase">{eyebrow}</p>}
          <h3 className="text-ink group-hover:text-primary mt-1.5 font-sans text-lg leading-tight font-bold tracking-tight transition-colors">
            {title}
          </h3>
          <p className="text-muted-foreground mt-2 line-clamp-2 flex-1 text-[13.5px] leading-relaxed">{description}</p>

          <span className="border-border text-ink group-hover:border-primary group-hover:bg-primary group-hover:text-white mt-4 inline-flex size-9 w-fit items-center justify-center rounded-full border transition-all duration-300">
            <ArrowUpRight size={16} />
          </span>
        </div>
      </Link>
    )
  }

  return (
    <Link
      href={href}
      className={cn(
        'group border-border hover:border-ink relative flex flex-col justify-between gap-10 border bg-white p-7 transition-all duration-300 sm:p-8',
        featured && 'bg-ink hover:border-accent text-white',
      )}
    >
      <div>
        {icon && (
          <Icon
            src={icon}
            className={cn(
              'size-8 transition-colors duration-300',
              featured ? 'group-hover:text-accent text-white' : 'text-ink group-hover:text-primary',
            )}
          />
        )}
        {index !== undefined && (
          <span className={cn('mt-3 block text-xs font-bold tracking-widest', featured ? 'text-accent' : 'text-accent')}>
            {String(index + 1).padStart(2, '0')}
          </span>
        )}
        {eyebrow && (
          <p className={cn('mt-2 text-[11px] font-bold tracking-[0.18em] uppercase', featured ? 'text-white/60' : 'text-muted-foreground')}>
            {eyebrow}
          </p>
        )}
        <h3 className={cn('mt-3 font-sans text-2xl leading-tight font-bold tracking-tight', featured ? 'text-white' : 'text-ink')}>
          {title}
        </h3>
        <p className={cn('mt-3 text-[15px] leading-relaxed', featured ? 'text-white/65' : 'text-muted-foreground')}>{description}</p>
      </div>
      <span
        className={cn(
          'inline-flex size-10 items-center justify-center border transition-all duration-300',
          featured
            ? 'group-hover:border-accent group-hover:bg-accent group-hover:text-ink border-white/30 text-white'
            : 'border-border text-ink group-hover:border-ink group-hover:bg-accent',
        )}
      >
        <ArrowUpRight size={17} />
      </span>
    </Link>
  )
}
