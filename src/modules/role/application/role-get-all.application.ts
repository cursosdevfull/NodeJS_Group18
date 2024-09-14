import { err, ok } from "neverthrow";

import { RoleRepository } from "../domain/repository/role.repository";
import { FindAllRoleResult } from "../infrastructure/role.infrastructure";

export class RoleGetAllApplication {
  constructor(private readonly repository: RoleRepository) {}

  async execute(): Promise<FindAllRoleResult> {
    const rolesFoundResult = await this.repository.findAll();

    if (rolesFoundResult.isErr()) {
      return err(rolesFoundResult.error);
    }

    return ok(rolesFoundResult.value);
  }
}
