'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

interface Section {
  id: string
  name: string
}

interface SectionGridProps {
  sections: Section[]
  basePath: string
}

export default function SectionGrid({ sections, basePath }: SectionGridProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {sections.map((section, index) => (
        <motion.div
          key={section.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 + index * 0.05 }}
        >
          <Link
            href={`${basePath}/${section.id}`}
            className="block p-4 bg-white border border-stone/10 hover:border-brick transition-colors group"
          >
            <h3 className="font-serif text-lg text-ink group-hover:text-brick transition-colors">
              {section.name}
            </h3>
          </Link>
        </motion.div>
      ))}
    </div>
  )
}
