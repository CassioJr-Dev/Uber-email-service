import { EmailServiceError } from '../../email-service.error'

describe('EmailServiceError unit tests', () => {
  let message: string
  let status: number
  let sut: EmailServiceError

  beforeEach(() => {
    message = 'message of error'
    status = 400
    sut = new EmailServiceError(message, status)
  })
  it('Constructor method', () => {
    expect(sut.name).toEqual('EmailServiceException')
    expect(sut.message).toEqual(message)
    expect(sut.status).toEqual(status)
  })
})
