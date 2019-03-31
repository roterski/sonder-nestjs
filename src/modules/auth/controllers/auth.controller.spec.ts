import * as dotenv from 'dotenv';
dotenv.config();
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../../../app.module';

import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from '../services';
import { User } from '../entities'
import { getConnection, QueryBuilder, Connection, getManager } from 'typeorm';

describe('Auth Controller (e2e)', () => {
  let app: INestApplication;
  let connection: Connection;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  beforeEach(async () => {
    connection = getConnection();
    await connection.synchronize(true);
  });

  describe('/sign-up (POST)', () => {
    const subject = params =>
      request(app.getHttpServer())
        .post('/sign-up')
        .send(params);
    const getCount = () =>
      getManager()
        .createQueryBuilder(User, 'user')
        .getCount();

    describe('with valid params', () => {
      const params = { email: 'test@sonder.com', password: 'password' };

      it('returns token', (done) => {
        return subject(params)
          .expect(201)
          .expect((response) => {
            expect(Object.keys(response.body)).toEqual(['auth_token']);
            expect(response.body.auth_token.length).toBeGreaterThan(100);
          })
          .end(done);
      });

      it('creates user', async (done) => {
        const count = await getCount();
        await subject(params);
        expect(await getCount()).toEqual(count + 1);
        done();
      })
    });
  });
});
