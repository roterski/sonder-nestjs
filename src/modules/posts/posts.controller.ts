import { Controller, Body, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('posts')
export class PostsController {

  @Get()
  @UseGuards(AuthGuard())
  index() {
    return 'hello';
  }
}
