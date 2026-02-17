'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import MagazineCard from '../components/MagazineCard'
import TextReveal from '../components/TextReveal'

const properties = [
  {
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=80',
    tag: 'Hesperange — Quartier du Lac',
    title: "Villa contemporaine avec vue sur le lac",
    description:
      "Située dans le quartier prisé du lac, cette villa contemporaine offre une vue imprenable sur l'eau. Grandes baies vitrées, jardin paysager et espaces de vie généreux pour une vie familiale au calme, à 10 minutes du centre-ville.",
    meta: { date: 'Publié le 6 janvier 2025', readTime: 'Lecture 4 min' },
    features: ['6 pièces', '245 m²', 'Jardin 600 m²', 'Vue lac'],
    price: '2 450 000 €',
    featured: true,
  },
  {
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80',
    tag: 'Hesperange — Centre',
    title: 'Maison de charme rénovée',
    meta: { date: 'Publié le 3 janvier 2025', readTime: 'Lecture 3 min' },
    features: ['5 pièces', '180 m²', 'Jardin 300 m²'],
    price: '1 890 000 €',
  },
  {
    image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80',
    tag: 'Hesperange — Zone résidentielle',
    title: 'Appartement terrasse dernier étage',
    meta: { date: 'Publié le 27 décembre 2024', readTime: 'Lecture 5 min' },
    features: ['4 pièces', '145 m²', 'Terrasse 40 m²'],
    price: '1 350 000 €',
  },
]

export default function PropertyGrid() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="proprietes" className="editorial-py bg-cream" ref={ref}>
      <div className="section-editorial">
        {/* Header */}
        <div className="mb-16 lg:mb-20">
          <motion.span
            className="editorial-badge"
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            Nos biens à Hesperange
          </motion.span>

          <h2 className="font-serif text-display-lg text-ink mt-6 max-w-2xl">
            <TextReveal
              text="Les biens"
              delay={0.1}
            />
            <br />
            <TextReveal
              text="de la semaine"
              delay={0.3}
              className="text-brick"
            />
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-12 gap-6 lg:gap-8">
          {properties.map((property, index) => (
            <MagazineCard
              key={index}
              {...property}
              delay={0.2 + index * 0.15}
            />
          ))}
        </div>

        {/* CTA */}
        <motion.div 
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <a href="/achat" className="btn-outline">
            Voir tous les biens à vendre
          </a>
        </motion.div>
      </div>
    </section>
  )
}
