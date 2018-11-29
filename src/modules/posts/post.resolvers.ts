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
import { CreateCommentDto } from 'modules/posts/dto/create-comment.dto';

const pubSub = new PubSub();

@Resolver('Post')
@UseGuards(GqlAuthGuard)
export class PostsResolvers {
  constructor(
    private readonly postsService: PostsService,
    private readonly commentsService: CommentsService
  ) { }

  @Query('getPosts')
  getPosts(): Observable<Post[]> {
    return this.postsService.findAll();
  }

  @Query('getPost')
  findOneById(
    @Args('id', ParseIntPipe)
    id: number,
  ): Observable<Post> {
    return this.postsService.findOneById(id);
  }

  @ResolveProperty()
  comments(@Parent() post): Observable<Comment[]> {
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
