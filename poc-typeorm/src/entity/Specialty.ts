import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

import { MedicEntity } from "./Medic";

@Entity({ name: "specialty" })
export class SpecialtyEntity {
  @PrimaryGeneratedColumn()
  specialtyId: number;

  @Column({ type: "varchar", length: 50 })
  name: string;

  @Column({ type: "varchar", length: 200 })
  description: string;

  @ManyToMany(() => MedicEntity, (medic) => medic.specialties, {
    cascade: true,
  })
  medics: MedicEntity[];
}
