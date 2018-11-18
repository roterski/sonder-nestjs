import { Min } from 'class-validator';
// import { CreateUserInput } from '../../../graphql.schema';

export class CreatePostDto {
  @Min(1)
  title: string;
  body: string;
}
