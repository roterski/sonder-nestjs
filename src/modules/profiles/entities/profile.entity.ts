import {
  Entity,
  Index,
  PrimaryGeneratedColumn,
  BaseEntity,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { User } from '../../auth/entities/user.entity';
import { Post, Comment } from '../../posts/entities';
import { SonderBaseEntity } from '../../common';

@Entity()
@Index(['userId', 'default'], { unique: true })
export class Profile extends SonderBaseEntity {
  @Column({ nullable: true })
  name: string;

  @Column({ default: false })
  default: boolean;

  @ManyToOne(type => User, user => user.profiles)
  @JoinColumn({ name: 'userId' })
  user: User;
  @Column('int')
  userId: number;

  @OneToMany(type => Post, post => post.profile)
  posts: Post[];

  @OneToMany(type => Comment, comment => comment.profile)
  comments: Comment[];
}
