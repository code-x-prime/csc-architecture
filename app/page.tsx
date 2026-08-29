import { home, solutions } from '@/data/site'
import { SplitHero, FeatureGrid, HowWeWorkSection, HowWeHelpSplit, QuoteSection, ContactSection, CTASection } from '@/components/sections'
import {
  AboutSection,
  TrustSection,
  TrustedBySection,
  TrustLeadershipSection,
  WhyCscSection,
  TechnologySection,
  IndustryGrid,
  TestingBlock,
} from '@/components/home'

export default function Home() {
  return (
    <main>
      {/* Hero */}
      <SplitHero
        eyebrow="Consulting Services Corporation"
        title="Clarity for the work that matters."
        description="Practical consulting support for organizations navigating growth, change, technology, and talent."
        image="/images/home/csc-home-hero.jpg"
        imageAlt="Senior consultants reviewing strategy in a sunlit executive meeting room"
        ctaHref="/contact"
        ctaLabel="Start a conversation"
        secondaryHref="/solutions/bi-analytics"
        secondaryLabel="Explore solutions"
        slides={[
          {
            eyebrow: 'Consulting Services Corporation',
            title: 'Clarity for the work that matters.',
            highlight: 'Clarity',
            description: 'Practical consulting support for organizations navigating growth, change, technology, and talent.',
            secondaryHref: '/solutions/bi-analytics',
            secondaryLabel: 'Explore solutions',
            image: '/images/home/csc-home-hero.jpg',
            imageAlt: 'Senior consultants reviewing strategy in a sunlit executive meeting room',
            card: { label: 'CSC Capabilities', items: ['Digital Transformation', 'Technology Consulting', 'Automated Testing'] },
          },
          {
            eyebrow: 'Technology & Transformation',
            title: 'Aligning technology with the outcomes that matter.',
            highlight: 'Technology',
            description: 'From BI analytics to customer engagement platforms, we help teams turn technology into measurable business value.',
            ctaHref: '/solutions/technology-consulting',
            ctaLabel: 'Explore technology consulting',
            secondaryHref: '/contact',
            secondaryLabel: 'Start a conversation',
            image: '/images/home/csc-home-digital-transformation.jpg',
            imageAlt: 'Business analyst reviewing an enterprise data dashboard in a city office at night',
            card: { label: 'How We Help', items: ['Great Framework', 'Strategic Execution', 'Change Management'] },
          },
        ]}
      />


      {/* Trust statement */}
      <TrustSection />

      {/* Trusted by — stats + leader photo */}
      <TrustedBySection />

      {/* Large editorial intro */}
      <AboutSection />

      {/* Solutions */}
      <FeatureGrid eyebrow="What we solve" title="Capabilities built around your priorities." items={solutions} base="solutions" />

      {/* Process */}
      <HowWeWorkSection />

      {/* Why CSC — dark navy value section */}
      <WhyCscSection />

      {/* Industries */}
      <IndustryGrid />

      {/* How we help — card carousel */}
      <HowWeHelpSplit
        eyebrow="How we help"
        title="Ways we help teams move forward."
        image="/images/home/csc-home-strategy.jpg"
        imageAlt="Consulting team reviewing a strategic framework around a whiteboard"
      />

      {/* Technology / transformation */}
      <TechnologySection />

      {/* Automated software testing block */}
      <TestingBlock />

      {/* Trust & leadership */}
      <TrustLeadershipSection />

      {/* Testimonial */}
      <QuoteSection />

      {/* Final CTA */}
      <CTASection eyebrow="A practical next step" title="Have a question to explore?" cta="Contact CSC" />

      {/* Contact */}
      <ContactSection />
    </main>
  )
}

export function generateMetadata() {
  return {
    title: 'Consulting Services Corporation',
    description: home.description,
    alternates: { canonical: '/' },
    openGraph: { title: 'Consulting Services Corporation', description: home.description, type: 'website' as const },
  }
}
