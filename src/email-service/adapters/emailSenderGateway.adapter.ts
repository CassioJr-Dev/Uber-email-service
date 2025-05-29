export interface IEmailSenderGateway {
  sendEmail(to: string, subject: string, body: string): Promise<void>
}
