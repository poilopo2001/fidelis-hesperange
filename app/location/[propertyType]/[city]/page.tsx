import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import PropertyList from '../../../components/PropertyList'
import PropertyTypeInfo from '../../../components/PropertyTypeInfo'
import CityInfo from '../../../components/CityInfo'
import JsonLd from '../../../components/JsonLd'
import EditorialNav from '../../../components/EditorialNav'
import Footer from '../../../sections/Footer'
import { getPropertiesByTransactionPropertyTypeAndSection } from '../../../data/properties'
import { getCityData } from '../../../data/cityData'
import {
  PROPERTY_TYPE_SLUGS,
  HESPERANGE_CITY_SLUGS,
  HESPERANGE_CITY_NAMES,
  getPropertyTypeBySlug,
  getSubTypes,
  isParentType,
} from '../../../data/propertyTypes'
import { generatePropertyTypeCityMetadata } from '../../../lib/seo/metadata'
import {
  generateWebPageSchema,
  generateBreadcrumbSchema,
  generatePropertyTypeListingSchema,
} from '../../../lib/seo/schemas'
import {
  generateAdvancedCitySchema,
  generateCityFAQSchema,
} from '../../../lib/seo/advancedSchemas'

interface PageProps {
  params: Promise<{ propertyType: string; city: string }>
}

export async function generateStaticParams() {
  const params: { propertyType: string; city: string }[] = []
  for (const typeSlug of PROPERTY_TYPE_SLUGS) {
    for (const citySlug of HESPERANGE_CITY_SLUGS) {
      params.push({ propertyType: typeSlug, city: citySlug })
    }
  }
  return params
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { propertyType, city } = await params
  const config = getPropertyTypeBySlug(propertyType)
  const cityName = HESPERANGE_CITY_NAMES[city]
  if (!config || !cityName) return {}
  return generatePropertyTypeCityMetadata('location', config, cityName)
}

export default async function LocationPropertyTypeCityPage({ params }: PageProps) {
  const { propertyType, city } = await params
  const config = getPropertyTypeBySlug(propertyType)
  const cityName = HESPERANGE_CITY_NAMES[city]
  if (!config || !cityName) notFound()

  const properties = getPropertiesByTransactionPropertyTypeAndSection('location', propertyType, city)
  const cityData = await getCityData(city)
  const subTypes = isParentType(propertyType)
    ? getSubTypes(propertyType as 'appartements' | 'maisons')
    : undefined

  const url = `/location/${propertyType}/${city}`
  const action = 'à louer'

  const schemas = [
    generateWebPageSchema({
      url,
      title: `${config.label} ${action} à ${cityName} — Fidelis Hesperange`,
      description: `${config.label} ${action} à ${cityName}, commune de Hesperange.`,
    }),
    generatePropertyTypeListingSchema('location', config, url, properties.length, cityName),
    cityData && generateAdvancedCitySchema(cityData, url),
    cityData && generateCityFAQSchema(cityData),
    generateBreadcrumbSchema([
      { name: 'Location', url: '/location' },
      { name: config.label, url: `/location/${propertyType}` },
      { name: cityName, url },
    ]),
  ].filter(Boolean)

  return (
    <>
      <JsonLd data={schemas} />
      <EditorialNav />
      <main>
        <PropertyList
          properties={properties}
          title={`${config.label} ${action} à ${cityName}`}
          subtitle={`${config.editorialContent.intro}`}
          emptyMessage={`Aucun ${config.labelSingular.toLowerCase()} ${action} à ${cityName} pour le moment. Consultez nos autres biens ou contactez-nous pour une recherche personnalisée.`}
          headingLevel="h1"
        />
        {cityData && <CityInfo cityData={cityData} type="location" />}
        <PropertyTypeInfo
          config={config}
          transaction="location"
          subTypes={subTypes}
          cities={HESPERANGE_CITY_SLUGS}
          currentCity={cityName}
        />
      </main>
      <Footer />
    </>
  )
}
