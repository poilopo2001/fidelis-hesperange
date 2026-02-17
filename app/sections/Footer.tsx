'use client'

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Facebook,
  Linkedin,
  Instagram,
  ArrowRight,
  ChevronDown,
  CheckCircle,
} from 'lucide-react'

// ============================================
// DATA
// ============================================
const navigationLinks = [
  { label: 'Achat', href: '/achat' },
  { label: 'Location', href: '/location' },
  { label: 'Services', href: '/services' },
  { label: 'Conseils', href: '/conseils' },
  { label: 'Équipe', href: '/#equipe' },
  { label: 'Contact', href: '/contact' },
]

const communeLinks = [
  { label: 'Hesperange', href: '/achat/hesperange' },
  { label: 'Alzingen', href: '/achat/alzingen' },
  { label: 'Fentange', href: '/achat/fentange' },
  { label: 'Itzig', href: '/achat/itzig' },
  { label: 'Howald', href: '/achat/howald' },
]

const contactInfo = [
  {
    icon: MapPin,
    label: 'Adresse',
    value: '45, Rue de Luxembourg\nL-1818 Hesperange',
    href: 'https://maps.google.com/?q=45+Rue+de+Luxembourg+Hesperange',
  },
  {
    icon: Phone,
    label: 'Téléphone',
    value: '+352 27 45 67 89',
    href: 'tel:+35227456789',
  },
  {
    icon: Mail,
    label: 'Email',
    value: 'contact@fidelis.lu',
    href: 'mailto:contact@fidelis.lu',
  },
  {
    icon: Clock,
    label: 'Horaires',
    value: 'Lun-Ven 9h-18h\nSam 10h-16h',
    href: null,
  },
]

const socialLinks = [
  {
    icon: Facebook,
    label: 'Facebook',
    href: 'https://facebook.com/fidelishesperange',
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    href: 'https://linkedin.com/company/fidelishesperange',
  },
  {
    icon: Instagram,
    label: 'Instagram',
    href: 'https://instagram.com/fidelishesperange',
  },
]

// ============================================
// ANIMATION VARIANTS
// ============================================
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
}

const columnVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
}

// ============================================
// SUB-COMPONENTS
// ============================================

/** Mobile accordion section for footer columns */
function MobileAccordion({
  title,
  children,
  isOpen,
  onToggle,
}: {
  title: string
  children: React.ReactNode
  isOpen: boolean
  onToggle: () => void
}) {
  return (
    <div className="border-b border-stone/10 lg:hidden">
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between py-4 text-left"
        aria-expanded={isOpen}
      >
        <span className="text-caption font-medium uppercase tracking-[0.2em] text-ink">
          {title}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.25 }}
        >
          <ChevronDown className="h-4 w-4 text-stone" />
        </motion.span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="pb-5">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/** Newsletter form with state management */
function NewsletterForm() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault()
      if (!email) return
      setStatus('loading')
      try {
        const res = await fetch('/api/newsletter', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email }),
        })
        if (res.ok) {
          setStatus('success')
          setEmail('')
        } else {
          setStatus('error')
        }
      } catch {
        setStatus('error')
      }
    },
    [email]
  )

  return (
    <div>
      <AnimatePresence mode="wait">
        {status === 'success' ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="flex items-center gap-2 py-3 text-brick"
          >
            <CheckCircle className="h-5 w-5" strokeWidth={1.5} />
            <span className="text-body-sm font-medium">
              Inscription confirmée, merci.
            </span>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            exit={{ opacity: 0, y: -8 }}
            onSubmit={handleSubmit}
            className="relative"
            aria-label="Inscription newsletter"
          >
            <label htmlFor="footer-email" className="sr-only">
              Adresse e-mail
            </label>
            <div className="flex">
              <input
                type="email"
                id="footer-email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="votre@email.lu"
                required
                className="flex-1 border border-stone/20 bg-transparent px-4 py-3 text-body-sm text-ink placeholder:text-stone/50 transition-colors duration-300 focus:border-brick focus:outline-none"
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                aria-label="S&apos;inscrire à la newsletter"
                className="flex items-center gap-2 bg-ink px-5 py-3 text-caption font-medium uppercase tracking-wider text-cream transition-colors duration-300 hover:bg-brick disabled:opacity-60"
              >
                {status === 'loading' ? (
                  <motion.span
                    animate={{ rotate: 360 }}
                    transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                    className="block h-4 w-4 rounded-full border-2 border-cream/30 border-t-cream"
                  />
                ) : (
                  <>
                    OK
                    <ArrowRight className="h-3 w-3" strokeWidth={2} />
                  </>
                )}
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
      <p className="mt-3 text-caption text-stone/60">
        En vous inscrivant, vous acceptez notre politique de confidentialité.
      </p>
    </div>
  )
}

