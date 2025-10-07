import ResendService from './resend/resend-service'
import BrevoService from './brevo/brevo-service'
import type { GetInTouchArgs } from './message-builder'

export interface EmailProvider {
  sendGetInTouchMessage(args: GetInTouchArgs): Promise<boolean>
}

class EmailService implements EmailProvider {
  private disableEmailSend: boolean
  private provider: EmailProvider

  constructor() {
    this.disableEmailSend = process.env.DISABLE_EMAIL_SEND?.toLowerCase() === 'true'
    const providerName = process.env.EMAIL_PROVIDER?.toLowerCase()

    switch (providerName) {
      case 'resend':
        this.provider = new ResendService()
        break
      case 'brevo':
        this.provider = new BrevoService()
        break
      default:
        throw new Error(`Unsupported EMAIL_PROVIDER: ${providerName}`)
    }
  }

  async sendGetInTouchMessage(args: GetInTouchArgs): Promise<boolean> {
    if (this.disableEmailSend) {
      return true
    }
    return this.provider.sendGetInTouchMessage(args)
  }
}

export default EmailService
