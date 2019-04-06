import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { QueryRunner } from 'typeorm';
import { Observable, from, of, Observer, zip, UnaryFunction } from 'rxjs';
import { switchMap, map, tap, reduce, partition, catchError } from 'rxjs/operators';
import { Tag } from '../entities';
import { CreateTagDto } from '../dto';
import * as _ from 'lodash';

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,
  ) {}

  findAll(): Observable<Tag[]> {
    return from(this.tagRepository.find());
  }

  findAllById(ids: number[]): Observable<Tag[]> {
    return from(this.tagRepository.findByIds(ids));
  }

  create(createTagDto: CreateTagDto): Observable<Tag> {
    return of(Tag.create(createTagDto)).pipe(
      switchMap((tag) => tag.save())
    );
  };

  getOrCreate(createTagDtos: CreateTagDto[]): Observable<Tag[]> {
    const partitioned$ = of(...createTagDtos).pipe(
      partition(({id}, _index) => !!id)
    );

    const withIds$ = partitioned$[0].pipe(
      map(({ id }: CreateTagDto) => id),
      reduce((ids: number[], id: number) => [...ids, id], []),
      switchMap((ids: number[]) => this.findAllById(ids)),
    );

    const withoutIds$ = partitioned$[1].pipe(
      switchMap((tag: CreateTagDto) => this.create(tag)),
      reduce((tags: CreateTagDto[], tag: CreateTagDto) => [...tags, tag], [])
    );

    return zip(withIds$, withoutIds$).pipe(
      map(([tags1, tags2]) => [...tags1, ...tags2])
    );
  }
}
