import { Metadata } from 'next'
import PropertyList from '../../components/PropertyList'
import SectionGrid from '../../components/SectionGrid'
import PropertyTypeGrid from '../../components/PropertyTypeGrid'
import CityInfo from '../../components/CityInfo'
import JsonLd from '../../components/JsonLd'
import EditorialNav from '../../components/EditorialNav'
import Footer from '../../sections/Footer'
import { getPropertiesByTypeAndCity, hesperangeSections } from '../../data/properties'
import { getCityData } from '../../data/cityData'
import { getParentTypes } from '../../data/propertyTypes'
import { generateHesperangeMetadata } from '../../lib/seo/metadata'
import {
  generateWebPageSchema,
  generateBreadcrumbSchema,
  generatePlaceSchema,
} from '../../lib/seo/schemas'
import {
  generateAdvancedCitySchema,
  generateCityFAQSchema,
} from '../../lib/seo/advancedSchemas'

export const metadata: Metadata = generateHesperangeMetadata('location')

export default async function LocationHesperangePage() {
  const properties = getPropertiesByTypeAndCity('location', 'Hesperange')
  const cityData = await getCityData('hesperange')

  const url = '/location/hesperange'
  
  const schemas = [
    generateWebPageSchema({
      url,
      title: 'Location à Hesperange — Fidelis Hesperange',
      description: 'Louez votre bien immobilier à Hesperange. Découvrez les biens en location dans toutes les sections : Alzingen, Fentange, Itzig, Howald.',
    }),
    generatePlaceSchema(
      'Hesperange',
      'Commune du sud du Luxembourg, prisée pour son cadre de vie et sa proximité avec la capitale.',
      url,
      'Hesperange'
    ),
    cityData && generateAdvancedCitySchema(cityData, url),
    cityData && generateCityFAQSchema(cityData),
    generateBreadcrumbSchema([
      { name: 'Location', url: '/location' },
      { name: 'Hesperange', url },
    ]),
  ].filter(Boolean)

  return (
    <>
      <JsonLd data={schemas} />
      <EditorialNav />
      <main>
        <PropertyList
          properties={properties}
          title="Tous les biens à louer"
          subtitle="Maison et appartements en location à Hesperange et ses sections."
          headingLevel="h1"
        />
        
        {cityData ? (
          <CityInfo cityData={cityData} type="location" />
        ) : (
          <section className="bg-cream border-b border-stone/10">
            <div className="section-editorial py-12">
              <nav aria-label="Breadcrumb" className="mb-4">
                <ol className="flex items-center gap-2 text-body-sm text-stone">
                  <li><a href="/" className="hover:text-brick">Accueil</a></li>
                  <li>/</li>
                  <li><a href="/location" className="hover:text-brick">Location</a></li>
                  <li>/</li>
                  <li className="text-ink" aria-current="page">Hesperange</li>
                </ol>
              </nav>

              <h1 className="font-serif text-display-lg text-ink mb-4">
                Louer à Hesperange
              </h1>
              <p className="text-editorial text-stone max-w-2xl mb-8">
                Découvrez les biens en location dans les différentes sections de la commune de Hesperange.
              </p>

              <SectionGrid 
                sections={hesperangeSections.map(s => ({ id: s.id, name: s.name }))}
                basePath="/location"
              />
            </div>
          </section>
        )}
        <section className="bg-cream border-b border-stone/10">
          <div className="section-editorial py-12">
            <PropertyTypeGrid types={getParentTypes()} basePath="/location" city="hesperange" />
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
