'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import Image from 'next/image'
import TextReveal from '../components/TextReveal'

const team = [
  {
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&q=80',
    name: 'Édouard Mériaux',
    title: 'Directeur & Fondateur',
    bio: 'Passionné par Hesperange depuis 15 ans, il connaît chaque quartier et ses histoires. Son credo : matcher les bonnes personnes avec les bons lieux.',
  },
  {
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&q=80',
    name: 'Camille Dorval',
    title: 'Conseillère Immobilière',
    bio: "Résidente d'Hesperange et spécialiste du marché local. Elle sait où trouver les meilleures vues sur le lac et les maisons de charme qui font rêver.",
  },
  {
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80',
    name: 'Antoine Lefèvre',
    title: 'Chasseur de biens',
    bio: 'Son réseau à Hesperange lui donne accès aux biens confidentiels avant qu\'ils ne sortent sur le marché. Un vrai connaisseur des pépites locales.',
  },
  {
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600&q=80',
    name: 'Sophie Nguyen',
    title: 'Responsable Clientèle',
    bio: 'Elle accompagne les familles dans leur installation à Hesperange : écoles, crèches, commerces. Une expertise locale au service de vos projets.',
  },
]

export default function TeamSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="equipe" className="editorial-py bg-cream" ref={ref}>
      <div className="section-editorial">
        {/* Header */}
        <div className="mb-16 lg:mb-20">
          <motion.span
            className="editorial-badge"
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            Notre équipe
          </motion.span>

          <h2 className="font-serif text-display-lg text-ink mt-6">
            <TextReveal
              text="L'Équipe"
              delay={0.1}
            />
          </h2>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          {team.map((member, index) => (
            <motion.article
              key={member.name}
              className="group"
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{
                duration: 0.8,
                delay: 0.2 + index * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {/* Image */}
              <div className="relative aspect-[3/4] overflow-hidden mb-6">
                <motion.div
                  className="absolute inset-0"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                </motion.div>
              </div>

              {/* Info */}
              <h3 className="font-serif text-xl text-ink group-hover:text-brick transition-colors duration-300">
                {member.name}
              </h3>
              <p className="text-caption uppercase tracking-[0.12em] text-brick mt-1">
                {member.title}
              </p>
              <p className="text-body-sm text-stone mt-3 leading-relaxed">
                {member.bio}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
