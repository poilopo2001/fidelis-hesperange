'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import Image from 'next/image'
import TextReveal from '../components/TextReveal'

export default function EditorialHero() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.1])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const contentY = useTransform(scrollYProgress, [0, 0.5], [0, -50])

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center pt-24 lg:pt-0 overflow-hidden"
    >
      <div className="section-editorial w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Content - Left Side */}
          <motion.div
            className="lg:col-span-5 xl:col-span-4 order-2 lg:order-1"
            style={{ opacity: contentOpacity, y: contentY }}
          >
            {/* Badge */}
            <motion.div
              className="editorial-badge mb-8"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              Agence immobilière Hesperange
            </motion.div>

            {/* Title */}
            <h1 className="font-serif text-display-xl text-ink mb-8">
              <TextReveal
                text="Hesperange"
                delay={0.3}
                staggerDelay={0.04}
              />
              <br />
              <TextReveal
                text="votre cadre"
                delay={0.5}
                staggerDelay={0.04}
              />
              <br />
              <TextReveal
                text="de vie idéal"
                delay={0.7}
                staggerDelay={0.04}
                className="text-brick"
              />
            </h1>

            {/* Rule */}
            <motion.div
              className="editorial-rule mb-8"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
              style={{ transformOrigin: 'left' }}
            />

            {/* Subtitle */}
            <motion.p
              className="text-editorial text-stone max-w-md leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
            >
              Découvrez les plus belles propriétés d'Hesperange, entre le lac,
              la nature et la proximité de Luxembourg-ville. Une sélection pensée
              pour les familles et les amoureux du calme.
            </motion.p>

            {/* CTA */}
            <motion.div
              className="mt-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <a href="#proprietes" className="btn-primary">
                Découvrir la sélection
              </a>
            </motion.div>
          </motion.div>

          {/* Image - Right Side */}
          <motion.div
            className="lg:col-span-7 xl:col-span-8 order-1 lg:order-2 relative"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative aspect-[4/3] lg:aspect-[16/10] overflow-hidden">
              <motion.div
                className="absolute inset-0"
                style={{ y: imageY, scale: imageScale }}
              >
                <Image
                  src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=80"
                  alt="Villa contemporaine avec jardin à Hesperange, vue sur le lac au loin"
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 1024px) 100vw, 60vw"
                />
              </motion.div>
            </div>

            {/* Caption */}
            <motion.p
              className="image-caption mt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.2 }}
            >
              Hesperange, quartier résidentiel — Villa contemporaine, 245 m²
            </motion.p>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.5 }}
      >
        <span className="text-caption uppercase tracking-widest text-stone">
          Scroll
        </span>
        <motion.div
          className="w-px h-12 bg-stone/30"
          animate={{ scaleY: [1, 0.5, 1] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
    </section>
  )
}
