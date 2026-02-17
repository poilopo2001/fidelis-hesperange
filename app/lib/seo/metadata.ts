// Métadonnées SEO par type de page

import type { Metadata } from 'next'
import type { Property } from '../../data/properties'
import type { PropertyTypeConfig } from '../../data/propertyTypes'

const siteConfig = {
  name: 'Fidelis Hesperange',
  url: 'https://www.fidelis.lu',
  logo: '/images/logo.png',
  defaultImage: '/images/og-default.jpg',
}

// Métadonnées par défaut
export const defaultMetadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: 'Fidelis Hesperange — Agence immobilière de luxe',
    template: '%s — Fidelis Hesperange',
  },
  description: 'Agence immobilière de luxe à Hesperange. Achat et location de biens d\'exception à Hesperange, Alzingen, Fentange, Itzig et Howald.',
  keywords: [
    'immobilier Hesperange',
    'agence immobilière Hesperange',
    'acheter Hesperange',
    'louer Hesperange',
    'maison Hesperange',
    'appartement Hesperange',
    'immobilier de luxe Luxembourg',
  ],
  authors: [{ name: 'Fidelis Hesperange' }],
  creator: 'Fidelis Hesperange',
  publisher: 'Fidelis Hesperange',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'fr_LU',
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: 'Fidelis Hesperange — Agence immobilière de luxe',
    description: 'Agence immobilière de luxe à Hesperange. Achat et location de biens d\'exception.',
    images: [
      {
        url: `${siteConfig.url}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: 'Fidelis Hesperange — Immobilier de luxe',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fidelis Hesperange — Agence immobilière de luxe',
    description: 'Agence immobilière de luxe à Hesperange. Achat et location de biens d\'exception.',
    images: [`${siteConfig.url}/opengraph-image`],
  },
  verification: {
    google: 'votre-code-verification-google',
  },
  alternates: {
    canonical: './',
  },
}

// Métadonnées pour une annonce immobilière
export function generatePropertyMetadata(property: Property): Metadata {
  const title = `${property.title} — ${property.type === 'achat' ? 'À vendre' : 'À louer'}`
  const description = `${property.description.slice(0, 155)}... ${property.surface}m², ${property.rooms} pièces, ${property.bedrooms} chambres. ${property.priceText}`
  const url = `/biens/${property.slug}`
  
  return {
    title,
    description,
    keywords: [
      `${property.type === 'achat' ? 'acheter' : 'louer'} ${property.section}`,
      property.section.toLowerCase(),
      property.type === 'achat' ? 'maison à vendre' : 'appartement à louer',
      'immobilier Hesperange',
      `${property.surface}m²`,
      `${property.rooms} pièces`,
    ],
    openGraph: {
      type: 'article',
      url: `${siteConfig.url}${url}`,
      title,
      description,
      images: [
        {
          url: property.images[0],
          width: 1200,
          height: 800,
          alt: property.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [property.images[0]],
    },
    alternates: {
      canonical: url,
    },
  }
}

// Métadonnées pour les pages villes/sections
export function generateCityMetadata(
  cityName: string,
  type: 'achat' | 'location',
  description?: string
): Metadata {
  const action = type === 'achat' ? 'Acheter' : 'Louer'
  const actionVerb = type === 'achat' ? 'acheter' : 'louer'
  const defaultDesc = `${action} votre maison ou appartement à ${cityName}. Découvrez les biens ${type === 'achat' ? 'en vente' : 'en location'} dans cette section de la commune de Hesperange.`
  
  return {
    title: `${action} à ${cityName}`,
    description: description || defaultDesc,
    keywords: [
      `${actionVerb} ${cityName.toLowerCase()}`,
      `${type === 'achat' ? 'maison' : 'appartement'} ${cityName.toLowerCase()}`,
      `immobilier ${cityName.toLowerCase()}`,
      `${cityName.toLowerCase()} Hesperange`,
      'immobilier Luxembourg',
    ],
    openGraph: {
      type: 'website',
      url: `${siteConfig.url}/${type}/${cityName.toLowerCase()}`,
      title: `${action} à ${cityName} — Fidelis Hesperange`,
      description: description || defaultDesc,
      images: [
        {
          url: `${siteConfig.url}/opengraph-image`,
          width: 1200,
          height: 630,
          alt: `${action} à ${cityName} — Fidelis Hesperange`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${action} à ${cityName} — Fidelis Hesperange`,
      description: description || defaultDesc,
      images: [`${siteConfig.url}/opengraph-image`],
    },
    alternates: {
      canonical: `/${type}/${cityName.toLowerCase()}`,
    },
  }
}

