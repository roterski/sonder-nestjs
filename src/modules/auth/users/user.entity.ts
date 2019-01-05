import { Entity, PrimaryGeneratedColumn, BaseEntity, Column, Index } from "typeorm";

@Entity()
export class User extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: string;

  @Column({ nullable: true })
  @Index({ unique: true })
  email: string;

  @Column({ nullable: true })
  firstName: string;

  @Column({ nullable: true })
  passwordHash: string;

  @Column({ nullable: true })
  @Index({ unique: true })
  facebookId: string;
}
