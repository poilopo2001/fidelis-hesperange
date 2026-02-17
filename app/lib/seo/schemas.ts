// Schémas JSON-LD pour le référencement

import type { Property } from '../../data/properties'

interface SchemaProps {
  url: string
  title: string
  description: string
  image?: string
  type?: string
}

// Site Web
export function generateWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Fidelis Hesperange',
    url: 'https://fidelis.lu',
    description: 'Agence immobilière de luxe à Hesperange. Achat et location de biens d\'exception.',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://fidelis.lu/achat?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  }
}

// Organisation / Agence immobilière
export function generateLocalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'RealEstateAgent',
    name: 'Fidelis Hesperange',
    image: 'https://fidelis.lu/images/logo.png',
    '@id': 'https://fidelis.lu',
    url: 'https://fidelis.lu',
    telephone: '+35227456789',
    email: 'contact@fidelis.lu',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '45, Rue de Luxembourg',
      addressLocality: 'Hesperange',
      postalCode: '1818',
      addressCountry: 'LU',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 49.5753,
      longitude: 6.1403,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '18:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Saturday',
        opens: '10:00',
        closes: '16:00',
      },
    ],
    priceRange: '€€€€',
    areaServed: {
      '@type': 'City',
      name: 'Hesperange',
      containsPlace: [
        { '@type': 'Place', name: 'Alzingen' },
        { '@type': 'Place', name: 'Fentange' },
        { '@type': 'Place', name: 'Itzig' },
        { '@type': 'Place', name: 'Howald' },
      ],
    },
    sameAs: [
      'https://www.facebook.com/fidelishesperange',
      'https://www.linkedin.com/company/fidelishesperange',
    ],
  }
}

// BreadcrumbList
export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `https://fidelis.lu${item.url}`,
    })),
  }
}

// Annonce immobilière (RealEstateListing)
export function generateRealEstateListingSchema(property: Property, url: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'RealEstateListing',
    '@id': `https://fidelis.lu/biens/${property.slug}`,
    url: `https://fidelis.lu${url}`,
    name: property.title,
    description: property.description,
    image: property.images,
    datePosted: new Date().toISOString(),
    relevantOccupation: {
      '@type': 'Occupation',
      name: property.type === 'achat' ? 'Propriétaire' : 'Locataire',
    },
    totalPrice: {
      '@type': 'PriceSpecification',
      price: property.price,
      priceCurrency: 'EUR',
      unitCode: property.type === 'location' ? 'MON' : 'C62',
    },
    floorSize: {
      '@type': 'QuantitativeValue',
      value: property.surface,
      unitCode: 'MTK',
    },
    numberOfRooms: property.rooms,
    numberOfBedrooms: property.bedrooms,
    address: {
      '@type': 'PostalAddress',
      addressLocality: property.section,
      addressRegion: 'Luxembourg',
      addressCountry: 'LU',
    },
    broker: {
      '@type': 'RealEstateAgent',
      name: 'Fidelis Hesperange',
      telephone: '+35227456789',
      email: 'contact@fidelis.lu',
      url: 'https://fidelis.lu',
    },
    propertyType: property.surface > 150 ? 'House' : 'Apartment',
    offerType: property.type === 'achat' ? 'Sale' : 'Lease',
    features: property.features,
  }
}

// Page Web générique
export function generateWebPageSchema({ url, title, description, image }: SchemaProps) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `https://fidelis.lu${url}`,
    url: `https://fidelis.lu${url}`,
    name: title,
    description: description,
    image: image || 'https://fidelis.lu/images/og-default.jpg',
    isPartOf: {
      '@type': 'WebSite',
      '@id': 'https://fidelis.lu',
    },
    about: {
      '@type': 'RealEstateAgent',
      '@id': 'https://fidelis.lu/#agency',
    },
  }
}

// Page de localité (City/Place)
export function generatePlaceSchema(
  name: string,
  description: string,
  url: string,
  section?: string
) {
  const baseSchema = {
    '@context': 'https://schema.org',
    '@type': 'Place',
    '@id': `https://fidelis.lu${url}`,
    name: name,
    description: description,
    url: `https://fidelis.lu${url}`,
    address: {
      '@type': 'PostalAddress',
      addressLocality: name,
      addressRegion: 'Luxembourg',
      addressCountry: 'LU',
    },
    containedInPlace: {
      '@type': 'City',
      name: 'Hesperange',
    },
  }

  if (section === 'Hesperange') {
    return {
      ...baseSchema,
      '@type': 'City',
      containedInPlace: {
        '@type': 'Country',
        name: 'Luxembourg',
      },
    }
  }

  return baseSchema
}

// Article (pour le blog/conseils)
export function generateArticleSchema(
  title: string,
  description: string,
  url: string,
  image: string,
  datePublished: string,
  dateModified?: string
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description: description,
    image: image,
    datePublished: datePublished,
    dateModified: dateModified || datePublished,
    author: {
      '@type': 'Organization',
      name: 'Fidelis Hesperange',
      url: 'https://fidelis.lu',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Fidelis Hesperange',
      logo: {
        '@type': 'ImageObject',
        url: 'https://fidelis.lu/images/logo.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://fidelis.lu${url}`,
    },
  }
}

// FAQ Page
export function generateFAQPageSchema(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
}

// Service (pour les pages expertise)
export function generateServiceSchema(
  name: string,
  description: string,
  url: string,
  areaServed?: string
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: name,
    name: name,
    description: description,
    url: `https://fidelis.lu${url}`,
    provider: {
      '@type': 'RealEstateAgent',
      name: 'Fidelis Hesperange',
      url: 'https://fidelis.lu',
    },
    areaServed: areaServed
      ? {
          '@type': 'Place',
          name: areaServed,
        }
      : undefined,
  }
}
