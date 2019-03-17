import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth/auth.module';
import { PostsModule } from './modules/posts/posts.module';
import { ProfilesModule } from './modules/profiles/profiles.module';
import * as env from 'env-var';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    AuthModule,
    PostsModule,
    ProfilesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
