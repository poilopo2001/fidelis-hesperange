import { Metadata } from 'next'
import PropertyList from '../../components/PropertyList'
import CityInfo from '../../components/CityInfo'
import JsonLd from '../../components/JsonLd'
import EditorialNav from '../../components/EditorialNav'
import Footer from '../../sections/Footer'
import PropertyTypeGrid from '../../components/PropertyTypeGrid'
import { getParentTypes } from '../../data/propertyTypes'
import { getPropertiesByTypeAndSection } from '../../data/properties'
import { getCityData } from '../../data/cityData'
import { generateCityMetadata } from '../../lib/seo/metadata'
import {
  generateWebPageSchema,
  generateBreadcrumbSchema,
} from '../../lib/seo/schemas'
import {
  generateAdvancedCitySchema,
  generateCityRealEstateDatasetSchema,
  generateCityFAQSchema,
  generateLocalServiceSchema,
} from '../../lib/seo/advancedSchemas'

const sectionId = 'alzingen'

export async function generateMetadata(): Promise<Metadata> {
  const cityData = await getCityData(sectionId)
  return generateCityMetadata(
    cityData?.localite || 'Alzingen',
    'location',
    cityData?.demographique.note
  )
}

export default async function LocationAlzingenPage() {
  const properties = getPropertiesByTypeAndSection('location', 'Alzingen')
  const cityData = await getCityData(sectionId)

  const url = '/location/alzingen'
  
  const schemas = [
    generateWebPageSchema({
      url,
      title: `Louer à ${cityData?.localite || 'Alzingen'} — Fidelis Hesperange`,
      description: cityData?.demographique.note || '',
    }),
    cityData && generateAdvancedCitySchema(cityData, url),
    cityData && generateCityRealEstateDatasetSchema(cityData, url),
    cityData && generateCityFAQSchema(cityData),
    cityData && generateLocalServiceSchema('location', cityData, url),
    generateBreadcrumbSchema([
      { name: 'Location', url: '/location' },
      { name: 'Hesperange', url: '/location/hesperange' },
      { name: cityData?.localite || 'Alzingen', url },
    ]),
  ].filter(Boolean)

  return (
    <>
      <JsonLd data={schemas} />
      <EditorialNav />
      <main>
        <PropertyList
          properties={properties}
          title={cityData ? `Biens à louer à ${cityData.localite}` : 'Biens à louer à Alzingen'}
          subtitle={cityData?.immobilier.atouts || 'Découvrez les biens en location à Alzingen'}
          headingLevel="h1"
        />
        
        {cityData && <CityInfo cityData={cityData} type="location" />}

        <section className="bg-cream border-b border-stone/10">
          <div className="section-editorial py-12">
            <PropertyTypeGrid types={getParentTypes()} basePath="/location" city="alzingen" />
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
