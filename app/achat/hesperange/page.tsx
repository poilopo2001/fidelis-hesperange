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

export const metadata: Metadata = generateHesperangeMetadata('achat')

export default async function AchatHesperangePage() {
  const properties = getPropertiesByTypeAndCity('achat', 'Hesperange')
  const cityData = await getCityData('hesperange')

  const url = '/achat/hesperange'
  
  const schemas = [
    generateWebPageSchema({
      url,
      title: 'Achat à Hesperange — Fidelis Hesperange',
      description: 'Achetez votre bien immobilier à Hesperange. Découvrez les biens en vente dans toutes les sections : Alzingen, Fentange, Itzig, Howald.',
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
      { name: 'Achat', url: '/achat' },
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
          title="Tous les biens à vendre"
          subtitle="Maison, appartements et villas en vente à Hesperange et ses sections."
          headingLevel="h1"
        />
        
        {cityData ? (
          <CityInfo cityData={cityData} type="achat" />
        ) : (
          <section className="bg-cream border-b border-stone/10">
            <div className="section-editorial py-12">
              <nav aria-label="Breadcrumb" className="mb-4">
                <ol className="flex items-center gap-2 text-body-sm text-stone">
                  <li><a href="/" className="hover:text-brick">Accueil</a></li>
                  <li>/</li>
                  <li><a href="/achat" className="hover:text-brick">Achat</a></li>
                  <li>/</li>
                  <li className="text-ink" aria-current="page">Hesperange</li>
                </ol>
              </nav>

              <h1 className="font-serif text-display-lg text-ink mb-4">
                Acheter à Hesperange
              </h1>
              <p className="text-editorial text-stone max-w-2xl mb-8">
                Découvrez les biens en vente dans les différentes sections de la commune de Hesperange.
              </p>

              <SectionGrid 
                sections={hesperangeSections.map(s => ({ id: s.id, name: s.name }))}
                basePath="/achat"
              />
            </div>
          </section>
        )}
        <section className="bg-cream border-b border-stone/10">
          <div className="section-editorial py-12">
            <PropertyTypeGrid types={getParentTypes()} basePath="/achat" city="hesperange" />
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
