import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";

import { Crypt } from "../../../../core/crypt/crypt";
import { ApplicationException } from "../../application/exceptions/application.exception";
import { UserAddApplication } from "../../application/user-add.application";
import { UserUpdateApplication } from "../../application/user-update.application";
import { UserProps, UserUpdateProps } from "../../domain/roots/user";
import { UserFactory } from "../../domain/roots/user.factory";
import { FirstnameVO } from "../../domain/value-objects/firstname.vo";
import { PasswordVO } from "../../domain/value-objects/password.vo";
import { RolesVO } from "../../domain/value-objects/roles.vo";

export class UserController {
  constructor(
    private readonly userAddApplication: UserAddApplication,
    private readonly userUpdateApplication: UserUpdateApplication
  ) {}

  async addUser(req: Request, res: Response) {
    const { firstname, lastname, email, password, roles } = req.body;

    const firstnameResult = FirstnameVO.create(firstname);
    if (firstnameResult.isErr()) {
      return res.status(411).json({
        message: firstnameResult.error.message,
        name: firstnameResult.error.name,
        stack: firstnameResult.error.stack,
      });
    }

    const passwordResult = PasswordVO.create(password);
    if (passwordResult.isErr()) {
      return res.status(411).json({
        message: passwordResult.error.message,
        name: passwordResult.error.name,
        stack: passwordResult.error.stack,
      });
    }

    const rolesResult = RolesVO.create(roles);
    if (rolesResult.isErr()) {
      return res.status(411).json({
        message: rolesResult.error.message,
        name: rolesResult.error.name,
        stack: rolesResult.error.stack,
      });
    }

    const props: UserProps = {
      firstname,
      lastname,
      email,
      password: await Crypt.encrypt(password),
      roles,
      refreshToken: uuidv4(),
    };

    const userCreateResult = UserFactory.create(props);
    if (userCreateResult.isErr()) {
      return res.status(411).json({
        message: userCreateResult.error.message,
        name: userCreateResult.error.name,
        stack: userCreateResult.error.stack,
      });
    }

    const user = userCreateResult.value;

    const userAddResult = await this.userAddApplication.execute(user);

    if (userAddResult.isOk()) {
      res.status(201).json(userAddResult.value);
    } else {
      const error: unknown = userAddResult.error;
      let statusCode;
      if (error instanceof ApplicationException) {
        statusCode = 400;
      } else {
        statusCode = 500;
      }

      res.status(statusCode).json({
        message: userAddResult.error.message,
        name: userAddResult.error.name,
        stack: userAddResult.error.stack,
      });
    }
  }

  async updateUser(req: Request, res: Response) {
    const props: UserUpdateProps = req.body;
    const { id } = req.params;

    const userUpdateResult = await this.userUpdateApplication.execute(
      Number(id),
      props
    );

    if (userUpdateResult.isOk()) {
      res.status(201).json(userUpdateResult.value);
    } else {
      const error: unknown = userUpdateResult.error;
      let statusCode;
      if (error instanceof ApplicationException) {
        statusCode = 400;
      } else {
        statusCode = 500;
      }

      res.status(statusCode).json({
        message: userUpdateResult.error.message,
        name: userUpdateResult.error.name,
        stack: userUpdateResult.error.stack,
      });
    }
  }
}
