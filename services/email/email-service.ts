import ResendService from './resend/resend-service'
import BrevoService from './brevo/brevo-service'
import type { GetInTouchArgs } from './message-builder'

interface EmailProvider {
  sendGetInTouchMessage(args: GetInTouchArgs): Promise<boolean>
}

class EmailService implements EmailProvider {
  private provider: EmailProvider

  constructor() {
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

  sendGetInTouchMessage(args: GetInTouchArgs): Promise<boolean> {
    return this.provider.sendGetInTouchMessage(args)
  }
}

export default EmailService
