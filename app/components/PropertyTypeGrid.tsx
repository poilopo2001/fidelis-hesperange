import Link from 'next/link'
import type { PropertyTypeConfig } from '../data/propertyTypes'

interface PropertyTypeGridProps {
  types: PropertyTypeConfig[]
  basePath: string
  city?: string
}

export default function PropertyTypeGrid({ types, basePath, city }: PropertyTypeGridProps) {
  return (
    <div className="mb-10">
      <h2 className="font-serif text-xl text-ink mb-4">
        Rechercher par type de bien
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {types.map((config) => (
          <Link
            key={config.slug}
            href={city ? `${basePath}/${config.slug}/${city}` : `${basePath}/${config.slug}`}
            className="group bg-white border border-stone/10 p-4 transition-colors duration-300 hover:border-brick/30"
          >
            <span className="text-body-sm font-medium text-ink group-hover:text-brick transition-colors duration-300 block">
              {config.label}
            </span>
            <span className="text-caption text-stone mt-1 block">
              {config.category === 'appartement' ? 'Appartement' : 'Maison'}
            </span>
          </Link>
        ))}
      </div>
    </div>
  )
}
