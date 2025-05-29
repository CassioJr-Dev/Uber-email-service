import { EmailSenderUseCase } from '@/email-service/domain/useCase/emailSender.useCase'
import { EmailSenderDto } from '@/email-service/dtos/email-sender.dto'
import { IFallbackEmailSender } from '@/email-service/adapters/fallbackSenderEmail'

export class EmailSenderService implements EmailSenderUseCase {
  constructor(
    private readonly fallbackEmailSenderGateway: IFallbackEmailSender,
  ) {}

  async sendEmail({ to, subject, body }: EmailSenderDto): Promise<void> {
    await this.fallbackEmailSenderGateway.sendEmail(to, subject, body)
  }
}
