import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { QueryRunner } from 'typeorm';
import { Observable, from, of, Observer } from 'rxjs';
import { switchMap, map, tap, reduce, catchError } from 'rxjs/operators';
import { Tag } from '../entities';
import { CreateTagDto } from '../dto';

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,
  ) {}

  findAll(): Observable<Tag[]> {
    return from(this.tagRepository.find());
  }

  getOrCreate(createTagDto: CreateTagDto, queryRunner: QueryRunner): Observable<Tag> {
    const create$ = of(Tag.create(createTagDto)).pipe(
      switchMap((tag: Tag) => queryRunner.manager.save(tag)),
    );
    const withId$ = from(Tag.findOneOrFail(createTagDto.id));
    const withOutId$ = from(Tag.findOne({ name: createTagDto.name })).pipe(
      switchMap((tag: Tag) => (tag ? of(tag) : create$)),
    );

    return createTagDto.id ? withId$ : withOutId$;
  }

  getOrCreateMany(tags: CreateTagDto[], queryRunner: QueryRunner): Observable<Tag[]> {
    return of(...tags).pipe(
      switchMap((tag: Tag) => this.getOrCreate(tag, queryRunner)),
      reduce((tags: Tag[], tag: Tag) => {
        tags.push(tag);
        return tags;
      }, [])
    )
  }
}
