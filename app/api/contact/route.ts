import { NextRequest, NextResponse } from 'next/server'
import HCaptchaService from '../../../services/hcaptcha/hcaptcha-service'
import BrevoService from '../../../services/brevo/brevo-service'

async function handler(req: NextRequest) {
  try {
    const body = await req.json()

    const hcaptchaService = new HCaptchaService()
    const captchaVerified = await hcaptchaService.verifyToken(body.hcaptchaToken)
    if (!captchaVerified) {
      return NextResponse.json({ error: 'hcaptcha verification failed' }, { status: 401 })
    }

    const brevoService = new BrevoService()
    const sent = brevoService.sendGetInTouchMessage({
      fullName: body.fullName,
      email: body.email,
      subject: body.subject,
      message: body.message,
    })

    if (!sent) {
      return NextResponse.json({ message: 'Email was not sent' }, { status: 500 })
    }
  } catch (error) {
    console.error('Error submitting contact:', error)
    return NextResponse.json({ error: 'Method not allowed' }, { status: 500 })
  }

  return NextResponse.json({ message: 'Email sent successfully' }, { status: 200 })
}

export { handler as POST }
