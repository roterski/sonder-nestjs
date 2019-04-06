import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getManager, getConnection } from 'typeorm';
import { Observable, from, of } from 'rxjs';
import { switchMap, map, tap, catchError, partition, merge, reduce } from 'rxjs/operators';
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
    return of(Post.create(createPostDto)).pipe(
      switchMap(post => post.save()),
    );
  }

  createWithTags(createPostDto: CreatePostDto, createTagDtos: CreateTagDto[]): Observable<Post> {
    return this.tagsService.getOrCreate(createTagDtos).pipe(
      map((tags: Tag[]) => Post.create({ ...createPostDto, tags })),
      switchMap((post: Post) => post.save())
    );
  }
}
