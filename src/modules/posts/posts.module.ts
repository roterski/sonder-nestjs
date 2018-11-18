import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [PostsController]
})
export class PostsModule {}
