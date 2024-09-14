import { err, ok, Result } from "neverthrow";

import { DatabaseBootstrap } from "../../../bootstrap/database.bootstrap";
import { RoleRepository } from "../domain/repository/role.repository";
import { Role } from "../domain/role";
import { RoleDto } from "./dtos/role.dto";
import { RoleFindAllDatabaseException } from "./exceptions/role.exception";
import { RoleEntity } from "./typeorm/entities/role.entity";

export type FindAllRoleResult = Result<Role[], RoleFindAllDatabaseException>;

export class RoleInfrastructure implements RoleRepository {
  async findAll(): Promise<FindAllRoleResult> {
    try {
      const repository = DatabaseBootstrap.dataSource.getRepository(RoleEntity);
      const data = await repository.find();
      const roles = RoleDto.fromDataToDomain(data) as Role[];
      return ok(roles);
    } catch (error: unknown) {
      return err(new RoleFindAllDatabaseException());
    }
  }
}
