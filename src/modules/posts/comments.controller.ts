import { Controller, Body, Get, Post, UseGuards, Req, Param, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateCommentDto } from './dto/create-comment.dto';
import { Observable } from 'rxjs';
import { CommentsService } from './comments.service';
import { map, tap } from 'rxjs/operators';

@Controller()
@UseGuards(AuthGuard())
export class CommentsController {
  constructor(
    private readonly commentsService: CommentsService
  ) { }

  @Get('posts/:postId/comments')
  index(@Param() params): Observable<any> {
    return this.commentsService.findByPost(params.postId).pipe(
      map((comments) => ({ data: comments }))
    );
  }

  @Post('posts/:postId/comments')
  create(@Body('comment') commentParam: CreateCommentDto, @Param() params): Observable<any> {
    return this.commentsService.create({
      ...commentParam,
      postId: parseInt(params.postId, 10),
    }).pipe(
      map((comment) => ({ data: comment }))
    );
  }
}
