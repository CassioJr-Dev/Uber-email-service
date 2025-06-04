import { Module } from '@nestjs/common'
import { EmailServiceController } from './email-service.controller'
import { SESClient } from '@aws-sdk/client-ses'
import { SESEmailSender } from '@/email-service/infrastructure/ses/sesEmailSender'
import { EmailSenderService } from '@/email-service/application/service/emailSender.service'
import { IEmailSenderGateway } from '@/email-service/adapters/emailSenderGateway.adapter'
import { SendGridEmailSender } from '@/email-service/infrastructure/sendGrid/sendGridEmailSender'
import sendGridMail, { MailService as SendGridMailService } from '@sendgrid/mail'
import { FallbackEmailSender } from '@/email-service/infrastructure/fallback/fallbackEmailSender'

@Module({
  providers: [
    SESEmailSender,
    SendGridEmailSender,
    {
      provide: SESClient,
      useFactory: () => {
        return new SESClient({
          region: process.env.AWS_REGION,
          credentials: {
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
          },
        })
      },
    },
    {
      provide: SendGridMailService,
      useFactory: () => {
        sendGridMail.setApiKey(process.env.SENDGRID_SECRET_ACCESS_KEY)
        return sendGridMail
      },
    },
    {
      provide: FallbackEmailSender,
      useFactory: (awsSes: SESEmailSender, sendGrid: SendGridEmailSender) => {
        return new FallbackEmailSender([awsSes, sendGrid])
      },
      inject: [SESEmailSender, SendGridEmailSender],
    },
    {
      provide: EmailSenderService,
      useFactory: (emailSenderGateway: IEmailSenderGateway) => {
        return new EmailSenderService(emailSenderGateway)
      },
      inject: [FallbackEmailSender],
    },
  ],
  controllers: [EmailServiceController],
})
export class EmailServiceModule {}
