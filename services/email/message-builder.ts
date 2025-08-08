export interface GetInTouchArgs {
  fullName: string
  email: string
  subject: string
  message: string
}

export function buildGetInTouchHtml(args: GetInTouchArgs): string {
  return `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f9fafb; padding: 24px;">
      <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1); padding: 24px;">
        <h1 style="font-size: 20px; font-weight: bold; margin-bottom: 16px; color: #111827;">📬 New Contact Submission</h1>
        <p style="font-size: 14px; color: #6b7280; margin-bottom: 24px;">
          You received a new message from your portfolio site.
        </p>

        <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 24px 0;" />

        <table style="width: 100%; font-size: 14px; color: #111827;">
          <tr>
            <td style="font-weight: 600; padding: 6px 0; width: 100px;">Name:</td>
            <td>${args.fullName}</td>
          </tr>
          <tr>
            <td style="font-weight: 600; padding: 6px 0;">Email:</td>
            <td>${args.email}</td>
          </tr>
          <tr>
            <td style="font-weight: 600; padding: 6px 0;">Subject:</td>
            <td>${args.subject}</td>
          </tr>
          <tr>portfolio
            <td style="font-weight: 600; padding: 6px 0;">Message:</td>
            <td style="white-space: pre-wrap;">${args.message}</td>
          </tr>
          <tr>
            <td style="font-weight: 600; padding: 6px 0;">Timestamp:</td>
            <td>${new Date().toISOString()}</td>
          </tr>
        </table>

        <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 24px 0;" />

        <p style="font-size: 12px; color: #9ca3af; text-align: center;">
          Sent from rlodhiya.dev ✨
        </p>
      </div>
    </div>
  `
}
