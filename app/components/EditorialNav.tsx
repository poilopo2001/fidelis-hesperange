'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronDown, Phone } from 'lucide-react'

// ============================================
// TYPES
// ============================================
interface NavLink {
  href: string
  label: string
  children?: { href: string; label: string }[]
}

// ============================================
// CONFIGURATION
// ============================================
const navLinks: NavLink[] = [
  {
    href: '/achat',
    label: 'Achat',
    children: [
      { href: '/achat', label: 'Tous les biens' },
      { href: '/achat/hesperange', label: 'Hesperange' },
      { href: '/achat/alzingen', label: 'Alzingen' },
      { href: '/achat/fentange', label: 'Fentange' },
      { href: '/achat/itzig', label: 'Itzig' },
      { href: '/achat/howald', label: 'Howald' },
    ],
  },
  {
    href: '/location',
    label: 'Location',
    children: [
      { href: '/location', label: 'Toutes les locations' },
      { href: '/location/hesperange', label: 'Hesperange' },
      { href: '/location/alzingen', label: 'Alzingen' },
      { href: '/location/fentange', label: 'Fentange' },
      { href: '/location/itzig', label: 'Itzig' },
      { href: '/location/howald', label: 'Howald' },
    ],
  },
  { href: '/services', label: 'Services' },
  { href: '/conseils', label: 'Conseils' },
  { href: '/#equipe', label: 'Équipe' },
]

const PHONE_NUMBER = '+352 27 45 67 89'
const PHONE_HREF = 'tel:+35227456789'

// ============================================
// HOOKS
// ============================================

/** Hide on scroll down, show on scroll up + scrolled state */
function useSmartScroll() {
  const [visible, setVisible] = useState(true)
  const [scrolled, setScrolled] = useState(false)
  const lastScrollY = useRef(0)
  const ticking = useRef(false)

  useEffect(() => {
    const handleScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          const currentY = window.scrollY
          setScrolled(currentY > 20)
          setVisible(currentY < lastScrollY.current || currentY < 100)
          lastScrollY.current = currentY
          ticking.current = false
        })
        ticking.current = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return { visible, scrolled }
}

// ============================================
// SUB-COMPONENTS
// ============================================

/** Desktop simple link with underline slide effect */
function NavSimpleLink({
  href,
  label,
  isActive,
}: {
  href: string
  label: string
  isActive: boolean
}) {
  return (
    <Link
      href={href}
      className={`group relative inline-flex items-center py-2 text-body-sm font-medium tracking-wide transition-colors duration-300 hover:text-brick focus:outline-none focus-visible:ring-2 focus-visible:ring-brick/50 focus-visible:ring-offset-2 focus-visible:ring-offset-cream ${
        isActive ? 'text-brick' : 'text-ink'
      }`}
      aria-current={isActive ? 'page' : undefined}
    >
      <span className="relative">
        {label}
        <span
          className={`absolute -bottom-0.5 left-0 h-px bg-brick transition-all duration-500 ease-editorial ${
            isActive ? 'w-full' : 'w-0 group-hover:w-full'
          }`}
        />
      </span>
    </Link>
  )
}

