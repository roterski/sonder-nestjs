import { ParseIntPipe, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User } from './user.entity';
import { UsersGuard } from './users.guard';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

const pubSub = new PubSub();

@Resolver('User')
export class UsersResolvers {
  constructor(private readonly usersService: UsersService) { }

  @Query()
  @UseGuards(UsersGuard)
  async getUsers(): Promise<User[]> {
    return await this.usersService.findAll();
  }

  @Query('user')
  async findOneById(
    @Args('id', ParseIntPipe)
    id: number,
  ): Promise<User> {
    return await this.usersService.findOneById(id);
  }

  @Mutation('createUser')
  create( @Args('createUserInput') args: CreateUserDto): Observable<User> {
    return this.usersService.create(args).pipe(
      tap((createdUser) => pubSub.publish('userCreated', { userCreated: createdUser }))
    );
  }

  @Subscription('userCreated')
  userCreated() {
    return {
      subscribe: () => pubSub.asyncIterator('userCreated'),
    };
  }
}
