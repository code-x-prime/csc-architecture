import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { pages, solutions, howWeHelp, careers, industryImages, heroImages } from '@/data/site'
import {
  EditorialHero,
  SolutionHero,
  HelpHero,
  HelpContentSections,
  HelpOutcomeBand,
  IndustryHero,
  IndustryContentSections,
  IndustryFocusBand,
  CareerHero,
  CareerContentSections,
  CareerTrackBand,
  CompanyHero,
  ContentSections,
  FeatureGrid,
  ProcessRibbon,
  RelatedPages,
  CTASection,
  TeamGrid,
  ContactSection,
  QuoteSection,
} from '@/components/sections'
import { WhyCscSection } from '@/components/home'

export function generateStaticParams() {
  return pages.map((page) => ({ slug: page.slug.split('/') }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string[] }> }): Promise<Metadata> {
  const { slug } = await params
  const page = pages.find((p) => p.slug === slug.join('/'))
  return page
    ? {
        title: page.title,
        description: page.description,
        alternates: { canonical: `/${page.slug}` },
        openGraph: { title: `${page.title} | CSC`, description: page.description, type: 'website' },
      }
    : {}
}

function relatedItems(path: string) {
  if (path === 'solutions/automated-software-testing')
    return solutions.filter((x) => ['functional-test', 'performance-test-automation', 'regression-test-automation'].includes(x.slug))
  if (path.startsWith('solutions/')) return solutions.filter((x) => x.slug !== path.replace('solutions/', '')).slice(0, 4)
  if (path.startsWith('how-we-help/')) return howWeHelp.filter((x) => x.slug !== path.replace('how-we-help/', '')).slice(0, 4)
  if (path.startsWith('who-we-help/')) return solutions.slice(0, 4)
  return careers.filter((x) => x.slug !== path.replace('careers/', '')).slice(0, 4)
}

