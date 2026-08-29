import { ArrowRight } from 'lucide-react'
import { Container, Eyebrow, PrimaryButton, SecondaryButton, ImageReveal, Icon } from '@/components/common'

export function CareersSection() {
  return (
    <section className="border-border border-t bg-white py-16 sm:py-20 ">
      <Container className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <ImageReveal
          src="/images/home/csc-home-talent.jpg"
          alt="Career consultant and candidate in a warm conversation in a bright office lounge"
          aspect="aspect-[4/3]"
        />
        <div>
          <Eyebrow>Careers</Eyebrow>
          <h2 className="text-ink mt-4 font-sans text-[clamp(1.9rem,3.6vw,3rem)] leading-[1.05] font-bold tracking-tight">
            The right people for what&apos;s next.
          </h2>
          <p className="text-muted-foreground mt-5 max-w-lg text-lg leading-relaxed">
            Whether you&apos;re building a team or looking for your next role, CSC brings flexible staffing solutions — permanent
            placements, contract augmentation, and career consulting.
          </p>
          <div className="mt-8 flex flex-wrap gap-6">
            <div className="group text-ink flex items-center gap-2 text-sm font-semibold">
              <Icon
                src="/icons/careers/find-a-job.svg"
                className="text-ink group-hover:text-primary h-5 w-5 transition-colors duration-300"
              />
              Find a Job
            </div>
            <div className="group text-ink flex items-center gap-2 text-sm font-semibold">
              <Icon
                src="/icons/careers/find-talent.svg"
                className="text-ink group-hover:text-primary h-5 w-5 transition-colors duration-300"
              />
              Find Talent
            </div>
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <PrimaryButton href="/careers/find-a-job">
              Explore Careers <ArrowRight size={16} />
            </PrimaryButton>
            <SecondaryButton href="/careers/find-talent">Find Talent</SecondaryButton>
          </div>
        </div>
      </Container>
    </section>
  )
}
