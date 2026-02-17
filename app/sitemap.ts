import { MetadataRoute } from 'next'
import { properties, hesperangeSections } from './data/properties'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://fidelis.lu'
  
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

  // Pages des biens individuels
  const propertyPages = properties.map((property) => ({
    url: `${baseUrl}/biens/${property.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }))

  return [...staticPages, ...sectionPages, ...propertyPages]
}
