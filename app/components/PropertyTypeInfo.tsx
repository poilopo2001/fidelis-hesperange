import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import type { PropertyTypeConfig } from '../data/propertyTypes'
import { HESPERANGE_CITY_NAMES } from '../data/propertyTypes'

interface PropertyTypeInfoProps {
  config: PropertyTypeConfig
  transaction: 'achat' | 'location'
  subTypes?: PropertyTypeConfig[]
  cities: readonly string[]
  currentCity?: string
}

export default function PropertyTypeInfo({
  config,
  transaction,
  subTypes,
  cities,
  currentCity,
}: PropertyTypeInfoProps) {
  const action = transaction === 'achat' ? 'à vendre' : 'à louer'

  return (
    <section className="bg-cream border-b border-stone/10">
      <div className="section-editorial py-12">
        {/* Contenu editorial */}
        <div className="max-w-3xl mb-10">
          <h2 className="font-serif text-2xl text-ink mb-4">
            {config.label} {action}{currentCity ? ` à ${currentCity}` : ' à Hesperange'}
          </h2>
          <p className="text-editorial text-stone mb-6">
            {config.editorialContent.intro}
          </p>

          {/* Caracteristiques */}
          <ul className="space-y-2 mb-6">
            {config.editorialContent.features.map((feature, i) => (
              <li key={i} className="flex items-start gap-2 text-body text-stone">
                <ArrowRight className="w-4 h-4 text-brick mt-1 flex-shrink-0" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>

          {config.editorialContent.priceRange && (
            <p className="text-body-sm text-stone bg-white border border-stone/10 px-4 py-3 inline-block">
              <strong>Fourchette de prix :</strong> {config.editorialContent.priceRange}
            </p>
          )}
        </div>

        {/* Sous-types (si parent) */}
        {subTypes && subTypes.length > 0 && (
          <div className="mb-10">
            <h3 className="font-serif text-xl text-ink mb-4">
              Types de {config.category === 'appartement' ? 'appartements' : 'maisons'}
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {subTypes.map((sub) => (
                <Link
                  key={sub.slug}
                  href={currentCity
                    ? `/${transaction}/${sub.slug}/${currentCity.toLowerCase()}`
                    : `/${transaction}/${sub.slug}`
                  }
                  className="group bg-white border border-stone/10 p-4 transition-colors duration-300 hover:border-brick/30"
                >
                  <span className="text-body-sm font-medium text-ink group-hover:text-brick transition-colors duration-300">
                    {sub.label}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Liens vers les villes */}
        <div>
          <h3 className="font-serif text-xl text-ink mb-4">
            {config.label} par section
          </h3>
          <div className="flex flex-wrap gap-3">
            {cities.map((citySlug) => {
              const cityName = HESPERANGE_CITY_NAMES[citySlug] || citySlug
              const isActive = currentCity?.toLowerCase() === citySlug
              return (
                <Link
                  key={citySlug}
                  href={`/${transaction}/${config.slug}/${citySlug}`}
                  className={`px-4 py-2 text-body-sm border transition-colors duration-300 ${
                    isActive
                      ? 'bg-ink text-cream border-ink'
                      : 'bg-white text-stone border-stone/10 hover:border-brick/30 hover:text-brick'
                  }`}
                >
                  {cityName}
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
