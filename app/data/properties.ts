// Données des biens immobiliers

import { getPropertyTypeBySlug, isParentType } from './propertyTypes'

export interface Property {
  id: string
  slug: string
  type: 'achat' | 'location'
  city: string
  section: string // Section de la commune: Hesperange, Alzingen, Fentange, Itzig, Howald
  neighborhood: string
  title: string
  description: string
  price: number
  priceText: string
  surface: number
  rooms: number
  bedrooms: number
  features: string[]
  images: string[]
  isFeatured?: boolean
  propertyCategory: 'appartement' | 'maison'
  propertySubType: string
}

// Sections de la commune Hesperange
export const hesperangeSections = [
  { id: 'hesperange', name: 'Hesperange', description: 'Chef-lieu de la commune, au cœur du quartier du lac.' },
  { id: 'alzingen', name: 'Alzingen', description: 'Section rurale au nord de la commune, entre champs et forêts.' },
  { id: 'fentange', name: 'Fentange', description: 'Section paisible à l\'est, idéale pour les familles.' },
  { id: 'itzig', name: 'Itzig', description: 'Section résidentielle avec accès direct à Luxembourg-ville.' },
  { id: 'howald', name: 'Howald', description: 'Section dynamique avec gare et commerces de proximité.' },
] as const

