'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import Image from 'next/image'

interface MagazineCardProps {
  image: string
  tag: string
  title: string
  description?: string
  meta?: {
    date?: string
    readTime?: string
  }
  features?: string[]
  price?: string
  featured?: boolean
  delay?: number
}

export default function MagazineCard({
  image,
  tag,
  title,
  description,
  meta,
  features,
  price,
  featured = false,
  delay = 0,
}: MagazineCardProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <motion.article
      ref={ref}
      className={`group cursor-pointer ${
        featured
          ? 'col-span-12 grid grid-cols-1 lg:grid-cols-2 gap-0'
          : 'col-span-12 md:col-span-6'
      }`}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {/* Image */}
      <div
        className={`relative overflow-hidden bg-stone/10 ${
          featured ? 'aspect-[4/3] lg:aspect-auto lg:min-h-[500px]' : 'aspect-[4/3]'
        }`}
      >
        <motion.div
          className="absolute inset-0"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
            sizes={featured ? '(max-width: 1024px) 100vw, 50vw' : '(max-width: 768px) 100vw, 50vw'}
          />
        </motion.div>
      </div>

      {/* Content */}
      <div
        className={`flex flex-col justify-center ${
          featured ? 'p-8 lg:p-12 xl:p-16 bg-white' : 'p-6 lg:p-8'
        }`}
      >
        <span className="text-caption uppercase tracking-[0.15em] text-brick font-medium">
          {tag}
        </span>

        <h3
          className={`font-serif text-ink mt-3 leading-tight group-hover:text-brick transition-colors duration-300 ${
            featured ? 'text-display-sm' : 'text-display-sm lg:text-xl'
          }`}
        >
          {title}
        </h3>

        {meta && (
          <div className="flex items-center gap-3 mt-3 text-caption text-stone">
            {meta.date && <span className="italic">{meta.date}</span>}
            {meta.date && meta.readTime && (
              <span className="w-1 h-1 rounded-full bg-stone/50" />
            )}
            {meta.readTime && <span>{meta.readTime}</span>}
          </div>
        )}

        {description && featured && (
          <p className="mt-4 text-body text-stone leading-relaxed">{description}</p>
        )}

        {features && (
          <div className="flex flex-wrap gap-x-4 gap-y-2 mt-5 text-caption text-stone">
            {features.map((feature, i) => (
              <span key={i} className="flex items-center gap-2">
                {i > 0 && <span className="w-1 h-1 rounded-full bg-stone/30" />}
                {feature}
              </span>
            ))}
          </div>
        )}

        {price && (
          <p className="mt-6 font-serif text-xl lg:text-2xl text-brick">{price}</p>
        )}
      </div>
    </motion.article>
  )
}
