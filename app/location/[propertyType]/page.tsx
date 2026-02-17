import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import PropertyList from '../../components/PropertyList'
import PropertyTypeInfo from '../../components/PropertyTypeInfo'
import JsonLd from '../../components/JsonLd'
import EditorialNav from '../../components/EditorialNav'
import Footer from '../../sections/Footer'
import { getPropertiesByTransactionAndPropertyType } from '../../data/properties'
import {
  PROPERTY_TYPE_SLUGS,
  HESPERANGE_CITY_SLUGS,
  getPropertyTypeBySlug,
  getSubTypes,
  isParentType,
} from '../../data/propertyTypes'
import { generatePropertyTypeMetadata } from '../../lib/seo/metadata'
import {
  generateWebPageSchema,
  generateBreadcrumbSchema,
  generatePropertyTypeListingSchema,
} from '../../lib/seo/schemas'

interface PageProps {
  params: Promise<{ propertyType: string }>
}

export async function generateStaticParams() {
  return PROPERTY_TYPE_SLUGS.map((slug) => ({ propertyType: slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { propertyType } = await params
  const config = getPropertyTypeBySlug(propertyType)
  if (!config) return {}
  return generatePropertyTypeMetadata('location', config)
}

export default async function LocationPropertyTypePage({ params }: PageProps) {
  const { propertyType } = await params
  const config = getPropertyTypeBySlug(propertyType)
  if (!config) notFound()

  const properties = getPropertiesByTransactionAndPropertyType('location', propertyType)
  const subTypes = isParentType(propertyType)
    ? getSubTypes(propertyType as 'appartements' | 'maisons')
    : undefined

  const url = `/location/${propertyType}`
  const action = 'à louer'

  const schemas = [
    generateWebPageSchema({
      url,
      title: `${config.label} ${action} à Hesperange — Fidelis Hesperange`,
      description: config.description,
    }),
    generatePropertyTypeListingSchema('location', config, url, properties.length),
    generateBreadcrumbSchema([
      { name: 'Location', url: '/location' },
      { name: config.label, url },
    ]),
  ]

  return (
    <>
      <JsonLd data={schemas} />
      <EditorialNav />
      <main>
        <PropertyList
          properties={properties}
          title={`${config.label} ${action} à Hesperange`}
          subtitle={config.editorialContent.intro}
          emptyMessage={`Aucun ${config.labelSingular.toLowerCase()} ${action} pour le moment. Consultez nos autres biens ou contactez-nous pour une recherche personnalisée.`}
          headingLevel="h1"
        />
        <PropertyTypeInfo
          config={config}
          transaction="location"
          subTypes={subTypes}
          cities={HESPERANGE_CITY_SLUGS}
        />
      </main>
      <Footer />
    </>
  )
}