export default async function Page({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params
  const path = slug.join('/')
  if (path === 'team') return <TeamPage />
  if (path === 'contact') return <ContactPage />
  const page = pages.find((p) => p.slug === path)
  if (!page) notFound()

  const cards = relatedItems(path)
  const isSolution = path.startsWith('solutions/')
  const isIndustry = path.startsWith('who-we-help/')
  const isCareer = path.startsWith('careers/')
  const isHelp = path.startsWith('how-we-help/')

  const heroImage = isIndustry ? (industryImages[path.replace('who-we-help/', '')] ?? industryImages.technology) : heroImages[path]

  /* Careers splits into two audiences, so its pages are built around that
     divide: a two-track hero, an accordion body, and a track-specific process. */
  if (isCareer) {
    const careerSlug = path.replace('careers/', '')
    const isCandidate = ['find-a-job', 'career-consulting'].includes(careerSlug)

    return (
      <main>
        <CareerHero
          title={page.title}
          description={page.description}
          image={heroImage}
          activeSlug={careerSlug}
        />

        <CareerContentSections sections={page.sections} />

        <CareerTrackBand isCandidate={isCandidate} index="03" />

        <FeatureGrid
          eyebrow="Next perspective"
          title="More ways we can help."
          items={cards}
          base="careers"
          index="04"
          ctaLabel="Explore careers"
        />

        <RelatedPages links={page.related} index="05" />
        <CTASection
          title={isCandidate ? 'Ready for your next move?' : 'Need the right people?'}
          description={
            isCandidate
              ? 'Send us your background and what you want next. We will tell you honestly whether we can help.'
              : 'Tell us the role, the team, and the timeline. We will come back with a shortlist worth reading.'
          }
          cta={isCandidate ? 'Send us your resume' : 'Talk to our team'}
          index="06"
        />
      </main>
    )
  }

  /* Industry pages lead with sector photography and lay their content out as
     a card grid — distinct from both the solution and how-we-help families. */
  if (isIndustry) {
    return (
      <main>
        <IndustryHero
          title={page.title}
          description={page.description}
          image={heroImage}
          imageAlt={`${page.title} — Consulting Services Corporation`}
          activeSlug={path.replace('who-we-help/', '')}
        />

        <IndustryContentSections sections={page.sections} />

        <IndustryFocusBand
          title={`Practical support for ${page.title.toLowerCase()} organizations.`}
          body="CSC works alongside industry leaders to translate priorities into structured, actionable plans — combining sector context with hands-on execution support."
          image={heroImage}
          imageAlt={`${page.title} — Consulting Services Corporation`}
          index="03"
        />

        <FeatureGrid
          eyebrow="Next perspective"
          title="Relevant ways to move forward."
          items={cards}
          base="solutions"
          index="04"
          ctaLabel="Explore all solutions"
        />

        <WhyCscSection index="05" />

        <RelatedPages links={page.related} index="06" />
        <CTASection title="Let's discuss what comes next." index="07" />
      </main>
    )
  }

  /* How We Help pages get their own light, rail-led composition rather than
     the shared inner-page stack, so the section reads as a distinct place. */
  if (isHelp) {
    return (
      <main>
        <HelpHero
          title={page.title}
          description={page.description}
          image={heroImage}
          imageAlt={`${page.title} — Consulting Services Corporation`}
          activeSlug={path.replace('how-we-help/', '')}
        />

        <HelpContentSections sections={page.sections} />

        <ProcessRibbon eyebrow="Methodology" title="A structured path to lasting change." index="03" />

        <HelpOutcomeBand index="04" />

        <FeatureGrid
          eyebrow="Next perspective"
          title="Related ways we help."
          items={cards}
          base="how-we-help"
          index="05"
          ctaLabel="Explore how we help"
        />

        <RelatedPages links={page.related} index="06" />
        <CTASection title="Let's discuss what comes next." index="07" />
      </main>
    )
  }

  return (
    <main>
      {isSolution ? (
        <SolutionHero
          eyebrow={page.eyebrow}
          title={page.title}
          description={page.description}
          image={heroImage}
          ctaHref="/contact"
          ctaLabel="Start a conversation"
          secondaryHref="/solutions/agentic-ai-operations"
          secondaryLabel="Explore Agentic AI"
          tag="Solutions"
        />
      ) : (
        <EditorialHero
          eyebrow={page.eyebrow}
          title={page.title}
          description={page.description}
          image={heroImage}
          imageAlt={`${page.title} — Consulting Services Corporation`}
        />
      )}
      <ContentSections sections={page.sections} />

      {isSolution && (
        <ProcessRibbon
          eyebrow="Our approach"
          title="How we deliver this solution."
          index={String(page.sections.length + 2).padStart(2, '0')}
        />
      )}
      <FeatureGrid
        eyebrow="Next perspective"
        title="Related capabilities."
        items={cards}
        base={path.split('/')[0]}
        index={String(page.sections.length + 3).padStart(2, '0')}
        ctaLabel="Explore all solutions"
      />

      <WhyCscSection index={String(page.sections.length + 4).padStart(2, '0')} />

      <RelatedPages links={page.related} index={String(page.sections.length + 5).padStart(2, '0')} />
      <CTASection title="Let's discuss what comes next." index={String(page.sections.length + 6).padStart(2, '0')} />
    </main>
  )
}

function TeamPage() {
  return (
    <main>
      <CompanyHero
        title="The people behind practical progress."
        highlight="practical progress."
        description="Consulting Services Corporation brings structure, perspective, and execution support to complex work — led by people who have done it themselves."
        ctaHref="/contact"
        ctaLabel="Talk to our team"
        secondaryHref="/solutions/bi-analytics"
        secondaryLabel="Explore solutions"
        activePath="/team"
      />
      <TeamGrid index="02" />
      <WhyCscSection index="03" />
      <QuoteSection index="04" />
      <CTASection title="Bring us into the conversation." cta="Contact our team" index="05" />
    </main>
  )
}

function ContactPage() {
  return (
    <main>
      <CompanyHero
        title="Start with a question."
        highlight="a question."
        description="Tell us what you are working through, and we will route your inquiry to the right conversation — usually within one business day."
        ctaHref="#contact-form"
        ctaLabel="Send us a message"
        secondaryHref="/team"
        secondaryLabel="Meet the team"
        activePath="/contact"
      />
      <ContactSection id="contact-form" index="02" />
      <QuoteSection index="03" />
      <CTASection title="Ready to talk it through?" index="04" />
    </main>
  )
}
