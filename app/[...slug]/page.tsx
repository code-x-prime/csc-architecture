import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { pages, solutions, howWeHelp, careers, industryImages, heroImages } from '@/data/site'
import {
  EditorialHero,
  ParticleHero,
  BeamHero,
  GlowHero,
  CareersHero,
  ImageHero,
  ContentSections,
  FeatureGrid,
  ProcessRibbon,
  HighlightFeatureSection,
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

  return (
    <main>
      {isSolution ? (
        <ParticleHero eyebrow={page.eyebrow} title={page.title} description={page.description} tag="Solutions" />
      ) : isIndustry ? (
        <BeamHero
          badge="Who We Help"
          title={page.title}
          description={page.description}
          secondaryHref="/contact"
          secondaryLabel="Talk to our team"
          activeSlug={path.replace('who-we-help/', '')}
        />
      ) : isHelp ? (
        <GlowHero
          eyebrow="How We Help"
          title={page.title}
          description={page.description}
          secondaryHref="/contact"
          secondaryLabel="Talk to our team"
        />
      ) : isCareer ? (
        <CareersHero
          title={page.title}
          description={page.description}
          image={heroImage}
          imageAlt={`${page.title} — Consulting Services Corporation`}
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

      {isSolution && <ProcessRibbon eyebrow="Our approach" title="How we deliver this solution." />}
      {isHelp && <ProcessRibbon eyebrow="Methodology" title="A structured path to lasting change." />}

      {isIndustry && (
        <HighlightFeatureSection
          eyebrow="Industry focus"
          title={`Practical support for ${page.title.toLowerCase()} organizations.`}
          body="CSC works alongside industry leaders to translate priorities into structured, actionable plans — combining sector context with hands-on execution support."
          image={heroImage}
          imageAlt={`${page.title} — Consulting Services Corporation`}
        />
      )}

      {isCareer && (
        <HighlightFeatureSection
          eyebrow="Why CSC"
          title="People-first, outcome-driven staffing."
          body="Whether you're building a team or your next role, CSC brings a practical, relationship-led approach to every engagement."
          image={heroImage}
          imageAlt={`${page.title} — Consulting Services Corporation`}
        />
      )}

      <FeatureGrid
        eyebrow="Next perspective"
        title={isIndustry ? 'Relevant ways to move forward.' : 'Related capabilities.'}
        items={cards}
        base={isIndustry ? 'solutions' : path.split('/')[0]}
      />

      <WhyCscSection />

      <RelatedPages links={page.related} />
      <CTASection title="Let's discuss what comes next." />
    </main>
  )
}

function TeamPage() {
  return (
    <main>
      <ImageHero
        eyebrow="Company"
        title="The people behind practical progress."
        description="Consulting Services Corporation brings structure, perspective, and execution support to complex work."
        image="/images/team/csc-hero-team.jpg"
        imageAlt="Leadership team in discussion in a high-rise meeting room overlooking the city"
      />
      <TeamGrid />
      <WhyCscSection />
      <QuoteSection />
      <CTASection title="Bring us into the conversation." cta="Contact our team" />
    </main>
  )
}

function ContactPage() {
  return (
    <main>
      <ImageHero
        eyebrow="Company"
        title="Start with a question."
        description="Tell us what you are working through, and we will route your inquiry to the right conversation."
        image="/images/contact/csc-hero-contact.jpg"
        imageAlt="Colleagues in conversation in a modern consulting office reception"
      />
      <ContactSection />
      <QuoteSection />
      <CTASection title="Ready to talk it through?" />
    </main>
  )
}
