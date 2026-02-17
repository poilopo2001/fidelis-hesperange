import { Metadata } from 'next'
import PropertyList from '../components/PropertyList'
import JsonLd from '../components/JsonLd'
import EditorialNav from '../components/EditorialNav'
import Footer from '../sections/Footer'
import { getPropertiesByType } from '../data/properties'
import { generateListMetadata } from '../lib/seo/metadata'
import {
  generateWebPageSchema,
  generateBreadcrumbSchema,
} from '../lib/seo/schemas'

export const metadata: Metadata = generateListMetadata('location')

export default function LocationPage() {
  const properties = getPropertiesByType('location')

  const schemas = [
    generateWebPageSchema({
      url: '/location',
      title: 'Biens à louer — Fidelis Hesperange',
      description: 'Découvrez notre sélection de maisons et appartements à louer à Hesperange et dans les communes environnantes.',
    }),
    generateBreadcrumbSchema([
      { name: 'Biens à louer', url: '/location' },
    ]),
  ]

  return (
    <>
      <JsonLd data={schemas} />
      <EditorialNav />
      <main className="pt-24 lg:pt-32">
        <PropertyList
          properties={properties}
          title="Biens à louer"
          subtitle="Notre sélection de maisons et appartements à louer à Hesperange et aux alentours."
        />
      </main>
      <Footer />
    </>
  )
}
