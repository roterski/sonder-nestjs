import { MinLength } from 'class-validator';

export class CreateTagDto {
  id?: number;

  @MinLength(3)
  name: string;
}
