import { FallbackEmailSender } from '../../fallbackEmailSender'
import { IEmailSenderGateway } from '@/email-service/adapters/emailSenderGateway.adapter'
import { EmailServiceUnavailableError } from '@/email-service/domain/errors/email-service-unavailable/email-service-unavailable.error'

describe('FallbackEmailSender', () => {
  const to = 'test@gmail.com'
  const subject = 'Test'
  const body = 'Hello, Test!'

  const mockLogger = {
    log: jest.fn(),
    warn: jest.fn(),
    error: jest.fn(),
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should use the first provider if it succeeds', async () => {
    const firstProvider: IEmailSenderGateway = {
      sendEmail: jest.fn().mockResolvedValue(undefined),
    }
    const secondProvider: IEmailSenderGateway = {
      sendEmail: jest.fn(),
    }

    const service = new FallbackEmailSender([firstProvider, secondProvider])
    ;(service as any).logger = mockLogger

    await service.sendEmail(to, subject, body)

    expect(firstProvider.sendEmail).toHaveBeenCalledTimes(1)
    expect(secondProvider.sendEmail).not.toHaveBeenCalled()
    expect(mockLogger.log).toHaveBeenCalledWith(
      `email send sucessfully by Object`,
    )
  })

  it('should fallback to the next provider if one fails', async () => {
    const error = new Error('SES failed')

    const firstProvider: IEmailSenderGateway = {
      sendEmail: jest.fn().mockRejectedValue(error),
    }
    const secondProvider: IEmailSenderGateway = {
      sendEmail: jest.fn().mockResolvedValue(undefined),
    }

    const service = new FallbackEmailSender([firstProvider, secondProvider])
    ;(service as any).logger = mockLogger

    await service.sendEmail(to, subject, body)

    expect(firstProvider.sendEmail).toHaveBeenCalled()
    expect(secondProvider.sendEmail).toHaveBeenCalled()
    expect(mockLogger.warn).toHaveBeenCalledWith(
      `Object failed: ${error.message}`,
    )
    expect(mockLogger.log).toHaveBeenCalledWith(
      `email send sucessfully by Object`,
    )
  })

  it('should throw EmailServiceUnavailableError if all providers fail', async () => {
    const error1 = new Error('SES down')
    const error2 = new Error('SendGrid down')

    const provider1: IEmailSenderGateway = {
      sendEmail: jest.fn().mockRejectedValue(error1),
    }
    const provider2: IEmailSenderGateway = {
      sendEmail: jest.fn().mockRejectedValue(error2),
    }

    const service = new FallbackEmailSender([provider1, provider2])
    ;(service as any).logger = mockLogger

    await expect(service.sendEmail(to, subject, body)).rejects.toThrow(
      EmailServiceUnavailableError,
    )

    expect(provider1.sendEmail).toHaveBeenCalled()
    expect(provider2.sendEmail).toHaveBeenCalled()
    expect(mockLogger.error).toHaveBeenCalledWith('All email providers failed')
  })
})
