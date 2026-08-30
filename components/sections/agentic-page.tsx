'use client'

import { useState } from 'react'
import { AgenticHero } from './agentic-hero'
import { AgenticContent } from './agentic-content'
import { WhitePaperDialog } from './white-paper-dialog'
import { CTASection } from './cta-section'

export function AgenticPage() {
  const [dialogOpen, setDialogOpen] = useState(false)

  return (
    <>
      <AgenticHero onRequestWhitePaper={() => setDialogOpen(true)} />
      <AgenticContent onRequestWhitePaper={() => setDialogOpen(true)} />
      <CTASection
        eyebrow="Agentic AI Operations"
        title="Let's map your path to agentic operations."
        description="Tell us about your current ERP and systems landscape — we'll show you where agentic AI can start delivering value first."
      />
      <WhitePaperDialog open={dialogOpen} onClose={() => setDialogOpen(false)} />
    </>
  )
}
