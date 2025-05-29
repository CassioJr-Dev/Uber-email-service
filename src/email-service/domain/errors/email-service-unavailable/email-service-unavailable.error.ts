export class EmailServiceUnavailableError extends Error {
  public status: number
  constructor(
    public message: string,
    status?: number,
  ) {
    super(message)
    this.name = 'EmailServiceUnavailableException'
    this.status = status ?? 500
  }
}
