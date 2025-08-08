import {
  SendSmtpEmail,
  TransactionalEmailsApi,
  TransactionalEmailsApiApiKeys,
} from '@getbrevo/brevo'
import { buildGetInTouchHtml, GetInTouchArgs } from '../message-builder'

class BrevoService {
  private readonly apiKey: string

  constructor() {
    if (!process.env.BREVO_API_KEY)
      throw new Error('BREVO_API_KEY is not defined in the environment variables')
    this.apiKey = process.env.BREVO_API_KEY
  }

  async sendGetInTouchMessage(args: GetInTouchArgs): Promise<boolean> {
    try {
      const htmlMsg = buildGetInTouchHtml(args)

      const apiInstance = new TransactionalEmailsApi()
      apiInstance.setApiKey(TransactionalEmailsApiApiKeys.apiKey, this.apiKey)

      const message = new SendSmtpEmail()
      message.subject = `RLODHIYA.DEV GetInTouch Form Submission`
      message.htmlContent = htmlMsg
      message.sender = { name: 'RL-System', email: 'system@rlodhiya.dev' }
      message.to = [{ name: 'Ritwik Lodhiya', email: 'hello@rlodhiya.dev' }]

      const { response } = await apiInstance.sendTransacEmail(message)
      const { statusCode, statusMessage } = response
      if (statusCode && statusCode >= 200 && statusCode < 300) {
        console.log(`Brevo API call succeeded: status: ${statusCode}, message: ${statusMessage}`)
      } else {
        console.log(`Brevo API call failed: status: ${statusCode}, message: ${statusMessage}`)
        return false
      }
    } catch (error) {
      console.log(`Error sending email: ${error}`)
      return false
    }

    return true
  }
}

export default BrevoService