/** Footer link with underline hover animation */
function FooterLink({
  href,
  children,
  external = false,
}: {
  href: string
  children: React.ReactNode
  external?: boolean
}) {
  const Component = external ? 'a' : Link
  const externalProps = external
    ? { target: '_blank' as const, rel: 'noopener noreferrer' }
    : {}

  return (
    <Component
      href={href}
      className="group inline-flex items-center text-body-sm text-stone transition-colors duration-300 hover:text-brick"
      {...externalProps}
    >
      <span className="relative">
        {children}
        <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-brick transition-all duration-300 ease-editorial group-hover:w-full" />
      </span>
    </Component>
  )
}

// ============================================
// MAIN COMPONENT
// ============================================
export default function Footer() {
  const [openSection, setOpenSection] = useState<string | null>(null)

  const toggleSection = useCallback((title: string) => {
    setOpenSection((prev) => (prev === title ? null : title))
  }, [])

  return (
    <footer className="border-t border-stone/10 bg-cream">
      {/* ── Top CTA Band ── */}
      <div className="bg-ink">
        <div className="mx-auto flex max-w-[1800px] flex-col items-center justify-between gap-4 px-6 py-10 sm:px-8 md:flex-row lg:px-12 lg:py-12 xl:px-16">
          <div>
            <p className="font-serif text-display-sm text-cream">
              Un projet immobilier ?
            </p>
            <p className="mt-1 text-body-sm text-stone-light">
              Parlons de votre recherche ou de votre bien à vendre.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <a
              href="tel:+35227456789"
              className="inline-flex items-center gap-2 border border-cream/20 px-6 py-3 text-body-sm font-medium text-cream transition-all duration-300 hover:border-cream hover:bg-cream hover:text-ink"
            >
              <Phone className="h-4 w-4" strokeWidth={1.5} />
              +352 27 45 67 89
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center bg-brick px-6 py-3 text-body-sm font-medium text-cream transition-all duration-300 hover:bg-brick-dark"
            >
              Prendre rendez-vous
              <ArrowRight className="ml-2 h-4 w-4" strokeWidth={1.5} />
            </Link>
          </div>
        </div>
      </div>

      {/* ── Main Footer Content ── */}
      <motion.div
        className="mx-auto max-w-[1800px] px-6 sm:px-8 lg:px-12 xl:px-16"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
      >
        <div className="py-14 lg:py-16">
          {/* Desktop: 5-column grid — Mobile: accordions */}
          <div className="hidden gap-8 lg:grid lg:grid-cols-5">
            {/* Col 1: Brand */}
            <motion.div variants={columnVariants} className="lg:col-span-1">
              <Link
                href="/"
                className="relative block h-10 w-36"
                aria-label="Fidelis Hesperange — Retour à l&apos;accueil"
              >
                <Image
                  src="/images/logo.png"
                  alt="Fidelis Hesperange"
                  fill
                  className="object-contain object-left"
                />
              </Link>
              <p className="mt-5 max-w-[240px] text-body-sm leading-relaxed text-stone">
                Votre agence immobilière à Hesperange.
                Entre le lac et la capitale.
              </p>

              {/* Social */}
              <div className="mt-6 flex items-center gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Suivez-nous sur ${social.label}`}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-stone/20 text-stone transition-all duration-300 hover:border-brick/30 hover:bg-brick/5 hover:text-brick"
                  >
                    <social.icon className="h-4 w-4" strokeWidth={1.5} />
                  </a>
                ))}
              </div>
            </motion.div>

            {/* Col 2: Navigation */}
            <motion.div variants={columnVariants}>
              <h3 className="mb-5 text-caption font-medium uppercase tracking-[0.2em] text-ink">
                Navigation
              </h3>
              <nav aria-label="Navigation pied de page">
                <ul className="space-y-3">
                  {navigationLinks.map((link) => (
                    <li key={link.label}>
                      <FooterLink href={link.href}>{link.label}</FooterLink>
                    </li>
                  ))}
                </ul>
              </nav>
            </motion.div>

            {/* Col 3: Communes */}
            <motion.div variants={columnVariants}>
              <h3 className="mb-5 text-caption font-medium uppercase tracking-[0.2em] text-ink">
                Nos communes
              </h3>
              <ul className="space-y-3">
                {communeLinks.map((link) => (
                  <li key={link.label}>
                    <FooterLink href={link.href}>{link.label}</FooterLink>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Col 4: Contact */}
            <motion.div variants={columnVariants}>
              <h3 className="mb-5 text-caption font-medium uppercase tracking-[0.2em] text-ink">
                Contact
              </h3>
              <address className="not-italic">
                <ul className="space-y-4">
                  {contactInfo.map((item) => (
                    <li key={item.label} className="flex items-start gap-3">
                      <item.icon
                        className="mt-0.5 h-4 w-4 flex-shrink-0 text-brick"
                        strokeWidth={1.5}
                      />
                      <div>
                        <span className="sr-only">{item.label} :</span>
                        {item.href ? (
                          <a
                            href={item.href}
                            className="text-body-sm text-stone transition-colors duration-300 hover:text-brick"
                            target={item.href.startsWith('http') ? '_blank' : undefined}
                            rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                          >
                            {item.value.split('\n').map((line, i) => (
                              <span key={i}>
                                {line}
                                {i < item.value.split('\n').length - 1 && <br />}
                              </span>
                            ))}
                          </a>
                        ) : (
                          <span className="text-body-sm text-stone">
                            {item.value.split('\n').map((line, i) => (
                              <span key={i}>
                                {line}
                                {i < item.value.split('\n').length - 1 && <br />}
                              </span>
                            ))}
                          </span>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </address>
            </motion.div>

            {/* Col 5: Newsletter */}
            <motion.div variants={columnVariants}>
              <h3 className="mb-5 text-caption font-medium uppercase tracking-[0.2em] text-ink">
                Newsletter
              </h3>
              <p className="mb-4 text-body-sm leading-relaxed text-stone">
                Recevez notre sélection hebdomadaire de biens.
              </p>
              <NewsletterForm />
            </motion.div>
          </div>

          {/* Mobile: Logo + Accordions */}
          <div className="lg:hidden">
            {/* Logo mobile */}
            <div className="mb-8">
              <Link
                href="/"
                className="relative block h-10 w-36"
                aria-label="Fidelis Hesperange"
              >
                <Image
                  src="/images/logo.png"
                  alt="Fidelis Hesperange"
                  fill
                  className="object-contain object-left"
                />
              </Link>
              <p className="mt-4 max-w-[280px] text-body-sm text-stone">
                Votre agence immobilière à Hesperange. Entre le lac et la capitale.
              </p>
            </div>

            {/* Navigation accordion */}
            <MobileAccordion
              title="Navigation"
              isOpen={openSection === 'nav'}
              onToggle={() => toggleSection('nav')}
            >
              <ul className="space-y-3">
                {navigationLinks.map((link) => (
                  <li key={link.label}>
                    <FooterLink href={link.href}>{link.label}</FooterLink>
                  </li>
                ))}
              </ul>
            </MobileAccordion>

            {/* Communes accordion */}
            <MobileAccordion
              title="Nos communes"
              isOpen={openSection === 'communes'}
              onToggle={() => toggleSection('communes')}
            >
              <ul className="space-y-3">
                {communeLinks.map((link) => (
                  <li key={link.label}>
                    <FooterLink href={link.href}>{link.label}</FooterLink>
                  </li>
                ))}
              </ul>
            </MobileAccordion>

            {/* Contact accordion */}
            <MobileAccordion
              title="Contact"
              isOpen={openSection === 'contact'}
              onToggle={() => toggleSection('contact')}
            >
              <address className="not-italic">
                <ul className="space-y-4">
                  {contactInfo.map((item) => (
                    <li key={item.label} className="flex items-start gap-3">
                      <item.icon
                        className="mt-0.5 h-4 w-4 flex-shrink-0 text-brick"
                        strokeWidth={1.5}
                      />
                      <div>
                        {item.href ? (
                          <a
                            href={item.href}
                            className="text-body-sm text-stone hover:text-brick"
                            target={item.href.startsWith('http') ? '_blank' : undefined}
                            rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                          >
                            {item.value.split('\n').join(', ')}
                          </a>
                        ) : (
                          <span className="text-body-sm text-stone">
                            {item.value.split('\n').join(', ')}
                          </span>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </address>
            </MobileAccordion>

            {/* Newsletter mobile (toujours visible) */}
            <div className="mt-8">
              <p className="mb-4 text-caption font-medium uppercase tracking-[0.2em] text-ink">
                Newsletter
              </p>
              <p className="mb-4 text-body-sm text-stone">
                Recevez notre sélection hebdomadaire de biens.
              </p>
              <NewsletterForm />
            </div>

            {/* Social mobile */}
            <div className="mt-8 flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Suivez-nous sur ${social.label}`}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-stone/20 text-stone transition-all duration-300 hover:border-brick/30 hover:text-brick"
                >
                  <social.icon className="h-4 w-4" strokeWidth={1.5} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* ── Bottom Bar ── */}
      <div className="border-t border-stone/10">
        <div className="mx-auto max-w-[1800px] px-6 sm:px-8 lg:px-12 xl:px-16">
          <div className="flex flex-col items-center justify-between gap-4 py-6 sm:flex-row">
            <p className="text-caption text-stone">
              &copy; {new Date().getFullYear()}{' '}
              <span className="font-medium text-ink">Fidelis</span>
              . Tous droits réservés.
            </p>
            <nav
              aria-label="Liens légaux"
              className="flex items-center gap-6"
            >
              <Link
                href="/mentions-legales"
                className="text-caption text-stone transition-colors duration-300 hover:text-brick"
              >
                Mentions légales
              </Link>
              <span className="h-3 w-px bg-stone/20" aria-hidden="true" />
              <Link
                href="/politique-confidentialite"
                className="text-caption text-stone transition-colors duration-300 hover:text-brick"
              >
                Confidentialité
              </Link>
              <span className="h-3 w-px bg-stone/20" aria-hidden="true" />
              <Link
                href="/honoraires"
                className="text-caption text-stone transition-colors duration-300 hover:text-brick"
              >
                Honoraires
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  )
}
