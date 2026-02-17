import type { Metadata } from 'next'
import EditorialNav from './components/EditorialNav'
import EditorialHero from './sections/EditorialHero'
import PressBar from './sections/PressBar'
import PropertyGrid from './sections/PropertyGrid'
import ExpertiseSection from './sections/ExpertiseSection'
import ProcessSection from './sections/ProcessSection'
import AboutSection from './sections/AboutSection'
import TeamSection from './sections/TeamSection'
import TestimonialsSection from './sections/TestimonialsSection'
import JournalSection from './sections/JournalSection'
import CTASection from './sections/CTASection'
import Footer from './sections/Footer'
import JsonLd from './components/JsonLd'
import {
  generateWebsiteSchema,
  generateLocalBusinessSchema,
  generateWebPageSchema,
} from './lib/seo/schemas'

export const metadata: Metadata = {
  metadataBase: new URL('https://fidelis.lu'),
  title: 'Fidelis Hesperange — Agence immobilière de luxe',
  description: 'Agence immobilière de luxe à Hesperange. Achat et location de biens d\'exception à Hesperange, Alzingen, Fentange, Itzig et Howald.',
  keywords: [
    'immobilier Hesperange',
    'agence immobilière Hesperange',
    'acheter Hesperange',
    'louer Hesperange',
    'maison Hesperange',
    'appartement Hesperange',
    'immobilier de luxe Luxembourg',
    'Alzingen',
    'Fentange',
    'Itzig',
    'Howald',
  ],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    url: 'https://fidelis.lu',
    title: 'Fidelis Hesperange — Agence immobilière de luxe',
    description: 'Agence immobilière de luxe à Hesperange. Achat et location de biens d\'exception.',
    images: [
      {
        url: 'https://fidelis.lu/images/og-default.jpg',
        width: 1200,
        height: 630,
        alt: 'Fidelis Hesperange — Immobilier de luxe',
      },
    ],
  },
}

export default function Home() {
  const schemas = [
    generateWebsiteSchema(),
    generateLocalBusinessSchema(),
    generateWebPageSchema({
      url: '/',
      title: 'Fidelis Hesperange — Agence immobilière de luxe',
      description: 'Agence immobilière de luxe à Hesperange. Achat et location de biens d\'exception.',
    }),
  ]

  return (
    <>
      <JsonLd data={schemas} />
      <EditorialNav />
      <main>
        <EditorialHero />
        <PressBar />
        <PropertyGrid />
        <ExpertiseSection />
        <ProcessSection />
        <AboutSection />
        <TeamSection />
        <TestimonialsSection />
        <JournalSection />
        <CTASection />
      </main>
      <Footer />
    </>
  )
}
