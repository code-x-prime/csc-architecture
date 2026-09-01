'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Plus } from 'lucide-react'

export const TEAM_CARD_ACCENTS = ['#1687b5', '#0b1f2a', '#c89b3c', '#1687b5', '#5a3fc0']

export function TeamCard({
  name,
  role,
  bio,
  image,
  index = 0,
  onOpen,
  href,
}: {
  name: string
  role: string
  bio: string
  image?: string
  index?: number
  /** Opens something in place (e.g. a bio modal) — renders as a <button>. */
  onOpen?: () => void
  /** Navigates to a page instead — renders as a <Link>. Takes priority over onOpen. */
  href?: string
}) {
  const accent = TEAM_CARD_ACCENTS[index % TEAM_CARD_ACCENTS.length]

  const className =
    'group relative flex h-full w-full cursor-pointer flex-col overflow-hidden rounded-2xl bg-white p-2.5 text-left shadow-[0_5px_25px_rgba(0,0,0,0.05)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_45px_rgba(0,0,0,0.12)]'
  const style = { border: `2px solid ${accent}` }

  const content = (
    <>
      <div
        className="relative aspect-4/5 w-full overflow-hidden rounded-xl"
        style={image ? { background: `linear-gradient(160deg, ${accent}1a 0%, #0b1f2a 100%)` } : undefined}
      >
        {image ? (
          <Image
            src={image}
            alt={name}
            fill
            className="object-contain object-bottom transition-transform duration-500 group-hover:scale-[1.05]"
            sizes="(min-width: 1024px) 22vw, (min-width: 640px) 45vw, 90vw"
          />
        ) : (
          <div className="bg-navy absolute inset-0 flex items-center justify-center">
            <span
              className="flex h-16 w-16 items-center justify-center rounded-full border text-xl font-bold tracking-tight text-white"
              style={{ borderColor: accent }}
            >
              {name
                .split(' ')
                .map((n) => n[0])
                .join('')}
            </span>
          </div>
        )}

        <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/15 to-transparent" />

        <span
          className="absolute top-2.5 right-2.5 flex h-7 w-7 items-center justify-center rounded-full text-white shadow-lg transition-transform duration-300 group-hover:rotate-45 sm:top-3 sm:right-3 sm:h-8 sm:w-8"
          style={{ background: accent }}
        >
          <Plus size={13} strokeWidth={2.5} className="sm:hidden" />
          <Plus size={15} strokeWidth={2.5} className="hidden sm:block" />
        </span>

        <div className="absolute right-2.5 bottom-2.5 left-2.5 sm:right-3 sm:bottom-3 sm:left-3">
          <h3 className="line-clamp-1 text-[12.5px] leading-tight font-bold tracking-[-0.01em] text-white sm:text-[15px]">{name}</h3>
          <p className="mt-0.5 line-clamp-2 text-[9px] leading-3.5 font-semibold tracking-[0.02em] text-white/75 uppercase sm:mt-1 sm:text-[10.5px] sm:leading-4 sm:tracking-[0.04em]">
            {role}
          </p>
        </div>
      </div>

      <p className="text-muted-foreground line-clamp-2 px-1.5 pt-2.5 pb-2 text-[10.5px] leading-relaxed sm:px-2 sm:pt-3 sm:text-[12px]">
        {bio.split('\n\n')[0]}
      </p>
      <span className="px-1.5 pb-1 text-[9px] font-bold tracking-widest uppercase sm:px-2 sm:text-[10.5px]" style={{ color: accent }}>
        Read full bio →
      </span>
    </>
  )

  if (href) {
    return (
      <Link href={href} className={className} style={style}>
        {content}
      </Link>
    )
  }

  return (
    <button type="button" onClick={onOpen} className={className} style={style}>
      {content}
    </button>
  )
}
