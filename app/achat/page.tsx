import { Metadata } from 'next'
import PropertyList from '../components/PropertyList'
import JsonLd from '../components/JsonLd'
import EditorialNav from '../components/EditorialNav'
import Footer from '../sections/Footer'
import { getPropertiesByType } from '../data/properties'
import { getAllPropertyTypes } from '../data/propertyTypes'
import PropertyTypeGrid from '../components/PropertyTypeGrid'
import { generateListMetadata } from '../lib/seo/metadata'
import {
  generateWebPageSchema,
  generateBreadcrumbSchema,
} from '../lib/seo/schemas'

export const metadata: Metadata = generateListMetadata('achat')

export default function AchatPage() {
  const properties = getPropertiesByType('achat')

  const schemas = [
    generateWebPageSchema({
      url: '/achat',
      title: 'Biens à vendre — Fidelis Hesperange',
      description: 'Découvrez notre sélection de maisons et appartements à vendre à Hesperange et dans les communes environnantes.',
    }),
    generateBreadcrumbSchema([
      { name: 'Biens à vendre', url: '/achat' },
    ]),
  ]

  return (
    <>
      <JsonLd data={schemas} />
      <EditorialNav />
      <main className="pt-24 lg:pt-32">
        <PropertyList
          properties={properties}
          title="Biens à vendre"
          subtitle="Notre sélection de maisons et appartements à acheter à Hesperange et aux alentours."
        />
        <section className="bg-cream border-b border-stone/10">
          <div className="section-editorial py-12">
            <PropertyTypeGrid types={getAllPropertyTypes()} basePath="/achat" />
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
