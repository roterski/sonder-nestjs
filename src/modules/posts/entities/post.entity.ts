import {
  Entity,
  PrimaryGeneratedColumn,
  BaseEntity,
  Column,
  OneToMany,
  ManyToOne,
  JoinColumn
} from 'typeorm';
import { Comment } from './comment.entity';
import { Profile } from '../../profiles';
import { SonderBaseEntity } from '../../common/entities/SonderBaseEntity';

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
}
