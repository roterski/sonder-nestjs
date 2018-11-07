import { Controller, Body, Get } from '@nestjs/common';

@Controller('posts')
export class PostsController {

  @Get()
  index() {
    return 'hello';
  }
}
