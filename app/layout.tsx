import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import localFont from 'next/font/local'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { ScrollToTop } from '@/components/layout/scroll-to-top'
import { WhatsappButton } from '@/components/layout/whatsapp-button'
import { ScrollProgressButton } from '@/components/layout/scroll-progress-button'
import './globals.css'

const manrope = localFont({
  src: '../public/fonts/Manrope-VariableFont_wght.ttf',
  variable: '--font-manrope',
  display: 'swap',
  weight: '200 800',
})

export const metadata: Metadata = {
  title: { default: 'Consulting Services Corporation', template: '%s | CSC' },
  description: 'Consulting Services Corporation helps organizations move from complex questions to practical next steps.',
  metadataBase: new URL('https://consultingservicescorporation.com'),
}
export const viewport: Viewport = { colorScheme: 'light', themeColor: '#ffffff' }
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`bg-background ${manrope.variable}`}>
      <body className="bg-background text-foreground antialiased">
        <ScrollToTop />
        <Header />
        {children}
        <Footer />
        <WhatsappButton />
        <ScrollProgressButton />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
