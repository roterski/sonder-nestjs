import {
  Entity,
  Column,
  Index,
  OneToMany } from 'typeorm';
import { Profile } from '../../profiles';
import { Tag } from '../../posts';
import { SonderBaseEntity } from '../../common';

@Entity()
export class User extends SonderBaseEntity {
  @Column({ nullable: true })
  @Index({ unique: true })
  email: string;

  @Column({ nullable: true })
  firstName: string;

  @Column({ nullable: true })
  passwordHash: string;

  @Column({ nullable: true })
  @Index({ unique: true })
  facebookId: string;

  @OneToMany(type => Profile, profile => profile.user)
  profiles: Profile[];
}
