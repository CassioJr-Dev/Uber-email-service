export class EmailServiceError extends Error {
  public status: number
  public error?: any
  constructor(
    public message: string,
    error?: any,
    status?: number,
  ) {
    super(message)
    this.name = 'EmailServiceException'
    this.error = error
    this.status = status ?? 500
  }
}
