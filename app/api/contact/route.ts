import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

const RECIPIENT_EMAIL = 'contact@fidelis.lu'
const FROM_EMAIL = 'Fidelis Hesperange <noreply@fidelis.lu>'

interface ContactFormData {
  name: string
  email: string
  phone?: string
  message: string
  type?: 'contact' | 'newsletter'
}

export async function POST(request: NextRequest) {
  try {
    const body: ContactFormData = await request.json()

    // Validation
    if (!body.name || !body.email || !body.message) {
      return NextResponse.json(
        { error: 'Les champs nom, email et message sont requis.' },
        { status: 400 }
      )
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: 'Adresse email invalide.' },
        { status: 400 }
      )
    }

    // Send notification to agency
    await resend.emails.send({
      from: FROM_EMAIL,
      to: RECIPIENT_EMAIL,
      replyTo: body.email,
      subject: `Nouveau message de ${body.name} — Fidelis Hesperange`,
      html: `
        <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; color: #1a1a1a;">
          <div style="border-bottom: 2px solid #c44536; padding-bottom: 16px; margin-bottom: 24px;">
            <h1 style="font-size: 24px; font-weight: 400; margin: 0;">Nouveau message</h1>
            <p style="color: #8a8a8a; font-size: 14px; margin: 4px 0 0;">Via le site fidelis.lu</p>
          </div>
          <table style="width: 100%; border-collapse: collapse; font-size: 15px;">
            <tr>
              <td style="padding: 8px 0; color: #8a8a8a; width: 100px;">Nom</td>
              <td style="padding: 8px 0; font-weight: 500;">${body.name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #8a8a8a;">Email</td>
              <td style="padding: 8px 0;"><a href="mailto:${body.email}" style="color: #c44536;">${body.email}</a></td>
            </tr>
            ${body.phone ? `
            <tr>
              <td style="padding: 8px 0; color: #8a8a8a;">Téléphone</td>
              <td style="padding: 8px 0;"><a href="tel:${body.phone}" style="color: #c44536;">${body.phone}</a></td>
            </tr>` : ''}
          </table>
          <div style="margin-top: 24px; padding: 20px; background: #faf9f6; border-left: 3px solid #c44536;">
            <p style="margin: 0; white-space: pre-wrap; line-height: 1.7;">${body.message}</p>
          </div>
          <p style="margin-top: 32px; font-size: 12px; color: #8a8a8a;">
            Vous pouvez répondre directement à cet email pour contacter ${body.name}.
          </p>
        </div>
      `,
    })

    // Send confirmation to sender
    await resend.emails.send({
      from: FROM_EMAIL,
      to: body.email,
      subject: 'Votre message a bien été reçu — Fidelis Hesperange',
      html: `
        <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; color: #1a1a1a;">
          <div style="border-bottom: 2px solid #c44536; padding-bottom: 16px; margin-bottom: 24px;">
            <h1 style="font-size: 24px; font-weight: 400; margin: 0;">Merci pour votre message</h1>
          </div>
          <p style="font-size: 15px; line-height: 1.8; color: #2d2d2d;">
            Bonjour ${body.name},
          </p>
          <p style="font-size: 15px; line-height: 1.8; color: #2d2d2d;">
            Nous avons bien reçu votre message et reviendrons vers vous dans les plus brefs délais.
          </p>
          <p style="font-size: 15px; line-height: 1.8; color: #2d2d2d;">
            En attendant, n&apos;hésitez pas à nous contacter directement au
            <a href="tel:+35227456789" style="color: #c44536; text-decoration: none;">+352 27 45 67 89</a>.
          </p>
          <div style="margin-top: 32px; padding-top: 16px; border-top: 1px solid #e5e5e5;">
            <p style="font-size: 13px; color: #8a8a8a; margin: 0;">
              Fidelis Hesperange — Agence immobilière<br>
              45, Rue de Luxembourg, L-1818 Hesperange<br>
              <a href="https://fidelis.lu" style="color: #c44536;">fidelis.lu</a>
            </p>
          </div>
        </div>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Une erreur est survenue. Veuillez réessayer.' },
      { status: 500 }
    )
  }
}
