// Schémas JSON-LD avancés avec données des villes

import type { CityData } from '../../data/cityData'
import type { Property } from '../../data/properties'

// Schéma amélioré pour une annonce immobilière avec données de localité
export function generateAdvancedRealEstateListingSchema(
  property: Property, 
  cityData: CityData | null,
  url: string
) {
  const baseSchema = {
    '@context': 'https://schema.org',
    '@type': 'RealEstateListing',
    '@id': `https://www.fidelis.lu/biens/${property.slug}`,
    url: `https://www.fidelis.lu${url}`,
    name: property.title,
    description: property.description,
    image: property.images,
    datePosted: new Date().toISOString(),
    dateModified: new Date().toISOString(),
    
    // Prix
    price: property.price,
    priceCurrency: 'EUR',
    priceValidUntil: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // +90 jours
    
    // Caractéristiques du bien
    floorSize: {
      '@type': 'QuantitativeValue',
      value: property.surface,
      unitCode: 'MTK',
      unitText: 'm²',
    },
    numberOfRooms: property.rooms,
    numberOfBedrooms: property.bedrooms,
    
    // Type de bien
    '@graph': [
      {
        '@type': property.surface > 150 ? 'House' : 'Apartment',
        name: property.title,
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
      },
    ],
    
    // Adresse
    address: {
      '@type': 'PostalAddress',
      streetAddress: property.neighborhood,
      addressLocality: property.section,
      addressRegion: 'Luxembourg',
      addressCountry: 'LU',
    },
    
    // Agence
    broker: {
      '@type': 'RealEstateAgent',
      name: 'Fidelis Hesperange',
      telephone: '+35227456789',
      email: 'contact@fidelis.lu',
      url: 'https://www.fidelis.lu',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '45, Rue de Luxembourg',
        addressLocality: 'Hesperange',
        postalCode: '1818',
        addressCountry: 'LU',
      },
    },
    
    // Disponibilité
    availability: 'https://schema.org/InStock',
    
    // Équipements
    amenityFeature: property.features.map(feature => ({
      '@type': 'LocationFeatureSpecification',
      name: feature,
      value: true,
    })),
  }

  // Enrichir avec les données de la ville si disponibles
  if (cityData) {
    // Ajouter des informations sur le quartier
    const areaServed = {
      '@type': 'Place',
      name: cityData.localite,
      containedInPlace: {
        '@type': 'City',
        name: 'Hesperange',
        address: {
          '@type': 'PostalAddress',
          addressCountry: 'LU',
        },
      },
    }

    // Ajouter les équipements à proximité
    const nearbyAmenities: Record<string, unknown>[] = []
    
    if (cityData.education?.ecoles_fondamentales) {
      cityData.education.ecoles_fondamentales.forEach(ecole => {
        nearbyAmenities.push({
          '@type': 'EducationalOrganization',
          name: ecole.nom,
          additionalType: 'ElementarySchool',
        })
      })
    }
    
    if (cityData.sante?.hopital_proche) {
      nearbyAmenities.push({
        '@type': 'Hospital',
        name: cityData.sante.hopital_proche.nom,
      })
    }
    
    if (cityData.transports?.train?.gare) {
      nearbyAmenities.push({
        '@type': 'TrainStation',
        name: cityData.transports.train.gare,
      })
    }

    return {
      ...baseSchema,
      areaServed,
      about: nearbyAmenities.length > 0 ? nearbyAmenities : undefined,
    }
  }

  return baseSchema
}

// Schéma pour une page de localité (City/Place enrichi)
export function generateAdvancedCitySchema(cityData: CityData, url: string) {
  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': cityData.chef_lieu ? 'City' : 'Place',
    '@id': `https://www.fidelis.lu${url}`,
    name: cityData.localite,
    alternateName: cityData.nom_luxembourgeois,
    description: cityData.demographique.note || `${cityData.localite}, section de la commune de Hesperange`,
    url: `https://www.fidelis.lu${url}`,
    
    // Adresse
    address: {
      '@type': 'PostalAddress',
      addressLocality: cityData.localite,
      postalCode: cityData.code_postal.split('/')[0].trim(),
      addressRegion: 'Luxembourg',
      addressCountry: 'LU',
    },
    
    // Contenu dans Hesperange
    containedInPlace: {
      '@type': 'City',
      name: 'Hesperange',
      address: {
        '@type': 'PostalAddress',
        addressCountry: 'LU',
      },
    },
    
    // Démographie
    population: {
      '@type': 'QuantitativeValue',
      value: cityData.demographique.population,
      unitText: 'habitants',
    },
  }

  // Ajouter les écoles
  if (cityData.education?.ecoles_fondamentales) {
    schema.containsPlace = cityData.education.ecoles_fondamentales.map(ecole => ({
      '@type': 'School',
      name: ecole.nom,
      additionalType: 'ElementarySchool',
    }))
  }

  // Ajouter la gare
  if (cityData.transports?.train?.gare) {
    if (!schema.containsPlace) schema.containsPlace = [] as Record<string, unknown>[]
    (schema.containsPlace as Record<string, unknown>[]).push({
      '@type': 'TrainStation',
      name: cityData.transports.train.gare,
    })
  }

  // Ajouter les commerces
  if (cityData.commerces_services?.supermarches) {
    if (!schema.containsPlace) schema.containsPlace = [] as Record<string, unknown>[]
    cityData.commerces_services.supermarches.forEach(supermarche => {
      (schema.containsPlace as Record<string, unknown>[]).push({
        '@type': 'Store',
        name: supermarche,
      })
    })
  }

  return schema
}

