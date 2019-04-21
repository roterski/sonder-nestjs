import {
  Entity,
  Column,
  ManyToMany,
  ManyToOne,
  JoinColumn,
  Index,
} from 'typeorm';
import { Post } from './post.entity';
import { User } from '../../auth';
import { SonderBaseEntity } from '../../common';

@Entity()
export class Tag extends SonderBaseEntity {
  @Index({ unique: true })
  @Column()
  name: string;

  @ManyToMany(type => Post, post => post.tags)
  posts: Post[];

  @Column('int', { nullable: true })
  createdBy: number;
}
