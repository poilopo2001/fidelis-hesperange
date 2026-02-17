'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import TextReveal from '../components/TextReveal'

export default function CTASection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section
      id="contact"
      className="py-32 lg:py-40 bg-ink text-cream relative overflow-hidden"
      ref={ref}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'repeating-linear-gradient(90deg, currentColor 0, currentColor 1px, transparent 1px, transparent 100px)',
          }}
        />
      </div>

      <div className="section-editorial relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <motion.span
            className="inline-flex items-center gap-3 text-caption uppercase tracking-widest text-brick font-medium"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="w-6 h-px bg-brick" />
            Premier contact
            <span className="w-6 h-px bg-brick" />
          </motion.span>

          <h2 className="font-serif text-display-lg lg:text-display-xl mt-8 mb-6">
            <TextReveal
              text="Prêt à trouver"
              delay={0.1}
            />
            <br />
            <TextReveal
              text="votre bien à Hesperange ?"
              delay={0.3}
              className="text-brick"
            />
          </h2>

          <motion.p
            className="text-editorial text-stone-light max-w-xl mx-auto mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            Venez nous rencontrer à notre agence d'Hesperange pour discuter de
            votre projet. Sans engagement, en toute confidentialité.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <a
              href="tel:+35227456789"
              className="inline-flex items-center justify-center px-8 py-4 bg-brick text-cream text-body-sm font-medium uppercase tracking-widest transition-all duration-300 hover:bg-brick-light"
            >
              Appeler le +352 27 45 67 89
            </a>
            <a
              href="mailto:contact@fidelis.lu"
              className="inline-flex items-center justify-center px-8 py-4 border border-cream/30 text-cream text-body-sm font-medium uppercase tracking-widest transition-all duration-300 hover:bg-cream hover:text-ink"
            >
              Écrire à Hesperange
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
