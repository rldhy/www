import sendgrid from '@sendgrid/mail'

interface GetInTouchArgs {
  fullName: string
  email: string
  subject: string
  message: string
}

class SendgridService {
  private readonly apiKey: string

  constructor() {
    if (!process.env.SENDGRID_API_KEY)
      throw new Error('SENDGRID_API_KEY is not defined in the environment variables')
    this.apiKey = process.env.SENDGRID_API_KEY
  }

  async sendGetInTouchMessage(args: GetInTouchArgs): Promise<boolean> {
    try {
      sendgrid.setApiKey(this.apiKey)

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

      const msg = {
        to: 'Ritwik Lodhiya <hello@rlodhiya.dev>',
        from: 'RL-System <system@rlodhiya.dev>',
        subject: `RLODHIYA.DEV GetInTouch Form Submission`,
        html: htmlMsg,
      }

      await sendgrid.send(msg)
    } catch (error) {
      console.error('Error sending email:', error)
      return false
    }

    return true
  }
}

export default SendgridService
