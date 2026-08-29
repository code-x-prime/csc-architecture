import type { Metadata } from 'next'
import { Container, Eyebrow } from '@/components/common'
import { contact } from '@/data/site'

export const metadata: Metadata = {
  title: 'Privacy Policy | Consulting Services Corporation',
  description: 'How Consulting Services Corporation collects, uses, and protects your information.',
  alternates: { canonical: '/privacy' },
}

const sections = [
  {
    heading: 'Information we collect',
    body: 'When you contact us through this website — including our contact form, email, or phone — we collect the information you provide, such as your name, email address, phone number, company, and the details of your inquiry. We also collect limited technical information (like browser type and pages visited) to help us understand how the site is used.',
  },
  {
    heading: 'How we use your information',
    body: 'We use the information you share to respond to inquiries, provide the consulting services you request, and improve our website and communications. We do not sell your personal information to third parties.',
  },
  {
    heading: 'How we share information',
    body: 'We may share information with trusted service providers who help us operate this website and deliver our services (for example, email delivery providers), and only to the extent necessary for them to perform that work. We may also disclose information when required by law.',
  },
  {
    heading: 'Data retention',
    body: 'We retain inquiry and engagement information for as long as needed to fulfill the purposes described here, maintain business records, and comply with legal obligations.',
  },
  {
    heading: 'Your choices',
    body: `You can ask us to access, correct, or delete the personal information we hold about you at any time by contacting us at ${contact.email}.`,
  },
  {
    heading: 'Contact us',
    body: `Questions about this policy can be directed to ${contact.email} or ${contact.phone}.`,
  },
]

export default function PrivacyPage() {
  return (
    <main>
      <section className="bg-muted border-border border-b py-16 sm:py-20">
        <Container>
          <Eyebrow>Company</Eyebrow>
          <h1 className="text-ink mt-4 font-sans text-[clamp(2rem,4vw,3rem)] leading-[1.05] font-bold tracking-tight">Privacy Policy</h1>
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
