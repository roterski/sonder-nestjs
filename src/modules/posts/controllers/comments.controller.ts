import {
  Controller,
  ParseIntPipe,
  Body,
  Get,
  Post,
  UseGuards,
  Req,
  Param,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { map, tap, switchMap } from 'rxjs/operators';
import { CreateCommentDto } from '../dto';
import { CommentsService } from '../services';
import { ProfilesService } from '../../profiles';
import { CurrentUser } from '../../auth';

@Controller()
@UseGuards(AuthGuard())
export class CommentsController {
  constructor(
    private readonly commentsService: CommentsService,
    private readonly profilesService: ProfilesService,
  ) {}

  @Get('posts/:postId/comments')
  index(@Param() params): Observable<any> {
    return this.commentsService
      .findByPost(params.postId)
      .pipe(map(comments => ({ data: comments })));
  }

  @Post('posts/:postId/comments')
  create(
    @Body('comment') commentParam: CreateCommentDto,
    @Param('postId', ParseIntPipe) postId,
    @CurrentUser() currentUser,
  ): Observable<any> {
    return this.profilesService
      .getProfile(currentUser.id, commentParam.profileId)
      .pipe(
        switchMap(profile =>
          this.commentsService.create({
            ...commentParam,
            postId,
            profileId: profile.id
          }),
        ),
        map(comment => ({ data: comment }))
      );
  }
}
