import {
  Entity,
  Column,
  OneToMany,
  ManyToOne,
  JoinColumn,
  JoinTable,
  ManyToMany,
} from 'typeorm';
import { Comment } from './comment.entity';
import { Tag } from './tag.entity';
import { PostTag } from './post-tag.entity';
import { Profile } from '../../profiles';
import { SonderBaseEntity } from '../../common';

@Entity()
export class Post extends SonderBaseEntity {
  @Column()
  title: string;

  @Column()
  body: string;

  @Column({ default: 0 })
  points: number;

  @OneToMany(type => Comment, comment => comment.post)
  comments: Comment[];

  @ManyToOne(type => Profile, profile => profile.posts)
  @JoinColumn({ name: 'profileId' })
  profile: Profile;
  @Column('int')
  profileId: number;

  @ManyToMany(type => Tag, tag => tag.posts)
  @JoinTable({ name: 'post_tag' })
  tags: Tag[];

  @OneToMany(type => PostTag, postTag => postTag.post)
  postTags: PostTag[];
}
