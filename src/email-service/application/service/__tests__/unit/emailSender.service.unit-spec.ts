import { EmailSenderService } from '../../emailSender.service'
import { EmailSenderDto } from '@/email-service/dtos/email-sender.dto'
import { IFallbackEmailSender } from '@/email-service/adapters/fallbackSenderEmail'

describe('EmailSenderService unit tests', () => {
  let props: EmailSenderDto
  let sut: EmailSenderService
  let mailerServiceMock: IFallbackEmailSender

  beforeEach(() => {
    props = {
      to: 'test@gmail.com',
      subject: 'test',
      body: 'email sent successfully',
    }

    mailerServiceMock = {
      sendEmail: jest.fn(),
    }

    sut = new EmailSenderService(mailerServiceMock)
  })

  it('should call sendEmail on the gateway when sending an email', async () => {
    await sut.sendEmail(props)

    expect(mailerServiceMock.sendEmail).toHaveBeenCalled()
    expect(mailerServiceMock.sendEmail).toHaveBeenCalledWith(
      props.to,
      props.subject,
      props.body,
    )
  })
})
