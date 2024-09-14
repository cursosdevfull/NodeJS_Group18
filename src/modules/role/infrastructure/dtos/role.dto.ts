import { Role } from "../../domain/role";
import { RoleEntity } from "../typeorm/entities/role.entity";

export class RoleDto {
  static fromDataToDomain(data: RoleEntity | RoleEntity[]): Role | Role[] {
    if (Array.isArray(data)) {
      return data.map((el) => RoleDto.fromDataToDomain(el)) as Role[];
    }

    return new Role(data.roleId, data.name, data.description);
  }
}
