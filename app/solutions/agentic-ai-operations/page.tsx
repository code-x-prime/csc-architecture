import type { Metadata } from 'next'
import { AgenticPage } from '@/components/sections'

export const metadata: Metadata = {
  title: 'Agentic AI Operations',
  description:
    'Layer autonomous AI agents over your existing ERP and enterprise systems — no rip-and-replace, no disruptive migration. Automate and orchestrate business processes across the systems you already run.',
  alternates: { canonical: '/solutions/agentic-ai-operations' },
  openGraph: {
    title: 'Agentic AI Operations | CSC',
    description: 'Autonomous AI agents layered over your existing ERP — automate and orchestrate without disruptive migration.',
    type: 'website',
  },
}

export default function AgenticAiOperationsPage() {
  return (
    <main>
      <AgenticPage />
    </main>
  )
}
