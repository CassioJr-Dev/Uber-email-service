import { EmailSenderDto } from '@/email-service/dtos/email-sender.dto'
import { EmailServiceError } from '@/email-service/domain/errors/email-service.error'
import { SendGridEmailSender } from '../../sendGridEmailSender'

describe('SendGridEmailSender unit tests', () => {
  let props: EmailSenderDto
  let sut: SendGridEmailSender
  let sendGridClientMock: any

  beforeEach(() => {
    props = {
      to: 'test@gmail.com',
      subject: 'test',
      body: 'email sent successfully',
    }

    sendGridClientMock = {
      send: jest.fn(),
    }

    sut = new SendGridEmailSender(sendGridClientMock)
  })

  it('should call sendEmail with SendGrid', async () => {
    await sut.sendEmail(props.to, props.subject, props.body)
    expect(sendGridClientMock.send).toHaveBeenCalled()
  })

  it('should throw EmailServiceError when SendGrid fails', async () => {
    sendGridClientMock = {
      send: jest.fn().mockRejectedValue(new Error('Erro simulado no SES')),
    }

    sut = new SendGridEmailSender(sendGridClientMock)

    await expect(
      sut.sendEmail(props.to, props.subject, props.body),
    ).rejects.toThrow(EmailServiceError)

    await expect(
      sut.sendEmail(props.to, props.subject, props.body),
    ).rejects.toThrow(new EmailServiceError('Failure while sending email'))
  })
})
