'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const pressItems = ['Wort.lu', 'Paperjam', 'L\'Essentiel', 'Delano', 'Immotop']

export default function PressBar() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <section
      ref={ref}
      className="py-8 border-y border-stone/10 bg-cream-dark/50"
    >
      <div className="section-editorial">
        <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 lg:gap-12">
          <motion.span
            className="text-caption uppercase tracking-widest text-stone whitespace-nowrap"
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            Nos articles cités par
          </motion.span>

          <div className="flex flex-wrap items-center justify-center gap-6 lg:gap-0">
            {pressItems.map((item, index) => (
              <motion.span
                key={item}
                className="font-serif text-lg lg:text-xl text-stone lg:px-8 lg:border-r lg:border-stone/20 last:border-r-0"
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                transition={{
                  duration: 0.5,
                  delay: 0.1 + index * 0.05,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {item}
              </motion.span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
