import { EmailSenderGateway } from '@/email-service/adapters/emailSenderGateway.adapter'
import { EmailServiceError } from '@/email-service/domain/errors/email-service.error'
import {
  SendEmailCommand,
  SendEmailRequest,
  SESClient,
} from '@aws-sdk/client-ses'
import { Injectable } from '@nestjs/common'

@Injectable()
export class SESEmailSender implements EmailSenderGateway {
  constructor(private readonly sesClient: SESClient) {}

  async sendEmail(to: string, subject: string, body: string): Promise<void> {
    try {
      const request: SendEmailRequest = {
        Source: 'cassiojr0108@gmail.com',
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

      const sendEmailCommand = new SendEmailCommand(request)
      await this.sesClient.send(sendEmailCommand)
    } catch (error) {
      throw new EmailServiceError('Failure while sending email', error)
    }
  }
}
