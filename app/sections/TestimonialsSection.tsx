'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import TextReveal from '../components/TextReveal'

const testimonials = [
  {
    quote:
      "Nous cherchions une maison familiale calme mais proche de la ville. Fidelis nous a fait découvrir un quartier d'Hesperange que nous ne connaissions pas. Notre maison avec vue sur le lac dépasse tous nos rêves.",
    author: 'Claire & Mathieu D.',
    role: 'Acquéreurs — Hesperange, quartier du Lac',
  },
  {
    quote:
      "Vendre notre maison d'Hesperange après 20 ans n'était pas évident émotionnellement. Fidelis a su valoriser notre bien avec respect et professionnalisme. Vendue en deux semaines à des acquéreurs charmants.",
    author: 'Marie & Philippe R.',
    role: 'Vendeurs — Hesperange, centre',
  },
]

export default function TestimonialsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="quartiers" className="editorial-py bg-cream-dark/30" ref={ref}>
      <div className="section-editorial">
        {/* Header */}
        <div className="mb-16 lg:mb-20">
          <motion.span
            className="editorial-badge"
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            Paroles de clients
          </motion.span>

          <h2 className="font-serif text-display-lg text-ink mt-6 max-w-2xl">
            <TextReveal
              text="Ceux qui nous"
              delay={0.1}
            />
            <br />
            <TextReveal
              text="ont fait confiance"
              delay={0.3}
              className="text-brick"
            />
          </h2>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {testimonials.map((testimonial, index) => (
            <motion.blockquote
              key={index}
              className="relative bg-white p-8 lg:p-12"
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{
                duration: 0.8,
                delay: 0.2 + index * 0.15,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {/* Quote Mark */}
              <span className="absolute top-6 left-8 lg:top-8 lg:left-12 font-serif text-8xl lg:text-9xl text-stone/10 leading-none select-none">
                "
              </span>

              {/* Quote Text */}
              <p className="relative font-serif text-xl lg:text-2xl text-ink leading-relaxed italic pt-16">
                {testimonial.quote}
              </p>

              {/* Author */}
              <footer className="mt-8 pt-6 border-t border-stone/10">
                <cite className="not-italic">
                  <span className="font-medium text-ink">{testimonial.author}</span>
                  <span className="block text-caption text-stone mt-1">
                    {testimonial.role}
                  </span>
                </cite>
              </footer>
            </motion.blockquote>
          ))}
        </div>
      </div>
    </section>
  )
}
