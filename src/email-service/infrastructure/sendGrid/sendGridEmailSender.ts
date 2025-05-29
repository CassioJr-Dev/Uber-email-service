import { EmailSenderGateway } from '@/email-service/adapters/emailSenderGateway.adapter'
import { EmailServiceError } from '@/email-service/domain/errors/email-service.error'
import { Injectable } from '@nestjs/common'
import { MailDataRequired, MailService } from '@sendgrid/mail'

@Injectable()
export class SendGridEmailSender implements EmailSenderGateway {
  constructor(private readonly sendGridClient: MailService) {}

  async sendEmail(to: string, subject: string, body: string): Promise<void> {
    try {
      const emailInput: MailDataRequired = {
        to,
        from: process.env.EMAIL_SOURCE,
        subject,
        text: body,
      }

      await this.sendGridClient.send(emailInput)
    } catch (error) {
      console.log(error)
      throw new EmailServiceError('Failure while sending email')
    }
  }
}
