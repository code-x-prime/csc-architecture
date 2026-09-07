'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowUpRight, Plus } from 'lucide-react'

export function TeamCard({
  name,
  role,
  bio,
  image,
  onOpen,
  href,
}: {
  name: string
  role: string
  bio: string
  image?: string
  /** Opens something in place (e.g. a bio modal) — renders as a <button>. */
  onOpen?: () => void
  /** Navigates to a page instead — renders as a <Link>. Takes priority over onOpen. */
  href?: string
}) {
  const className =
    'group border-border hover:border-primary/40 relative flex h-full w-full cursor-pointer flex-col overflow-hidden rounded-xl border bg-white text-left transition-all duration-300 hover:-translate-y-1'

  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')

  const content = (
    <>
      {/* Accent rule that draws in on hover */}
      <span
        aria-hidden
        className="bg-primary absolute inset-x-0 top-0 z-10 h-0.5 origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100"
      />

      <div className="bg-paper-deep relative aspect-4/5 w-full overflow-hidden">
        {image ? (
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
            sizes="(min-width: 1024px) 22vw, (min-width: 640px) 45vw, 90vw"
          />
        ) : (
          <div className="bg-navy absolute inset-0 flex items-center justify-center">
            <span className="border-primary flex h-16 w-16 items-center justify-center rounded-full border text-xl font-black tracking-tight text-white">
              {initials}
            </span>
          </div>
        )}

        {/* Affordance badge */}
        <span className="bg-white/90 text-ink group-hover:bg-primary absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-lg backdrop-blur-sm transition-colors duration-300 group-hover:text-white">
          {href ? <ArrowUpRight size={15} strokeWidth={2.25} /> : <Plus size={15} strokeWidth={2.5} />}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-ink group-hover:text-primary text-[15px] leading-snug font-bold tracking-tight transition-colors">
          {name}
        </h3>
        <p className="text-muted-foreground mt-1.5 text-[11px] font-black tracking-[0.14em] uppercase">{role}</p>

        <p className="text-muted-foreground mt-4 line-clamp-3 text-[13px] leading-[1.65]">{bio.split('\n\n')[0]}</p>

        <span className="text-primary mt-auto inline-flex items-center gap-1.5 pt-5 text-[11px] font-black tracking-[0.14em] uppercase">
          Read full bio
          <ArrowUpRight
            size={12}
            strokeWidth={2.5}
            className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </span>
      </div>
    </>
  )

  if (href) {
    return (
      <Link href={href} className={className}>
        {content}
      </Link>
    )
  }

  return (
    <button type="button" onClick={onOpen} className={className}>
      {content}
    </button>
  )
}
