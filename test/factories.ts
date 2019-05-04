import { Factory } from 'typeorm-factory';
import { name, lorem } from 'faker';
import { User } from '../src/modules/auth';
import { Profile } from '../src/modules/profiles';
import { Post, Tag, Comment } from '../src/modules/posts';
import * as bcrypt from 'bcrypt';

export const UserFactory = new Factory(User)
  .sequence('email', (i) => `test_${i}@sonder.com`)
  .sequence('firstName', () => name.firstName())
  .attr('passwordHash', bcrypt.hash('password', 10))

export const ProfileFactory = new Factory(Profile)
  .sequence('name', () => name.findName());

export const ProfileWithUserFactory = ProfileFactory
  .assocOne('user', UserFactory);

export const createUserWithProfile = async () => {
  const user = await UserFactory.create();
  const profile = await ProfileFactory.create({
    userId: user.id,
  });
  return { user, profile };
}

export const TagFactory = new Factory(Tag)
  .sequence('name', (i) => `${lorem.word()}-${i}`);

export const PostFactory = new Factory(Post)
  .sequence('title', () => lorem.sentence())
  .sequence('body', () => lorem.sentences(5))
  .assocOne('profile', ProfileWithUserFactory);

export const CommentFactory = new Factory(Comment)
  .sequence('body', () => lorem.sentences());

export const PostWithTagsFactory = (tagCount = 2 ) => PostFactory
  .assocMany('tags', TagFactory, tagCount);