export const properties: Property[] = [
  // ===== ACHAT - HESPERANGE (chef-lieu) =====
  {
    id: '1',
    slug: 'villa-contemporaine-vue-lac-hesperange',
    type: 'achat',
    city: 'Hesperange',
    section: 'Hesperange',
    neighborhood: 'Quartier du Lac',
    title: 'Villa contemporaine avec vue sur le lac',
    description: 'Située dans le quartier prisé du lac, cette villa contemporaine offre une vue imprenable sur l\'eau. Grandes baies vitrées, jardin paysager et espaces de vie généreux pour une vie familiale au calme, à 10 minutes du centre-ville.',
    price: 2450000,
    priceText: '2 450 000 €',
    surface: 245,
    rooms: 6,
    bedrooms: 4,
    features: ['Vue lac', 'Jardin 600 m²', 'Garage 2 voitures', 'Piscine possible'],
    images: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80',
    ],
    isFeatured: true,
    propertyCategory: 'maison',
    propertySubType: 'villa',
  },
  {
    id: '2',
    slug: 'maison-charme-renovee-centre-hesperange',
    type: 'achat',
    city: 'Hesperange',
    section: 'Hesperange',
    neighborhood: 'Centre',
    title: 'Maison de charme rénovée',
    description: 'Cette maison de charme située au centre de la section Hesperange a été entièrement rénovée avec des matériaux de qualité. Jardin privatif, cuisine équipée et trois chambres lumineuses. Proximité des écoles et commerces.',
    price: 1890000,
    priceText: '1 890 000 €',
    surface: 180,
    rooms: 5,
    bedrooms: 3,
    features: ['Jardin 300 m²', 'Rénové 2023', 'Proche écoles', 'Cave'],
    images: [
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80',
    ],
    propertyCategory: 'maison',
    propertySubType: 'maison-individuelle',
  },
  {
    id: '3',
    slug: 'appartement-terrasse-dernier-etage-hesperange',
    type: 'achat',
    city: 'Hesperange',
    section: 'Hesperange',
    neighborhood: 'Zone résidentielle',
    title: 'Appartement terrasse dernier étage',
    description: 'Magnifique appartement situé au dernier étage d\'une résidence récente. Grande terrasse de 40m² exposée sud, vue dégagée sur la vallée. Parking intérieur et cave inclus.',
    price: 1350000,
    priceText: '1 350 000 €',
    surface: 145,
    rooms: 4,
    bedrooms: 2,
    features: ['Terrasse 40 m²', 'Parking', 'Cave', 'Résidence récente'],
    images: [
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80',
    ],
    propertyCategory: 'appartement',
    propertySubType: 'penthouse',
  },

  // ===== ACHAT - ALZINGEN =====
  {
    id: '4',
    slug: 'ferme-renovee-alzingen',
    type: 'achat',
    city: 'Hesperange',
    section: 'Alzingen',
    neighborhood: 'Centre Alzingen',
    title: 'Ferme luxembourgeoise rénovée',
    description: 'Authentique ferme luxembourgeoise entièrement rénovée dans la section d\'Alzingen. Beaux volumes, poutres apparentes, cuisine d\'été et grand jardin arboré. Calme absolu à 5 minutes du centre de Hesperange.',
    price: 1650000,
    priceText: '1 650 000 €',
    surface: 220,
    rooms: 6,
    bedrooms: 4,
    features: ['Ferme rénovée', 'Jardin 800 m²', 'Cuisine d\'été', 'Poutres apparentes'],
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=80',
    ],
    isFeatured: true,
    propertyCategory: 'maison',
    propertySubType: 'ferme',
  },
  {
    id: '5',
    slug: 'maison-jardin-alzingen',
    type: 'achat',
    city: 'Hesperange',
    section: 'Alzingen',
    neighborhood: 'Rural',
    title: 'Maison avec jardin paysager',
    description: 'Belle maison familiale dans un cadre champêtre à Alzingen. Jardin paysager de 500m², quatre chambres, garage double. Environnement calme et verdoyant.',
    price: 1250000,
    priceText: '1 250 000 €',
    surface: 165,
    rooms: 5,
    bedrooms: 4,
    features: ['Jardin 500 m²', 'Garage double', 'Calme', 'Verdoyant'],
    images: [
      'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&q=80',
    ],
    propertyCategory: 'maison',
    propertySubType: 'maison-individuelle',
  },

  // ===== ACHAT - FENTANGE =====
  {
    id: '6',
    slug: 'villa-plain-pied-fentange',
    type: 'achat',
    city: 'Hesperange',
    section: 'Fentange',
    neighborhood: 'Résidentiel',
    title: 'Villa plain-pied avec piscine',
    description: 'Villa de plain-pied idéale pour personnes à mobilité réduite ou retraités. Piscine chauffée, jardin clos, trois chambres dont suite parentale. Section paisible de Fentange.',
    price: 1850000,
    priceText: '1 850 000 €',
    surface: 175,
    rooms: 5,
    bedrooms: 3,
    features: ['Plain-pied', 'Piscine', 'Suite parentale', 'Jardin clos'],
    images: [
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80',
    ],
    propertyCategory: 'maison',
    propertySubType: 'plain-pied',
  },
  {
    id: '7',
    slug: 'duplex-terrasse-fentange',
    type: 'achat',
    city: 'Hesperange',
    section: 'Fentange',
    neighborhood: 'Centre',
    title: 'Duplex avec terrasse panoramique',
    description: 'Magnifique duplex en dernier étage dans une résidence récente de Fentange. Terrasse de 50m² avec vue sur la vallée de l\'Alzette. Finitions haut de gamme.',
    price: 1150000,
    priceText: '1 150 000 €',
    surface: 140,
    rooms: 4,
    bedrooms: 2,
    features: ['Terrasse 50 m²', 'Vue panoramique', 'Résidence récente', 'Parking'],
    images: [
      'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=800&q=80',
    ],
    propertyCategory: 'appartement',
    propertySubType: 'duplex',
  },

  // ===== ACHAT - ITZIG =====
  {
    id: '8',
    slug: 'maison-mitoyenne-itzig',
    type: 'achat',
    city: 'Hesperange',
    section: 'Itzig',
    neighborhood: 'Centre Itzig',
    title: 'Maison mitoyenne avec garage',
    description: 'Maison mitoyenne située dans la section d\'Itzig, proche de toutes commodités. Garage, jardin orienté sud, quatre chambres. Accès rapide à Luxembourg-ville.',
    price: 1380000,
    priceText: '1 380 000 €',
    surface: 155,
    rooms: 5,
    bedrooms: 4,
    features: ['Garage', 'Jardin sud', 'Proche Luxembourg', '4 chambres'],
    images: [
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80',
    ],
    propertyCategory: 'maison',
    propertySubType: 'maison-mitoyenne',
  },
  {
    id: '9',
    slug: 'appartement-neuf-itzig',
    type: 'achat',
    city: 'Hesperange',
    section: 'Itzig',
    neighborhood: 'Nouveau quartier',
    title: 'Appartement neuf 3 chambres',
    description: 'Appartement neuf dans une résidence contemporaine à Itzig. Trois chambres, balcon, cave et parking souterrain. Prestations de qualité et proximité transports.',
    price: 980000,
    priceText: '980 000 €',
    surface: 110,
    rooms: 4,
    bedrooms: 3,
    features: ['Neuf', 'Balcon', 'Parking souterrain', 'Proche transports'],
    images: [
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80',
    ],
    propertyCategory: 'appartement',
    propertySubType: 'rez-de-chaussee',
  },

  // ===== ACHAT - HOWALD =====
  {
    id: '10',
    slug: 'maison-gare-howald',
    type: 'achat',
    city: 'Hesperange',
    section: 'Howald',
    neighborhood: 'Proche gare',
    title: 'Maison familiale proche gare',
    description: 'Maison familiale idéalement située à Howald à deux pas de la gare. Quatre chambres, jardin, garage. Parfait pour les frontaliers travaillant à Luxembourg.',
    price: 1680000,
    priceText: '1 680 000 €',
    surface: 195,
    rooms: 6,
    bedrooms: 4,
    features: ['Proche gare', 'Frontaliers', 'Jardin', 'Garage'],
    images: [
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80',
    ],
    isFeatured: true,
    propertyCategory: 'maison',
    propertySubType: 'maison-individuelle',
  },
  {
    id: '11',
    slug: 'appartement-standing-howald',
    type: 'achat',
    city: 'Hesperange',
    section: 'Howald',
    neighborhood: 'Centre',
    title: 'Appartement standing 2 chambres',
    description: 'Bel appartement dans résidence de standing à Howald. Deux chambres, grand balcon, parking. Proche commerces et restaurants.',
    price: 890000,
    priceText: '890 000 €',
    surface: 95,
    rooms: 3,
    bedrooms: 2,
    features: ['Standing', 'Grand balcon', 'Parking', 'Proche commerces'],
    images: [
      'https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?w=800&q=80',
    ],
    propertyCategory: 'appartement',
    propertySubType: 'studio',
  },

  // ===== LOCATION - HESPERANGE (chef-lieu) =====
  {
    id: '12',
    slug: 'appartement-lumineux-lac-hesperange',
    type: 'location',
    city: 'Hesperange',
    section: 'Hesperange',
    neighborhood: 'Quartier du Lac',
    title: 'Appartement lumineux proche du lac',
    description: 'Bel appartement de 3 pièces situé à deux pas du lac d\'Hesperange. Salon lumineux, cuisine équipée, deux chambres avec placards. Parking extérieur disponible.',
    price: 3200,
    priceText: '3 200 €/mois',
    surface: 95,
    rooms: 3,
    bedrooms: 2,
    features: ['Proche lac', 'Cuisine équipée', 'Parking', 'Cave'],
    images: [
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80',
    ],
    propertyCategory: 'appartement',
    propertySubType: 'rez-de-chaussee',
  },
  {
    id: '13',
    slug: 'maison-familiale-jardin-hesperange',
    type: 'location',
    city: 'Hesperange',
    section: 'Hesperange',
    neighborhood: 'Centre',
    title: 'Maison familiale avec jardin',
    description: 'Maison mitoyenne parfaite pour une famille dans la section Hesperange. Quatre chambres, jardin clos de 200m², garage. Proche des écoles fondamentales et du centre commercial.',
    price: 4800,
    priceText: '4 800 €/mois',
    surface: 160,
    rooms: 6,
    bedrooms: 4,
    features: ['Jardin 200 m²', 'Garage', 'Proche écoles', '4 chambres'],
    images: [
      'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&q=80',
    ],
    propertyCategory: 'maison',
    propertySubType: 'maison-mitoyenne',
  },

  // ===== LOCATION - ALZINGEN =====
  {
    id: '14',
    slug: 'maison-campagne-alzingen',
    type: 'location',
    city: 'Hesperange',
    section: 'Alzingen',
    neighborhood: 'Rural',
    title: 'Maison à la campagne',
    description: 'Maison de campagne à louer dans la section d\'Alzingen. Calme absolu, grand jardin, trois chambres. Idéal pour amoureux de la nature.',
    price: 2800,
    priceText: '2 800 €/mois',
    surface: 140,
    rooms: 5,
    bedrooms: 3,
    features: ['Campagne', 'Grand jardin', 'Calme', 'Nature'],
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
    ],
    propertyCategory: 'maison',
    propertySubType: 'maison-individuelle',
  },

  // ===== LOCATION - FENTANGE =====
  {
    id: '15',
    slug: 'appartement-cosy-fentange',
    type: 'location',
    city: 'Hesperange',
    section: 'Fentange',
    neighborhood: 'Centre',
    title: 'Appartement cosy 2 chambres',
    description: 'Appartement chaleureux dans la section paisible de Fentange. Deux chambres, balcon, parking. Parfait pour jeune couple ou petite famille.',
    price: 2400,
    priceText: '2 400 €/mois',
    surface: 85,
    rooms: 3,
    bedrooms: 2,
    features: ['Cosy', 'Balcon', 'Parking', 'Calme'],
    images: [
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80',
    ],
    propertyCategory: 'appartement',
    propertySubType: 'mansarde',
  },

  // ===== LOCATION - ITZIG =====
  {
    id: '16',
    slug: 'studio-meuble-itzig',
    type: 'location',
    city: 'Hesperange',
    section: 'Itzig',
    neighborhood: 'Centre',
    title: 'Studio meublé',
    description: 'Studio entièrement meublé dans la section d\'Itzig. Idéal pour étudiant ou jeune actif. Toutes charges comprises, wifi inclus. Proche bus vers Luxembourg.',
    price: 1200,
    priceText: '1 200 €/mois',
    surface: 35,
    rooms: 1,
    bedrooms: 1,
    features: ['Meublé', 'Charges comprises', 'Wifi', 'Proche bus'],
    images: [
      'https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?w=800&q=80',
    ],
    propertyCategory: 'appartement',
    propertySubType: 'studio',
  },
  {
    id: '17',
    slug: 'duplex-familial-itzig',
    type: 'location',
    city: 'Hesperange',
    section: 'Itzig',
    neighborhood: 'Résidentiel',
    title: 'Duplex familial',
    description: 'Duplex spacieux à louer à Itzig. Trois chambres, terrasse, garage. Accès facile à Luxembourg-ville. Parfait pour famille.',
    price: 3500,
    priceText: '3 500 €/mois',
    surface: 130,
    rooms: 4,
    bedrooms: 3,
    features: ['Duplex', 'Terrasse', 'Garage', 'Familial'],
    images: [
      'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=800&q=80',
    ],
    propertyCategory: 'appartement',
    propertySubType: 'duplex',
  },

  // ===== LOCATION - HOWALD =====
  {
    id: '18',
    slug: 'appartement-gare-howald',
    type: 'location',
    city: 'Hesperange',
    section: 'Howald',
    neighborhood: 'Proche gare',
    title: 'Appartement proche gare',
    description: 'Appartement idéalement situé à Howald à 5 min à pied de la gare. Deux chambres, balcon, parking. Parfait pour frontaliers.',
    price: 2600,
    priceText: '2 600 €/mois',
    surface: 80,
    rooms: 3,
    bedrooms: 2,
    features: ['Proche gare', 'Balcon', 'Parking', 'Frontaliers'],
    images: [
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80',
    ],
    propertyCategory: 'appartement',
    propertySubType: 'rez-de-chaussee',
  },
  {
    id: '19',
    slug: 'maison-jardin-howald',
    type: 'location',
    city: 'Hesperange',
    section: 'Howald',
    neighborhood: 'Centre',
    title: 'Maison avec jardin',
    description: 'Maison à louer à Howald avec jardin privatif. Trois chambres, garage, proche commerces et écoles.',
    price: 4200,
    priceText: '4 200 €/mois',
    surface: 145,
    rooms: 5,
    bedrooms: 3,
    features: ['Jardin', 'Garage', 'Proche écoles', 'Commerces'],
    images: [
      'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&q=80',
    ],
    propertyCategory: 'maison',
    propertySubType: 'maison-individuelle',
  },

  // ===== AUTRES VILLES (hors Hesperange) =====
  {
    id: '20',
    slug: 'maison-architecte-strassen',
    type: 'achat',
    city: 'Strassen',
    section: 'Strassen',
    neighborhood: 'Centre',
    title: 'Maison d\'architecte avec jardin',
    description: 'Maison contemporaine signée par un architecte reconnu à Strassen. Lignes épurées, grandes baies vitrées et matériaux nobles. Jardin paysager de 800m² avec terrasse en ipé.',
    price: 2890000,
    priceText: '2 890 000 €',
    surface: 280,
    rooms: 7,
    bedrooms: 4,
    features: ['Jardin 800 m²', 'Architecte', 'Piscine', 'Home cinema'],
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=80',
    ],
    isFeatured: true,
    propertyCategory: 'maison',
    propertySubType: 'villa',
  },
  {
    id: '21',
    slug: 'appartement-standing-kirchberg',
    type: 'location',
    city: 'Kirchberg',
    section: 'Kirchberg',
    neighborhood: 'Quartier européen',
    title: 'Appartement standing Kirchberg',
    description: 'Magnifique appartement dans résidence de standing. Grand balcon, cuisine équipée haut de gamme, cave et parking souterrain. Proximité institutions européennes.',
    price: 4200,
    priceText: '4 200 €/mois',
    surface: 120,
    rooms: 4,
    bedrooms: 2,
    features: ['Balcon', 'Parking souterrain', 'Standing', 'Proche EU'],
    images: [
      'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=800&q=80',
    ],
    propertyCategory: 'appartement',
    propertySubType: 'penthouse',
  },
]

