import { Resend } from 'resend'
import { buildGetInTouchHtml, GetInTouchArgs } from '../message-builder'
import { EmailProvider } from '../email-service'
import logger from '../../../utils/logger/logger'

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
        logger.error({ err: error, service: 'email', provider: 'resend' }, 'Resend email send failed')
        return false
      }

      logger.info({ service: 'email', provider: 'resend', messageId: data?.id }, 'Resend email sent')
      return true
    } catch (err) {
      logger.error({ err, service: 'email', provider: 'resend' }, 'Error sending email with Resend')
      return false
    }
  }
}

export default ResendService
