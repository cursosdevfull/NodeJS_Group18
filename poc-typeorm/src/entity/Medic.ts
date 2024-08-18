import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
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

  @Column({ type: "varchar", length: 10 })
  cmp: string;

  @OneToOne(() => SpecialtyEntity, (specialty) => specialty.medic)
  @JoinColumn()
  specialty: SpecialtyEntity;
}
