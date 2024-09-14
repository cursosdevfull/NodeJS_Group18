import { FindAllRoleResult } from "../../infrastructure/role.infrastructure";

export type RoleRepository = {
  findAll(): Promise<FindAllRoleResult>;
};
