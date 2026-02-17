'use client'

import { motion } from 'framer-motion'
import { 
  MapPin, 
  Users, 
  TrendingUp, 
  Bus, 
  Train,
  TrainFront,
  GraduationCap, 
  Store,
  Home,
  Clock,
  Star,
  ArrowRight
} from 'lucide-react'
import type { CityData } from '../data/cityData'
import { formatPricePerM2, formatNumber, getTimeToLuxembourg } from '../data/cityData'

interface CityInfoProps {
  cityData: CityData
  type: 'achat' | 'location'
}

export default function CityInfo({ cityData, type }: CityInfoProps) {
  const isInvestmentGood = cityData.immobilier.investissement?.rendement_attractif
  const trend = cityData.immobilier.tendance
  const trendColor = trend === 'hausse' ? 'text-green-600' : trend === 'baisse' ? 'text-red-600' : 'text-amber-600'
  const trendIcon = trend === 'hausse' ? '↑' : trend === 'baisse' ? '↓' : '→'

  return (
    <div className="bg-cream border-b border-stone/10">
      <div className="section-editorial py-12">
        {/* Header avec nom et prix */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
          <div className="lg:col-span-2">
            <h1 className="font-serif text-display-lg text-ink mb-4">
              {type === 'achat' ? 'Acheter' : 'Louer'} à {cityData.localite}
            </h1>
            <p className="text-editorial text-stone max-w-2xl">
              {cityData.demographique.note || `Découvrez les biens ${type === 'achat' ? 'en vente' : 'en location'} à ${cityData.localite}, section de la commune de Hesperange.`}
            </p>
          </div>
          
          {/* Carte prix */}
          <motion.div 
            className="bg-white border border-stone/10 p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex items-center gap-2 mb-2">
              <Home className="w-5 h-5 text-brick" />
              <span className="text-caption uppercase tracking-widest text-stone">Prix moyen</span>
            </div>
            <p className="font-serif text-3xl text-ink mb-1">
              {formatPricePerM2(cityData.immobilier.prix_moyen_m2_vente)}
              <span className="text-lg text-stone">/m²</span>
            </p>
            <div className="flex items-center gap-2 mb-3">
              <span className={`text-body-sm font-medium ${trendColor}`}>
                {trendIcon} {trend === 'hausse' ? 'En hausse' : trend === 'baisse' ? 'En baisse' : 'Stable'}
              </span>
              {cityData.immobilier.variation_annuelle_pourcent && (
                <span className="text-caption text-stone">
                  ({cityData.immobilier.variation_annuelle_pourcent > 0 ? '+' : ''}{cityData.immobilier.variation_annuelle_pourcent}%)
                </span>
              )}
            </div>
            <p className="text-caption text-stone">
              {type === 'location' && cityData.immobilier.prix_moyen_m2_location_mois && (
                <>Location : {formatPricePerM2(cityData.immobilier.prix_moyen_m2_location_mois)}/mois</>
              )}
            </p>
            {isInvestmentGood && (
              <div className="mt-3 pt-3 border-t border-stone/10">
                <span className="inline-flex items-center gap-1 text-caption text-green-600 font-medium">
                  <TrendingUp className="w-4 h-4" />
                  Bon investissement locatif
                </span>
              </div>
            )}
          </motion.div>
        </div>

        {/* Stats rapides */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          <motion.div 
            className="bg-white border border-stone/10 p-4 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Users className="w-6 h-6 mx-auto mb-2 text-brick" />
            <p className="font-serif text-2xl text-ink">{formatNumber(cityData.demographique.population)}</p>
            <p className="text-caption text-stone">habitants</p>
          </motion.div>
          
          <motion.div 
            className="bg-white border border-stone/10 p-4 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <Clock className="w-6 h-6 mx-auto mb-2 text-brick" />
            <p className="font-serif text-xl text-ink">
              {getTimeToLuxembourg(cityData.transports).split(',')[0].replace(/\d+ min /, '')}
            </p>
            <p className="text-caption text-stone">
              {getTimeToLuxembourg(cityData.transports).match(/\d+ min/)?.[0] || '5-15 min'} du centre
            </p>
          </motion.div>
          
          <motion.div 
            className="bg-white border border-stone/10 p-4 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <GraduationCap className="w-6 h-6 mx-auto mb-2 text-brick" />
            <p className="font-serif text-2xl text-ink">{cityData.education.ecoles_fondamentales?.length || 1}</p>
            <p className="text-caption text-stone">école(s) fondamentale(s)</p>
          </motion.div>
          
          <motion.div 
            className="bg-white border border-stone/10 p-4 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
          >
            <MapPin className="w-6 h-6 mx-auto mb-2 text-brick" />
            <p className="font-serif text-2xl text-ink">{cityData.code_postal.split('/')[0].trim()}</p>
            <p className="text-caption text-stone">code postal</p>
          </motion.div>
        </div>

        {/* Points forts */}
        <motion.div 
          className="bg-white border border-stone/10 p-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h2 className="font-serif text-xl text-ink mb-4 flex items-center gap-2">
            <Star className="w-5 h-5 text-brick" />
            Pourquoi choisir {cityData.localite} ?
          </h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {cityData.points_forts.slice(0, 6).map((point, index) => (
              <li key={index} className="flex items-start gap-2 text-body text-stone">
                <ArrowRight className="w-4 h-4 text-brick mt-1 flex-shrink-0" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Transports */}
        {cityData.transports && (
          <motion.div 
            className="bg-white border border-stone/10 p-6 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
          >
            <h2 className="font-serif text-xl text-ink mb-4 flex items-center gap-2">
              <Bus className="w-5 h-5 text-brick" />
              Transports
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {cityData.transports.tram?.ligne && (
                <div className="flex items-center gap-3 p-3 bg-cream-dark/30">
                  <TrainFront className="w-5 h-5 text-brick" />
                  <div>
                    <p className="text-body-sm font-medium text-ink">Tram {cityData.transports.tram.ligne}</p>
                    <p className="text-caption text-stone">{cityData.transports.tram.destinations}</p>
                  </div>
                </div>
              )}
              {cityData.transports.train?.gare && (
                <div className="flex items-center gap-3 p-3 bg-cream-dark/30">
                  <Train className="w-5 h-5 text-brick" />
                  <div>
                    <p className="text-body-sm font-medium text-ink">{cityData.transports.train.gare}</p>
                    <p className="text-caption text-stone">Gare CFL</p>
                  </div>
                </div>
              )}
              {cityData.transports.bus?.lignes_principales && (
                <div className="flex items-center gap-3 p-3 bg-cream-dark/30">
                  <Bus className="w-5 h-5 text-brick" />
                  <div>
                    <p className="text-body-sm font-medium text-ink">Bus</p>
                    <p className="text-caption text-stone">Lignes {cityData.transports.bus.lignes_principales.slice(0, 4).join(', ')}</p>
                  </div>
                </div>
              )}
            </div>
            
            {/* Temps de trajet */}
            <div className="mt-4 pt-4 border-t border-stone/10">
              <p className="text-body text-ink mb-2">
                <strong>Distances :</strong>
              </p>
              <div className="flex flex-wrap gap-4 text-body-sm text-stone">
                {cityData.transports.distances?.luxembourg_centre?.voiture_min && (
                  <span>Centre-ville : {cityData.transports.distances.luxembourg_centre.voiture_min} min</span>
                )}
                {cityData.transports.distances?.cloche_dor?.voiture_min && (
                  <span>Cloche d'Or : {cityData.transports.distances.cloche_dor.voiture_min} min</span>
                )}
                {cityData.transports.distances?.kirchberg?.voiture_min && (
                  <span>Kirchberg : {cityData.transports.distances.kirchberg.voiture_min} min</span>
                )}
                {cityData.transports.distances?.aeroport_findel?.voiture_min && (
                  <span>Aéroport : {cityData.transports.distances.aeroport_findel.voiture_min} min</span>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {/* Éducation */}
        {cityData.education?.ecoles_fondamentales && cityData.education.ecoles_fondamentales.length > 0 && (
          <motion.div 
            className="bg-white border border-stone/10 p-6 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h2 className="font-serif text-xl text-ink mb-4 flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-brick" />
              Éducation
            </h2>
            <div className="space-y-3">
              {cityData.education.ecoles_fondamentales.map((ecole, index) => (
                <div key={index} className="p-3 bg-cream-dark/30">
                  <p className="text-body font-medium text-ink">{ecole.nom}</p>
                  <p className="text-caption text-stone">{ecole.cycles}{ecole.note ? ` — ${ecole.note}` : ''}</p>
                </div>
              ))}
              {cityData.education.maisons_relais && cityData.education.maisons_relais.length > 0 && (
                <p className="text-body-sm text-stone mt-3">
                  <strong>Maisons relais :</strong> {cityData.education.maisons_relais.length} établissement(s)
                </p>
              )}
              {cityData.education.creches && cityData.education.creches.length > 0 && (
                <p className="text-body-sm text-stone">
                  <strong>Crèches :</strong> {cityData.education.creches.length} établissement(s)
                </p>
              )}
            </div>
          </motion.div>
        )}

        {/* Commerces */}
        {cityData.commerces_services && (
          <motion.div 
            className="bg-white border border-stone/10 p-6 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.45 }}
          >
            <h2 className="font-serif text-xl text-ink mb-4 flex items-center gap-2">
              <Store className="w-5 h-5 text-brick" />
              Commerces & Services
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {cityData.commerces_services.supermarches && cityData.commerces_services.supermarches.length > 0 && (
                <div>
                  <p className="text-body-sm font-medium text-ink">Supermarchés</p>
                  <p className="text-caption text-stone">{cityData.commerces_services.supermarches.join(', ')}</p>
                </div>
              )}
              {cityData.commerces_services.centre_commercial_proche && (
                <div>
                  <p className="text-body-sm font-medium text-ink">Centre commercial</p>
                  <p className="text-caption text-stone">
                    {cityData.commerces_services.centre_commercial_proche.nom}
                    {cityData.commerces_services.centre_commercial_proche.distance_voiture_min && 
                      ` (${cityData.commerces_services.centre_commercial_proche.distance_voiture_min} min)`}
                  </p>
                </div>
              )}
              {cityData.sante?.hopital_proche && (
                <div>
                  <p className="text-body-sm font-medium text-ink">Hôpital</p>
                  <p className="text-caption text-stone">
                    {cityData.sante.hopital_proche.nom}
                    {cityData.sante.hopital_proche.distance_km && ` (${cityData.sante.hopital_proche.distance_km} km)`}
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
