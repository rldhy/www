import {
  BrevoClient
} from '@getbrevo/brevo'
import { buildGetInTouchHtml, GetInTouchArgs } from '../message-builder'
import { EmailProvider } from '../email-service'

class BrevoService implements EmailProvider {
  private readonly apiKey: string
  private readonly client: BrevoClient

  constructor() {
    if (!process.env.BREVO_API_KEY)
      throw new Error('BREVO_API_KEY is not defined in the environment variables')
    this.apiKey = process.env.BREVO_API_KEY
    this.client = new BrevoClient({
      apiKey: this.apiKey,
    })
  }

  async sendGetInTouchMessage(args: GetInTouchArgs): Promise<boolean> {
    try {
      const htmlMsg = buildGetInTouchHtml(args)

      const response = await this.client.transactionalEmails.sendTransacEmail({
        subject: 'RLODHIYA.DEV GetInTouch Form Submission',
        htmlContent: htmlMsg,
        sender: { name: 'RL-System', email: 'system@rlodhiya.dev' },
        to: [{ name: 'Ritwik Lodhiya', email: 'hello@rlodhiya.dev' }],
      })

      console.log(`Email Sent: ${response}`)
    } catch (error) {
      console.log(`Error sending email: ${error}`)
      return false
    }

    return true
  }
}

export default BrevoService
