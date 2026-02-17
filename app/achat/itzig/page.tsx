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

const sectionId = 'itzig'

export async function generateMetadata(): Promise<Metadata> {
  const cityData = await getCityData(sectionId)
  return generateCityMetadata(
    cityData?.localite || 'Itzig',
    'achat',
    cityData?.demographique.note
  )
}

export default async function AchatItzigPage() {
  const properties = getPropertiesByTypeAndSection('achat', 'Itzig')
  const cityData = await getCityData(sectionId)

  const url = '/achat/itzig'
  
  const schemas = [
    generateWebPageSchema({
      url,
      title: `Acheter à ${cityData?.localite || 'Itzig'} — Fidelis Hesperange`,
      description: cityData?.demographique.note || '',
    }),
    cityData && generateAdvancedCitySchema(cityData, url),
    cityData && generateCityRealEstateDatasetSchema(cityData, url),
    cityData && generateCityFAQSchema(cityData),
    cityData && generateLocalServiceSchema('achat', cityData, url),
    generateBreadcrumbSchema([
      { name: 'Achat', url: '/achat' },
      { name: 'Hesperange', url: '/achat/hesperange' },
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
          title={cityData ? `Biens à vendre à ${cityData.localite}` : 'Biens à vendre à Itzig'}
          subtitle={cityData?.immobilier.atouts || 'Découvrez les biens en vente à Itzig'}
          headingLevel="h1"
        />
        
        {cityData && <CityInfo cityData={cityData} type="achat" />}

        <section className="bg-cream border-b border-stone/10">
          <div className="section-editorial py-12">
            <PropertyTypeGrid types={getParentTypes()} basePath="/achat" city="itzig" />
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
