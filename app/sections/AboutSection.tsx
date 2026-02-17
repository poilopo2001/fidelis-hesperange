'use client'

import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import Image from 'next/image'
import TextReveal from '../components/TextReveal'

const stats = [
  { number: '12', label: 'ans à Hesperange' },
  { number: '280+', label: 'biens vendus' },
  { number: '97%', label: 'satisfaction client' },
]

export default function AboutSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  
  const imageRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: imageRef,
    offset: ['start end', 'end start'],
  })
  const imageY = useTransform(scrollYProgress, [0, 1], ['-10%', '10%'])

  return (
    <section id="journal" className="editorial-py bg-cream-dark/30" ref={ref}>
      <div className="section-editorial">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <motion.div
            ref={imageRef}
            className="relative aspect-[4/5] overflow-hidden order-2 lg:order-1"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              className="absolute inset-0"
              style={{ y: imageY }}
            >
              <Image
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80"
                alt="L'agence Fidelis à Hesperange"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </motion.div>
          </motion.div>

          {/* Content */}
          <div className="order-1 lg:order-2">
            <motion.span
              className="editorial-badge"
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              Notre histoire
            </motion.span>

            <h2 className="font-serif text-display-lg text-ink mt-6 mb-8">
              <TextReveal
                text="Connaître Hesperange"
                delay={0.1}
              />
              <br />
              <TextReveal
                text="par cœur"
                delay={0.3}
                className="text-brick"
              />
            </h2>

            <motion.div
              className="space-y-6 text-editorial text-stone"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <p>
                Installée à Hesperange depuis 2013, notre agence connaît chaque rue,
                chaque quartier, chaque vue sur le lac. Nous sommes tombés amoureux
                de cette commune qui allie la tranquillité résidentielle à la
                proximité immédiate de Luxembourg-ville.
              </p>
              <p>
                De l'Alzette aux zones pavillonnaires en passant par le quartier du lac,
                nous vous guidons vers le bien qui correspond à votre mode de vie.
                Parce qu'Hesperange n'est pas une commune comme les autres.
              </p>
            </motion.div>

            {/* Stats */}
            <motion.div
              className="grid grid-cols-3 gap-8 mt-12 pt-8 border-t border-stone/20"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              {stats.map((stat, index) => (
                <div key={index}>
                  <span className="font-serif text-3xl lg:text-4xl text-ink">
                    {stat.number}
                  </span>
                  <p className="text-caption uppercase tracking-widest text-stone mt-2">
                    {stat.label}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
