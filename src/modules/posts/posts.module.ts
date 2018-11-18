import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PassportModule } from '@nestjs/passport';
import { PostsService } from './posts.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './post.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Post]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  providers: [PostsService],
  controllers: [PostsController]
})
export class PostsModule {}
