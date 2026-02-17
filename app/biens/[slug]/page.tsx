import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { getPropertyBySlug, properties } from '../../data/properties'
import { getCityData } from '../../data/cityData'
import { generatePropertyMetadata } from '../../lib/seo/metadata'
import {
  generateWebPageSchema,
  generateBreadcrumbSchema,
} from '../../lib/seo/schemas'
import { generateAdvancedRealEstateListingSchema } from '../../lib/seo/advancedSchemas'
import JsonLd from '../../components/JsonLd'
import EditorialNav from '../../components/EditorialNav'
import Footer from '../../sections/Footer'
import { ArrowLeft, MapPin, Maximize, BedDouble, Home, Check, GraduationCap, Train, Clock } from 'lucide-react'

interface PropertyPageProps {
  params: { slug: string }
}

export async function generateStaticParams() {
  return properties.map((property) => ({
    slug: property.slug,
  }))
}

export async function generateMetadata({ params }: PropertyPageProps): Promise<Metadata> {
  const property = getPropertyBySlug(params.slug)
  
  if (!property) {
    return {
      title: 'Bien non trouvé — Fidelis Hesperange',
      robots: { index: false, follow: false },
    }
  }
  
  return generatePropertyMetadata(property)
}

export default async function PropertyPage({ params }: PropertyPageProps) {
  const property = getPropertyBySlug(params.slug)
  
  if (!property) {
    notFound()
  }

  // Charger les données de la ville
  const cityData = await getCityData(property.section)

  const url = `/biens/${property.slug}`
  const schemas = [
    generateAdvancedRealEstateListingSchema(property, cityData, url),
    generateWebPageSchema({
      url,
      title: property.title,
      description: property.description,
      image: property.images[0],
    }),
    generateBreadcrumbSchema([
      { name: property.type === 'achat' ? 'Achat' : 'Location', url: `/${property.type}` },
      { name: property.section, url: `/${property.type}/${property.section.toLowerCase()}` },
      { name: property.title, url },
    ]),
  ]

  // Trouver les équipements à proximité
  const nearbySchools = cityData?.education?.ecoles_fondamentales?.slice(0, 2) || []
  const trainStation = cityData?.transports?.train?.gare
  const timeToLuxembourg = cityData?.transports?.distances?.luxembourg_centre

  return (
    <>
      <JsonLd data={schemas} />
      <EditorialNav />
      <main className="pt-24 lg:pt-32 pb-20 bg-cream min-h-screen">
        <div className="section-editorial">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-2 text-body-sm text-stone flex-wrap">
              <li><Link href="/" className="hover:text-brick">Accueil</Link></li>
              <li>/</li>
              <li><Link href={`/${property.type}`} className="hover:text-brick capitalize">{property.type}</Link></li>
              <li>/</li>
              <li><Link href={`/${property.type}/${property.section.toLowerCase()}`} className="hover:text-brick">{property.section}</Link></li>
              <li>/</li>
              <li className="text-ink" aria-current="page">{property.title}</li>
            </ol>
          </nav>

          {/* Back Link */}
          <Link 
            href={property.type === 'achat' ? '/achat' : '/location'}
            className="inline-flex items-center gap-2 text-body-sm text-stone hover:text-brick transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour aux {property.type === 'achat' ? 'biens à vendre' : 'locations'}
          </Link>

          {/* Header */}
          <div className="mb-8">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className={`px-3 py-1 text-caption uppercase tracking-wider font-medium ${
                property.type === 'achat' 
                  ? 'bg-ink text-cream' 
                  : 'bg-brick text-cream'
              }`}>
                {property.type === 'achat' ? 'À vendre' : 'À louer'}
              </span>
              <span className="px-3 py-1 text-caption uppercase tracking-wider font-medium bg-cream-dark text-ink border border-stone/20">
                {property.section}
              </span>
              {property.isFeatured && (
                <span className="px-3 py-1 text-caption uppercase tracking-wider font-medium bg-brick text-cream">
                  Coup de cœur
                </span>
              )}
              {cityData?.immobilier?.prix_moyen_m2_vente && (
                <span className="px-3 py-1 text-caption text-stone bg-white border border-stone/10">
                  Prix m² moyen {property.section}: {cityData.immobilier.prix_moyen_m2_vente.toLocaleString('fr-FR')} €
                </span>
              )}
            </div>
            
            <h1 className="font-serif text-display-lg lg:text-display-xl text-ink mb-4">
              {property.title}
            </h1>
            
            <div className="flex items-center gap-2 text-body text-stone">
              <MapPin className="w-5 h-5" />
              <span>{property.city}, {property.neighborhood}</span>
            </div>
          </div>

          {/* Main Image */}
          <div className="relative aspect-[16/9] lg:aspect-[21/9] overflow-hidden mb-8">
            <Image
              src={property.images[0]}
              alt={property.title}
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Left Column - Details */}
            <div className="lg:col-span-2">
              {/* Key Stats */}
              <div className="grid grid-cols-3 gap-6 p-6 bg-cream-dark/50 mb-8">
                <div className="text-center">
                  <Maximize className="w-6 h-6 mx-auto mb-2 text-brick" />
                  <p className="font-serif text-2xl text-ink">{property.surface}</p>
                  <p className="text-caption text-stone">m²</p>
                </div>
                <div className="text-center border-x border-stone/20">
                  <Home className="w-6 h-6 mx-auto mb-2 text-brick" />
                  <p className="font-serif text-2xl text-ink">{property.rooms}</p>
                  <p className="text-caption text-stone">pièces</p>
                </div>
                <div className="text-center">
                  <BedDouble className="w-6 h-6 mx-auto mb-2 text-brick" />
                  <p className="font-serif text-2xl text-ink">{property.bedrooms}</p>
                  <p className="text-caption text-stone">chambres</p>
                </div>
              </div>

              {/* Prix au m² du bien */}
              <div className="bg-white border border-stone/10 p-4 mb-8">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-caption text-stone mb-1">Prix au m² de ce bien</p>
                    <p className="font-serif text-2xl text-ink">
                      {Math.round(property.price / property.surface).toLocaleString('fr-FR')} €/m²
                    </p>
                  </div>
                  {cityData?.immobilier?.prix_moyen_m2_vente && (
                    <div className="text-right">
                      <p className="text-caption text-stone mb-1">Moyenne {property.section}</p>
                      <p className="font-serif text-2xl text-stone">
                        {cityData.immobilier.prix_moyen_m2_vente.toLocaleString('fr-FR')} €/m²
                      </p>
                      {Math.round(property.price / property.surface) <= cityData.immobilier.prix_moyen_m2_vente ? (
                        <span className="text-caption text-green-600 font-medium">Bon deal !</span>
                      ) : (
                        <span className="text-caption text-amber-600 font-medium">Au-dessus de la moyenne</span>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Description */}
              <div className="mb-8">
                <h2 className="font-serif text-2xl text-ink mb-4">Description</h2>
                <p className="text-body text-stone leading-relaxed">
                  {property.description}
                </p>
              </div>

              {/* Features */}
              <div className="mb-8">
                <h2 className="font-serif text-2xl text-ink mb-4">Caractéristiques</h2>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {property.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-brick flex-shrink-0" />
                      <span className="text-body text-ink">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Équipements à proximité */}
              {(nearbySchools.length > 0 || trainStation || timeToLuxembourg) && (
                <div className="mb-8">
                  <h2 className="font-serif text-2xl text-ink mb-4">À proximité</h2>
                  <div className="space-y-4">
                    {nearbySchools.length > 0 && (
                      <div className="flex items-start gap-3 p-4 bg-cream-dark/30">
                        <GraduationCap className="w-5 h-5 text-brick mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-body font-medium text-ink">École à proximité</p>
                          <p className="text-body-sm text-stone">{nearbySchools[0].nom}</p>
                        </div>
                      </div>
                    )}
                    
                    {trainStation && (
                      <div className="flex items-start gap-3 p-4 bg-cream-dark/30">
                        <Train className="w-5 h-5 text-brick mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-body font-medium text-ink">Gare la plus proche</p>
                          <p className="text-body-sm text-stone">{trainStation}</p>
                        </div>
                      </div>
                    )}
                    
                    {timeToLuxembourg && (
                      <div className="flex items-start gap-3 p-4 bg-cream-dark/30">
                        <Clock className="w-5 h-5 text-brick mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-body font-medium text-ink">Distance Luxembourg-Ville</p>
                          <p className="text-body-sm text-stone">
                            {timeToLuxembourg.voiture_min && `${timeToLuxembourg.voiture_min} min en voiture`}
                            {timeToLuxembourg.tram_min && ` • ${timeToLuxembourg.tram_min} min en tram`}
                            {timeToLuxembourg.train_min && ` • ${timeToLuxembourg.train_min} min en train`}
                            {timeToLuxembourg.bus_min && ` • ${timeToLuxembourg.bus_min} min en bus`}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Infos de la ville */}
              {cityData && (
                <div className="mb-8 p-6 bg-white border border-stone/10">
                  <h2 className="font-serif text-2xl text-ink mb-4">À propos de {cityData.localite}</h2>
                  <div className="grid grid-cols-2 gap-4 text-body-sm text-stone">
                    <div>
                      <span className="font-medium text-ink">Population :</span> {cityData.demographique.population.toLocaleString('fr-FR')} habitants
                    </div>
                    <div>
                      <span className="font-medium text-ink">Code postal :</span> {cityData.code_postal.split('/')[0].trim()}
                    </div>
                  </div>
                  <Link 
                    href={`/${property.type}/${property.section.toLowerCase()}`}
                    className="inline-flex items-center gap-2 text-brick mt-4 hover:underline"
                  >
                    Voir tous les biens à {cityData.localite}
                    <ArrowLeft className="w-4 h-4 rotate-180" />
                  </Link>
                </div>
              )}
            </div>

            {/* Right Column - Contact */}
            <div className="lg:col-span-1">
              <aside className="sticky top-32 p-6 lg:p-8 bg-white border border-stone/10">
                <p className="text-caption uppercase tracking-widest text-stone mb-2">
                  Prix
                </p>
                <p className="font-serif text-4xl text-brick mb-6">
                  {property.priceText}
                </p>
                
                <div className="space-y-3">
                  <a
                    href={`mailto:contact@fidelis.lu?subject=Intérêt pour ${property.title}`}
                    className="btn-primary w-full text-center block"
                  >
                    Contacter l&apos;agence
                  </a>
                  <a
                    href="tel:+35227456789"
                    className="btn-outline w-full text-center block"
                  >
                    Appeler
                  </a>
                </div>
                
                <div className="mt-6 pt-6 border-t border-stone/10 space-y-2">
                  <p className="text-body-sm text-stone">
                    Référence : <span className="text-ink">{property.id.padStart(4, '0')}</span>
                  </p>
                  {cityData?.immobilier?.tendance && (
                    <p className="text-body-sm text-stone">
                      Marché local : <span className="text-ink capitalize">{cityData.immobilier.tendance}</span>
                    </p>
                  )}
                </div>
              </aside>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
