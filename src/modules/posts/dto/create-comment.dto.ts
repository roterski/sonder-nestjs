import { MinLength } from 'class-validator';

export class CreateCommentDto {
  @MinLength(3)
  body: string;

  parentIds?: number[];

  postId?: number;
}
