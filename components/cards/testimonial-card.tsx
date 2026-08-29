import { Quote } from 'lucide-react'

export function TestimonialCard({ quote, attribution }: { quote: string; attribution: string }) {
  return (
    <figure className="border-accent relative border-l-4 bg-white p-8 sm:p-12">
      <Quote size={40} className="text-accent" aria-hidden="true" />
      <blockquote className="text-ink mt-6 max-w-2xl font-sans text-2xl leading-snug font-medium tracking-tight sm:text-3xl">
        &ldquo;{quote}&rdquo;
      </blockquote>
      <figcaption className="text-muted-foreground mt-6 text-sm font-bold tracking-[0.14em] uppercase">{attribution}</figcaption>
    </figure>
  )
}
