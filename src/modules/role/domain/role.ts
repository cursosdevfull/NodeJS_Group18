export class Role {
  readonly roleId: number;
  readonly name: string;
  readonly description: string;

  constructor(roleId: number, name: string, description: string) {
    this.roleId = roleId;
    this.name = name;
    this.description = description;
  }
}
