import { Factory } from 'typeorm-factory';
import { name, lorem } from 'faker';
import { User } from '../src/modules/auth';
import { Profile } from '../src/modules/profiles';
import { Post, Tag } from '../src/modules/posts';
import * as bcrypt from 'bcrypt';

export const UserFactory = new Factory(User)
  .sequence('email', (i) => `test_${i}@sonder.com`)
  .attr('firstName', name.firstName())
  .attr('passwordHash', bcrypt.hash('password', 10))

export const ProfileFactory = new Factory(Profile)
  .attr('name', name.findName());

export const DefaultProfileFactory = ProfileFactory
  .attr('default', true)
  .assocOne('user', UserFactory);

export const createUserWithDefaultProfile = async () => {
  const user = await UserFactory.create();
  const profile = await ProfileFactory.create({
    userId: user.id,
  });
  return { user, profile };
}

export const PostFactory = new Factory(Post)
  .attr('title', lorem.sentence())
  .attr('body', lorem.sentences(5))
  .assocOne('profile', DefaultProfileFactory);

export const TagFactory = new Factory(Tag)
  .attr('name', lorem.word());
