import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from '../entities';
import { CreatePostDto } from '../dto';
import { Observable, from, of } from 'rxjs';
import { switchMap, map, tap, catchError } from 'rxjs/operators';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
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
}
