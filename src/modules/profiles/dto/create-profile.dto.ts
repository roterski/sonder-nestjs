import { MinLength } from 'class-validator';

export class CreateProfileDto {
  @MinLength(1)
  name?: string;

  userId: number;
}
