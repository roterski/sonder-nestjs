import { ParseIntPipe, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User } from '../users/user.entity';
import { GqlAuthGuard } from '../graphql-auth.guard';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';

const pubSub = new PubSub();

@UseGuards(GqlAuthGuard)
@Resolver('User')
export class UsersResolvers {
  constructor(private readonly usersService: UsersService) { }

  @Query()
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
