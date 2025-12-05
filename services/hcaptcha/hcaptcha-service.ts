class HCaptchaService {
  private readonly secretKey: string

  constructor() {
    if (!process.env.HCAPTCHA_SECRET_KEY)
      throw new Error('HCAPTCHA_SECRET_KEY is not defined in the environment variables')

    this.secretKey = process.env.HCAPTCHA_SECRET_KEY
  }

  async verifyToken(token: string): Promise<boolean> {
    let isVerified = false

    try {
      const response = await fetch(`https://hcaptcha.com/siteverify`, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
        },
        body: `response=${token}&secret=${this.secretKey}`,
        method: 'POST',
      })

      /**
       * {
       *    "success": true|false,     // is the passcode valid, and does it meet security criteria you specified, e.g. sitekey?
       *    "challenge_ts": timestamp, // timestamp of the challenge (ISO format yyyy-MM-dd'T'HH:mm:ssZZ)
       *    "hostname": string,        // the hostname of the site where the challenge was solved
       *    "credit": true|false,      // optional: whether the response will be credited
       *    "error-codes": [...]       // optional: any error codes
       *    "score": float,            // ENTERPRISE feature: a score denoting malicious activity.
       *    "score_reason": [...]      // ENTERPRISE feature: reason(s) for score. See BotStop.com for details.
       *  }
       */
      const captchaValidation = await response.json()

      if (captchaValidation.success) {
        isVerified = true
      }
    } catch (error) {
      console.error('Error verifying hcaptcha:', error)
    }

    return isVerified
  }
}

export default HCaptchaService
