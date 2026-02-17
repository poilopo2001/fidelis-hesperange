'use client'

import { motion } from 'framer-motion'
import PropertyCard from './PropertyCard'
import type { Property } from '../data/properties'

interface PropertyListProps {
  properties: Property[]
  title: string
  subtitle?: string
  emptyMessage?: string
}

export default function PropertyList({ 
  properties, 
  title, 
  subtitle,
  emptyMessage = 'Aucun bien disponible pour le moment.'
}: PropertyListProps) {
  return (
    <section className="editorial-py bg-cream">
      <div className="section-editorial">
        {/* Header */}
        <div className="mb-12 lg:mb-16">
          <motion.span
            className="editorial-badge"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            {properties.length} bien{properties.length > 1 ? 's' : ''} disponible{properties.length > 1 ? 's' : ''}
          </motion.span>

          <motion.h1 
            className="font-serif text-display-lg text-ink mt-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            {title}
          </motion.h1>
          
          {subtitle && (
            <motion.p 
              className="text-editorial text-stone mt-4 max-w-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              {subtitle}
            </motion.p>
          )}
        </div>

        {/* Properties Grid */}
        {properties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {properties.map((property, index) => (
              <PropertyCard key={property.id} property={property} index={index} />
            ))}
          </div>
        ) : (
          <motion.div
            className="text-center py-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-editorial text-stone">{emptyMessage}</p>
          </motion.div>
        )}
      </div>
    </section>
  )
}
