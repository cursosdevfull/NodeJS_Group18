import { Request, Response } from "express";

import { ApplicationException } from "../../../user/application/exceptions/application.exception";
import { PasswordVO } from "../../../user/domain/value-objects/password.vo";
import { AuthLoginApplication } from "../../application/auth-login.application";
import { AuthNewAccessTokenApplication } from "../../application/auth-new-access-token";
import { AuthFactory } from "../../domain/roots/auth.factory";

export class AuthController {
  constructor(
    private readonly authLoginApplication: AuthLoginApplication,
    private readonly authNewAccessTokenApplication: AuthNewAccessTokenApplication
  ) {}

  async login(req: Request, res: Response) {
    const { email, password } = req.body;

    const passwordResult = PasswordVO.create(password);
    if (passwordResult.isErr()) {
      return res.status(411).json({
        message: passwordResult.error.message,
        name: passwordResult.error.name,
        stack: passwordResult.error.stack,
      });
    }

    const authResult = AuthFactory.create(email, password);

    if (authResult.isErr()) {
      return res.status(411).json({
        message: authResult.error.message,
        name: authResult.error.name,
        stack: authResult.error.stack,
      });
    }

    const auth = authResult.value;

    const authLoginResult = await this.authLoginApplication.execute(auth);

    if (authLoginResult.isOk()) {
      res.status(201).json(authLoginResult.value);
    } else {
      const error: unknown = authLoginResult.error;
      let statusCode;
      if (error instanceof ApplicationException) {
        statusCode = 400;
      } else {
        statusCode = 500;
      }

      res.status(statusCode).json({
        message: authLoginResult.error.message,
        name: authLoginResult.error.name,
        stack: authLoginResult.error.stack,
      });
    }
  }

  async getNewAccessToken(req: Request, res: Response) {
    const { refreshToken } = req.query;

    const authNewAccessTokenResult =
      await this.authNewAccessTokenApplication.execute(refreshToken.toString());

    if (authNewAccessTokenResult.isOk()) {
      res.status(201).json(authNewAccessTokenResult.value);
    } else {
      const error: unknown = authNewAccessTokenResult.error;
      let statusCode;
      if (error instanceof ApplicationException) {
        statusCode = 400;
      } else {
        statusCode = 500;
      }

      res.status(statusCode).json({
        message: authNewAccessTokenResult.error.message,
        name: authNewAccessTokenResult.error.name,
        stack: authNewAccessTokenResult.error.stack,
      });
    }
  }
}
