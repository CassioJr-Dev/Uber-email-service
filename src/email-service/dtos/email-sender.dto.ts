import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator'

export class EmailSenderDto {
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  to: string

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  subject: string

  @IsString()
  @IsNotEmpty()
  body: string
}
