import { MinLength } from 'class-validator';

export class CreatePostDto {
  @MinLength(3)
  title: string;

  body?: string;

  profileId?: number;
}