/** Desktop dropdown for items with children */
function NavDropdown({
  link,
  isActive,
}: {
  link: NavLink
  isActive: boolean
}) {
  const [isOpen, setIsOpen] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const handleMouseEnter = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setIsOpen(true)
  }, [])

  const handleMouseLeave = useCallback(() => {
    timeoutRef.current = setTimeout(() => setIsOpen(false), 150)
  }, [])

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Escape') setIsOpen(false)
  }, [])

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onKeyDown={handleKeyDown}
    >
      <button
        className={`group relative inline-flex items-center gap-1.5 py-2 text-body-sm font-medium tracking-wide transition-colors duration-300 hover:text-brick focus:outline-none focus-visible:ring-2 focus-visible:ring-brick/50 focus-visible:ring-offset-2 focus-visible:ring-offset-cream ${
          isActive ? 'text-brick' : 'text-ink'
        }`}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <span className="relative">
          {link.label}
          <span
            className={`absolute -bottom-0.5 left-0 h-px bg-brick transition-all duration-500 ease-editorial ${
              isActive ? 'w-full' : 'w-0 group-hover:w-full'
            }`}
          />
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <ChevronDown className="h-3.5 w-3.5" />
        </motion.span>
      </button>

      <AnimatePresence>
        {isOpen && link.children && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="absolute left-1/2 top-full z-50 w-56 -translate-x-1/2 pt-3"
          >
            <div className="overflow-hidden border border-stone/10 bg-cream/95 shadow-xl shadow-ink/5 backdrop-blur-md">
              <nav className="py-2" role="menu">
                {link.children.map((child, i) => (
                  <motion.div
                    key={child.href}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.25,
                      delay: i * 0.04,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    <Link
                      href={child.href}
                      className="block px-5 py-2.5 text-body-sm text-ink transition-all duration-300 hover:bg-cream-dark/50 hover:text-brick focus:bg-cream-dark/50 focus:text-brick focus:outline-none"
                      role="menuitem"
                    >
                      {child.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/** Hamburger icon with morphing animation */
function HamburgerButton({
  isOpen,
  onClick,
}: {
  isOpen: boolean
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className="relative z-50 flex h-12 w-12 items-center justify-center rounded-full transition-colors duration-300 hover:bg-ink/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-brick/50 lg:hidden"
      aria-label={isOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
      aria-expanded={isOpen}
      aria-controls="mobile-menu"
    >
      <div className="relative flex h-5 w-6 flex-col items-center justify-between">
        <motion.span
          animate={isOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="h-px w-full origin-center bg-ink"
        />
        <motion.span
          animate={isOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.2 }}
          className="h-px w-full bg-ink"
        />
        <motion.span
          animate={isOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="h-px w-full origin-center bg-ink"
        />
      </div>
    </button>
  )
}

/** Fullscreen mobile menu with clip-path reveal from burger position */
function MobileMenu({
  isOpen,
  onClose,
}: {
  isOpen: boolean
  onClose: () => void
}) {
  const [expandedItem, setExpandedItem] = useState<string | null>(null)
  const pathname = usePathname()

  const toggleItem = useCallback((label: string) => {
    setExpandedItem((prev) => (prev === label ? null : label))
  }, [])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          id="mobile-menu"
          className="fixed inset-0 z-40 bg-cream lg:hidden"
          initial={{ clipPath: 'circle(0% at calc(100% - 40px) 32px)' }}
          animate={{ clipPath: 'circle(150% at calc(100% - 40px) 32px)' }}
          exit={{ clipPath: 'circle(0% at calc(100% - 40px) 32px)' }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <nav className="flex h-full flex-col justify-center gap-1 px-8 py-24">
            {navLinks.map((link, index) => {
              const isExpanded = expandedItem === link.label
              const isActive = pathname.startsWith(link.href.replace('/#', '/'))

              return (
                <motion.div
                  key={link.href}
                  className="w-full"
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 24 }}
                  transition={{
                    duration: 0.4,
                    delay: 0.15 + index * 0.06,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  {link.children ? (
                    <>
                      <button
                        onClick={() => toggleItem(link.label)}
                        className={`flex w-full items-center justify-between py-3 font-serif text-3xl font-light tracking-wide transition-colors duration-300 hover:text-brick focus:outline-none ${
                          isActive ? 'text-brick' : 'text-ink'
                        }`}
                        aria-expanded={isExpanded}
                      >
                        {link.label}
                        <motion.span
                          animate={{ rotate: isExpanded ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <ChevronDown className="h-5 w-5" />
                        </motion.span>
                      </button>
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                            className="overflow-hidden"
                          >
                            <div className="flex flex-col gap-2 pb-3 pl-4 pt-1">
                              {link.children.map((child, ci) => (
                                <motion.div
                                  key={child.href}
                                  initial={{ opacity: 0, x: -12 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  exit={{ opacity: 0, x: -12 }}
                                  transition={{ duration: 0.3, delay: ci * 0.04 }}
                                >
                                  <Link
                                    href={child.href}
                                    className="text-body-lg text-stone transition-colors duration-300 hover:text-brick"
                                    onClick={onClose}
                                  >
                                    {child.label}
                                  </Link>
                                </motion.div>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    <Link
                      href={link.href}
                      className={`block py-3 font-serif text-3xl font-light tracking-wide transition-colors duration-300 hover:text-brick ${
                        isActive ? 'text-brick' : 'text-ink'
                      }`}
                      onClick={onClose}
                    >
                      {link.label}
                    </Link>
                  )}
                </motion.div>
              )
            })}

            {/* Mobile CTA */}
            <motion.div
              className="mt-8 flex flex-col gap-4"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 24 }}
              transition={{ duration: 0.4, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <a
                href={PHONE_HREF}
                className="inline-flex items-center gap-3 font-serif text-xl text-ink transition-colors duration-300 hover:text-brick"
              >
                <Phone className="h-5 w-5" strokeWidth={1.5} />
                {PHONE_NUMBER}
              </a>
              <Link
                href="/contact"
                className="mt-2 inline-flex w-fit items-center bg-ink px-8 py-4 font-sans text-body-sm font-medium uppercase tracking-widest text-cream transition-all duration-300 hover:bg-brick"
                onClick={onClose}
              >
                Prendre rendez-vous
              </Link>
            </motion.div>

            {/* Branding footer */}
            <motion.p
              className="mt-auto text-caption uppercase tracking-widest text-stone"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              Fidelis Hesperange — Immobilier
            </motion.p>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// ============================================
// MAIN COMPONENT
// ============================================
export default function EditorialNav(): JSX.Element {
  const { visible, scrolled } = useSmartScroll()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMobileMenuOpen])

  // Close mobile menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMobileMenuOpen(false)
    }
    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen((prev) => !prev)
  }, [])

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false)
  }, [])

  return (
    <>
      {/* Skip link — accessibility */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-cream focus:px-4 focus:py-2 focus:text-ink focus:shadow-lg"
      >
        Aller au contenu principal
      </a>

      <motion.header
        animate={{ y: visible || isMobileMenuOpen ? 0 : '-100%' }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed left-0 right-0 top-0 z-50 transition-all duration-500 ease-editorial ${
          scrolled
            ? 'border-b border-stone/10 bg-cream/90 shadow-sm shadow-ink/5 backdrop-blur-xl'
            : 'bg-transparent'
        }`}
      >
        <div className="mx-auto max-w-[1800px] px-6 sm:px-8 lg:px-12 xl:px-16">
          <nav className="flex h-16 items-center justify-between lg:h-20" aria-label="Navigation principale">
            {/* Logo */}
            <Link
              href="/"
              className="relative z-50 h-10 w-32 transition-opacity duration-300 hover:opacity-80 focus:outline-none focus-visible:opacity-80 lg:h-11 lg:w-36"
              aria-label="Fidelis Hesperange — Accueil"
            >
              <Image
                src="/images/logo.png"
                alt="Fidelis Hesperange"
                fill
                className="object-contain object-left"
                priority
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden items-center gap-9 lg:flex">
              {navLinks.map((link) => {
                const isActive = pathname === link.href || pathname.startsWith(link.href.replace('/#', '/'))

                return link.children ? (
                  <NavDropdown key={link.href} link={link} isActive={isActive} />
                ) : (
                  <NavSimpleLink
                    key={link.href}
                    href={link.href}
                    label={link.label}
                    isActive={isActive}
                  />
                )
              })}
            </div>

            {/* Desktop Actions */}
            <div className="hidden items-center gap-5 lg:flex">
              <a
                href={PHONE_HREF}
                className="inline-flex items-center gap-2 text-body-sm font-medium text-ink transition-colors duration-300 hover:text-brick"
                aria-label={`Appeler le ${PHONE_NUMBER}`}
              >
                <Phone className="h-4 w-4" strokeWidth={1.5} />
                <span className="hidden xl:inline">{PHONE_NUMBER}</span>
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center bg-ink px-6 py-2.5 text-body-sm font-medium tracking-wide text-cream transition-all duration-500 ease-editorial hover:-translate-y-0.5 hover:bg-brick hover:shadow-lg hover:shadow-brick/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-brick focus-visible:ring-offset-2 focus-visible:ring-offset-cream"
              >
                Contact
              </Link>
            </div>

            {/* Mobile: Phone + Hamburger */}
            <div className="flex items-center gap-1 lg:hidden">
              <a
                href={PHONE_HREF}
                className="flex h-12 w-12 items-center justify-center rounded-full transition-colors duration-300 hover:bg-ink/5"
                aria-label={`Appeler le ${PHONE_NUMBER}`}
              >
                <Phone className="h-5 w-5 text-ink" strokeWidth={1.5} />
              </a>
              <HamburgerButton
                isOpen={isMobileMenuOpen}
                onClick={toggleMobileMenu}
              />
            </div>
          </nav>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <MobileMenu isOpen={isMobileMenuOpen} onClose={closeMobileMenu} />
    </>
  )
}
