import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

import { BaseEntity } from "../../../../../core/infrastructure/base-entity";
import { UserEntity } from "../../../../user/infrastructure/typeorm/entities/user.entity";

@Entity("role")
export class RoleEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  roleId: number;

  @Column({ type: "varchar", length: 50 })
  name: string;

  @Column({ type: "varchar", length: 100 })
  description: string;

  @ManyToMany(() => UserEntity, (user) => user.roles)
  users: UserEntity[];
}
