import { Metadata } from 'next'
import PropertyList from '../../components/PropertyList'
import CityInfo from '../../components/CityInfo'
import JsonLd from '../../components/JsonLd'
import EditorialNav from '../../components/EditorialNav'
import Footer from '../../sections/Footer'
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

const sectionId = 'itzig'

export async function generateMetadata(): Promise<Metadata> {
  const cityData = await getCityData(sectionId)
  return generateCityMetadata(
    cityData?.localite || 'Itzig',
    'location',
    cityData?.demographique.note
  )
}

export default async function LocationItzigPage() {
  const properties = getPropertiesByTypeAndSection('location', 'Itzig')
  const cityData = await getCityData(sectionId)

  const url = '/location/itzig'
  
  const schemas = [
    generateWebPageSchema({
      url,
      title: `Louer à ${cityData?.localite || 'Itzig'} — Fidelis Hesperange`,
      description: cityData?.demographique.note || '',
    }),
    cityData && generateAdvancedCitySchema(cityData, url),
    cityData && generateCityRealEstateDatasetSchema(cityData, url),
    cityData && generateCityFAQSchema(cityData),
    cityData && generateLocalServiceSchema('location', cityData, url),
    generateBreadcrumbSchema([
      { name: 'Location', url: '/location' },
      { name: 'Hesperange', url: '/location/hesperange' },
      { name: cityData?.localite || 'Itzig', url },
    ]),
  ].filter(Boolean)

  return (
    <>
      <JsonLd data={schemas} />
      <EditorialNav />
      <main>
        <PropertyList
          properties={properties}
          title={cityData ? `Biens à louer à ${cityData.localite}` : 'Biens à louer à Itzig'}
          subtitle={cityData?.immobilier.atouts || 'Découvrez les biens en location à Itzig'}
        />
        
        {cityData && <CityInfo cityData={cityData} type="location" />}
      </main>
      <Footer />
    </>
  )
}
