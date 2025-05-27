import { EmailSenderGateway } from '@/email-service/adapters/emailSenderGateway.adapter'
import { EmailServiceException } from '@/email-service/domain/errors/emailServiceException.error'
import {
  SendEmailCommand,
  SendEmailRequest,
  SESClient,
} from '@aws-sdk/client-ses'

export class SesEmailSender implements EmailSenderGateway {
  constructor(private readonly client: SESClient) {}

  async sendEmail(to: string, subject: string, body: string): Promise<void> {
    try {
      const request: SendEmailRequest = {
        Source: 'cassiojr0108@gmail.com',
        Destination: {
          ToAddresses: [to],
        },
        Message: {
          Body: {
            Html: {
              Charset: 'UTF-8',
              Data: 'HTML_FORMAT_BODY',
            },
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
      const response = await this.client.send(sendEmailCommand)
      console.log(response)
    } catch (error) {
      throw new EmailServiceException('Failure while sending email', error)
    }
  }
}
