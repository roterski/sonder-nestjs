import {
  Entity,
  Index,
  PrimaryGeneratedColumn,
  BaseEntity,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../../auth/entities/user.entity';
import { SonderBaseEntity } from '../../common/entities/SonderBaseEntity';

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
}
