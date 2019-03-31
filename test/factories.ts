import { Factory } from 'typeorm-factory';
import { name } from 'faker';
import { User } from '../src/modules/auth';
import { Profile } from '../src/modules/profiles';
import * as bcrypt from 'bcrypt';

export const ProfileFactory = new Factory(Profile)
  .attr('name', name.findName());

export const UserFactory = new Factory(User)
  .sequence('email', (i) => `test_${i}@sonder.com`)
  .attr('firstName', name.firstName())
  .attr('passwordHash', bcrypt.hash('password', 10));
