import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getManager, getConnection } from 'typeorm';
import { Observable, from, of } from 'rxjs';
import { switchMap, map, tap, catchError } from 'rxjs/operators';
import { Post, Tag } from '../entities';
import { CreatePostDto, CreateTagDto } from '../dto';
import { TagsService } from './tags.service';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    private tagsService: TagsService,
  ) { }

  findAll(): Observable<Post[]> {
    return from(this.postRepository.find());
  }

  findOneById(id: number): Observable<Post> {
    return from(this.postRepository.findOne(id));
  }

  create(createPostDto: CreatePostDto): Observable<Post> {
    return of(Post.create(createPostDto))
      .pipe(
        switchMap((post) => {
          return post.save()
        })
      );
  }

  createWithTags(createPostDto: CreatePostDto, createTagDtos: CreateTagDto[]): Observable<Post | void | {}> {
    const queryRunner = getConnection().createQueryRunner();
    let createdPost: Post;

    return from(queryRunner.connect()).pipe(
      switchMap(() => from(queryRunner.startTransaction())),
      switchMap(() => this.tagsService.getOrCreateMany(createTagDtos, queryRunner)),
      map((tags: Tag[]) => Post.create({ ...createPostDto, tags })),
      switchMap((post) => queryRunner.manager.save(post)),
      tap((post: Post) => (createdPost = post)),
      switchMap(() => from(queryRunner.commitTransaction())),
      switchMap(() => queryRunner.release()),
      map(() => createdPost),
      catchError(() => {
        queryRunner.rollbackTransaction();
        return queryRunner.release();
      })
    );
  }
}