// Schéma Dataset pour les données immobilières de la ville
export function generateCityRealEstateDatasetSchema(cityData: CityData, url: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Dataset',
    name: `Données immobilières — ${cityData.localite}`,
    description: `Prix et tendances du marché immobilier à ${cityData.localite}`,
    url: `https://www.fidelis.lu${url}`,
    creator: {
      '@type': 'RealEstateAgent',
      name: 'Fidelis Hesperange',
    },
    datePublished: new Date().toISOString(),
    license: 'https://creativecommons.org/licenses/by-nc/4.0/',
    distribution: {
      '@type': 'DataDownload',
      contentUrl: `https://www.fidelis.lu${url}`,
      encodingFormat: 'text/html',
    },
    variableMeasured: [
      {
        '@type': 'PropertyValue',
        name: 'Prix moyen au m²',
        value: cityData.immobilier.prix_moyen_m2_vente,
        unitCode: 'EUR',
      },
      {
        '@type': 'PropertyValue',
        name: 'Population',
        value: cityData.demographique.population,
      },
    ],
  }
}

// Schéma FAQ pour la page de localité
export function generateCityFAQSchema(cityData: CityData) {
  const faqs = [
    {
      question: `Quel est le prix moyen de l'immobilier à ${cityData.localite} ?`,
      answer: `Le prix moyen au m² à ${cityData.localite} est de ${cityData.immobilier.prix_moyen_m2_vente.toLocaleString('fr-FR')} € pour l'achat${cityData.immobilier.prix_moyen_m2_location_mois ? ` et ${cityData.immobilier.prix_moyen_m2_location_mois.toLocaleString('fr-FR')} €/mois pour la location` : ''}. Le marché est actuellement ${cityData.immobilier.tendance === 'hausse' ? 'en hausse' : cityData.immobilier.tendance === 'baisse' ? 'en baisse' : 'stable'}.`,
    },
    {
      question: `Combien d'habitants vivent à ${cityData.localite} ?`,
      answer: `${cityData.localite} compte ${cityData.demographique.population.toLocaleString('fr-FR')} habitants (${cityData.demographique.annee_reference}).`,
    },
    {
      question: `Quels sont les transports disponibles à ${cityData.localite} ?`,
      answer: cityData.transports.tram?.ligne 
        ? `${cityData.localite} est desservie par le tram ${cityData.transports.tram.ligne} ${cityData.transports.train?.gare ? `et dispose de la ${cityData.transports.train.gare}` : ''}.`
        : `${cityData.localite} est desservie par les bus ${cityData.transports.bus?.lignes_principales?.slice(0, 3).join(', ') || 'RGTR'}${cityData.transports.train?.gare ? ` et est proche de la ${cityData.transports.train.gare}` : ''}.`,
    },
    {
      question: `Quelles écoles y a-t-il à ${cityData.localite} ?`,
      answer: cityData.education.ecoles_fondamentales 
        ? `${cityData.localite} dispose de ${cityData.education.ecoles_fondamentales.length} école(s) fondamentale(s)${cityData.education.maisons_relais ? ` et ${cityData.education.maisons_relais.length} maison(s) relais` : ''}.`
        : `${cityData.localite} dispose d'écoles fondamentales pour les cycles 1 à 4.`,
    },
    {
      question: `Combien de temps faut-il pour aller à Luxembourg-Ville depuis ${cityData.localite} ?`,
      answer: cityData.transports.distances?.luxembourg_centre?.voiture_min
        ? `Il faut environ ${cityData.transports.distances.luxembourg_centre.voiture_min} minutes en voiture${cityData.transports.distances.luxembourg_centre.tram_min ? `, ${cityData.transports.distances.luxembourg_centre.tram_min} minutes en tram` : ''}${cityData.transports.distances.luxembourg_centre.bus_min ? ` ou ${cityData.transports.distances.luxembourg_centre.bus_min} minutes en bus` : ''} pour rejoindre le centre de Luxembourg-Ville.`
        : `${cityData.localite} est située à proximité de Luxembourg-Ville, accessible en quelques minutes en transport.`,
    },
  ]

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
}

// Schéma Service pour l'agence dans cette zone
export function generateLocalServiceSchema(
  serviceType: 'achat' | 'location',
  cityData: CityData,
  url: string
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: serviceType === 'achat' ? 'RealEstatePurchase' : 'RealEstateRental',
    name: `${serviceType === 'achat' ? 'Achat' : 'Location'} immobilière à ${cityData.localite}`,
    description: `Agence immobilière spécialisée dans l'${serviceType === 'achat' ? 'achat' : 'location'} de biens à ${cityData.localite}. Prix moyen : ${cityData.immobilier.prix_moyen_m2_vente.toLocaleString('fr-FR')} €/m².`,
    url: `https://www.fidelis.lu${url}`,
    provider: {
      '@type': 'RealEstateAgent',
      name: 'Fidelis Hesperange',
      url: 'https://www.fidelis.lu',
    },
    areaServed: {
      '@type': 'Place',
      name: cityData.localite,
      containedInPlace: {
        '@type': 'City',
        name: 'Hesperange',
      },
    },
    offers: {
      '@type': 'Offer',
      priceCurrency: 'EUR',
      price: cityData.immobilier.prix_moyen_m2_vente.toString(),
      unitCode: 'MTK',
    },
  }
}
