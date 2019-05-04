import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getManager, getConnection, In, createQueryBuilder } from 'typeorm';
import { Observable, from, of } from 'rxjs';
import { switchMap, map, tap, catchError, partition, merge, reduce } from 'rxjs/operators';
import { Post, Tag, PostTag } from '../entities';
import { CreatePostDto, CreateTagDto } from '../dto';
import { TagsService } from './tags.service';
import * as _ from 'lodash';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    @InjectRepository(PostTag)
    private readonly postTagRepository: Repository<PostTag>,
    private tagsService: TagsService,
  ) {}


  findAll(tagIds: number[]): Observable<Post[]> {
    const tagsFilter$ = from(this.postTagRepository.find({
      where: { tagId: In(tagIds) }
    })).pipe(
      map((postTags: PostTag[]) => _.uniq(postTags.map(({ postId }) => postId))),
      map((postIds: number[]) => ({ where: { id: In(postIds) } }))
    );

    return ( tagIds.length > 0 ? tagsFilter$ : of({})).pipe(
      map((filter) => ({...filter, relations: ['tags'] })),
      switchMap((options) => from(this.postRepository.find(options)))
    );
  }

  findOneById(id: number): Observable<Post> {
    return from(
      this.postRepository.findOne(id, {
        relations: ['tags'],
      }),
    );
  }

  create(createPostDto: CreatePostDto): Observable<Post> {
    return of(Post.create(createPostDto)).pipe(switchMap(post => post.save()));
  }

  createWithTags(
    createPostDto: CreatePostDto,
    createTagDtos: CreateTagDto[],
  ): Observable<Post> {
    return from(this.tagsService.getOrCreate(createTagDtos)).pipe(
      map((tags: Tag[]) => Post.create({ ...createPostDto, tags })),
      switchMap((post: Post) => post.save()),
    );
  }
}
