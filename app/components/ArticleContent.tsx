import type { ArticleSection } from '../data/articles'

interface ArticleContentProps {
  sections: ArticleSection[]
}

export default function ArticleContent({ sections }: ArticleContentProps) {
  return (
    <div className="prose-editorial">
      {sections.map((section, index) => {
        switch (section.type) {
          case 'paragraph':
            return (
              <p key={index} className="text-body text-stone leading-[1.85] mb-6">
                {section.content}
              </p>
            )
          case 'heading':
            return (
              <h2 key={index} className="font-serif text-display-sm text-ink mt-12 mb-4">
                {section.content}
              </h2>
            )
          case 'list':
            return (
              <div key={index} className="mb-6">
                {section.content && (
                  <p className="text-body text-stone leading-[1.85] mb-3">{section.content}</p>
                )}
                <ul className="space-y-2 pl-6">
                  {section.items?.map((item, i) => (
                    <li key={i} className="text-body text-stone leading-[1.85] relative before:content-[''] before:absolute before:-left-4 before:top-[0.6em] before:w-1.5 before:h-1.5 before:bg-brick/60 before:rounded-full">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )
          case 'quote':
            return (
              <blockquote key={index} className="my-8 border-l-2 border-brick pl-6 py-2">
                <p className="font-serif text-display-xs text-ink italic leading-relaxed">
                  {section.content}
                </p>
              </blockquote>
            )
          case 'tip':
            return (
              <div key={index} className="my-8 bg-cream-dark/30 border border-stone/10 p-6">
                <p className="text-caption uppercase tracking-[0.15em] text-brick font-medium mb-2">Bon a savoir</p>
                <p className="text-body text-stone leading-[1.85]">{section.content}</p>
              </div>
            )
          default:
            return null
        }
      })}
    </div>
  )
}
