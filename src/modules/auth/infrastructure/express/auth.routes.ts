import { Router } from "express";

import { UserFindByEmailApplication } from "../../../user/application/user-find-email.application";
import { UserFindByIdApplication } from "../../../user/application/user-find-id.application";
import { UserFindByRefreshTokenApplication } from "../../../user/application/user-find-refreshtoken.application";
import { UserUpdateApplication } from "../../../user/application/user-update.application";
import { UserRepository } from "../../../user/domain/repositories/user.repository";
import { UserInfrastructure } from "../../../user/infrastructure/user.infrastructure";
import { AuthLoginApplication } from "../../application/auth-login.application";
import { AuthNewAccessTokenApplication } from "../../application/auth-new-access-token";
import { AuthController } from "./auth.controller";

class AuthRoutes {
  readonly router = Router();

  constructor(private readonly authController: AuthController) {
    this.mountRoutes();
  }

  private mountRoutes() {
    this.router.post(
      "/v1/login",
      this.authController.login.bind(this.authController)
    );

    this.router.get(
      "/v1/get-new-access-token",
      this.authController.getNewAccessToken.bind(this.authController)
    );
  }
}
const repository: UserRepository = new UserInfrastructure();
const userFindByEmailApplication = new UserFindByEmailApplication(repository);
const userFindByIdApplication = new UserFindByIdApplication(repository);
const userFindByRefreshTokenApplication = new UserFindByRefreshTokenApplication(
  repository
);
const userUpdateApplication = new UserUpdateApplication(
  repository,
  userFindByIdApplication
);
const authLoginApplication = new AuthLoginApplication(
  userFindByEmailApplication
);
const authNewAccessTokenApplication = new AuthNewAccessTokenApplication(
  userFindByRefreshTokenApplication,
  userUpdateApplication
);

const controller = new AuthController(
  authLoginApplication,
  authNewAccessTokenApplication
);
const router = new AuthRoutes(controller).router;

export default router;
