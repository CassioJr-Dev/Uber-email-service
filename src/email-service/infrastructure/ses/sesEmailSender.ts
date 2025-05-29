import { IEmailSenderGateway } from '@/email-service/adapters/emailSenderGateway.adapter'
import { EmailServiceError } from '@/email-service/domain/errors/email-service-error/email-service.error'
import {
  SendEmailCommand,
  SendEmailRequest,
  SESClient,
} from '@aws-sdk/client-ses'
import { Injectable } from '@nestjs/common'

@Injectable()
export class SESEmailSender implements IEmailSenderGateway {
  constructor(private readonly sesClient: SESClient) {}

  async sendEmail(to: string, subject: string, body: string): Promise<void> {
    try {
      const emailInput: SendEmailRequest = {
        Source: process.env.EMAIL_SOURCE,
        Destination: {
          ToAddresses: [to],
        },
        Message: {
          Body: {
            Text: {
              Charset: 'UTF-8',
              Data: body,
            },
          },
          Subject: {
            Charset: 'UTF-8',
            Data: subject,
          },
        },
      }

      const sendEmailCommand = new SendEmailCommand(emailInput)
      await this.sesClient.send(sendEmailCommand)
    } catch (error) {
      throw new EmailServiceError('Failure while sending email')
    }
  }
}
