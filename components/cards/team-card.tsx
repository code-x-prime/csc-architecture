import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'

export function TeamCard({ name, role, bio, image }: { name: string; role: string; bio: string; image?: string }) {
  if (image) {
    return (
      <article className="group border-border hover:border-primary/25 relative flex flex-col overflow-hidden rounded-2xl border bg-white shadow-[0_5px_25px_rgba(0,0,0,0.025)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_15px_35px_rgba(0,0,0,0.07)]">
        <div className="relative aspect-4/5 w-full shrink-0 overflow-hidden bg-muted">
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />

          <span className="border-white/25 bg-black/20 group-hover:border-primary group-hover:bg-primary absolute top-4 right-4 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-white backdrop-blur-sm transition-all duration-300">
            <ArrowUpRight size={13} />
          </span>

          <div className="absolute right-4 bottom-4 left-4">
            <h3 className="text-[17px] font-bold tracking-[-0.01em] text-white">{name}</h3>
            <p className="text-primary mt-1 text-[11px] leading-4.5 font-semibold tracking-[0.01em] uppercase">{role}</p>
          </div>
        </div>

        <p className="text-muted-foreground p-6 text-[13.5px] leading-relaxed">{bio}</p>
      </article>
    )
  }

  return (
    <article className="group border-border hover:border-ink border bg-white p-7 transition-all duration-300 hover:shadow-lg sm:p-8">
      <span className="bg-accent inline-block h-1 w-10 transition-all duration-300 group-hover:w-16" />
      <p className="text-muted-foreground mt-4 text-[11px] font-bold tracking-[0.18em] uppercase">{role}</p>
      <h3 className="text-ink mt-2 font-sans text-2xl leading-tight font-bold tracking-tight">{name}</h3>
      <p className="text-muted-foreground mt-3 text-[15px] leading-relaxed">{bio}</p>
    </article>
  )
}
