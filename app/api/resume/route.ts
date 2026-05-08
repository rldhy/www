import { NextRequest, NextResponse } from 'next/server'
import HCaptchaService from '../../../services/hcaptcha/hcaptcha-service'
import ResumeService from '../../../services/resume/resume-service'
import { getRequestLogger } from '../../../utils/logger/logger'

export async function GET(req: NextRequest) {
  const requestLogger = getRequestLogger(req, 'resume')
  const startTime = Date.now()

  try {
    const hcaptchaToken = req.nextUrl.searchParams.get('hcaptchaToken')
    if (!hcaptchaToken) {
      requestLogger.warn({ statusCode: 400, durationMs: Date.now() - startTime }, 'Resume request missing hCaptcha token')
      return NextResponse.json({ error: 'Missing hcaptcha token' }, { status: 400 })
    }

    const hcaptchaService = new HCaptchaService()
    const captchaVerified = await hcaptchaService.verifyToken(hcaptchaToken)
    if (!captchaVerified) {
      requestLogger.warn({ statusCode: 401, durationMs: Date.now() - startTime }, 'Resume request failed hCaptcha verification')
      return NextResponse.json({ error: 'hCaptcha verification failed' }, { status: 401 })
    }

    const pdfService = new ResumeService()
    const pdfBuffer = await pdfService.getPdf()
    const fileName = pdfService.getFileName()

    const blob = new Blob([new Uint8Array(pdfBuffer)])

    requestLogger.info(
      { statusCode: 200, durationMs: Date.now() - startTime, fileName, contentLength: pdfBuffer.length },
      'Resume request completed'
    )

    return new NextResponse(blob, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `inline; filename="${fileName}"`,
        'Content-Length': pdfBuffer.length.toString(),
      },
    })
  } catch (error) {
    requestLogger.error({ err: error, statusCode: 500, durationMs: Date.now() - startTime }, 'Error serving resume PDF')
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
