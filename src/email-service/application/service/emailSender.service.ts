import { EmailSenderEntity } from '@/email-service/domain/entities/emailSender.entity'
import { EmailSenderUseCase } from '@/email-service/domain/useCase/emailSender.useCase'
import { EmailSenderGateway } from '@/email-service/adapters/emailSenderGateway.adapter'

export class EmailSenderService implements EmailSenderUseCase {
  constructor(private readonly emailSenderGateway: EmailSenderGateway) {}

  async sendEmail({ to, subject, body }: EmailSenderEntity): Promise<void> {
    await this.emailSenderGateway.sendEmail(to, subject, body)
  }
}
