import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { EmailServiceModule } from './email-service/presentation/email-service/email-service.module'
import { ConfigModule } from '@nestjs/config'

@Module({
  imports: [ConfigModule.forRoot(), EmailServiceModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
