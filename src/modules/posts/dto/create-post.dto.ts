import { MinLength } from 'class-validator';
import { CreatePostInput } from '../../../common/graphql/graphql.schema';

export class CreatePostDto extends CreatePostInput {
  @MinLength(3)
  title: string;
}
