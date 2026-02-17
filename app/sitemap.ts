import { MetadataRoute } from 'next'
import { properties, hesperangeSections } from './data/properties'
import { PROPERTY_TYPE_SLUGS, HESPERANGE_CITY_SLUGS } from './data/propertyTypes'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.fidelis.lu'

  // Pages statiques principales
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/achat`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/location`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/achat/hesperange`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/location/hesperange`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.8,
    },
  ]

  // Pages des sections (Alzingen, Fentange, Itzig, Howald)
  const sectionPages = hesperangeSections.flatMap((section) => [
    {
      url: `${baseUrl}/achat/${section.id}`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/location/${section.id}`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.7,
    },
  ])

  // Pages par type de bien (17 types x 2 transactions = 34)
  const propertyTypePages = PROPERTY_TYPE_SLUGS.flatMap((typeSlug) => [
    {
      url: `${baseUrl}/achat/${typeSlug}`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/location/${typeSlug}`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.7,
    },
  ])

  // Pages croisees type x ville (17 types x 5 villes x 2 transactions = 170)
  const propertyTypeCityPages = PROPERTY_TYPE_SLUGS.flatMap((typeSlug) =>
    HESPERANGE_CITY_SLUGS.flatMap((citySlug) => [
      {
        url: `${baseUrl}/achat/${typeSlug}/${citySlug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.6,
      },
      {
        url: `${baseUrl}/location/${typeSlug}/${citySlug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.6,
      },
    ])
  )

  // Pages des biens individuels
  const propertyPages = properties.map((property) => ({
    url: `${baseUrl}/biens/${property.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }))

  return [...staticPages, ...sectionPages, ...propertyTypePages, ...propertyTypeCityPages, ...propertyPages]
}
