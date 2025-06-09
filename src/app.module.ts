import { Module } from '@nestjs/common'
import { EmailServiceModule } from './email-service/presentation/email-service/email-service.module'
import { ConfigModule } from '@nestjs/config'

@Module({
  imports: [ConfigModule.forRoot(), EmailServiceModule],
})
export class AppModule {}
