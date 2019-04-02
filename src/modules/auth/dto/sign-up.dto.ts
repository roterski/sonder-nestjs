import { MinLength, IsEmail, IsNotEmpty } from 'class-validator';

export class SignUpDto {
  @IsNotEmpty()
  @MinLength(5)
  password: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;
}
