import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Profile } from '../entities';
import { CreateProfileDto } from '../dto'
import { Observable, from, of } from 'rxjs';
import { switchMap, map, tap } from 'rxjs/operators';
import * as _ from 'lodash';

@Injectable()
export class ProfilesService {
  constructor(
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
  ) {}

  build(createProfileDto: CreateProfileDto): Profile {
    return Profile.create(createProfileDto);
  }

  findByIds(ids: number | number[]): Observable<Profile[]> {
    const id = Array.isArray(ids) ? In(ids) : ids;
    return from(this.profileRepository.find({ where: { id } }));
  }

  findByUserId(userId: number): Observable<Profile[]> {
    return from(this.profileRepository.find({ where: { userId }}));
  }

  getProfile(userId: number, id?: number): Observable<Profile> {
    return this.findOne({ id, userId });
  }

  findOne(query): Observable<Profile> {
    return from(this.profileRepository.findOne(query));
  }
}
