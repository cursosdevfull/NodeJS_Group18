import { Router } from "express";

import { AuthenticationMiddleware } from "../../../../core/middlewares/authentication.middleware";
import { AuthorizationMiddleware } from "../../../../core/middlewares/authorization.middleware";
import { UserAddApplication } from "../../application/user-add.application";
import { UserDeleteApplication } from "../../application/user-delete.application";
import { UserFindByIdApplication } from "../../application/user-find-id.application";
import { UserGetAllApplication } from "../../application/user-get-all.application";
import { UserGetByPageApplication } from "../../application/user-get-by-page.application";
import { UserGetOneApplication } from "../../application/user-get-one.application";
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
    // /v1/page
    this.router.post(
      "/v1",
      this.userController.addUser.bind(this.userController)
    );

    this.router.put(
      "/v1/:id",
      this.userController.updateUser.bind(this.userController)
    );

    this.router.delete(
      "/v1/:id",
      AuthenticationMiddleware.execute,
      AuthorizationMiddleware("SUPERADMIN"),
      this.userController.deleteUser.bind(this.userController)
    );

    this.router.get(
      "/v1",
      AuthenticationMiddleware.execute,
      AuthorizationMiddleware("ADMIN", "OPERATOR"),
      this.userController.getAllUser.bind(this.userController)
    );

    this.router.get(
      "/v1/page",
      this.userController.getByPageUser.bind(this.userController)
    );

    this.router.get(
      "/v1/:id",
      this.userController.getOneUser.bind(this.userController)
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
const userDeleteApplication = new UserDeleteApplication(
  repository,
  userFindByIdApplication
);
const userGetAllApplication = new UserGetAllApplication(repository);
const userGetOneApplication = new UserGetOneApplication(
  userFindByIdApplication
);
const userGetByPageApplication = new UserGetByPageApplication(repository);

const controller = new UserController(
  userAddApplication,
  userUpdateApplication,
  userDeleteApplication,
  userGetAllApplication,
  userGetOneApplication,
  userGetByPageApplication
);
const router = new UserRoutes(controller).router;

export default router;
