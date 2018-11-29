import { ParseIntPipe, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription, ResolveProperty, Parent } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Post } from './post.entity';
import { Comment } from './comment.entity';
import { GqlAuthGuard } from '../auth/graphql-auth.guard';
import { PostsService } from './posts.service';
import { CommentsService } from './comments.service';
import { CreatePostDto } from './dto/create-post.dto';
import { CreateCommentDto } from './dto/create-comment.dto';

const pubSub = new PubSub();

@Resolver('Comment')
@UseGuards(GqlAuthGuard)
export class CommentsResolvers {
  constructor(
    private readonly commentsService: CommentsService
  ) { }

  @Mutation('createComment')
  create( @Args('createCommentInput') args: CreateCommentDto): Observable<Comment> {
    return this.commentsService.create(args).pipe(
      tap((createdComment) => pubSub.publish('commentCreated', { commentCreated: createdComment }))
    );
  }

}
