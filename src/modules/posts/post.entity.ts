import { Entity, PrimaryGeneratedColumn, BaseEntity, Column, OneToMany } from "typeorm";
import { Comment } from './comment.entity';

@Entity()
export class Post extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  title: string;

  @Column()
  body: string;

  @Column({ default: 0 })
  points: number;

  @OneToMany(type => Comment, comment => comment.post)
  comments: Comment[];
}
