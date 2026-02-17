import type { Metadata } from 'next'
import EditorialNav from '../components/EditorialNav'
import Footer from '../sections/Footer'
import JsonLd from '../components/JsonLd'
import ArticleCard from '../components/ArticleCard'
import { getAllArticles, ARTICLE_CATEGORIES, type ArticleCategory } from '../data/articles'
import { generateBreadcrumbSchema, generateWebPageSchema } from '../lib/seo/schemas'

export const metadata: Metadata = {
  title: 'Conseils & Actualites — Vivre a Hesperange',
  description: 'Guides, conseils et actualites sur Hesperange : restaurants, ecoles, loisirs, marche immobilier, transports. Tout savoir pour vivre et investir a Hesperange.',
  keywords: [
    'hesperange guide',
    'vivre hesperange',
    'restaurants hesperange',
    'ecoles hesperange',
    'immobilier hesperange',
    'hesper beach',
    'lac hesperange',
  ],
  openGraph: {
    type: 'website',
    url: 'https://www.fidelis.lu/conseils',
    title: 'Conseils & Actualites — Fidelis Hesperange',
    description: 'Guides, conseils et actualites sur Hesperange : restaurants, ecoles, loisirs, immobilier.',
    images: [
      {
        url: 'https://www.fidelis.lu/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'Conseils Hesperange — Fidelis',
      },
    ],
  },
  alternates: {
    canonical: '/conseils',
  },
}

export default function ConseilsPage() {
  const articles = getAllArticles()
  const featured = articles[0]
  const rest = articles.slice(1)

  const schemas = [
    generateWebPageSchema({
      url: '/conseils',
      title: 'Conseils & Actualites — Vivre a Hesperange',
      description: 'Guides, conseils et actualites sur Hesperange.',
    }),
    generateBreadcrumbSchema([
      { name: 'Accueil', url: '/' },
      { name: 'Conseils', url: '/conseils' },
    ]),
  ]

  return (
    <>
      <JsonLd data={schemas} />
      <EditorialNav />
      <main className="pt-24 lg:pt-28">
        {/* Hero */}
        <section className="section-editorial mb-16 lg:mb-20">
          <span className="editorial-badge">Conseils & Actualites</span>
          <h1 className="font-serif text-display-xl text-ink mt-6 max-w-3xl">
            Vivre a <span className="text-brick">Hesperange</span>
          </h1>
          <p className="text-body-lg text-stone mt-4 max-w-2xl">
            Guides, bonnes adresses et actualites pour decouvrir la commune et ses cinq sections.
          </p>
        </section>

        {/* Featured Article */}
        {featured && (
          <section className="section-editorial mb-16 lg:mb-20">
            <ArticleCard article={featured} featured />
          </section>
        )}

        {/* Article Grid */}
        <section className="section-editorial mb-16 lg:mb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {rest.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        </section>

        {/* Categories */}
        <section className="section-editorial mb-16 lg:mb-20">
          <h2 className="font-serif text-display-md text-ink mb-8">Par categorie</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {(Object.keys(ARTICLE_CATEGORIES) as ArticleCategory[]).map((key) => {
              const cat = ARTICLE_CATEGORIES[key]
              return (
                <div key={key} className="border border-stone/10 p-6 hover:border-brick/30 transition-colors duration-300">
                  <h3 className="font-serif text-display-xs text-ink">{cat.label}</h3>
                  <p className="text-body-sm text-stone mt-2">{cat.description}</p>
                </div>
              )
            })}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