// Métadonnées pour les pages liste (achat/location)
export function generateListMetadata(type: 'achat' | 'location'): Metadata {
  const title = type === 'achat' ? 'Biens à vendre' : 'Biens à louer'
  const description = type === 'achat'
    ? 'Découvrez notre sélection de maisons et appartements à vendre à Hesperange et dans les communes environnantes.'
    : 'Découvrez notre sélection de maisons et appartements à louer à Hesperange et dans les communes environnantes.'
  
  return {
    title,
    description,
    keywords: [
      type === 'achat' ? 'acheter' : 'louer',
      type === 'achat' ? 'biens à vendre' : 'locations',
      'immobilier Hesperange',
      'maison Hesperange',
      'appartement Hesperange',
      'immobilier Luxembourg',
    ],
    openGraph: {
      type: 'website',
      url: `${siteConfig.url}/${type}`,
      title: `${title} — Fidelis Hesperange`,
      description,
      images: [
        {
          url: `${siteConfig.url}/opengraph-image`,
          width: 1200,
          height: 630,
          alt: `${title} — Fidelis Hesperange`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} — Fidelis Hesperange`,
      description,
      images: [`${siteConfig.url}/opengraph-image`],
    },
    alternates: {
      canonical: `/${type}`,
    },
  }
}

// Métadonnées pour la page Hesperange globale
export function generateHesperangeMetadata(type: 'achat' | 'location'): Metadata {
  const action = type === 'achat' ? 'Achat' : 'Location'
  const actionVerb = type === 'achat' ? 'acheter' : 'louer'
  
  return {
    title: `${type === 'achat' ? 'Achat' : 'Location'} à Hesperange`,
    description: `${type === 'achat' ? 'Achetez' : 'Louez'} votre bien immobilier à Hesperange. Découvrez les ${type === 'achat' ? 'biens en vente' : 'locations'} dans toutes les sections : Alzingen, Fentange, Itzig, Howald.`,
    keywords: [
      `${actionVerb} hesperange`,
      `immobilier hesperange ${type}`,
      'maison hesperange',
      'appartement hesperange',
      'alzingen',
      'fentange',
      'itzig',
      'howald',
    ],
    openGraph: {
      type: 'website',
      url: `${siteConfig.url}/${type}/hesperange`,
      title: `${action} à Hesperange — Fidelis Hesperange`,
      description: `${type === 'achat' ? 'Achetez' : 'Louez'} votre bien immobilier à Hesperange. Découvrez les ${type === 'achat' ? 'biens en vente' : 'locations'} dans toutes les sections.`,
      images: [
        {
          url: `${siteConfig.url}/opengraph-image`,
          width: 1200,
          height: 630,
          alt: `${action} à Hesperange — Fidelis Hesperange`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${action} à Hesperange — Fidelis Hesperange`,
      description: `${type === 'achat' ? 'Achetez' : 'Louez'} votre bien immobilier à Hesperange. Découvrez les ${type === 'achat' ? 'biens en vente' : 'locations'} dans toutes les sections.`,
      images: [`${siteConfig.url}/opengraph-image`],
    },
    alternates: {
      canonical: `/${type}/hesperange`,
    },
  }
}

// Métadonnées pour les pages type de bien
export function generatePropertyTypeMetadata(
  transaction: 'achat' | 'location',
  config: PropertyTypeConfig
): Metadata {
  const action = transaction === 'achat' ? 'à vendre' : 'à louer'
  const verb = transaction === 'achat' ? 'Achetez' : 'Louez'
  const title = `${config.label} ${action} à Hesperange`
  const description = `${verb} un ${config.labelSingular.toLowerCase()} à Hesperange. ${config.description}`
  const url = `/${transaction}/${config.slug}`

  return {
    title,
    description,
    keywords: [
      `${config.labelSingular.toLowerCase()} ${transaction === 'achat' ? 'à vendre' : 'à louer'} hesperange`,
      `${config.slug} hesperange`,
      `${transaction} ${config.labelSingular.toLowerCase()} hesperange`,
      'immobilier Hesperange',
      'immobilier Luxembourg',
    ],
    openGraph: {
      type: 'website',
      url: `${siteConfig.url}${url}`,
      title: `${title} — Fidelis Hesperange`,
      description,
      images: [
        {
          url: `${siteConfig.url}/opengraph-image`,
          width: 1200,
          height: 630,
          alt: `${title} — Fidelis Hesperange`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} — Fidelis Hesperange`,
      description,
      images: [`${siteConfig.url}/opengraph-image`],
    },
    alternates: {
      canonical: url,
    },
  }
}

// Métadonnées pour les pages type de bien + ville
export function generatePropertyTypeCityMetadata(
  transaction: 'achat' | 'location',
  config: PropertyTypeConfig,
  cityName: string
): Metadata {
  const action = transaction === 'achat' ? 'à vendre' : 'à louer'
  const verb = transaction === 'achat' ? 'Achetez' : 'Louez'
  const title = `${config.label} ${action} à ${cityName}`
  const description = `${verb} un ${config.labelSingular.toLowerCase()} à ${cityName}, section de la commune de Hesperange. ${config.description}`
  const url = `/${transaction}/${config.slug}/${cityName.toLowerCase()}`

  return {
    title,
    description,
    keywords: [
      `${config.labelSingular.toLowerCase()} ${transaction === 'achat' ? 'à vendre' : 'à louer'} ${cityName.toLowerCase()}`,
      `${config.slug} ${cityName.toLowerCase()}`,
      `immobilier ${cityName.toLowerCase()}`,
      `${cityName.toLowerCase()} Hesperange`,
      'immobilier Luxembourg',
    ],
    openGraph: {
      type: 'website',
      url: `${siteConfig.url}${url}`,
      title: `${title} — Fidelis Hesperange`,
      description,
      images: [
        {
          url: `${siteConfig.url}/opengraph-image`,
          width: 1200,
          height: 630,
          alt: `${title} — Fidelis Hesperange`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} — Fidelis Hesperange`,
      description,
      images: [`${siteConfig.url}/opengraph-image`],
    },
    alternates: {
      canonical: url,
    },
  }
}

// Breadcrumbs pour le SEO
export function generateBreadcrumbs(
  items: { name: string; url: string }[]
): { name: string; url: string }[] {
  return [{ name: 'Accueil', url: '/' }, ...items]
}