// Fonctions utilitaires
export function getPropertiesByType(type: 'achat' | 'location'): Property[] {
  return properties.filter(p => p.type === type)
}

export function getPropertiesByCity(city: string): Property[] {
  return properties.filter(p => p.city.toLowerCase() === city.toLowerCase())
}

export function getPropertiesByTypeAndCity(type: 'achat' | 'location', city: string): Property[] {
  return properties.filter(p => p.type === type && p.city.toLowerCase() === city.toLowerCase())
}

export function getPropertiesByTypeAndSection(type: 'achat' | 'location', section: string): Property[] {
  return properties.filter(p => p.type === type && p.section.toLowerCase() === section.toLowerCase())
}

export function getFeaturedProperties(): Property[] {
  return properties.filter(p => p.isFeatured)
}

export function getPropertyBySlug(slug: string): Property | undefined {
  return properties.find(p => p.slug === slug)
}

export function getCities(): string[] {
  return Array.from(new Set(properties.map(p => p.city)))
}

export function getSectionsByCity(city: string): string[] {
  return Array.from(new Set(properties.filter(p => p.city.toLowerCase() === city.toLowerCase()).map(p => p.section)))
}

export function getCitiesByType(type: 'achat' | 'location'): string[] {
  return Array.from(new Set(properties.filter(p => p.type === type).map(p => p.city)))
}

