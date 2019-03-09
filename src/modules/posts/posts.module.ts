import { Module } from '@nestjs/common';
import { PostsController, CommentsController } from './controllers';
import { PassportModule } from '@nestjs/passport';
import { PostsService, CommentsService } from './services';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post, Comment } from './entities';
import { ProfilesService, Profile } from '../profiles';

@Module({
  imports: [
    TypeOrmModule.forFeature([Post, Comment, Profile]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  providers: [PostsService, CommentsService, ProfilesService],
  controllers: [PostsController, CommentsController],
})
export class PostsModule {}
