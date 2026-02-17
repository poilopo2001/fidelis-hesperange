'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import TextReveal from '../components/TextReveal'

const services = [
  {
    num: '01',
    title: 'Acquisition à Hesperange',
    description:
      'Recherche personnalisée dans tous les quartiers d\'Hesperange : du lac au centre, des zones pavillonnaires aux résidences récentes. Accès exclusif aux biens off-market.',
  },
  {
    num: '02',
    title: 'Vente de votre bien',
    description:
      'Mise en valeur professionnelle de votre maison ou appartement à Hesperange. Photos, valorisation du bien et diffusion ciblée vers notre réseau d\'acquéreurs familiaux.',
  },
  {
    num: '03',
    title: 'Estimation précise',
    description:
      'Connaissance fine du marché d\'Hesperange et de ses micro-quartiers. Estimation basée sur des données locales réelles et notre expérience terrain.',
  },
  {
    num: '04',
    title: 'Conseil local',
    description:
      'Accompagnement dans vos démarches : écoles, commerces, transports, urbanisme. Nous connaissons chaque recoin d\'Hesperange pour vous guider.',
  },
]

export default function ExpertiseSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="expertise" className="editorial-py bg-cream-dark/30" ref={ref}>
      <div className="section-editorial">
        {/* Header */}
        <div className="mb-16 lg:mb-20">
          <motion.span
            className="editorial-badge"
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            Notre expertise
          </motion.span>

          <h2 className="font-serif text-display-lg text-ink mt-6 max-w-2xl">
            <TextReveal
              text="Ce que nous"
              delay={0.1}
            />
            <br />
            <TextReveal
              text="faisons pour vous"
              delay={0.3}
              className="text-brick"
            />
          </h2>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-stone/10">
          {services.map((service, index) => (
            <motion.div
              key={service.num}
              className="bg-cream p-8 lg:p-12 group cursor-pointer"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{
                duration: 0.6,
                delay: 0.2 + index * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {/* Number */}
              <span className="font-serif text-5xl lg:text-6xl text-stone/20 group-hover:text-brick/30 transition-colors duration-500">
                {service.num}
              </span>

              {/* Title */}
              <h3 className="font-serif text-display-sm text-ink mt-4 group-hover:text-brick transition-colors duration-300">
                {service.title}
              </h3>

              {/* Border Animation */}
              <motion.div
                className="h-0.5 bg-brick mt-6 mb-6 origin-left"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.4 + index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                viewport={{ once: true }}
              />

              {/* Description */}
              <p className="text-body text-stone leading-relaxed max-w-md">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
