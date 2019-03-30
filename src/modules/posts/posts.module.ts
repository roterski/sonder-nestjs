import { Module } from '@nestjs/common';
import { POSTS_CONTROLLERS } from './controllers';
import { PassportModule } from '@nestjs/passport';
import { POSTS_SERVICES } from './services';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post, Comment, Tag } from './entities';
import { ProfilesService, Profile } from '../profiles';

@Module({
  imports: [
    TypeOrmModule.forFeature([Post, Comment, Tag, Profile]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  providers: [...POSTS_SERVICES, ProfilesService],
  controllers: [...POSTS_CONTROLLERS],
})
export class PostsModule {}
