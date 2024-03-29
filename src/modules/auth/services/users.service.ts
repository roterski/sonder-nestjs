import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getManager, getConnection } from 'typeorm';
import { User } from '../entities';
import { CreateUserDto } from '../dto';
import { ProfilesService } from '../../profiles';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { Observable, from, of } from 'rxjs';
import { switchMap, map, tap, catchError } from 'rxjs/operators';
import * as _ from 'lodash';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly profilesService: ProfilesService
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

  create(createUserDto: CreateUserDto): Observable<User | {}> {
    const queryRunner = getConnection().createQueryRunner();
    let createdUser: User;

    return from(queryRunner.connect()).pipe(
      switchMap(() => from(queryRunner.startTransaction())),
      map(() => User.create(createUserDto)),
      switchMap((user: User) => from(queryRunner.manager.save(user))),
      tap((user: User) => (createdUser = user)),
      map((user: User) => ({
        name: user.firstName,
        userId: user.id,
        default: true
      })),
      map((profileAttrs) => this.profilesService.build(profileAttrs)),
      switchMap((profile) => from(queryRunner.manager.save(profile))),
      switchMap(() => from(queryRunner.commitTransaction())),
      switchMap(() => from(queryRunner.release())),
      map(() => createdUser),
      catchError(() => {
        queryRunner.rollbackTransaction();
        return queryRunner.release();
      })
    );
  }

  getOrCreate(createUserDto: CreateUserDto, findBy: string[]): Observable<User | {}> {
    return from(User.findOne(_.pick(createUserDto, findBy)))
      .pipe(
        switchMap((user) => user ? of(user) : this.create(createUserDto))
      );
  }

  async findOneByJwtPayload(payload: JwtPayload): Promise<User> {
    return await this.userRepository.findOne({ id: payload.id, email: payload.email });
  }
}
