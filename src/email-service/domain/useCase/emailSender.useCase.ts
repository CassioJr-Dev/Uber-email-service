import { EmailSenderEntity } from '../entities/emailSender.entity'

export interface EmailSenderUseCase {
  sendEmail(emailSenderEntity: EmailSenderEntity): void
}
