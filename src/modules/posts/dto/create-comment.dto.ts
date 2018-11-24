import { Min } from 'class-validator';

export class CreateCommentDto {
  body: string;
  postId: number;
}
