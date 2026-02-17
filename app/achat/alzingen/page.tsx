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

const sectionId = 'alzingen'

export async function generateMetadata(): Promise<Metadata> {
  const cityData = await getCityData(sectionId)
  return generateCityMetadata(
    cityData?.localite || 'Alzingen',
    'achat',
    cityData?.demographique.note
  )
}

export default async function AchatAlzingenPage() {
  const properties = getPropertiesByTypeAndSection('achat', 'Alzingen')
  const cityData = await getCityData(sectionId)

  const url = '/achat/alzingen'
  
  const schemas = [
    generateWebPageSchema({
      url,
      title: `Acheter à ${cityData?.localite || 'Alzingen'} — Fidelis Hesperange`,
      description: cityData?.demographique.note || '',
    }),
    cityData && generateAdvancedCitySchema(cityData, url),
    cityData && generateCityRealEstateDatasetSchema(cityData, url),
    cityData && generateCityFAQSchema(cityData),
    cityData && generateLocalServiceSchema('achat', cityData, url),
    generateBreadcrumbSchema([
      { name: 'Achat', url: '/achat' },
      { name: 'Hesperange', url: '/achat/hesperange' },
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
          title={cityData ? `Biens à vendre à ${cityData.localite}` : 'Biens à vendre à Alzingen'}
          subtitle={cityData?.immobilier.atouts || 'Découvrez les biens en vente à Alzingen'}
        />
        
        {cityData && <CityInfo cityData={cityData} type="achat" />}
      </main>
      <Footer />
    </>
  )
}
