import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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

  create(createProfileDto: CreateProfileDto): Profile {
    return Profile.create(createProfileDto);
  }
}
