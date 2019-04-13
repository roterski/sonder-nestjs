import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getConnection } from 'typeorm';
import { tap } from 'rxjs/operators';
import { lorem } from 'faker';
import * as request from 'supertest';
import {
  prepareTestApp,
  authHeader,
} from '../../../../test/utils';
import {
  UserFactory,
  createUserWithDefaultProfile,
  TagFactory,
} from '../../../../test/factories';
import { Tag, Post } from '../entities';
import { User } from '../../auth';
import { Profile } from '../../profiles';
import { PostsController } from './posts.controller';

describe('Posts Controller', () => {
  let app: INestApplication;

  beforeAll(async () => {
    app = await prepareTestApp();
  });

  beforeEach(async () => {
    await getConnection().synchronize(true);
  });

  describe('POST /posts - create', () => {
    let existingTag: Tag;
    let currentUser: User;
    let currentProfile: Profile;
    let tagCount: number;

    const subject = (params, user: User) =>
      request(app.getHttpServer())
        .post('/posts')
        .set('Authorization', authHeader(user))
        .send(params);
    
    beforeEach(async () => {
      const { user, profile } = await createUserWithDefaultProfile();
      currentUser = user;
      currentProfile = profile;
      existingTag = await TagFactory.create();
      tagCount = await Tag.count();
    });

    describe('with valid params', () => {
      const title = lorem.sentence();
      const body = lorem.sentences();
      const params = (tag: Tag, profile: Profile) => ({
        post: {
          title,
          body,
          profileId: profile.id
        },
        tags: [
          { name: 'math' },
          { id: tag.id, name: tag.name }
        ]
      });

      it('creates post with tags', (done) => (
        subject(params(existingTag, currentProfile), currentUser)
          .expect(201)
          .expect(({ body: { data } }) => {
            expect(data.title).toEqual(title);
            expect(data.body).toEqual(body);
            expect(data.profileId).toEqual(currentProfile.id);
            expect(data.points).toEqual(0);
            expect(data.tags).toHaveLength(2);
          })
          .end(done)
      ));

      it('creates new post and a tag', async (done) => {
        const tagCount = await Tag.count();
        const postCount = await Post.count();
        await subject(params(existingTag, currentProfile), currentUser);
        expect((await Post.count())).toEqual(postCount + 1);
        expect((await Tag.count())).toEqual(tagCount + 1);
        await done();
      })
    });

    describe('with wrong profileId', () => {
      let wrongProfile: Profile;
      const title = lorem.sentence();
      const body = lorem.sentences();
      const params = (tag: Tag, profile: Profile) => ({
        post: {
          title,
          body,
          profileId: profile.id
        },
        tags: [
          { name: 'math' },
          { id: tag.id, name: tag.name }
        ]
      });

      beforeEach(async () => {
        const { user, profile } = await createUserWithDefaultProfile();
        wrongProfile = profile;
      });

      it('returns 401 unauthorized', (done) => (
        subject(params(existingTag, wrongProfile), currentUser)
          .expect(401, {
            statusCode: 401,
            error: 'Unauthorized',
            message: 'profileId does not belong to the user'
          }, done)
      ));

      it('does not create post nor tag', async (done) => {
        const tagCount = await Tag.count();
        const postCount = await Post.count();
        await subject(params(existingTag, wrongProfile), currentUser)
        expect((await Post.count())).toEqual(postCount);
        expect((await Tag.count())).toEqual(tagCount);
        done();
      })
    });

    describe('with invalid params', () => {
      describe('with blank post title', () => {
        const params = (tag: Tag, profile: Profile) => ({
          post: {
            title: '',
            profileId: profile.id,
          },
          tags: [{ name: 'math' }, { id: tag.id, name: tag.name }],
        });

        it('returns error', done =>
          subject(params(existingTag, currentProfile), currentUser)
            .expect(400)
            .expect(({ body: { message } }) => {
              expect(message[0].constraints).toEqual({
                minLength:
                  'title must be longer than or equal to 3 characters',
              });
            })
            .end(done));
      });

      describe('with missing post title', () => {
        const params = (tag: Tag, profile: Profile) => ({
          post: {
            profileId: profile.id,
          },
          tags: [{ name: 'math' }, { id: tag.id, name: tag.name }],
        });

        it('returns error', done =>
          subject(params(existingTag, currentProfile), currentUser)
            .expect(400)
            .expect(({ body: { message } }) => {
              expect(message[0].constraints).toEqual({
                minLength: "title must be longer than or equal to 3 characters"
              })
            })
            .end(done));
      })
    });
  });
});
