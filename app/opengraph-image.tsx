import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Fidelis Hesperange — Immobilier de luxe'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#1a1a1a',
          fontFamily: 'Georgia, serif',
          position: 'relative',
        }}
      >
        {/* Subtle border */}
        <div
          style={{
            position: 'absolute',
            top: 24,
            left: 24,
            right: 24,
            bottom: 24,
            border: '1px solid rgba(250, 249, 246, 0.15)',
            display: 'flex',
          }}
        />

        {/* Top accent line */}
        <div
          style={{
            position: 'absolute',
            top: 24,
            left: 120,
            right: 120,
            height: 2,
            background: '#c44536',
            display: 'flex',
          }}
        />

        {/* Logo letter */}
        <div
          style={{
            fontSize: 72,
            fontWeight: 700,
            color: '#faf9f6',
            letterSpacing: '-2px',
            lineHeight: 1,
            marginBottom: 16,
            display: 'flex',
          }}
        >
          FIDELIS
        </div>

        {/* Divider */}
        <div
          style={{
            width: 60,
            height: 1,
            background: '#c44536',
            marginBottom: 20,
            display: 'flex',
          }}
        />

        {/* Tagline */}
        <div
          style={{
            fontSize: 24,
            color: 'rgba(250, 249, 246, 0.7)',
            fontStyle: 'italic',
            letterSpacing: '4px',
            textTransform: 'uppercase',
            display: 'flex',
          }}
        >
          Hesperange
        </div>

        {/* Bottom text */}
        <div
          style={{
            position: 'absolute',
            bottom: 48,
            fontSize: 16,
            color: 'rgba(250, 249, 246, 0.4)',
            letterSpacing: '6px',
            textTransform: 'uppercase',
            display: 'flex',
          }}
        >
          Immobilier de charme
        </div>

        {/* Bottom accent line */}
        <div
          style={{
            position: 'absolute',
            bottom: 24,
            left: 120,
            right: 120,
            height: 2,
            background: '#c44536',
            display: 'flex',
          }}
        />
      </div>
    ),
    { ...size }
  )
}
