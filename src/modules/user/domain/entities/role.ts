export class Role {
  readonly roleId: number;
  readonly name?: string;

  constructor(roleId: number, name?: string) {
    this.roleId = roleId;
    if (name) this.name = name;
  }
}
