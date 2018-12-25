import { Min } from 'class-validator';
import { CreateUserInput } from '../../../../common/graphql/graphql.schema';

export class CreateUserDto extends CreateUserInput {
  @Min(1)
  firstName: string;
}
