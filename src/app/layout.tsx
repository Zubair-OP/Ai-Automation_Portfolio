import type { Metadata } from 'next'
import { Instrument_Sans, JetBrains_Mono, Space_Grotesk } from 'next/font/google'
import { PERSON } from '@/lib/site'
import './globals.css'

const grotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-grotesk',
  display: 'swap',
})

const instrument = Instrument_Sans({
  subsets: ['latin'],
  variable: '--font-instrument',
  display: 'swap',
})

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(PERSON.siteUrl),
  title: {
    default: 'Muhammad Zubair — Full-Stack Developer & AI Automation Engineer',
    template: '%s | Muhammad Zubair',
  },
  description:
    'Muhammad Zubair builds full-stack web applications, AI-powered products, RAG systems, and intelligent automation workflows. React, Node.js, LangChain, n8n, and systems that ship.',
  authors: [{ name: 'Muhammad Zubair', url: PERSON.github }],
  creator: 'Muhammad Zubair',
  keywords: [
    'Full-Stack Developer',
    'AI Automation Engineer',
    'MERN Developer',
    'AI Engineer',
    'RAG systems',
    'n8n automation',
    'LangChain',
    'React Developer',
    'Node.js',
    'Pakistan',
  ],
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large' } },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: PERSON.siteUrl,
    siteName: 'Muhammad Zubair',
    title: 'Muhammad Zubair — Full-Stack Developer & AI Automation Engineer',
    description:
      'Full-stack web applications, AI-powered products, RAG systems, and automation workflows that replace busywork with intelligence.',
    images: [
      {
        url: '/profile.png',
        width: 1024,
        height: 1024,
        alt: 'Muhammad Zubair — Full-Stack Developer & AI Automation Engineer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Muhammad Zubair — Full-Stack Developer & AI Automation Engineer',
    description:
      'Full-stack web applications, AI-powered products, and automation workflows that replace busywork with intelligence.',
    images: ['/profile.png'],
  },
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
  },
  alternates: {
    canonical: '/',
  },
}

export const viewport = {
  themeColor: '#060708',
  width: 'device-width',
  initialScale: 1,
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: PERSON.name,
  url: PERSON.siteUrl,
  image: `${PERSON.siteUrl}/profile.png`,
  jobTitle: PERSON.role,
  email: PERSON.email,
  address: { '@type': 'PostalAddress', addressLocality: 'Pakistan' },
  sameAs: [PERSON.github, PERSON.linkedin],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${grotesk.variable} ${instrument.variable} ${jetbrains.variable}`}>
      <body className="grain bg-graphite-950 font-sans text-ink antialiased" suppressHydrationWarning>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  )
}