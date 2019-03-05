import { Module } from '@nestjs/common';
import { PostsController, CommentsController } from './controllers';
import { PassportModule } from '@nestjs/passport';
import { PostsService, CommentsService } from './services';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post, Comment } from './entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([Post, Comment]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  providers: [PostsService, CommentsService],
  controllers: [PostsController, CommentsController],
})
export class PostsModule {}
