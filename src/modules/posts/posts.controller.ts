import { Controller, Body, Get, Post, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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

  @Post()
  @UseGuards(AuthGuard())
  create(@Body('post') postBody): Observable<any> {
    return this.postService.create(postBody).pipe(
      map(post => {
        debugger
      })
    );
  }
}
