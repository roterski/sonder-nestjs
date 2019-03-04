import { ParseIntPipe, UseGuards, UseFilters, UseInterceptors } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription, ResolveProperty, Parent } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Post, Comment } from '../entities';
import { GqlAuthGuard } from '../../auth/graphql-auth.guard';
import { PostsService, CommentsService } from '../services';
import { CreatePostDto } from '../dto';
import { ExceptionInterceptor } from '../../../common/interceptors/'

const pubSub = new PubSub();

@Resolver('Post')
@UseInterceptors(ExceptionInterceptor)
@UseGuards(GqlAuthGuard)
export class PostsResolvers {
  constructor(
    private readonly postsService: PostsService,
    private readonly commentsService: CommentsService
  ) { }

  @Query('getPosts')
  getPosts(): Observable<Post[] | {}> {
    return this.postsService.findAll();
  }

  @Query('getPost')
  findOneById(
    @Args('id')
    id: number,
  ): Observable<Post| {}> {
    return this.postsService.findOneById(id);
  }

  @ResolveProperty()
  comments(@Parent() post): Observable<Comment[] | {}> {
    const { id } = post;
    return this.commentsService.findByPost(id);
  }

  @Mutation('createPost')
  create(@Args('createPostInput') args: CreatePostDto): Observable<Post> {
    return this.postsService.create(args).pipe(
      tap((createdPost) => pubSub.publish('postCreated', { postCreated: createdPost }))
    );
  }

  @Subscription('postCreated')
  postCreated() {
    return {
      subscribe: () => pubSub.asyncIterator('postCreated'),
    };
  }
}
