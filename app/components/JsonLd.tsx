'use client'

interface JsonLdProps {
  data: Record<string, unknown> | (Record<string, unknown> | null | false | undefined)[]
}

export default function JsonLd({ data }: JsonLdProps) {
  const cleanData = Array.isArray(data) ? data.filter(Boolean) : data

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(cleanData),
      }}
    />
  )
}
