import type { Metadata } from 'next'
import { Container, Eyebrow } from '@/components/common'
import { contact } from '@/data/site'

export const metadata: Metadata = {
  title: 'Terms of Use | Consulting Services Corporation',
  description: 'The terms that govern your use of the Consulting Services Corporation website.',
  alternates: { canonical: '/terms' },
}

const sections = [
  {
    heading: 'Acceptance of terms',
    body: 'By accessing or using this website, you agree to these Terms of Use. If you do not agree, please do not use this site.',
  },
  {
    heading: 'Use of this website',
    body: 'This website is provided for informational purposes about Consulting Services Corporation and its services. You agree to use it only for lawful purposes and not to interfere with its normal operation.',
  },
  {
    heading: 'No professional advice',
    body: 'Content on this website is general in nature and does not constitute consulting, legal, financial, or professional advice specific to your circumstances. Engagements with Consulting Services Corporation are governed by separate signed agreements.',
  },
  {
    heading: 'Intellectual property',
    body: 'All content on this website — including text, graphics, and logos — is the property of Consulting Services Corporation or its licensors and may not be reproduced without permission.',
  },
  {
    heading: 'Limitation of liability',
    body: 'Consulting Services Corporation is not liable for any indirect, incidental, or consequential damages arising from your use of this website, to the fullest extent permitted by law.',
  },
  {
    heading: 'Changes to these terms',
    body: 'We may update these terms from time to time. Continued use of the website after changes are posted constitutes acceptance of the updated terms.',
  },
  {
    heading: 'Contact us',
    body: `Questions about these terms can be directed to ${contact.email} or ${contact.phone}.`,
  },
]

export default function TermsPage() {
  return (
    <main>
      <section className="bg-muted border-border border-b py-16 sm:py-20">
        <Container>
          <Eyebrow>Company</Eyebrow>
          <h1 className="text-ink mt-4 font-sans text-[clamp(2rem,4vw,3rem)] leading-[1.05] font-bold tracking-tight">Terms of Use</h1>
          <p className="text-muted-foreground mt-4 max-w-2xl text-lg leading-relaxed">Last updated August 2026.</p>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container className="max-w-3xl">
          <div className="flex flex-col gap-12">
            {sections.map((s) => (
              <div key={s.heading}>
                <h2 className="text-ink font-sans text-xl font-bold tracking-tight">{s.heading}</h2>
                <p className="text-muted-foreground mt-3 text-[15px] leading-relaxed">{s.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </main>
  )
}
