import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getConnection } from 'typeorm';
import { tap } from 'rxjs/operators';
import { lorem } from 'faker';
import * as request from 'supertest';
import {
  prepareTestApp,
  authHeader,
  compareCounts,
} from '../../../../test/utils';
import {
  UserFactory,
  createUserWithDefaultProfile,
  TagFactory,
} from '../../../../test/factories';
import { Tag } from '../entities';
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
      const { user, profile } = await createUserWithDefaultProfile()
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
          .expect(async ({ body: { data } }) => {
            expect(data.title).toEqual(title);
            expect(data.body).toEqual(body);
            expect(data.profileId).toEqual(currentProfile.id);
            expect(data.points).toEqual(0);
            expect(data.tags).toHaveLength(2);
          })
          .end(done)
      ));

      it('creates new tag', async (done) => {
        const count = await Tag.count();
        await subject(params(existingTag, currentProfile), currentUser);
        const countAfter = await Tag.count();
        expect(countAfter).toEqual(count + 1);
        await done();
      })
    });

    describe('with invalid params', () => {

    });
  });
});
