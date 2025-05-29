import { Injectable, Logger } from '@nestjs/common'
import { IEmailSenderGateway } from '@/email-service/adapters/emailSenderGateway.adapter'
import { EmailServiceUnavailableError } from '@/email-service/domain/errors/email-service-unavailable/email-service-unavailable.error'
import { IFallbackEmailSender } from '@/email-service/adapters/fallbackSenderEmail'

@Injectable()
export class FallbackEmailSender implements IFallbackEmailSender {
  private readonly logger = new Logger(FallbackEmailSender.name)

  constructor(private readonly providers: IEmailSenderGateway[]) {}

  async sendEmail(to: string, subject: string, body: string) {
    for (const provider of this.providers) {
      try {
        await provider.sendEmail(to, subject, body)
        this.logger.log(
          `email send sucessfully by ${provider.constructor.name}`,
        )
        return
      } catch (error) {
        this.logger.warn(
          `${provider.constructor.name} failed: ${error.message}`,
        )
      }
    }

    this.logger.error('All email providers failed')
    throw new EmailServiceUnavailableError('Total failure to send email')
  }
}
