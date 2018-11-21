import { Controller, Body, Get, Post, UseGuards, Req, Param } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Controller('posts')
@UseGuards(AuthGuard())
export class PostsController {
  constructor(private readonly postService: PostsService) {}

  @Get()
  index(@Req() request): Observable<any> {
    return this.postService.findAll().pipe(
      map((posts) => ({ data: { posts, page: 1 } }))
    );
  }

  @Get(':id')
  show(@Param() params): Observable<any> {
    return this.postService.findOneById(params.id);
  }

  @Post()
  create(@Body('post') postParam): Observable<any> {
    return this.postService.create(postParam).pipe(
      tap(post => {
        debugger;
      }),
    );
  }
}
