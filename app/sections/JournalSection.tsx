'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import Image from 'next/image'
import TextReveal from '../components/TextReveal'

const articles = [
  {
    image: 'https://images.unsplash.com/photo-1519331379826-f10be5486c6f?w=600&q=80',
    category: 'Quartiers',
    title: 'Hesperange : vivre au bord du lac',
    excerpt:
      'Le quartier du lac d\'Hesperange séduit de plus en plus de familles. Nature, calme et vue imprenable tout en restant proche de la capitale.',
    readTime: '6 min de lecture',
  },
  {
    image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=600&q=80',
    category: 'Marché',
    title: 'Hesperange 2025 : une valeur sûre',
    excerpt:
      'Analyse du marché immobilier à Hesperange. Pourquoi cette commune affiche une croissance constante et attire les acquéreurs familiaux.',
    readTime: '8 min de lecture',
  },
  {
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
    category: 'Lifestyle',
    title: 'Les écoles et commerces d\'Hesperange',
    excerpt:
      'De l\'école fondamentale aux commerces de proximité, découvrez pourquoi Hesperange offre un cadre de vie idéal pour les familles.',
    readTime: '5 min de lecture',
  },
]

export default function JournalSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="le-journal" className="editorial-py bg-cream" ref={ref}>
      <div className="section-editorial">
        {/* Header */}
        <div className="mb-16 lg:mb-20">
          <motion.span
            className="editorial-badge"
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            Conseils & Actualités
          </motion.span>

          <h2 className="font-serif text-display-lg text-ink mt-6 max-w-2xl">
            <TextReveal
              text="Nos derniers"
              delay={0.1}
            />
            <br />
            <TextReveal
              text="articles"
              delay={0.3}
              className="text-brick"
            />
          </h2>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article, index) => (
            <motion.article
              key={index}
              className="group cursor-pointer"
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{
                duration: 0.8,
                delay: 0.2 + index * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {/* Image */}
              <div className="relative aspect-[3/2] overflow-hidden mb-6 border border-stone/10">
                <motion.div
                  className="absolute inset-0"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </motion.div>
              </div>

              {/* Category */}
              <span className="inline-block text-caption uppercase tracking-[0.15em] text-brick font-medium pb-2 border-b border-brick">
                {article.category}
              </span>

              {/* Title */}
              <h3 className="font-serif text-display-sm text-ink mt-4 group-hover:text-brick transition-colors duration-300 leading-tight">
                {article.title}
              </h3>

              {/* Excerpt */}
              <p className="text-body-sm text-stone mt-3 leading-relaxed">
                {article.excerpt}
              </p>

              {/* Footer */}
              <div className="flex items-center justify-between mt-6 pt-4 border-t border-stone/10">
                <span className="text-caption text-stone">{article.readTime}</span>
                <span className="text-body-sm font-medium text-ink group-hover:text-brick transition-colors duration-300 flex items-center gap-2">
                  Lire l'article
                  <svg
                    className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </span>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
