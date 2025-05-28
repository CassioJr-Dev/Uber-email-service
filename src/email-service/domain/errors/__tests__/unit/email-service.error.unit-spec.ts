import { EmailServiceError } from '../../email-service.error'

describe('EmailServiceError unit tests', () => {
  let message: string
  let error: any
  let status: number
  let sut: EmailServiceError

  beforeEach(() => {
    message = 'message of error'
    status = 400
    error = {
      error: 'EmailServiceError',
    }
    sut = new EmailServiceError(message, error, status)
  })
  it('Constructor method', () => {
    expect(sut.name).toEqual('EmailServiceException')
    expect(sut.message).toEqual(message)
    expect(sut.error).toEqual(error)
    expect(sut.status).toEqual(status)
  })
})
