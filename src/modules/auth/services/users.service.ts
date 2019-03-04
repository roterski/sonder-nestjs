import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { Observable, from, of } from 'rxjs';
import { switchMap, map, tap } from 'rxjs/operators';
import * as _ from 'lodash';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findOneById(id: number): Promise<User> {
    return await this.userRepository.findOne(id);
  }

  findOne(query: any): Observable<User> {
    return from(this.userRepository.findOne(query));
  }

  create(createUserDto: CreateUserDto): Observable<User> {
    return of(User.create(createUserDto))
      .pipe(
        switchMap((user) => user.save())
      );
  }

  getOrCreate(createUserDto: CreateUserDto, findBy: string[]): Observable<User> {
    return from(User.findOne(_.pick(createUserDto, findBy)))
      .pipe(
        switchMap((user) => user ? of(user) : this.create(createUserDto))
      );
  }

  async findOneByJwtPayload(payload: JwtPayload): Promise<User> {
    return await this.userRepository.findOne({ id: payload.id, email: payload.email });
  }
}
