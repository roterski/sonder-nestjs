import { Entity, PrimaryGeneratedColumn, BaseEntity, Column, OneToMany } from "typeorm";
import { Comment } from './comment.entity';
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
}
