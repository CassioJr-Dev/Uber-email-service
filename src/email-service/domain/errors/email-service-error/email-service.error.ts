export class EmailServiceError extends Error {
  public status: number
  constructor(
    public message: string,
    status?: number,
  ) {
    super(message)
    this.name = 'EmailServiceException'
    this.status = status ?? 500
  }
}
