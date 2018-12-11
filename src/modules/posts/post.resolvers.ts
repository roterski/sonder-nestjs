import { ParseIntPipe, UseGuards, UseFilters, UseInterceptors } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription, ResolveProperty, Parent } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Post } from './post.entity';
import { Comment } from './comment.entity';
import { GqlAuthGuard } from '../auth/graphql-auth.guard';
import { PostsService } from './posts.service';
import { CommentsService } from './comments.service';
import { CreatePostDto } from './dto/create-post.dto';
import { CreateCommentDto } from 'modules/posts/dto/create-comment.dto';
import { HttpExceptionFilter } from '../../http-exception.filter';
import { LoggingInterceptor, ExceptionInterceptor } from '../../common/interceptors/'

const pubSub = new PubSub();

@Resolver('Post')
@UseFilters(new HttpExceptionFilter())
@UseInterceptors(LoggingInterceptor, ExceptionInterceptor)
@UseGuards(GqlAuthGuard)
export class PostsResolvers {
  constructor(
    private readonly postsService: PostsService,
    private readonly commentsService: CommentsService
  ) { }

  @Query('getPosts')
  getPosts(): Observable<Post[] | {}> {
    return this.postsService.findAll().pipe(
      catchError((err) => {
        return err;
      })
    );
  }

  @Query('getPost')
  findOneById(@Args('id') id: number): Observable<Post | {}> {
    return this.postsService.findOneById(id).pipe(
      catchError((err) => {
        return err;
      })
    );
  }

  @ResolveProperty()
  comments(@Parent() post): Observable<Comment[] | {}> {
    const { id } = post;
    return this.commentsService.findByPost(id).pipe(
      // catchError((err) => {
      //   return err;
      // })
    );
  }

  @Mutation('createPost')
  create(@Args('title') title: string, @Args('body') body: string): Observable<Post | {}> {
    return this.postsService.create({ title, body } as CreatePostDto).pipe(
      tap((createdPost) => pubSub.publish('postCreated', { postCreated: createdPost }))
    ).pipe(
      catchError((err) => {
        return err;
      })
    );
  }

  @Subscription('postCreated')
  postCreated() {
    return {
      subscribe: () => pubSub.asyncIterator('postCreated'),
    };
  }
}
