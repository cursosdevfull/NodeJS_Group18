import { Column } from "typeorm";

export class BaseEntity {
  @Column({ type: "timestamp" })
  createdAt!: Date;

  @Column({ type: "timestamp", nullable: true })
  updatedAt!: Date;

  @Column({ type: "timestamp", nullable: true })
  deletedAt!: Date;
}
