import * as dotenv from 'dotenv';
dotenv.config();
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { LoggingInterceptor, ExceptionInterceptor } from './modules/common/interceptors';
import 'reflect-metadata';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new LoggingInterceptor());
  app.useGlobalInterceptors(new ExceptionInterceptor());
  app.enableCors();
  await app.listen(4000);
}
bootstrap();
