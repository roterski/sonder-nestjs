import { Min } from 'class-validator';
import { CreatePostInput } from '../../../common/graphql/graphql.schema';

export class CreatePostDto extends CreatePostInput {
  @Min(1)
  title: string;
}
