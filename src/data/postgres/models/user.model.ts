import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PetPost } from './PetPost.model';

export enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', {
    length: 255,
    nullable: false,
  })
  name: string;

  @Column('varchar', {
    length: 80,
    nullable: false,
    unique: true,
  })
  email: string;

  @Column('varchar', {
    length: 255,
    nullable: false,
  })
  password: string;

  @Column('enum', {
    enum: UserRole,
    default: UserRole.USER,
  })
  role: UserRole;

  @Column('boolean', {
    default: true,
    nullable: false,
  })
  status: boolean;

  @Column('timestamp', {
    default: () => 'CURRENT_TIMESTAMP',
    nullable: false,
  })
  created_at: Date;

  @OneToMany(() => PetPost, (petPost) => petPost.user)
  petPosts: PetPost[];
}
