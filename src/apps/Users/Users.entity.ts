import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  ObjectIdColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Users extends BaseEntity {
  @ObjectIdColumn({
    type: 'uuid',
  })
  _id!: string;

  @Column()
  name!: string;

  @Column()
  @Index({ unique: true })
  document!: string;

  @Column()
  password!: string;

  @CreateDateColumn({
    type: 'timestamp',
  })
  createdAt!: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    nullable: true,
  })
  updatedAt?: Date;
}
