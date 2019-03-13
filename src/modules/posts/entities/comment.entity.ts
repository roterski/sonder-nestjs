import { Entity, PrimaryGeneratedColumn, BaseEntity, Column, ManyToOne, JoinColumn } from "typeorm";
import { Post } from './post.entity';
import { Profile } from '../../profiles';
import { SonderBaseEntity } from '../../common/entities/SonderBaseEntity';

@Entity()
export class Comment extends SonderBaseEntity {
  @Column('simple-array', { default: [] })
  parentIds: number[];

  @Column()
  body: string;

  @Column({ default: 0 })
  points: number;

  @ManyToOne(type => Post, post => post.comments)
  @JoinColumn({ name: 'postId' })
  post: Post;
  @Column('int')
  postId: number;

  @ManyToOne(type => Profile, profile => profile.posts)
  @JoinColumn({ name: 'profileId' })
  profile: Profile;
  @Column('int')
  profileId: number;
}
