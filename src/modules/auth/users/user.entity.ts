import { Entity, PrimaryGeneratedColumn, BaseEntity, Column } from "typeorm";

@Entity()
export class User extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  email: string;

  @Column()
  firstName: string;

  // @Column()
  // lastName: string;

  @Column()
  facebookId: string;

  // @Column({
  //   nullable: true
  // })
  // token: string;
}
