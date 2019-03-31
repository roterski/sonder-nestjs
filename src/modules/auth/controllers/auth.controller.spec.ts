import { User } from '../entities'
import * as request from 'supertest';
import { prepareTestApp } from '../../../../test/utils';
import { getConnection, getManager } from 'typeorm';

describe('Auth Controller (e2e)', () => {
  let app;

  beforeAll(async () => {
    app = await prepareTestApp();
  });

  beforeEach(async () => {
    await getConnection().synchronize(true);
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

    describe('with invalid params', () => {
      describe('pasword missing', () => {
        const params = { email: 'test@sonder.com' };

        it('returns error', done => {
          return subject(params)
            .expect(400, {
              statusCode: 400,
              error: 'Bad Request',
              message: [{
                property: 'password',
                target: params,
                constraints: {
                  minLength: 'password must be longer than or equal to 5 characters',
                  isNotEmpty: 'password should not be empty'
                },
                children: []
              }]
            }, done);
        });
      });

      describe('pasword too short', () => {
        const params = { email: 'test@sonder.com', password: 'abc' };

        it('returns error', done => {
          return subject(params)
            .expect(400, {
              statusCode: 400,
              error: 'Bad Request',
              message: [{
                property: 'password',
                target: params,
                constraints: {
                  minLength: 'password must be longer than or equal to 5 characters'
                },
                value: params.password,
                children: []
              }]
            }, done);
        });
      });

      describe('invalid email', () => {
        const params = { email: 'test@', password: 'password' };

        it('returns error', done => {
          return subject(params)
            .expect(400, {
              statusCode: 400,
              error: 'Bad Request',
              message: [{
                property: 'email',
                target: params,
                value: params.email,
                constraints: { isEmail: 'email must be an email' },
                children: []
              }]
            }, done);
        });
      });
    })
  });

  describe('/sign-in (POST)', () => {
    const subject = params =>
      request(app.getHttpServer())
        .post('/sign-in')
        .send(params);

    describe('with valid params', () => {

    });
  });
});
