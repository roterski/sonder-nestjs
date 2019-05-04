import { MinLength, IsNotEmpty } from 'class-validator';

export class CreatePostDto {
  @MinLength(3)
  title: string;

  body?: string;

  @IsNotEmpty()
  profileId: number;
}
