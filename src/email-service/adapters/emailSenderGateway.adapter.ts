export interface EmailSenderGateway {
  sendEmail(to: string, subject: string, body: string): Promise<void>
}
