import { EmailServiceUnavailableError } from '@/email-service/domain/errors/email-service-unavailable/email-service-unavailable.error'
import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common'

@Catch(EmailServiceUnavailableError)
export class EmailServiceUnavailableFilter implements ExceptionFilter {
  catch(exception: EmailServiceUnavailableError, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse()

    response.status(exception.status).send({
      name: exception.name,
      statusCode: exception.status,
      message: exception.message,
    })
  }
}
