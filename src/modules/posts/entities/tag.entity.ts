import {
  Entity,
  PrimaryGeneratedColumn,
  BaseEntity,
  Column,
  ManyToMany,
  JoinTable,
  Index,
} from 'typeorm';
import { Post } from './post.entity';
import { SonderBaseEntity } from '../../common';

@Entity()
export class Tag extends SonderBaseEntity {
  @Index({ unique: true })
  @Column()
  name: string;

  @ManyToMany(type => Post, post => post.tags)
  posts: Post[];
}
