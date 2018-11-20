import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './comment.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
import { JwtPayload } from '../auth/interfaces/jwt-payload.interface';
import { Observable, from, of } from 'rxjs';
import { switchMap, map, tap } from 'rxjs/operators';
import * as _ from 'lodash';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
  ) {}

  findByPost(postId: number): Observable<Comment[]> {
    return from(this.commentRepository.find({ where: { postId }}));
  }

  findOneById(id: number): Observable<Comment> {
    return from(this.commentRepository.findOne(id));
  }

  create(createCommentDto: CreateCommentDto): Observable<Comment> {
    return of(Comment.create(createCommentDto)).pipe(
      switchMap(comment => comment.save()),
    );
  }
}
