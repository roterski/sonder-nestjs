import { MinLength, IsEmail } from 'class-validator';
import { CreateUserInput } from '../../../../common/graphql/graphql.schema';

export class CreateUserDto extends CreateUserInput {
  @MinLength(1)
  firstName?: string;
  passwordHash?: string;
  @IsEmail()
  email?: string;
}
