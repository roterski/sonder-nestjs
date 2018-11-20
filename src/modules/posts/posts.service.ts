import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './post.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { JwtPayload } from '../auth/interfaces/jwt-payload.interface';
import { Observable, from, of } from 'rxjs';
import { switchMap, map, tap } from 'rxjs/operators';
import * as _ from 'lodash';

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
        switchMap((user) => user.save())
      );
  }
}
