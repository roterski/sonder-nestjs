import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
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

  async create(createUserDto: CreateUserDto): Promise<User> {
    return await this.userRepository.create(createUserDto);
  }

  getOrCreate(createUserDto: CreateUserDto, findBy: string[]): Observable<User> {
    const newUser$ = of(User.create(createUserDto))
      .pipe(
        switchMap(user => user.save())
      );

    return from(User.findOne(_.pick(createUserDto, findBy)))
      .pipe(
        switchMap((user) => user ? of(user) : newUser$)
      );
  }

  async findOneByJwtPayload(payload: JwtPayload): Promise<User> {
    return await this.userRepository.findOne({ id: payload.id, email: payload.email });
  }
}
