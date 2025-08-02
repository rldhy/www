import {
  SendSmtpEmail,
  TransactionalEmailsApi,
  TransactionalEmailsApiApiKeys,
} from '@getbrevo/brevo'

interface GetInTouchArgs {
  fullName: string
  email: string
  subject: string
  message: string
}

class BrevoService {
  private readonly apiKey: string

  constructor() {
    if (!process.env.BREVO_API_KEY)
      throw new Error('BREVO_API_KEY is not defined in the environment variables')
    this.apiKey = process.env.BREVO_API_KEY
  }

  async sendGetInTouchMessage(args: GetInTouchArgs): Promise<boolean> {
    try {
      const htmlMsg = `
        <div>
          <h1>Get In Touch Email Submission</h1>
          <h2>Timestamp</h2>
          <p>${new Date().toISOString()}</p>
          <h2>Name</h2>
          <p>${args.fullName}</p>
          <h2>Email</h2>
          <p>${args.email}</p>
          <h2>Subject</h2>
          <p>${args.subject}</p>
          <h2>Message</h2>
          <p>${args.message}</p>
        </div>`

      const apiInstance = new TransactionalEmailsApi()
      apiInstance.setApiKey(TransactionalEmailsApiApiKeys.apiKey, this.apiKey)

      const message = new SendSmtpEmail()
      message.subject = `RLODHIYA.DEV GetInTouch Form Submission`
      message.htmlContent = htmlMsg
      message.sender = { name: 'RL-System', email: 'system@rlodhiya.dev' }
      message.to = [{ name: 'Ritwik Lodhiya', email: 'hello@rlodhiya.dev' }]

      await apiInstance.sendTransacEmail(message)
    } catch (error) {
      console.error('Error sending email:', error)
      return false
    }

    return true
  }
}

export default BrevoService
