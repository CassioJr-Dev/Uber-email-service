import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { EmailServiceFilter } from './email-service/infrastructure/exception-filters/email-service-error/email-service-error.filter'
import { ValidationPipe } from '@nestjs/common'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.useGlobalPipes(
    new ValidationPipe({
      errorHttpStatusCode: 422,
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  )
  app.useGlobalFilters(new EmailServiceFilter())
  await app.listen(process.env.PORT ?? 3000)
}
bootstrap()
