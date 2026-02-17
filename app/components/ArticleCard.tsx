import Image from 'next/image'
import Link from 'next/link'
import type { ArticleData, ARTICLE_CATEGORIES } from '../data/articles'

interface ArticleCardProps {
  article: ArticleData
  featured?: boolean
}

export default function ArticleCard({ article, featured = false }: ArticleCardProps) {
  return (
    <Link
      href={`/conseils/${article.slug}`}
      className={`group block ${featured ? 'md:col-span-2 md:grid md:grid-cols-2 md:gap-8' : ''}`}
    >
      {/* Image */}
      <div className={`relative overflow-hidden border border-stone/10 ${featured ? 'aspect-[3/2]' : 'aspect-[3/2] mb-6'}`}>
        <Image
          src={article.image}
          alt={article.imageAlt}
          fill
          className="object-cover transition-transform duration-700 ease-editorial group-hover:scale-105"
          sizes={featured ? '(max-width: 768px) 100vw, 50vw' : '(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw'}
        />
      </div>

      {/* Content */}
      <div className={featured ? 'flex flex-col justify-center mt-6 md:mt-0' : ''}>
        {/* Category */}
        <span className="inline-block text-caption uppercase tracking-[0.15em] text-brick font-medium pb-2 border-b border-brick w-fit">
          {article.category.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
        </span>

        {/* Title */}
        <h3 className={`font-serif text-ink mt-4 group-hover:text-brick transition-colors duration-300 leading-tight ${featured ? 'text-display-md' : 'text-display-sm'}`}>
          {article.title}
        </h3>

        {/* Excerpt */}
        <p className={`text-stone mt-3 leading-relaxed ${featured ? 'text-body' : 'text-body-sm'}`}>
          {article.excerpt}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between mt-6 pt-4 border-t border-stone/10">
          <div className="flex items-center gap-4">
            <span className="text-caption text-stone">{article.author}</span>
            <span className="text-caption text-stone/40">|</span>
            <span className="text-caption text-stone">{article.readTime} min de lecture</span>
          </div>
          <span className="text-body-sm font-medium text-ink group-hover:text-brick transition-colors duration-300 flex items-center gap-2">
            Lire
            <svg
              className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  )
}
