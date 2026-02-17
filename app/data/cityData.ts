// Chargement des données des villes/sections

export interface CityData {
  localite: string
  nom_luxembourgeois: string
  commune: string
  code_postal: string
  chef_lieu: boolean
  demographique: {
    population: number
    annee_reference: number
    evolution?: Record<string, number>
    nationalites?: string
    pourcentage_etrangers?: number
    densite_commune_hab_km2?: number
    surface_commune_ha?: number
    population_commune_totale?: number
    note?: string
  }
  transports: {
    bus?: {
      lignes_principales?: string[]
      arrets_principaux?: string[]
      operateurs?: string[]
      temps_centre_ville_bus_min?: number
      note?: string
    }
    tram?: {
      ligne?: string | null
      arret?: string
      destinations?: string
      frequence?: string
      note?: string
    }
    train?: {
      gare?: string
      gare_proche?: string
      distance_gare?: string
      distance_km?: number
      lignes?: string[]
      destinations?: string
      note?: string
    }
    citybus?: {
      hesper_citybus?: boolean
      flexibus?: boolean
      note?: string
    }
    veloh?: {
      stations?: boolean
      nombre_stations?: number
      note?: string
    }
    pr_parking?: {
      nom?: string
      note?: string
    }
    acces_autoroute?: {
      A1?: string
      A3?: string
      A6?: string
      N3?: string
      note?: string
    }
    distances?: {
      luxembourg_centre?: { voiture_min?: number; bus_min?: number; tram_min?: number; train_min?: number; velo_min?: number; a_pied_min?: number }
      cloche_dor?: { voiture_min?: number; bus_min?: number; tram_min?: number; velo_min?: number; a_pied_min?: number }
      kirchberg?: { voiture_min?: number; bus_min?: number; tram_min?: number }
      aeroport_findel?: { voiture_min?: number; bus_min?: number; tram_min?: number }
      belval?: { voiture_min?: number; bus_min?: number }
      gare_thionville?: { voiture_min?: number; train_min?: number }
    }
    mobilite_douce?: {
      piste_cyclable?: string
      points_recharge_ve?: string
    }
  }
  education: {
    ecoles_fondamentales?: Array<{
      nom: string
      cycles?: string
      note?: string
    }>
    maisons_relais?: Array<{
      nom: string
      ages?: string
      cycles?: string
      note?: string
    }>
    creches?: Array<{
      nom: string
      adresse?: string
      type?: string
    }>
    ecole_musique?: {
      existe?: boolean
      eleves?: number
      branches?: number
      note?: string
    }
    lycees_proximite?: string[]
    cheque_service_accueil?: boolean
    note?: string
  }
  commerces_services: {
    supermarches?: string[]
    banques?: string[]
    pharmacies?: string[]
    poste?: boolean
    boulangeries?: boolean
    zone_commerciale?: {
      nom?: string
      description?: string
    }
    zone_industrielle?: {
      nom?: string
      localisation?: string
      note?: string
    }
    centre_commercial_proche?: {
      nom?: string
      distance_voiture_min?: number
      distance_velo_min?: number
      distance_bus_min?: number
      distance_a_pied_min?: number
    }
    camping?: {
      existe?: boolean
      nom?: string
      note?: string
    }
    restaurants?: {
      nombre_estime?: number
      cuisines?: string[]
      note?: string
    }
    projet_howald_city?: {
      surface_ha?: number
      description?: string
      promoteurs?: string[]
      note?: string
    }
    note?: string
  }
  loisirs_sport: {
    equipements?: string[]
    parcs?: Array<{
      nom?: string
      description?: string
    } | string>
    clubs_sportifs?: string[]
    patrimoine?: Array<{
      nom?: string
      epoque?: string
      annee?: number
      description?: string
    }>
    camping?: string
    note?: string
  }
  sante: {
    medecins?: boolean
    dentistes?: boolean
    pharmacies?: boolean | string[]
    hopital_proche?: {
      nom: string
      distance_km?: number
    }
  }
  immobilier: {
    prix_moyen_m2_vente: number
    prix_moyen_m2_location_mois?: number
    tendance?: string
    variation_annuelle_pourcent?: number
    annee_reference?: string | number
    types_biens_dominants?: string[]
    atouts?: string
    investissement?: {
      note?: string
      rendement_attractif?: boolean
    }
    source?: string
    note?: string
  }
  administration?: {
    mairie?: {
      adresse?: string
      telephone?: string
      email?: string
      horaires?: string
      site_web?: string
    }
    bourgmestre?: {
      nom?: string
      parti?: string
      mandat?: string
    }
    rattachement?: string
    adresse_mairie?: string
    histoire?: string
  }
  accessibilite_score?: {
    transports?: number
    commerces_a_pied?: number
    ecoles_proximite?: number
    espaces_verts?: number
    sur_5?: boolean
    note?: string
  }
  points_forts: string[]
  sources?: string[]
  derniere_mise_a_jour?: string
}

// Chargement dynamique des données
export async function getCityData(city: string): Promise<CityData | null> {
  try {
    const cityLower = city.toLowerCase()
    const data = await import(`../../public/${cityLower}.json`)
    return data.default as CityData
  } catch {
    return null
  }
}

// Formater les prix
export function formatPricePerM2(price: number): string {
  return new Intl.NumberFormat('fr-LU', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(price)
}

// Formater les nombres
export function formatNumber(num: number): string {
  return new Intl.NumberFormat('fr-FR').format(num)
}

// Obtenir le temps de trajet vers Luxembourg
export function getTimeToLuxembourg(transports: CityData['transports']): string {
  const times: string[] = []
  
  if (transports.distances?.luxembourg_centre?.voiture_min) {
    times.push(`${transports.distances.luxembourg_centre.voiture_min} min en voiture`)
  }
  if (transports.distances?.luxembourg_centre?.tram_min) {
    times.push(`${transports.distances.luxembourg_centre.tram_min} min en tram`)
  }
  if (transports.distances?.luxembourg_centre?.train_min) {
    times.push(`${transports.distances.luxembourg_centre.train_min} min en train`)
  }
  if (transports.distances?.luxembourg_centre?.bus_min) {
    times.push(`${transports.distances.luxembourg_centre.bus_min} min en bus`)
  }
  
  return times.length > 0 ? times.join(', ') : 'Proximité Luxembourg-Ville'
}
