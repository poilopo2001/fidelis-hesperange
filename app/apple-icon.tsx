import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const size = { width: 180, height: 180 }
export const contentType = 'image/png'

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 180,
          height: 180,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#1a1a1a',
          borderRadius: 32,
        }}
      >
        <span
          style={{
            fontSize: 110,
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
