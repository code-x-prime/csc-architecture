import { team } from '@/data/site'
import { Section, Eyebrow } from '@/components/common'
import { TeamCard } from '@/components/cards'

export function TeamGrid() {
  return (
    <Section>
      <Eyebrow>Our team</Eyebrow>
      <h2 className="text-ink mt-4 max-w-2xl font-sans text-[clamp(1.9rem,3.6vw,2.8rem)] leading-[1.05] font-bold tracking-tight">
        Experience that moves work forward.
      </h2>
      <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {team.map((member, i) => (
          <TeamCard key={`${member.name}-${i}`} name={member.name} role={member.role} bio={member.bio} image={member.image} />
        ))}
      </div>
    </Section>
  )
}
