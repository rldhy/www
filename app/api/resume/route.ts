import { NextRequest, NextResponse } from 'next/server'
import HCaptchaService from '../../../services/hcaptcha/hcaptcha-service'
import ResumeService from '../../../services/resume/resume-service'

export async function GET(req: NextRequest) {
  try {
    const hcaptchaToken = req.nextUrl.searchParams.get('hcaptchaToken')
    if (!hcaptchaToken) {
      return NextResponse.json({ error: 'Missing hcaptcha token' }, { status: 400 })
    }

    const hcaptchaService = new HCaptchaService()
    const captchaVerified = await hcaptchaService.verifyToken(hcaptchaToken)
    if (!captchaVerified) {
      return NextResponse.json({ error: 'hCaptcha verification failed' }, { status: 401 })
    }

    const pdfService = new ResumeService()
    const pdfBuffer = await pdfService.getPdf()
    const fileName = pdfService.getFileName()

    const blob = new Blob([new Uint8Array(pdfBuffer)])

    return new NextResponse(blob, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `inline; filename="${fileName}"`,
        'Content-Length': pdfBuffer.length.toString(),
      },
    })
  } catch (error) {
    console.error('Error serving PDF:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
