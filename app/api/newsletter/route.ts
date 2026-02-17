import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

const RECIPIENT_EMAIL = 'contact@fidelis.lu'
const FROM_EMAIL = 'Fidelis Hesperange <noreply@fidelis.lu>'

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json(
        { error: 'Email requis.' },
        { status: 400 }
      )
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Adresse email invalide.' },
        { status: 400 }
      )
    }

    // Notify agency of new subscriber
    await resend.emails.send({
      from: FROM_EMAIL,
      to: RECIPIENT_EMAIL,
      subject: `Nouvel abonné newsletter : ${email}`,
      html: `
        <div style="font-family: Georgia, serif; color: #1a1a1a;">
          <h2 style="font-size: 20px; font-weight: 400;">Nouvel abonné newsletter</h2>
          <p style="font-size: 15px; color: #2d2d2d;">
            <strong>${email}</strong> souhaite recevoir votre sélection hebdomadaire.
          </p>
          <p style="font-size: 12px; color: #8a8a8a; margin-top: 24px;">Via fidelis.lu</p>
        </div>
      `,
    })

    // Confirmation to subscriber
    await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: 'Bienvenue dans la sélection Fidelis Hesperange',
      html: `
        <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; color: #1a1a1a;">
          <div style="border-bottom: 2px solid #c44536; padding-bottom: 16px; margin-bottom: 24px;">
            <h1 style="font-size: 24px; font-weight: 400; margin: 0;">Bienvenue</h1>
          </div>
          <p style="font-size: 15px; line-height: 1.8; color: #2d2d2d;">
            Vous recevrez désormais notre sélection hebdomadaire de biens à Hesperange et ses environs.
          </p>
          <p style="font-size: 15px; line-height: 1.8; color: #2d2d2d;">
            En attendant, découvrez nos biens disponibles sur
            <a href="https://fidelis.lu/achat" style="color: #c44536; text-decoration: none;">fidelis.lu</a>.
          </p>
          <div style="margin-top: 32px; padding-top: 16px; border-top: 1px solid #e5e5e5;">
            <p style="font-size: 13px; color: #8a8a8a; margin: 0;">
              Fidelis Hesperange — Agence immobilière<br>
              45, Rue de Luxembourg, L-1818 Hesperange
            </p>
          </div>
        </div>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Newsletter subscription error:', error)
    return NextResponse.json(
      { error: 'Une erreur est survenue. Veuillez réessayer.' },
      { status: 500 }
    )
  }
}
