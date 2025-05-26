export class EmailSenderEntity {
  to: string
  subject: string
  body: string

  constructor(to: string, subject: string, body: string) {
    Object.assign(this, { to, subject, body })
  }
}
