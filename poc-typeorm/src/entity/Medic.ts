import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from "typeorm";

import { SpecialtyEntity } from "./Specialty";

@Entity({ name: "medic" })
export class MedicEntity {
  @PrimaryGeneratedColumn()
  medicId: number;

  @Column({ type: "varchar", length: 50 })
  firstname: string;

  @Column({ type: "varchar", length: 50 })
  lastname: string;

  @Column({ type: "varchar", length: 10, unique: true })
  cmp: string;

  @Column({ type: "varchar", length: 50, nullable: true })
  email: string;

  @Column({ type: "int" })
  age: number;

  @ManyToMany(() => SpecialtyEntity, (specialty) => specialty.medics)
  @JoinTable()
  specialties: SpecialtyEntity[];
}
