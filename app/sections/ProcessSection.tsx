'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import TextReveal from '../components/TextReveal'

const steps = [
  {
    num: 'I',
    title: "L'Entretien",
    description:
      "Nous vous recevons à notre agence d'Hesperange pour comprendre votre projet. Proximité du lac ou du centre ? Maison avec jardin ou appartement terrasse ? Nous cernons vos besoins pour ne vous montrer que les biens qui correspondent vraiment.",
  },
  {
    num: 'II',
    title: 'La Sélection Hesperange',
    description:
      "Grâce à notre connaissance intime d'Hesperange, nous sélectionnons pour vous les meilleures opportunités dans chaque quartier. Du secteur du lac aux zones pavillonnaires, nous connaissons chaque rue et chaque vue.",
  },
  {
    num: 'III',
    title: "L'Accompagnement local",
    description:
      "Nous vous guidons au-delà de l'achat : écoles, commerces, transports, communes avoisinantes. Notre expertise d'Hesperange vous aide à vous installer sereinement dans votre nouvelle vie.",
  },
]

export default function ProcessSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="methode" className="editorial-py bg-cream" ref={ref}>
      <div className="section-editorial">
        {/* Header */}
        <div className="mb-16 lg:mb-20">
          <motion.span
            className="editorial-badge"
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            Notre approche
          </motion.span>

          <h2 className="font-serif text-display-lg text-ink mt-6 max-w-2xl">
            <TextReveal
              text="Notre façon"
              delay={0.1}
            />
            <br />
            <TextReveal
              text="de travailler"
              delay={0.3}
              className="text-brick"
            />
          </h2>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step, index) => (
            <motion.article
              key={step.num}
              className="relative"
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{
                duration: 0.8,
                delay: 0.2 + index * 0.15,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {/* Top Border */}
              <motion.div
                className="absolute top-0 left-0 right-0 h-px bg-stone/20"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{
                  duration: 0.8,
                  delay: 0.3 + index * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                viewport={{ once: true }}
                style={{ transformOrigin: 'left' }}
              />

              {/* Roman Numeral */}
              <span className="block font-serif text-7xl lg:text-8xl text-stone/10 mt-8 mb-6">
                {step.num}
              </span>

              {/* Title */}
              <h3 className="font-serif text-display-sm text-ink mb-4">
                {step.title}
              </h3>

              {/* Description */}
              <p className="text-body text-stone leading-relaxed">
                {step.description}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
