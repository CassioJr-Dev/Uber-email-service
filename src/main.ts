import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { EmailServiceUnavailableFilter } from './email-service/infrastructure/exception-filters/email-service-error/email-service-error.filter'
import { ValidationPipe } from '@nestjs/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

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

  const config = new DocumentBuilder()
    .setTitle('Uber-Email-Service')
    .setDescription('The documentation of API')
    .setVersion('1.0')
    .build()
  const documentFactory = () => SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, documentFactory)

  app.useGlobalFilters(new EmailServiceUnavailableFilter())
  await app.listen(process.env.PORT ?? 3000)
}
bootstrap()
