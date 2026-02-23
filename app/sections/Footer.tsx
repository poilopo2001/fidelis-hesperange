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
  ArrowUpRight,
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
    value: 'Lun–Ven 9h–18h\nSam 10h–16h',
    href: null,
  },
]

const socialLinks = [
  { icon: Facebook, label: 'Facebook', href: 'https://facebook.com/fidelishesperange' },
  { icon: Linkedin, label: 'LinkedIn', href: 'https://linkedin.com/company/fidelishesperange' },
  { icon: Instagram, label: 'Instagram', href: 'https://instagram.com/fidelishesperange' },
]

// ============================================
// ANIMATION VARIANTS
// ============================================
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.07, delayChildren: 0.05 },
  },
}

const columnVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
}

// ============================================
// SUB-COMPONENTS
// ============================================

/** Mobile accordion section */
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
    <div className="border-b border-cream/10 lg:hidden">
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between py-4 text-left"
        aria-expanded={isOpen}
      >
        <span className="text-caption font-medium uppercase tracking-[0.2em] text-stone-light">
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

/** Newsletter form */
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
            className="flex items-center gap-2 py-3 text-brick-light"
          >
            <CheckCircle className="h-5 w-5" strokeWidth={1.5} />
            <span className="text-body-sm font-medium">Inscription confirmée, merci.</span>
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
                className="flex-1 border border-cream/15 bg-cream/5 px-4 py-3 text-body-sm text-cream placeholder:text-stone transition-colors duration-300 focus:border-brick/60 focus:bg-cream/8 focus:outline-none"
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                aria-label="S'inscrire à la newsletter"
                className="group relative overflow-hidden flex items-center gap-2 bg-cream/10 px-5 py-3 text-caption font-medium uppercase tracking-wider text-cream transition-colors duration-300 hover:bg-brick disabled:opacity-60 border border-cream/15 hover:border-brick"
              >
                {status === 'loading' ? (
                  <motion.span
                    animate={{ rotate: 360 }}
                    transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                    className="block h-4 w-4 rounded-full border-2 border-cream/30 border-t-cream"
                  />
                ) : (
                  'OK'
                )}
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
      <p className="mt-3 text-caption text-stone/50">
        En vous inscrivant, vous acceptez notre politique de confidentialité.
      </p>
    </div>
  )
}

