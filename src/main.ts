import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { EmailServiceFilter } from './email-service/infrastructure/exception-filters/email-service-error/email-service-error.filter'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.useGlobalFilters(new EmailServiceFilter())
  await app.listen(process.env.PORT ?? 3000)
}
bootstrap()
