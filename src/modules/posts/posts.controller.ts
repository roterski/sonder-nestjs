import { Controller, Body, Get, Post, UseGuards, Req, Param } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Controller('posts')
@UseGuards(AuthGuard())
export class PostsController {
  constructor(
    private readonly postService: PostsService
  ) {}

  @Get()
  index(@Req() request): Observable<any> {
    return this.postService.findAll();
  }

  @Get(':id')
  show(@Param() params): Observable<any> {
    return this.postService.findOneById(params.id);
  }

  @Post()
  create(@Body('post') postBody): Observable<any> {
    return this.postService.create(postBody).pipe(
      map(post => {
        debugger
      })
    );
  }
}
