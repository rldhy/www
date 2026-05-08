import { NextRequest, NextResponse } from 'next/server'
import HCaptchaService from '../../../services/hcaptcha/hcaptcha-service'
import EmailService from '../../../services/email/email-service'
import { getRequestLogger } from '../../../utils/logger/logger'

async function handler(req: NextRequest) {
  const requestLogger = getRequestLogger(req, 'contact')
  const startTime = Date.now()

  try {
    const body = await req.json()

    const hcaptchaService = new HCaptchaService()
    const captchaVerified = await hcaptchaService.verifyToken(body.hcaptchaToken)
    if (!captchaVerified) {
      requestLogger.warn({ statusCode: 401, durationMs: Date.now() - startTime }, 'Contact request failed hCaptcha verification')
      return NextResponse.json({ error: 'hcaptcha verification failed' }, { status: 401 })
    }

    const emailService = new EmailService()
    const sent = await emailService.sendGetInTouchMessage({
      fullName: body.fullName,
      email: body.email,
      subject: body.subject,
      message: body.message,
    })

    if (!sent) {
      requestLogger.error({ statusCode: 500, durationMs: Date.now() - startTime }, 'Contact email was not sent')
      return NextResponse.json({ message: 'Email was not sent' }, { status: 500 })
    }
  } catch (error) {
    requestLogger.error({ err: error, statusCode: 500, durationMs: Date.now() - startTime }, 'Error submitting contact request')
    return NextResponse.json({ error: 'Method not allowed' }, { status: 500 })
  }

  requestLogger.info({ statusCode: 200, durationMs: Date.now() - startTime }, 'Contact request completed')
  return NextResponse.json({ message: 'Email sent successfully' }, { status: 200 })
}

export { handler as POST }
