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

  findAllById(ids: number[]): Promise<Tag[]> {
    return this.tagRepository.findByIds(ids);
  }

  create(createTagDto: CreateTagDto): Promise<Tag> {
    const tag = Tag.create(createTagDto);
    return tag.save();
  }

  async getOrCreate(createTagDtos: CreateTagDto[]): Promise<Tag[]> {
    const [withIds, withoutIds] = _.partition(createTagDtos, ({ id }) => !!id);

    const tagsFromNames: Promise<Tag>[] = withoutIds.map((tag: CreateTagDto) => this.create(tag));
    const tagsFromIds: Promise<Tag[]> = this.findAllById(withIds.map(({ id }) => id));

    return [
      ...(await tagsFromIds),
      ...(await Promise.all(tagsFromNames))
    ];
  }
}
