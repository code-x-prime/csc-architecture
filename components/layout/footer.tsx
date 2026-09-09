import Link from 'next/link'
import Image from 'next/image'
import { Mail, MapPin, Phone } from 'lucide-react'
import { IconBrandLinkedin, IconBrandFacebook, IconBrandX, IconBrandYoutube } from '@tabler/icons-react'

import { contact, solutions, industries } from '@/data/site'
import { Container } from '@/components/common'

const company: [string, string][] = [
  ['About', '/team'],
  ['Leadership', '/team'],
  ['Careers', '/careers/find-a-job'],
  ['How we help', '/how-we-help/great-framework'],
  ['Contact', '/contact'],
]

const legal: [string, string][] = [
  ['Privacy Policy', '/privacy'],
  ['Terms of Service', '/terms'],
]

const social = [
  { icon: IconBrandLinkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
  { icon: IconBrandX, href: 'https://twitter.com', label: 'X' },
  { icon: IconBrandYoutube, href: 'https://youtube.com', label: 'YouTube' },
  { icon: IconBrandFacebook, href: 'https://facebook.com', label: 'Facebook' },
]

export function Footer() {
  return (
    <footer className="bg-navy relative isolate overflow-hidden text-white">
      {/* Gradient seam along the top edge — the same brand line the sections use */}
      <div aria-hidden className="brand-gradient absolute inset-x-0 top-0 h-0.5" />

      {/* Faint grid texture */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)',
          backgroundSize: '52px 52px',
          maskImage: 'radial-gradient(ellipse 70% 60% at 50% 0%, black 20%, transparent 75%)',
          WebkitMaskImage: 'radial-gradient(ellipse 70% 60% at 50% 0%, black 20%, transparent 75%)',
        }}
      />

      {/* Colour glows, low corners */}
      <div
        aria-hidden
        className="bg-primary pointer-events-none absolute -bottom-40 -left-32 h-96 w-96 rounded-full opacity-15 blur-[140px]"
      />
      <div
        aria-hidden
        className="bg-purple pointer-events-none absolute -right-32 -bottom-40 h-96 w-96 rounded-full opacity-20 blur-[140px]"
      />

      <Container className="relative">
        {/* ============================================================
            MAIN — brand + link columns
        ============================================================ */}
        <div className="grid grid-cols-2 gap-x-8 gap-y-12 py-12 sm:py-14 lg:grid-cols-[1.4fr_1fr_1fr_1fr_1fr]">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-1">
            <Link href="/" className="inline-flex items-center">
              <Image
                src="/logo.png"
                alt="Consulting Services Corporation"
                width={180}
                height={48}
                className="h-12 w-auto object-contain brightness-0 invert"
              />
            </Link>

            <p className="mt-6 max-w-xs text-[13px] leading-[1.7] text-white/50">
              People. Technology. A brighter tomorrow. Helping organizations move from complex questions to practical
              next steps.
            </p>

            <div className="mt-8 flex flex-col gap-3.5">
              <a href={`mailto:${contact.email}`} className="group flex items-start gap-3">
                <Mail size={15} className="text-primary mt-0.5 shrink-0" strokeWidth={1.75} />
                <span className="text-[13px] leading-5 text-white/60 transition-colors group-hover:text-white">
                  {contact.email}
                </span>
              </a>
              <a href={`tel:${contact.phone.replace(/[^\d+]/g, '')}`} className="group flex items-start gap-3">
                <Phone size={15} className="text-blue mt-0.5 shrink-0" strokeWidth={1.75} />
                <span className="text-[13px] leading-5 text-white/60 transition-colors group-hover:text-white">
                  {contact.phone}
                </span>
              </a>
              <div className="flex items-start gap-3">
                <MapPin size={15} className="text-purple mt-0.5 shrink-0" strokeWidth={1.75} />
                <span className="text-[13px] leading-5 text-white/60">{contact.address}</span>
              </div>
            </div>
          </div>

          <FooterColumn title="Solutions">
            {solutions.slice(0, 5).map((item) => (
              <FooterLink key={item.slug} href={`/solutions/${item.slug}`}>
                {item.title}
              </FooterLink>
            ))}
          </FooterColumn>

          <FooterColumn title="Industries">
            {industries.slice(0, 5).map((item) => (
              <FooterLink key={item.slug} href={`/who-we-help/${item.slug}`}>
                {item.title}
              </FooterLink>
            ))}
          </FooterColumn>

          <FooterColumn title="Company">
            {company.map(([label, href]) => (
              <FooterLink key={label} href={href}>
                {label}
              </FooterLink>
            ))}
          </FooterColumn>

          <FooterColumn title="Legal">
            {legal.map(([label, href]) => (
              <FooterLink key={label} href={href}>
                {label}
              </FooterLink>
            ))}

            {/* Social sits under Legal so the column grid stays even */}
            <div className="mt-4 flex items-center gap-2">
              {social.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  aria-label={item.label}
                  target="_blank"
                  rel="noreferrer"
                  className="group relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-lg border border-white/15 text-white/60 transition-all duration-300 hover:scale-105 hover:border-transparent hover:text-white"
                >
                  <span
                    aria-hidden
                    className="brand-gradient absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  />
                  <item.icon size={15} className="relative" />
                </a>
              ))}
            </div>
          </FooterColumn>
        </div>

        {/* ============================================================
            BOTTOM BAR
        ============================================================ */}
        <div className="flex flex-col gap-4 border-t border-white/10 py-7 sm:flex-row sm:items-center sm:justify-between">
          <span className="text-center text-[12px] text-white/40 sm:text-left">
            © {new Date().getFullYear()} Consulting Services Corporation. All rights reserved.
          </span>

          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 sm:justify-end">
            <span className="text-[12px] text-white/40">A more human way to a more intelligent future.</span>
            <span aria-hidden className="hidden h-3 w-px bg-white/15 sm:block" />
            <span className="text-[12px] text-white/40">
              Designed by{' '}
              <a
                href="https://groxmedia.in/"
                target="_blank"
                rel="noreferrer"
                className="hover:text-primary font-semibold text-white/70 transition-colors"
              >
                Grox Media
              </a>
            </span>
          </div>
        </div>
      </Container>
    </footer>
  )
}

function FooterColumn({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="flex items-center gap-2 text-[10px] font-black tracking-[0.2em] text-white uppercase">
        <span aria-hidden className="brand-gradient h-2.5 w-0.5 rounded-full" />
        {title}
      </h3>
      <div className="mt-5 flex flex-col gap-3">{children}</div>
    </div>
  )
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="inline-flex text-[13px] leading-snug text-white/50 transition-all duration-200 hover:translate-x-1 hover:text-white"
    >
      {children}
    </Link>
  )
}
