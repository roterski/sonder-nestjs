import { Entity, PrimaryGeneratedColumn, BaseEntity, Column, ManyToOne } from "typeorm";
import { Post } from './post.entity';

@Entity()
export class Comment extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: string;

  @Column('simple-array')
  parent_ids: number[];

  @Column()
  body: string;

  @Column()
  points: number;

  @ManyToOne(type => Post, post => post.comments)
  post: Post;
}
