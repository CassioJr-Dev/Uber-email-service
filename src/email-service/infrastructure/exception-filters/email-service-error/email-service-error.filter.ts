import { EmailServiceError } from '@/email-service/domain/errors/email-service.error'
import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common'

@Catch(EmailServiceError)
export class EmailServiceFilter implements ExceptionFilter {
  catch(exception: EmailServiceError, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse()

    response.status(exception.status).send({
      name: exception.name,
      statusCode: exception.status,
      message: exception.message,
      error: exception.error,
    })
  }
}
