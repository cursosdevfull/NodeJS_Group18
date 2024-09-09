import { Router } from "express";

import { UserAddApplication } from "../../application/user-add.application";
import { UserFindByIdApplication } from "../../application/user-find-id.application";
import { UserUpdateApplication } from "../../application/user-update.application";
import { UserRepository } from "../../domain/repositories/user.repository";
import { UserInfrastructure } from "../user.infrastructure";
import { UserController } from "./user.controller";

class UserRoutes {
  readonly router = Router();

  constructor(private readonly userController: UserController) {
    this.mountRoutes();
  }

  private mountRoutes() {
    this.router.post(
      "/v1",
      this.userController.addUser.bind(this.userController)
    );

    this.router.put(
      "/v1/:id",
      this.userController.updateUser.bind(this.userController)
    );
  }
}
const repository: UserRepository = new UserInfrastructure();
const userAddApplication = new UserAddApplication(repository);
const userFindByIdApplication = new UserFindByIdApplication(repository);
const userUpdateApplication = new UserUpdateApplication(
  repository,
  userFindByIdApplication
);
const controller = new UserController(
  userAddApplication,
  userUpdateApplication
);
const router = new UserRoutes(controller).router;

export default router;
