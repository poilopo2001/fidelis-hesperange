import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import EditorialNav from '../../components/EditorialNav'
import Footer from '../../sections/Footer'
import JsonLd from '../../components/JsonLd'
import ArticleContent from '../../components/ArticleContent'
import ArticleCard from '../../components/ArticleCard'
import { getAllArticleSlugs, getArticleBySlug, getRelatedArticles } from '../../data/articles'
import { generateArticleSchema, generateBreadcrumbSchema } from '../../lib/seo/schemas'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return getAllArticleSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const article = getArticleBySlug(slug)
  if (!article) return {}

  const url = `/conseils/${article.slug}`

  return {
    title: article.title,
    description: article.excerpt,
    keywords: article.tags,
    authors: [{ name: article.author }],
    openGraph: {
      type: 'article',
      url: `https://www.fidelis.lu${url}`,
      title: `${article.title} — Fidelis Hesperange`,
      description: article.excerpt,
      publishedTime: article.date,
      authors: [article.author],
      images: [
        {
          url: article.image,
          width: 1200,
          height: 630,
          alt: article.imageAlt,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${article.title} — Fidelis Hesperange`,
      description: article.excerpt,
      images: [article.image],
    },
    alternates: {
      canonical: url,
    },
  }
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params
  const article = getArticleBySlug(slug)
  if (!article) notFound()

  const related = getRelatedArticles(article)
  const url = `/conseils/${article.slug}`

  const schemas = [
    generateArticleSchema(
      article.title,
      article.excerpt,
      url,
      article.image,
      article.date
    ),
    generateBreadcrumbSchema([
      { name: 'Accueil', url: '/' },
      { name: 'Conseils', url: '/conseils' },
      { name: article.title, url },
    ]),
  ]

  return (
    <>
      <JsonLd data={schemas} />
      <EditorialNav />
      <main className="pt-24 lg:pt-28">
        {/* Header */}
        <article className="section-editorial">
          <div className="max-w-3xl mx-auto">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-caption text-stone mb-8" aria-label="Fil d'Ariane">
              <Link href="/" className="hover:text-brick transition-colors">Accueil</Link>
              <span>/</span>
              <Link href="/conseils" className="hover:text-brick transition-colors">Conseils</Link>
              <span>/</span>
              <span className="text-ink">{article.title.length > 40 ? article.title.slice(0, 40) + '...' : article.title}</span>
            </nav>

            {/* Category + Read time */}
            <div className="flex items-center gap-4 mb-6">
              <span className="inline-block text-caption uppercase tracking-[0.15em] text-brick font-medium pb-1 border-b border-brick">
                {article.category.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
              </span>
              <span className="text-caption text-stone">{article.readTime} min de lecture</span>
            </div>

            {/* Title */}
            <h1 className="font-serif text-display-xl text-ink leading-tight">
              {article.title}
            </h1>

            {/* Excerpt */}
            <p className="text-body-lg text-stone mt-6 leading-relaxed">
              {article.excerpt}
            </p>

            {/* Author + Date */}
            <div className="flex items-center gap-4 mt-8 pt-6 border-t border-stone/10">
              <div className="w-10 h-10 bg-brick/10 rounded-full flex items-center justify-center">
                <span className="text-brick font-serif font-semibold text-body-sm">F</span>
              </div>
              <div>
                <p className="text-body-sm font-medium text-ink">{article.author}</p>
                <p className="text-caption text-stone">
                  {new Date(article.date).toLocaleDateString('fr-FR', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </p>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative aspect-[2/1] mt-10 mb-12 overflow-hidden border border-stone/10">
            <Image
              src={article.image}
              alt={article.imageAlt}
              fill
              className="object-cover"
              sizes="100vw"
              priority
            />
          </div>

          {/* Article Body */}
          <div className="max-w-3xl mx-auto">
            <ArticleContent sections={article.content} />
          </div>

          {/* Tags */}
          <div className="max-w-3xl mx-auto mt-12 pt-8 border-t border-stone/10">
            <div className="flex flex-wrap gap-2">
              {article.tags.map((tag) => (
                <span key={tag} className="text-caption uppercase tracking-[0.1em] text-stone bg-cream-dark/40 px-3 py-1.5">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </article>

        {/* Related Articles */}
        {related.length > 0 && (
          <section className="section-editorial mt-16 mb-16 lg:mb-20">
            <h2 className="font-serif text-display-md text-ink mb-8">Articles lies</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {related.map((r) => (
                <ArticleCard key={r.slug} article={r} />
              ))}
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  )
}
