import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { Section, Eyebrow } from '@/components/common'

export function RelatedPages({ links }: { links?: string[] }) {
  if (!links?.length) return null
  return (
    <Section muted>
      <Eyebrow>More to explore</Eyebrow>
      <h2 className="text-ink mt-4 font-sans text-[clamp(1.9rem,3.6vw,2.8rem)] leading-[1.05] font-bold tracking-tight">
        Keep the conversation moving.
      </h2>
      <div className="mt-9 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {links.map((href) => (
          <Link
            key={href}
            href={href}
            className="group border-border text-ink hover:border-ink flex items-center justify-between gap-4 border bg-white px-6 py-5 text-[15px] font-bold capitalize transition-all duration-300"
          >
            {href.split('/').pop()?.replaceAll('-', ' ')}
            <ArrowUpRight
              size={17}
              className="text-muted-foreground group-hover:text-accent shrink-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </Link>
        ))}
      </div>
    </Section>
  )
}
