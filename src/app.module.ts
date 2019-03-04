import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth/auth.module';
import { PostsModule } from './modules/posts/posts.module';
import { graphqlConfig } from './modules/common/graphql';

@Module({
  imports: [
    GraphQLModule.forRoot(graphqlConfig),
    TypeOrmModule.forRoot(),
    AuthModule,
    PostsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
