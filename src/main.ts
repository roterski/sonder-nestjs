import { NestFactory } from '@nestjs/core';
import { ValidationPipe, ValidationPipeOptions } from '@nestjs/common';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './http-exception.filter';
import "reflect-metadata";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
  await app.listen(4000);
}
bootstrap();
