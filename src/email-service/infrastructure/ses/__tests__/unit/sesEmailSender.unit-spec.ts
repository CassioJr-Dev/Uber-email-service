import { EmailSenderDto } from '@/email-service/dtos/email-sender.dto'
import { SESEmailSender } from '../../sesEmailSender'
import { EmailServiceError } from '@/email-service/domain/errors/email-service.error'

describe('SESEmailSender unit tests', () => {
  let props: EmailSenderDto
  let sut: SESEmailSender
  let sesClientMock: any

  beforeEach(() => {
    props = {
      to: 'test@gmail.com',
      subject: 'test',
      body: 'email sent successfully',
    }

    sesClientMock = {
      send: jest.fn(),
    }

    sut = new SESEmailSender(sesClientMock)
  })

  it('should call sendEmail with SES', async () => {
    await sut.sendEmail(props.to, props.subject, props.body)
    expect(sesClientMock.send).toHaveBeenCalled()
  })

  it('should throw EmailServiceError when SES fails', async () => {
    const sesClientMockError: any = {
      send: jest.fn().mockRejectedValue(new Error('Erro simulado no SES')),
    }

    sut = new SESEmailSender(sesClientMockError)

    await expect(
      sut.sendEmail(props.to, props.subject, props.body),
    ).rejects.toThrow(EmailServiceError)

    await expect(
      sut.sendEmail(props.to, props.subject, props.body),
    ).rejects.toThrow(new EmailServiceError('Failure while sending email'))
  })
})
