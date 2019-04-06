import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { User } from '../entities'
import { prepareTestApp } from '../../../../test/utils';
import { Profile } from '../../profiles';
import { UserFactory } from '../../../../test/factories';
import { getConnection } from 'typeorm';

describe('Auth Controller', () => {
  let app: INestApplication;

  beforeAll(async () => {
    app = await prepareTestApp();
  });

  beforeEach(async () => {
    await getConnection().synchronize(true);
  });

  describe('POST /sign-up - signUp', () => {
    const subject = params =>
      request(app.getHttpServer())
        .post('/sign-up')
        .send(params);

    describe('with valid params', () => {
      const params = { email: 'test@sonder.com', password: 'password' };

      it('returns token', (done) => (
        subject(params)
          .expect(201)
          .expect((response) => {
            expect(Object.keys(response.body)).toEqual(['auth_token']);
            expect(response.body.auth_token.length).toBeGreaterThan(100);
          })
          .end(done)
      ));

      it('creates user', async (done) => {
        const count = await User.count();
        await subject(params);
        expect(await User.count()).toEqual(count + 1);
        done();
      });

      it('creates profile', async (done) => {
        const count = await Profile.count();
        await subject(params);
        expect(await Profile.count()).toEqual(count +1);
        done();
      });
    });

    describe('with invalid params', () => {
      describe('pasword missing', () => {
        const params = { email: 'test@sonder.com' };

        it('returns error', done => (
          subject(params)
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
            }, done)
        ));
      });

      describe('pasword too short', () => {
        const params = { email: 'test@sonder.com', password: 'abc' };

        it('returns error', done => (
          subject(params)
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
            }, done)
        ));
      });

      describe('invalid email', () => {
        const params = { email: 'test@', password: 'password' };

        it('returns error', done => (
          subject(params)
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
            }, done)
        ));
      });
    })
  });

  describe('/sign-in (POST)', () => {
    const subject = params =>
      request(app.getHttpServer())
        .post('/sign-in')
        .send(params);

      describe('when user exists', () => {
        let user: User;

        beforeEach(async () => {
          user = await UserFactory.create();
        });

        describe('with correct credentials', () => {
          const params = ({ email }) => ({ email, password: 'password' });

          it('returns auth_token', (done) => (
            subject(params(user))
              .expect(200)
              .expect(({ body }) => {
                expect(Object.keys(body)).toEqual(['auth_token']);
                expect(body.auth_token.length).toBeGreaterThan(100);
              })
              .end(done)
          ));
        });

        describe('with invalid password', () => {
          const params = ({ email }) => ({
            email,
            password: 'wrongpwd',
          });

          it('returns error', done =>
            subject(params(user))
              .expect(409, {
                statusCode: 409,
                error: 'Conflict',
                message: 'User not found or password is incorrect'
              }, done)
          );
        });
    });
  });
});
