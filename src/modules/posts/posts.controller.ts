import { Controller, Body, Get, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PostsService } from './posts.service';
import { Observable } from 'rxjs';

@Controller('posts')
export class PostsController {
  constructor(
    private readonly postService: PostsService
  ) {}

  @Get()
  @UseGuards(AuthGuard())
  index(@Req() request): Observable<any> {
    return this.postService.findAll();
  }
}
