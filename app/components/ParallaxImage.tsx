'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import Image from 'next/image'

interface ParallaxImageProps {
  src: string
  alt: string
  className?: string
  caption?: string
  parallaxSpeed?: number
  priority?: boolean
}

export default function ParallaxImage({
  src,
  alt,
  className = '',
  caption,
  parallaxSpeed = 0.2,
  priority = false,
}: ParallaxImageProps) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], ['-15%', '15%'])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1, 1.1])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.6, 1, 1, 0.6])

  return (
    <figure ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div
        className="relative w-full h-full"
        style={{ y, scale }}
      >
        <motion.div style={{ opacity }} className="w-full h-full">
          <Image
            src={src}
            alt={alt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={priority}
          />
        </motion.div>
      </motion.div>
      {caption && (
        <figcaption className="image-caption">{caption}</figcaption>
      )}
    </figure>
  )
}
