import * as dotenv from 'dotenv';
dotenv.config();
import * as env from 'env-var';
import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { getManager, BaseEntity, EntityManager } from 'typeorm';
import {
  PostFactory,
  CommentFactory,
  UserFactory,
  TagFactory,
  PostWithTagsFactory,
  createUserWithProfile,
  ProfileFactory,
} from '../test/factories';
import { User } from '../src/modules/auth';
import { Tag, Post } from '../src/modules/posts';
import { Profile } from '../src/modules/profiles';
import * as _ from 'lodash';
import { from, range, of } from 'rxjs';
import { exhaustMap, map, concatMap, mergeMap, tap, reduce } from 'rxjs/operators';

// // Ruby like syntax
// const generate = async ({
//   userCount,
//   tagCount,
//   maxProfilesPerUser,
//   maxPostsPerProfile,
//   maxTagsPerPost,
// }: {
//   userCount: number;
//   tagCount: number;
//   maxProfilesPerUser: number;
//   maxPostsPerProfile: number;
//   maxTagsPerPost: number;
// }) => {
//   const tags = await TagFactory.createList(tagCount);
//   _.times(userCount, async () => {
//     const user = await UserFactory.create();
//     _.times(_.random(maxProfilesPerUser), async () => {
//       const profile = await ProfileFactory.create({ userId: user.id });
//       _.times(_.random(maxPostsPerProfile), async () => {
//         const post = await PostFactory.create({
//           profileId: profile.id,
//           tags: _.sampleSize(tags, _.random(maxTagsPerPost)),
//         });
//       });
//     });
//   });
// };

// (async () => {
//   const counts = {
//     userCount: 100,
//     tagCount: 5,
//     maxProfilesPerUser: 3,
//     maxPostsPerProfile: 20,
//     maxTagsPerPost: 5,
//   };
//   await NestFactory.createApplicationContext(AppModule);
//   await generate(counts);
// })();

// // rxjs syntax
const generate$ = ({
  userCount,
  tagCount,
  maxProfilesPerUser,
  maxPostsPerProfile,
  maxTagsPerPost,
}: {
  userCount: number;
  tagCount: number;
  maxProfilesPerUser: number;
  maxPostsPerProfile: number;
  maxTagsPerPost: number;
}) => {
  const createTags = () =>
    from(TagFactory.createList(tagCount)).pipe(
      tap((tags) => console.log(`created ${tags.length} Tags`)),
    );
  const createUsers = (tags: Tag[]) =>
    range(0, userCount).pipe(
      concatMap(() => from(UserFactory.create())),
      concatMap(({ id }: User) => createProfiles(id, tags)),
      reduce((acc: any[], item: any, index) => [...acc, item], []),
      tap((users) => console.log(`created ${users.length} Users`)),
    );
  const createProfiles = (userId, tags: Tag[]) =>
    range(0, _.random(maxProfilesPerUser)).pipe(
    // range(0, maxProfilesPerUser).pipe(
      concatMap(() => from(ProfileFactory.create({ userId }))),
      concatMap(({ id }: Profile) => createPosts(id, tags)),
      reduce((acc: any[], item: any, index) => [...acc, item], []),
      tap((profiles) => console.log(`created ${profiles.length} Profiles for User#${userId}`)),
    );
  const createPosts = (profileId, allTags) =>
    range(0, _.random(maxPostsPerProfile)).pipe(
    // range(0, maxPostsPerProfile).pipe(
      map(() => _.sampleSize(allTags, _.random(maxTagsPerPost))),
      concatMap((tags: Tag[]) =>
        from(PostFactory.create({ profileId, tags })),
      ),
      tap(() => process.stdout.write('.')),
      reduce((acc: any[], item: any, index) => [...acc, item], []),
      tap((posts) => console.log(`created ${posts.length} Posts for Profile#${profileId}`)),
    );

  ;
  return createTags().pipe(
    concatMap((tags: Tag[]) => createUsers(tags))
  );
};

(() => {
  const counts = {
    userCount: 5,
    tagCount: 10,
    maxProfilesPerUser: 4,
    maxPostsPerProfile: 10,
    maxTagsPerPost: 5,
  };
  from(NestFactory.createApplicationContext(AppModule))
    .pipe(
      tap(() => console.log('Starting generation...')),
      concatMap(() => generate$(counts))
    ).subscribe({
      complete: () => console.log('...generation ended.'),
    });
})();
