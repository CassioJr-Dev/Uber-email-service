import { EmailSenderService } from '@/email-service/application/service/emailSender.service'
import { Body, Controller, Post } from '@nestjs/common'
import { EmailSenderDto } from '../../dtos/email-sender.dto'

@Controller('email-service')
export class EmailServiceController {
  constructor(private readonly emailSenderService: EmailSenderService) {}

  @Post()
  async sendEmail(@Body() emailSenderDto: EmailSenderDto) {
    await this.emailSenderService.sendEmail(emailSenderDto)
    return 'email send sucessfully'
  }
}
