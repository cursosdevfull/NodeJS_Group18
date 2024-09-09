import { err, ok, Result } from "neverthrow";

import { UserRepository } from "../domain/repositories/user.repository";
import { User, UserUpdateProps } from "../domain/roots/user";
import { InfrastructureException } from "../infrastructure/exceptions/infrastructure.exception";
import { ApplicationException } from "./exceptions/application.exception";
import { UserNotFoundException } from "./exceptions/user.exception";
import { UserFindByIdApplication } from "./user-find-id.application";

export type UserUpdateResult = Result<
  User,
  ApplicationException | InfrastructureException
>;

export class UserUpdateApplication {
  constructor(
    private readonly repository: UserRepository,
    private readonly userFindByIdApplication: UserFindByIdApplication
  ) {}

  async execute(
    userId: number,
    props: UserUpdateProps
  ): Promise<UserUpdateResult> {
    const userFoundResult = await this.userFindByIdApplication.execute(userId);
    if (userFoundResult.isOk() && !userFoundResult.value) {
      return err(new UserNotFoundException());
    }

    if (userFoundResult.isErr()) {
      return err(userFoundResult.error);
    }

    const user = userFoundResult.value;
    user.update(props);

    const userSaved = await this.repository.save(user);

    if (userSaved.isErr()) {
      return err(userSaved.error);
    }

    return ok(userSaved.value);
  }
}
