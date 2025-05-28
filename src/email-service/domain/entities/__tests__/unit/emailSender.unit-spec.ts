import { EmailSenderEntity } from '../../emailSender.entity'
describe('EmailSenderEntity unit tests', () => {
  let props: any
  let sut: EmailSenderEntity

  beforeEach(() => {
    props = {
      to: 'test@gmail.com',
      subject: 'test',
      body: 'email sent successfully',
    }
    sut = new EmailSenderEntity(props.to, props.subject, props.body)
  })
  it('Constructor method', () => {
    expect(sut.to).toEqual(props.to)
    expect(sut.subject).toEqual(props.subject)
    expect(sut.body).toEqual(props.body)
    expect(JSON.stringify(sut)).toStrictEqual(JSON.stringify(props))
  })
})
