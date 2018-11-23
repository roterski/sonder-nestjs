import { Controller, Body, Get, Post, UseGuards, Req, Param } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreatePostDto } from './dto/create-post.dto';
import { Observable } from 'rxjs';
import { CommentsService } from './comments.service';
import { map } from 'rxjs/operators';

@Controller()
@UseGuards(AuthGuard())
export class CommentsController {
  constructor(
    private readonly commentsService: CommentsService
  ) { }

  @Get('posts/:postId/comments')
  index(@Param() params): Observable<any> {
    return this.commentsService.findByPost(params.postId).pipe(
      map((comments) => (
        {
          data: comments
        }
      ))
    );
  }

  @Post('posts/:postId/comments')
  create(@Body('comment') commentParam): Observable<any> {
    return this.commentsService.create(commentParam).pipe(
      map((comment) => ({ data: comment }))
    );
  }
}
