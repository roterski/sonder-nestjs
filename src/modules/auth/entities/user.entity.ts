import {
  Entity,
  PrimaryGeneratedColumn,
  BaseEntity,
  Column,
  Index,
  CreateDateColumn,
  UpdateDateColumn,
  VersionColumn } from "typeorm";
import { SonderBaseEntity } from '../../../common/entities/SonderBaseEntity';

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
}
