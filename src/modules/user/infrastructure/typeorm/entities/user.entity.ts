import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from "typeorm";

import { BaseEntity } from "../../../../../core/infrastructure/base-entity";
import { RoleEntity } from "../../../../role/infrastructure/typeorm/entities/role.entity";

@Entity("user")
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  userId: number;

  @Column({ type: "varchar", length: 50 })
  firstname: string;

  @Column({ type: "varchar", length: 50 })
  lastname: string;

  @Column({ type: "varchar", length: 100, unique: true })
  email: string;

  @Column({ type: "varchar", length: 200 })
  password: string;

  @Column({ type: "varchar", length: 36 })
  refreshToken: string;

  @ManyToMany(() => RoleEntity, (role) => role.users)
  @JoinTable()
  roles: RoleEntity[];
}