/** Footer link with text-slice hover */
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
      className="group relative inline-flex overflow-hidden text-body-sm"
      {...externalProps}
    >
      {/* Text slides up on hover */}
      <span className="block text-stone transition-transform duration-350 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-full">
        {children}
      </span>
      {/* Clone slides in from below */}
      <span
        aria-hidden="true"
        className="absolute inset-0 block translate-y-full text-brick-light transition-transform duration-350 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0"
      >
        {children}
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
    <footer className="relative overflow-hidden bg-ink" aria-label="Pied de page Fidelis Hesperange">
      {/* Grain texture overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '180px 180px',
        }}
        aria-hidden="true"
      />

      {/* Watermark typographique */}
      <div
        className="pointer-events-none absolute inset-0 flex items-end justify-center overflow-hidden pb-8"
        aria-hidden="true"
      >
        <span
          className="select-none font-serif italic text-cream leading-none"
          style={{
            fontSize: 'clamp(6rem, 18vw, 18rem)',
            opacity: 0.028,
            letterSpacing: '-0.04em',
          }}
        >
          Hesperange
        </span>
      </div>

      {/* ── CTA Supérieur ── */}
      <div className="relative border-b border-cream/10">
        <div className="mx-auto max-w-[1800px] px-6 sm:px-8 lg:px-12 xl:px-16">
          <div className="flex flex-col items-start justify-between gap-8 py-14 lg:flex-row lg:items-center lg:py-16">
            {/* Titre + sous-titre */}
            <div>
              <p className="text-caption uppercase tracking-[0.25em] text-brick mb-3">
                Un projet immobilier ?
              </p>
              <p
                className="font-serif italic text-cream leading-tight"
                style={{ fontSize: 'clamp(2rem, 4vw, 3.25rem)' }}
              >
                Parlons de votre recherche.
              </p>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-4">
              <a
                href="tel:+35227456789"
                className="group inline-flex items-center gap-3 border border-cream/20 px-7 py-4 text-body-sm font-medium text-cream transition-all duration-400 ease-editorial hover:border-cream/50 hover:bg-cream/5"
              >
                <Phone className="h-4 w-4 shrink-0" strokeWidth={1.5} />
                <span>+352 27 45 67 89</span>
              </a>
              <Link
                href="/contact"
                className="group relative inline-flex items-center gap-3 overflow-hidden bg-brick px-7 py-4 text-body-sm font-medium text-cream"
              >
                <span className="absolute inset-0 -translate-x-full bg-brick-dark transition-transform duration-400 ease-editorial group-hover:translate-x-0" />
                <span className="relative">Prendre rendez-vous</span>
                <ArrowUpRight className="relative h-4 w-4 shrink-0 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={1.5} />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ── Main Footer Content ── */}
      <motion.div
        className="relative mx-auto max-w-[1800px] px-6 sm:px-8 lg:px-12 xl:px-16"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
      >
        <div className="py-14 lg:py-16">

          {/* Desktop: 5-column grid */}
          <div className="hidden gap-10 lg:grid lg:grid-cols-5">

            {/* Col 1: Brand */}
            <motion.div variants={columnVariants} className="lg:col-span-1">
              <Link
                href="/"
                className="relative block h-10 w-36 opacity-90 transition-opacity duration-300 hover:opacity-100 focus:outline-none"
                aria-label="Fidelis Hesperange — Retour à l'accueil"
              >
                <Image
                  src="/images/logo.png"
                  alt="Fidelis Hesperange"
                  fill
                  className="object-contain object-left brightness-0 invert"
                />
              </Link>
              <p className="mt-5 max-w-[220px] text-body-sm leading-relaxed text-stone">
                Votre agence immobilière à Hesperange.
                Entre le lac et la capitale.
              </p>

              {/* Social */}
              <div className="mt-7 flex items-center gap-2.5">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Suivez-nous sur ${social.label}`}
                    className="flex h-10 w-10 items-center justify-center border border-cream/15 text-stone transition-all duration-300 hover:border-brick/50 hover:text-brick-light"
                  >
                    <social.icon className="h-4 w-4" strokeWidth={1.5} />
                  </a>
                ))}
              </div>
            </motion.div>

            {/* Col 2: Navigation */}
            <motion.div variants={columnVariants}>
              <h3 className="mb-6 text-caption font-medium uppercase tracking-[0.2em] text-stone-light">
                Navigation
              </h3>
              <nav aria-label="Navigation pied de page">
                <ul className="space-y-3.5">
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
              <h3 className="mb-6 text-caption font-medium uppercase tracking-[0.2em] text-stone-light">
                Nos communes
              </h3>
              <ul className="space-y-3.5">
                {communeLinks.map((link) => (
                  <li key={link.label}>
                    <FooterLink href={link.href}>{link.label}</FooterLink>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Col 4: Contact */}
            <motion.div variants={columnVariants}>
              <h3 className="mb-6 text-caption font-medium uppercase tracking-[0.2em] text-stone-light">
                Contact
              </h3>
              <address className="not-italic">
                <ul className="space-y-4">
                  {contactInfo.map((item) => (
                    <li key={item.label} className="flex items-start gap-3">
                      <item.icon
                        className="mt-0.5 h-4 w-4 shrink-0 text-brick"
                        strokeWidth={1.5}
                      />
                      <div>
                        <span className="sr-only">{item.label} :</span>
                        {item.href ? (
                          <a
                            href={item.href}
                            className="text-body-sm text-stone transition-colors duration-300 hover:text-cream"
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
              <h3 className="mb-6 text-caption font-medium uppercase tracking-[0.2em] text-stone-light">
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
                  className="object-contain object-left brightness-0 invert"
                />
              </Link>
              <p className="mt-4 max-w-[280px] text-body-sm text-stone">
                Votre agence immobilière à Hesperange. Entre le lac et la capitale.
              </p>
            </div>

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
                        className="mt-0.5 h-4 w-4 shrink-0 text-brick"
                        strokeWidth={1.5}
                      />
                      <div>
                        {item.href ? (
                          <a
                            href={item.href}
                            className="text-body-sm text-stone hover:text-cream"
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

            <div className="mt-8">
              <p className="mb-4 text-caption font-medium uppercase tracking-[0.2em] text-stone-light">
                Newsletter
              </p>
              <p className="mb-4 text-body-sm text-stone">
                Recevez notre sélection hebdomadaire de biens.
              </p>
              <NewsletterForm />
            </div>

            <div className="mt-8 flex items-center gap-2.5">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Suivez-nous sur ${social.label}`}
                  className="flex h-11 w-11 items-center justify-center border border-cream/15 text-stone transition-all duration-300 hover:border-brick/50 hover:text-brick-light"
                >
                  <social.icon className="h-4 w-4" strokeWidth={1.5} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* ── Bottom Bar ── */}
      <div className="relative border-t border-cream/10">
        <div className="mx-auto max-w-[1800px] px-6 sm:px-8 lg:px-12 xl:px-16">
          <div className="flex flex-col items-center justify-between gap-4 py-6 sm:flex-row">
            <p className="text-caption text-stone/60">
              &copy; {new Date().getFullYear()}{' '}
              <span className="font-medium text-stone">Fidelis</span>.
              {' '}Tous droits réservés.
            </p>
            <nav aria-label="Liens légaux" className="flex items-center gap-5">
              <Link
                href="/mentions-legales"
                className="text-caption text-stone/60 transition-colors duration-300 hover:text-cream"
              >
                Mentions légales
              </Link>
              <span className="h-3 w-px bg-cream/10" aria-hidden="true" />
              <Link
                href="/politique-confidentialite"
                className="text-caption text-stone/60 transition-colors duration-300 hover:text-cream"
              >
                Confidentialité
              </Link>
              <span className="h-3 w-px bg-cream/10" aria-hidden="true" />
              <Link
                href="/honoraires"
                className="text-caption text-stone/60 transition-colors duration-300 hover:text-cream"
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
