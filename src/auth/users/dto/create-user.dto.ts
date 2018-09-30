import { Min } from 'class-validator';
import { CreateUserInput } from '../../../graphql.schema';

export class CreateUserDto extends CreateUserInput {
  @Min(1)
  firstName: string;
  lastName: string;
  facebookId: string;
}
