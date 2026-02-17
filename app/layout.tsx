import type { Metadata } from 'next'
import { Cormorant_Garamond, Inter } from 'next/font/google'
import './globals.css'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://fidelis.lu'),
  title: {
    default: 'Fidelis Hesperange — Immobilier de charme',
    template: '%s — Fidelis Hesperange',
  },
  description: 'Votre agence immobilière de luxe à Hesperange. Une sélection de biens d\'exception dans cette commune prisée au sud de Luxembourg-ville, entre le lac et la capitale.',
  keywords: ['immobilier Hesperange', 'Hesperange', 'agence immobilière Hesperange', 'maison Hesperange', 'appartement Hesperange', 'lac Hesperange', 'acheter Hesperange'],
  authors: [{ name: 'Fidelis Hesperange' }],
  creator: 'Fidelis Hesperange',
  publisher: 'Fidelis Hesperange',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'fr_LU',
    url: 'https://fidelis.lu',
    siteName: 'Fidelis Hesperange',
    title: 'Fidelis Hesperange — Immobilier de charme',
    description: 'Votre agence immobilière de luxe à Hesperange. Biens d\'exception entre le lac et la capitale.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fidelis Hesperange — Immobilier de charme',
    description: 'Votre agence immobilière de luxe à Hesperange. Biens d\'exception entre le lac et la capitale.',
  },
  alternates: {
    canonical: './',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" className={`${cormorant.variable} ${inter.variable}`}>
      <body className="bg-cream text-ink overflow-x-hidden">
        {children}
      </body>
    </html>
  )
}
