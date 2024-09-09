export type AuditProps = {
  createdAt: Date;
  updatedAt?: Date;
  deletedAt?: Date;
};

export abstract class Audit {
  protected readonly createdAt!: Date;
  protected updatedAt: Date | undefined;
  protected deletedAt: Date | undefined;

  constructor(props: AuditProps) {
    this.createdAt = props.createdAt;
    if (props.updatedAt) this.updatedAt = props.updatedAt;
    if (props.deletedAt) this.deletedAt = props.deletedAt;
  }
}
