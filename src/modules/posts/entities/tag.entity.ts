import {
  Entity,
  Column,
  ManyToMany,
  OneToMany,
  ManyToOne,
  JoinColumn,
  Index,
} from 'typeorm';
import { Post } from './post.entity';
import { PostTag } from './post-tag.entity';
import { User } from '../../auth';
import { SonderBaseEntity } from '../../common';

@Entity()
export class Tag extends SonderBaseEntity {
  @Index({ unique: true })
  @Column()
  name: string;

  @ManyToMany(type => Post, post => post.tags)
  posts: Post[];

  @OneToMany(type => PostTag, postTag => postTag.post)
  postTags: PostTag[];

  @Column('int', { nullable: true })
  createdBy: number;
}
