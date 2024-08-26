import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

import { MedicEntity } from "./Medic";

@Entity({ name: "specialty" })
export class SpecialtyEntity {
  @PrimaryGeneratedColumn()
  specialtyId: number;

  @Column({ type: "varchar", length: 50 })
  name: string;

  @Column({ type: "varchar", length: 50 })
  description: string;

  @OneToMany(() => MedicEntity, (medic) => medic.specialty, { cascade: true })
  medics: MedicEntity[];
}
