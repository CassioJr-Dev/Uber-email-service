import { EmailSenderGateway } from '@/email-service/adapters/emailSenderGateway.adapter'
import { EmailSenderService } from '../../emailSender.service'
import { EmailSenderDto } from '@/email-service/dtos/email-sender.dto'

describe('EmailSenderService unit tests', () => {
  let props: EmailSenderDto
  let sut: EmailSenderService
  let mailerServiceMock: EmailSenderGateway

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

  it('should call sendEmail on the gateway when sending an email', () => {
    sut.sendEmail(props)

    expect(mailerServiceMock.sendEmail).toHaveBeenCalled()
    expect(mailerServiceMock.sendEmail).toHaveBeenCalledWith(
      props.to,
      props.subject,
      props.body,
    )
  })
})
