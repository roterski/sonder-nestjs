import { Entity, PrimaryGeneratedColumn, BaseEntity, Column } from "typeorm";

@Entity()
export class User extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  email: string;

  @Column()
  firstName: string;

  @Column()
  facebookId: string;
}
