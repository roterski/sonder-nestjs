import * as dotenv from 'dotenv';
dotenv.config();
import { INestApplication } from '@nestjs/common';
import { of, from, Observable } from 'rxjs';
import { switchMap, reduce, tap, map } from 'rxjs/operators';
import { AppModule } from '../src/app.module';
import { Test } from '@nestjs/testing';
import { ValidationPipe } from '@nestjs/common';
import { User } from '../src/modules/auth';
import * as jwt from 'jsonwebtoken';
import * as env from 'env-var';

export const prepareTestApp = async (): Promise<INestApplication> => {
  const moduleFixture = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  const app = moduleFixture.createNestApplication();
  app.useGlobalPipes(new ValidationPipe());
  await app.init();

  return app;
};

export const authHeader = ({ id, email }: User) =>
  `Bearer ${jwt.sign(
    { id, email },
    env
      .get('APP_SECRET')
      .required()
      .asString(),
  )}`;

