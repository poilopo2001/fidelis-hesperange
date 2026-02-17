import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const size = { width: 32, height: 32 }
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#1a1a1a',
          borderRadius: 4,
        }}
      >
        <span
          style={{
            fontSize: 20,
            fontWeight: 700,
            color: '#faf9f6',
            fontFamily: 'Georgia, serif',
            lineHeight: 1,
          }}
        >
          F
        </span>
      </div>
    ),
    { ...size }
  )
}