export function getSectionInfo(sectionId: string) {
  return hesperangeSections.find(s => s.id.toLowerCase() === sectionId.toLowerCase())
}

// Filtre par type de bien (parent = agregation de tous les sous-types de la categorie)
export function getPropertiesByTransactionAndPropertyType(
  transaction: 'achat' | 'location',
  propertyTypeSlug: string
): Property[] {
  const config = getPropertyTypeBySlug(propertyTypeSlug)
  if (!config) return []

  // Only Hesperange commune properties
  const hesperangeProps = properties.filter(
    p => p.type === transaction && p.city.toLowerCase() === 'hesperange'
  )

  if (isParentType(propertyTypeSlug)) {
    // Parent type (appartements/maisons): aggregate all sub-types of same category
    return hesperangeProps.filter(p => p.propertyCategory === config.category)
  }

  // Specific sub-type
  return hesperangeProps.filter(p => p.propertySubType === propertyTypeSlug)
}

// Filtre par type de bien + section/ville
export function getPropertiesByTransactionPropertyTypeAndSection(
  transaction: 'achat' | 'location',
  propertyTypeSlug: string,
  section: string
): Property[] {
  const allOfType = getPropertiesByTransactionAndPropertyType(transaction, propertyTypeSlug)
  return allOfType.filter(p => p.section.toLowerCase() === section.toLowerCase())
}
