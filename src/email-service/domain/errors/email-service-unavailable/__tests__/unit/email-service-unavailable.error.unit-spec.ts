import { EmailServiceUnavailableError } from '../../email-service-unavailable.error'

describe('EmailServiceUnavailableError unit tests', () => {
  let message: string
  let status: number
  let sut: EmailServiceUnavailableError

  beforeEach(() => {
    message = 'message of error'
    status = 400
    sut = new EmailServiceUnavailableError(message, status)
  })
  it('Constructor method', () => {
    expect(sut.name).toEqual('EmailServiceUnavailableException')
    expect(sut.message).toEqual(message)
    expect(sut.status).toEqual(status)
  })
})
