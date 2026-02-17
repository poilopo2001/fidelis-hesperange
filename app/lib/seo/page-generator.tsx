// Générateur de pages SEO pour les sections

import { Metadata } from 'next'
import PropertyList from '../../components/PropertyList'
import JsonLd from '../../components/JsonLd'
import EditorialNav from '../../components/EditorialNav'
import Footer from '../../sections/Footer'
import { getPropertiesByTypeAndSection, getSectionInfo } from '../../data/properties'
import { generateCityMetadata } from './metadata'
import {
  generateWebPageSchema,
  generateBreadcrumbSchema,
  generatePlaceSchema,
} from './schemas'

interface GenerateSectionPageProps {
  section: string
  type: 'achat' | 'location'
}

export function generateSectionPage({ section, type }: GenerateSectionPageProps) {
  const sectionInfo = getSectionInfo(section)
  
  if (!sectionInfo) {
    return null
  }

  const info = sectionInfo
  const metadata: Metadata = generateCityMetadata(info.name, type, info.description)

  function SectionPage() {
    const properties = getPropertiesByTypeAndSection(type, section)
    const url = `/${type}/${section.toLowerCase()}`

    const schemas = [
      generateWebPageSchema({
        url,
        title: `${type === 'achat' ? 'Acheter' : 'Louer'} à ${info.name} — Fidelis Hesperange`,
        description: info.description,
      }),
      generatePlaceSchema(
        info.name,
        info.description,
        url,
        info.name
      ),
      generateBreadcrumbSchema([
        { name: type === 'achat' ? 'Achat' : 'Location', url: `/${type}` },
        { name: info.name, url },
      ]),
    ]

    return (
      <>
        <JsonLd data={schemas} />
        <EditorialNav />
        <main className="pt-24 lg:pt-32">
          <section className="bg-cream border-b border-stone/10">
            <div className="section-editorial py-12">
              <nav aria-label="Breadcrumb" className="mb-4">
                <ol className="flex items-center gap-2 text-body-sm text-stone">
                  <li><a href="/" className="hover:text-brick">Accueil</a></li>
                  <li>/</li>
                  <li><a href={`/${type}`} className="hover:text-brick capitalize">{type}</a></li>
                  <li>/</li>
                  <li className="text-ink" aria-current="page">{info.name}</li>
                </ol>
              </nav>

              <h1 className="font-serif text-display-lg text-ink mb-4">
                {type === 'achat' ? 'Acheter' : 'Louer'} à {info.name}
              </h1>
              <p className="text-editorial text-stone max-w-2xl">
                {info.description}
              </p>
            </div>
          </section>

          <PropertyList
            properties={properties}
            title={`Biens ${type === 'achat' ? 'à vendre' : 'à louer'} à ${info.name}`}
            subtitle={info.description}
          />
        </main>
        <Footer />
      </>
    )
  }

  return { metadata, SectionPage }
}
