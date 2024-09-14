import { Router } from "express";

import { RoleGetAllApplication } from "../../application/role-get-all.application";
import { RoleRepository } from "../../domain/repository/role.repository";
import { RoleInfrastructure } from "../role.infrastructure";
import { RoleController } from "./role.controller";

class RoleRoutes {
  readonly router = Router();

  constructor(private readonly roleController: RoleController) {
    this.mountRoutes();
  }

  private mountRoutes() {
    this.router.get(
      "/v1",
      this.roleController.getAllRole.bind(this.roleController)
    );
  }
}
const repository: RoleRepository = new RoleInfrastructure();
const roleGetAllApplication = new RoleGetAllApplication(repository);

const controller = new RoleController(roleGetAllApplication);
const router = new RoleRoutes(controller).router;

export default router;
