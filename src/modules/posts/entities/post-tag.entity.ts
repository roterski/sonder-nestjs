import {
  Entity,
  Index,
  ManyToOne,
  JoinColumn,
  PrimaryColumn
} from 'typeorm';
import { Tag } from './tag.entity';
import { Post } from './post.entity';
import { SonderBaseEntity } from '../../common';

@Entity()
@Index(['postId', 'tagId'], { unique: true })
export class PostTag extends SonderBaseEntity {
  @PrimaryColumn()
  @Index()
  postId: number;

  @ManyToOne(() => Post, post => post.postTags)
  @JoinColumn({ name: 'postId' })
  post: Post;

  @PrimaryColumn()
  @Index()
  tagId: number;

  @ManyToOne(() => Tag, tag => tag.postTags)
  @JoinColumn({ name: 'tagId' })
  tag: Tag;
}
