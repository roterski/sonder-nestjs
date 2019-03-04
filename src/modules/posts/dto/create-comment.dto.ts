import { MinLength } from 'class-validator';
import { CreateCommentInput } from '../../common/graphql/graphql.schema';

export class CreateCommentDto extends CreateCommentInput{
  @MinLength(3)
  body: string;
}
