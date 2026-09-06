import type { Metadata } from 'next'
import { AiTalentHero, AiTalentContent } from '@/components/sections'

export const metadata: Metadata = {
  title: 'AI-Powered IT Talent & Delivery',
  description:
    'Platform-certified AI talent and AI-augmented delivery for ServiceNow (ITSM / ITOM / IRM-GRC) and Salesforce — built for regulated, multi-vendor environments.',
  alternates: { canonical: '/solutions/ai-powered-it-talent' },
  openGraph: {
    title: 'AI-Powered IT Talent & Delivery | CSC',
    description: 'Platform-certified AI talent and delivery on ServiceNow and Salesforce, with governance built in.',
    type: 'website',
  },
}

export default function AiPoweredItTalentPage() {
  return (
    <main>
      <AiTalentHero />
      <AiTalentContent />
    </main>
  )
}
