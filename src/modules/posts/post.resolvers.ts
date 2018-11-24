import { ParseIntPipe, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription, ResolveProperty } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Post } from './post.entity';
import { PostsGuard } from './posts.guard';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';

const pubSub = new PubSub();

@Resolver('Post')
export class PostsResolvers {
  constructor(private readonly postsService: PostsService) { }

  @Query('getPosts')
  @UseGuards(PostsGuard)
  getPosts(): Observable<Post[]> {
    return this.postsService.findAll();
  }

  @Query('post')
  findOneById(
    @Args('id', ParseIntPipe)
    id: number,
  ): Observable<Post> {
    return this.postsService.findOneById(id);
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
