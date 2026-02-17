// Source de verite unique pour les types de biens immobiliers

export interface PropertyTypeConfig {
  slug: string
  label: string
  labelSingular: string
  category: 'appartement' | 'maison'
  parent: 'appartements' | 'maisons' | null
  description: string
  editorialContent: {
    intro: string
    features: string[]
    priceRange?: string
  }
}

export const HESPERANGE_CITY_SLUGS = ['hesperange', 'alzingen', 'fentange', 'itzig', 'howald'] as const

export const HESPERANGE_CITY_NAMES: Record<string, string> = {
  hesperange: 'Hesperange',
  alzingen: 'Alzingen',
  fentange: 'Fentange',
  itzig: 'Itzig',
  howald: 'Howald',
}

const propertyTypes: PropertyTypeConfig[] = [
  // === APPARTEMENTS (parent + 7 sous-types) ===
  {
    slug: 'appartements',
    label: 'Appartements',
    labelSingular: 'Appartement',
    category: 'appartement',
    parent: null,
    description: 'Appartements de standing en vente et en location dans la commune de Hesperange.',
    editorialContent: {
      intro: 'La commune de Hesperange propose un large choix d\'appartements, du studio fonctionnel au penthouse avec terrasse panoramique. La proximite de Luxembourg-ville et la qualite de vie locale en font un secteur tres recherche.',
      features: [
        'Residences recentes avec ascenseur et parking souterrain',
        'Proximite des transports en commun (tram, bus, gare)',
        'Espaces verts et promenades autour du lac',
        'Ecoles fondamentales et creches a proximite',
      ],
      priceRange: 'De 500 000 a 1 500 000 EUR selon la surface et la localisation',
    },
  },
  {
    slug: 'studios',
    label: 'Studios',
    labelSingular: 'Studio',
    category: 'appartement',
    parent: 'appartements',
    description: 'Studios et petites surfaces ideals pour etudiants ou jeunes actifs a Hesperange.',
    editorialContent: {
      intro: 'Les studios a Hesperange attirent une clientele de jeunes professionnels et d\'etudiants. Leur superficie compacte et leurs charges reduites en font un premier investissement accessible sur le marche luxembourgeois.',
      features: [
        'Superficie de 25 a 45 m² en moyenne',
        'Charges mensuelles reduites',
        'Ideal premier achat ou investissement locatif',
        'Forte demande locative toute l\'annee',
      ],
      priceRange: 'De 300 000 a 600 000 EUR',
    },
  },
  {
    slug: 'penthouses',
    label: 'Penthouses',
    labelSingular: 'Penthouse',
    category: 'appartement',
    parent: 'appartements',
    description: 'Penthouses et appartements de prestige aux derniers etages a Hesperange.',
    editorialContent: {
      intro: 'Les penthouses de Hesperange offrent des prestations haut de gamme : terrasses panoramiques, grandes surfaces vitrées et vues degagees sur la vallee de l\'Alzette. Un marche de niche pour acquereurs exigeants.',
      features: [
        'Terrasses privatives de 30 a 80 m²',
        'Vues degagees sur la vallee ou le lac',
        'Finitions haut de gamme et domotique',
        'Places de parking multiples en sous-sol',
      ],
      priceRange: 'A partir de 1 200 000 EUR',
    },
  },
  {
    slug: 'duplex',
    label: 'Duplex',
    labelSingular: 'Duplex',
    category: 'appartement',
    parent: 'appartements',
    description: 'Duplex sur deux niveaux combinant l\'espace d\'une maison et les avantages d\'un appartement.',
    editorialContent: {
      intro: 'Le duplex seduit les familles qui recherchent de l\'espace sans les contraintes d\'entretien d\'une maison. A Hesperange, les residences recentes proposent des duplex lumineux avec separation claire entre espace de vie et espace nuit.',
      features: [
        'Deux niveaux offrant une separation jour/nuit',
        'Surfaces generalement de 100 a 180 m²',
        'Souvent situes en dernier etage avec terrasse',
        'Charges de copropriete partagees',
      ],
      priceRange: 'De 800 000 a 1 400 000 EUR',
    },
  },
  {
    slug: 'triplex',
    label: 'Triplex',
    labelSingular: 'Triplex',
    category: 'appartement',
    parent: 'appartements',
    description: 'Triplex sur trois niveaux, rares et recherches dans la commune de Hesperange.',
    editorialContent: {
      intro: 'Les triplex restent rares sur le marche hesperangeois, ce qui en fait des biens particulierement prises. Trois niveaux de vie offrent une organisation proche de celle d\'une maison individuelle, au sein d\'une copropriete.',
      features: [
        'Trois niveaux privatifs',
        'Organisation proche d\'une maison',
        'Bien rare sur le marche local',
        'Ideal pour grandes familles',
      ],
      priceRange: 'A partir de 1 000 000 EUR',
    },
  },
  {
    slug: 'lofts',
    label: 'Lofts',
    labelSingular: 'Loft',
    category: 'appartement',
    parent: 'appartements',
    description: 'Lofts et espaces atypiques avec volumes genereux a Hesperange.',
    editorialContent: {
      intro: 'Les lofts de Hesperange s\'adressent a une clientele en quete d\'espaces ouverts et de volumes atypiques. Issus de reconversions ou de constructions contemporaines, ils offrent une alternative aux appartements classiques.',
      features: [
        'Grands volumes et espaces ouverts',
        'Hauteur sous plafond superieure a la moyenne',
        'Style contemporain ou industriel reconverti',
        'Luminosite exceptionnelle',
      ],
      priceRange: 'De 700 000 a 1 300 000 EUR',
    },
  },
  {
    slug: 'mansardes',
    label: 'Mansardes',
    labelSingular: 'Mansarde',
    category: 'appartement',
    parent: 'appartements',
    description: 'Appartements sous combles et mansardes pleins de charme a Hesperange.',
    editorialContent: {
      intro: 'Les mansardes de Hesperange seduisent par leur caractere et leurs prix plus accessibles. Situees sous les toits, elles offrent un cadre intimiste avec poutres apparentes et velux orientant la lumiere naturelle.',
      features: [
        'Charme des poutres apparentes',
        'Prix au m² generalement plus accessible',
        'Lumiere naturelle par les velux',
        'Ambiance cosy et intimiste',
      ],
      priceRange: 'De 400 000 a 800 000 EUR',
    },
  },
  {
    slug: 'rez-de-chaussee',
    label: 'Rez-de-chaussee',
    labelSingular: 'Rez-de-chaussee',
    category: 'appartement',
    parent: 'appartements',
    description: 'Appartements en rez-de-chaussee avec acces jardin ou terrasse a Hesperange.',
    editorialContent: {
      intro: 'Les rez-de-chaussee a Hesperange attirent les familles avec enfants et les personnes a mobilite reduite. L\'acces direct a un jardin ou une terrasse privative constitue un atout majeur dans un marche ou l\'espace exterieur est rare.',
      features: [
        'Acces direct jardin ou terrasse',
        'Adapte aux personnes a mobilite reduite',
        'Pas de charges d\'ascenseur',
        'Ideal pour familles avec jeunes enfants',
      ],
      priceRange: 'De 600 000 a 1 100 000 EUR',
    },
  },

  // === MAISONS (parent + 8 sous-types) ===
  {
    slug: 'maisons',
    label: 'Maisons',
    labelSingular: 'Maison',
    category: 'maison',
    parent: null,
    description: 'Maisons de tous types en vente et en location dans la commune de Hesperange.',
    editorialContent: {
      intro: 'Le marche des maisons a Hesperange couvre une large gamme : de la maison mitoyenne accessible a la villa de prestige avec vue sur le lac. Chaque section de la commune offre un cadre de vie distinct.',
      features: [
        'Jardins privatifs dans la plupart des sections',
        'Quartiers residentiels calmes et securises',
        'Proximite des ecoles et des commerces',
        'Connexion rapide a Luxembourg-ville',
      ],
      priceRange: 'De 1 000 000 a 3 000 000 EUR selon le type et la section',
    },
  },
  {
    slug: 'maisons-individuelles',
    label: 'Maisons individuelles',
    labelSingular: 'Maison individuelle',
    category: 'maison',
    parent: 'maisons',
    description: 'Maisons individuelles detachees avec terrain privatif a Hesperange.',
    editorialContent: {
      intro: 'La maison individuelle reste le segment le plus recherche a Hesperange. Detachee sur quatre cotes, elle offre une intimite totale et un terrain privatif souvent genereux dans les sections d\'Alzingen et Fentange.',
      features: [
        'Terrain privatif sur quatre cotes',
        'Garage et places de stationnement',
        'Jardin de 300 a 1 000 m² selon la section',
        'Possibilite d\'extension ou de renovation',
      ],
      priceRange: 'De 1 200 000 a 2 500 000 EUR',
    },
  },
  {
    slug: 'maisons-mitoyennes',
    label: 'Maisons mitoyennes',
    labelSingular: 'Maison mitoyenne',
    category: 'maison',
    parent: 'maisons',
    description: 'Maisons mitoyennes avec jardin et garage dans la commune de Hesperange.',
    editorialContent: {
      intro: 'Les maisons mitoyennes representent une alternative accessible a la maison individuelle. Presentes dans toutes les sections de Hesperange, elles offrent un bon compromis entre surface habitable et budget.',
      features: [
        'Prix plus accessible que la maison individuelle',
        'Jardin arriere privatif',
        'Garage integre ou attenant',
        'Souvent situees pres des ecoles',
      ],
      priceRange: 'De 900 000 a 1 800 000 EUR',
    },
  },
  {
    slug: 'maisons-jumelees',
    label: 'Maisons jumelees',
    labelSingular: 'Maison jumelee',
    category: 'maison',
    parent: 'maisons',
    description: 'Maisons jumelees (semi-detachees) dans les quartiers residentiels de Hesperange.',
    editorialContent: {
      intro: 'La maison jumelee partage un mur mitoyen avec une seule habitation voisine. Ce format, repandu a Itzig et Howald, offre davantage d\'intimite qu\'une maison en bande tout en restant plus abordable qu\'une maison detachee.',
      features: [
        'Un seul mur mitoyen',
        'Terrain lateral et arriere',
        'Trois facades degagees',
        'Bon compromis prix/intimite',
      ],
      priceRange: 'De 1 000 000 a 2 000 000 EUR',
    },
  },
  {
    slug: 'villas',
    label: 'Villas',
    labelSingular: 'Villa',
    category: 'maison',
    parent: 'maisons',
    description: 'Villas de prestige et proprietes d\'exception dans la commune de Hesperange.',
    editorialContent: {
      intro: 'Les villas de Hesperange incarnent le haut de gamme du marche immobilier local. Situees principalement dans les quartiers du lac et de Fentange, elles se distinguent par leurs prestations, leurs terrains genereux et leur architecture soignee.',
      features: [
        'Terrains de 500 a 1 500 m²',
        'Piscine, garage double, domotique',
        'Architecture contemporaine ou classique',
        'Quartiers les plus prises de la commune',
      ],
      priceRange: 'A partir de 2 000 000 EUR',
    },
  },
  {
    slug: 'maisons-de-maitre',
    label: 'Maisons de maitre',
    labelSingular: 'Maison de maitre',
    category: 'maison',
    parent: 'maisons',
    description: 'Maisons de maitre et demeures de caractere a Hesperange.',
    editorialContent: {
      intro: 'Les maisons de maitre de la commune de Hesperange temoignent du patrimoine architectural luxembourgeois. Renovees avec soin, elles conjuguent volumes genereux, materiaux nobles et charme d\'epoque.',
      features: [
        'Volumes genereux et hauts plafonds',
        'Materiaux d\'epoque : parquet, moulures, cheminee',
        'Souvent situees au centre des sections',
        'Potentiel de renovation et d\'extension',
      ],
      priceRange: 'De 1 500 000 a 3 000 000 EUR',
    },
  },
  {
    slug: 'fermes',
    label: 'Fermes',
    labelSingular: 'Ferme',
    category: 'maison',
    parent: 'maisons',
    description: 'Fermes luxembourgeoises renovees et corps de ferme a Hesperange et Alzingen.',
    editorialContent: {
      intro: 'Les fermes luxembourgeoises renovees sont des biens rares et prises. Presentes principalement a Alzingen et Fentange, elles offrent des volumes exceptionnels, des poutres apparentes et de grands terrains dans un cadre champetre.',
      features: [
        'Poutres apparentes et pierres de taille',
        'Grands volumes atypiques',
        'Terrains de 500 a 2 000 m²',
        'Cadre champetre a proximite de la capitale',
      ],
      priceRange: 'De 1 500 000 a 2 500 000 EUR',
    },
  },
  {
    slug: 'bungalows',
    label: 'Bungalows',
    labelSingular: 'Bungalow',
    category: 'maison',
    parent: 'maisons',
    description: 'Bungalows et maisons compactes dans la commune de Hesperange.',
    editorialContent: {
      intro: 'Les bungalows de Hesperange seduisent les couples et petites familles recherchant une maison compacte avec jardin. Leur emprise au sol moderee permet un entretien reduit tout en offrant le confort d\'une habitation individuelle.',
      features: [
        'Entretien reduit par rapport a une grande maison',
        'Jardin privatif',
        'Ideal pour couple ou petite famille',
        'Souvent de plain-pied ou avec combles amenageables',
      ],
      priceRange: 'De 800 000 a 1 500 000 EUR',
    },
  },
  {
    slug: 'plain-pied',
    label: 'Plain-pied',
    labelSingular: 'Plain-pied',
    category: 'maison',
    parent: 'maisons',
    description: 'Maisons de plain-pied accessibles et confortables a Hesperange.',
    editorialContent: {
      intro: 'Les maisons de plain-pied a Hesperange repondent a une demande croissante : accessibilite pour les seniors, confort au quotidien sans escaliers, et fluidite des espaces de vie. Un segment de niche au Luxembourg.',
      features: [
        'Accessibilite totale sans escaliers',
        'Ideal pour personnes a mobilite reduite ou seniors',
        'Espaces de vie fluides sur un seul niveau',
        'Jardin de plain-pied directement accessible',
      ],
      priceRange: 'De 1 200 000 a 2 200 000 EUR',
    },
  },
]

export const PROPERTY_TYPE_SLUGS = propertyTypes.map(t => t.slug)

export function getPropertyTypeBySlug(slug: string): PropertyTypeConfig | undefined {
  return propertyTypes.find(t => t.slug === slug)
}

export function getSubTypes(parentSlug: 'appartements' | 'maisons'): PropertyTypeConfig[] {
  return propertyTypes.filter(t => t.parent === parentSlug)
}

export function getParentTypes(): PropertyTypeConfig[] {
  return propertyTypes.filter(t => t.parent === null)
}

export function isParentType(slug: string): boolean {
  const config = getPropertyTypeBySlug(slug)
  return config ? config.parent === null : false
}

export function getAllPropertyTypes(): PropertyTypeConfig[] {
  return propertyTypes
}
