import { Module } from '@nestjs/common'
import { EmailServiceController } from './email-service.controller'
import { SESClient } from '@aws-sdk/client-ses'
import { SESEmailSender } from '@/email-service/infrastructure/ses/sesEmailSender'
import { EmailSenderService } from '@/email-service/application/service/emailSender.service'
import { EmailSenderGateway } from '@/email-service/adapters/emailSenderGateway.adapter'

@Module({
  providers: [
    SESEmailSender,
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
      provide: EmailSenderService,
      useFactory: (emailSenderGateway: EmailSenderGateway) => {
        return new EmailSenderService(emailSenderGateway)
      },
      inject: [SESEmailSender],
    },
  ],
  controllers: [EmailServiceController],
})
export class EmailServiceModule {}
