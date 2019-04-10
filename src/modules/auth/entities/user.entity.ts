import {
  Entity,
  PrimaryGeneratedColumn,
  BaseEntity,
  Column,
  Index,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  VersionColumn } from 'typeorm';
import { Profile } from '../../profiles';
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
