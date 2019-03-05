import { MinLength, IsEmail } from 'class-validator';

export class CreateUserDto {
  @MinLength(1)
  firstName?: string;

  lastName?: string;

  passwordHash?: string;

  @IsEmail()
  email?: string;
}
