import { Entity, PrimaryGeneratedColumn, BaseEntity, Column, ManyToOne, JoinColumn } from "typeorm";
import { Post } from './post.entity';

@Entity()
export class Comment extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column('simple-array', { default: [] })
  parentIds: number[];

  @Column()
  body: string;

  @Column({ default: 0 })
  points: number;

  @ManyToOne(type => Post, post => post.comments)
  @JoinColumn({ name: 'postId' })
  post: Post;
  @Column('int', { nullable: true })
  postId: number;
}
