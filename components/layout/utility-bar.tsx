import Link from 'next/link'
import { contact } from '@/data/site'
import { Container } from '@/components/common'

export function UtilityBar() {
  return (
    <div className="bg-ink hidden text-white lg:block">
      <Container className="flex h-9 items-center justify-between text-[11px] font-medium tracking-wide text-white/70">
        <span>Practical thinking for complex work.</span>
        <div className="flex items-center gap-6">
          <a href={`tel:${contact.phone}`} className="hover:text-accent transition-colors">
            {contact.phone}
          </a>
          <Link href="/contact" className="hover:text-accent transition-colors">
            Client Contact
          </Link>
        </div>
      </Container>
    </div>
  )
}
