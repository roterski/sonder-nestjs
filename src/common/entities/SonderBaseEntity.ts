import {
  Entity,
  PrimaryGeneratedColumn,
  BaseEntity,
  Column,
  Index,
  CreateDateColumn,
  UpdateDateColumn,
  VersionColumn
} from 'typeorm';

export abstract class SonderBaseEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @VersionColumn()
  version: number;
}
