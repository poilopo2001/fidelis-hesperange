'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import type { Property } from '../data/properties'

interface PropertyCardProps {
  property: Property
  index?: number
}

export default function PropertyCard({ property, index = 0 }: PropertyCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group"
    >
      <Link href={`/biens/${property.slug}`} className="block">
        {/* Image */}
        <div className="relative aspect-[4/3] overflow-hidden bg-stone/10 mb-4">
          <motion.div
            className="absolute inset-0"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image
              src={property.images[0]}
              alt={property.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </motion.div>
          
          {/* Badge Type */}
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            <span className={`px-3 py-1 text-caption uppercase tracking-wider font-medium ${
              property.type === 'achat' 
                ? 'bg-ink text-cream' 
                : 'bg-brick text-cream'
            }`}>
              {property.type === 'achat' ? 'À vendre' : 'À louer'}
            </span>
            <span className="px-3 py-1 text-caption uppercase tracking-wider font-medium bg-cream text-ink">
              {property.section}
            </span>
          </div>
          
          {/* Badge Featured */}
          {property.isFeatured && (
            <div className="absolute top-4 right-4">
              <span className="px-3 py-1 text-caption uppercase tracking-wider font-medium bg-cream text-ink">
                Coup de cœur
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div>
          {/* Location */}
          <div className="flex items-center gap-2 text-caption text-stone mb-2">
            <span>{property.city}</span>
            <span className="w-1 h-1 rounded-full bg-stone/50" />
            <span>{property.neighborhood}</span>
          </div>

          {/* Title */}
          <h3 className="font-serif text-xl lg:text-2xl text-ink group-hover:text-brick transition-colors duration-300 leading-tight mb-3">
            {property.title}
          </h3>

          {/* Features */}
          <div className="flex items-center gap-4 text-caption text-stone mb-4">
            <span>{property.surface} m²</span>
            <span className="w-1 h-1 rounded-full bg-stone/30" />
            <span>{property.rooms} pièces</span>
            <span className="w-1 h-1 rounded-full bg-stone/30" />
            <span>{property.bedrooms} ch.</span>
          </div>

          {/* Features list */}
          <div className="flex flex-wrap gap-2 mb-4">
            {property.features.slice(0, 3).map((feature, i) => (
              <span 
                key={i}
                className="text-caption text-stone bg-cream-dark/50 px-2 py-1"
              >
                {feature}
              </span>
            ))}
          </div>

          {/* Price */}
          <p className="font-serif text-2xl lg:text-3xl text-brick">
            {property.priceText}
          </p>
        </div>
      </Link>
    </motion.article>
  )
}
