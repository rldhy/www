import { Resend } from 'resend'
import { buildGetInTouchHtml, GetInTouchArgs } from '../message-builder'
import { EmailProvider } from '../email-service'

class ResendService implements EmailProvider {
  private readonly resend: Resend

  constructor() {
    const apiKey = process.env.RESEND_API_KEY
    if (!apiKey) {
      throw new Error('RESEND_API_KEY is not defined in the environment variables')
    }

    this.resend = new Resend(apiKey)
  }

  async sendGetInTouchMessage(args: GetInTouchArgs): Promise<boolean> {
    try {
      const htmlMsg = buildGetInTouchHtml(args)
      const { data, error } = await this.resend.emails.send({
        from: 'RL-System <system@rlodhiya.dev>',
        to: ['hello@rlodhiya.dev'],
        subject: 'RLODHIYA.DEV GetInTouch Form Submission',
        html: htmlMsg,
      })

      if (error) {
        console.error('Resend error:', error)
        return false
      }

      console.log('Resend email sent:', data?.id)
      return true
    } catch (err) {
      console.error('Error sending with Resend:', err)
      return false
    }
  }
}

export default ResendService
