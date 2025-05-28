import { EmailSenderUseCase } from '@/email-service/domain/useCase/emailSender.useCase'
import { EmailSenderGateway } from '@/email-service/adapters/emailSenderGateway.adapter'
import { EmailSenderDto } from '@/email-service/dtos/email-sender.dto'

export class EmailSenderService implements EmailSenderUseCase {
  constructor(private readonly emailSenderGateway: EmailSenderGateway) {}

  async sendEmail({ to, subject, body }: EmailSenderDto): Promise<void> {
    await this.emailSenderGateway.sendEmail(to, subject, body)
  }
}
