export interface EmailSenderUseCase {
  sendEmail(to: string, subject: string, body: string): void
}
