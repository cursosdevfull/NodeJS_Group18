import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";

import { MedicEntity } from "./Medic";

@Entity({ name: "specialty" })
export class SpecialtyEntity {
  @PrimaryGeneratedColumn()
  specialtyId: number;

  @Column({ type: "varchar", length: 50 })
  name: string;

  @Column({ type: "varchar", length: 50 })
  description: string;

  @OneToOne(() => MedicEntity, (medic) => medic.specialty, { cascade: true })
  medic: MedicEntity;
}
