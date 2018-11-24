import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { CommentsController } from './comments.controller';
import { PassportModule } from '@nestjs/passport';
import { PostsService } from './posts.service';
import { CommentsService } from './comments.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './post.entity';
import { Comment } from './comment.entity';
import { PostsResolvers } from './post.resolvers';

@Module({
  imports: [
    TypeOrmModule.forFeature([Post, Comment]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  providers: [PostsService, CommentsService, PostsResolvers],
  controllers: [PostsController, CommentsController],
})
export class PostsModule {}
