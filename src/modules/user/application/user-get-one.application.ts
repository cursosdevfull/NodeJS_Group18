import { err, ok, Result } from "neverthrow";

import { User } from "../domain/roots/user";
import { InfrastructureException } from "../infrastructure/exceptions/infrastructure.exception";
import { ApplicationException } from "./exceptions/application.exception";
import { UserNotFoundException } from "./exceptions/user.exception";
import { UserFindByIdApplication } from "./user-find-id.application";

export type FindOneUserResult = Result<
  User,
  ApplicationException | InfrastructureException
>;

export class UserGetOneApplication {
  constructor(
    private readonly userFindByIdApplication: UserFindByIdApplication
  ) {}

  async execute(userId: number): Promise<FindOneUserResult> {
    const userFoundResult = await this.userFindByIdApplication.execute(userId);
    if (userFoundResult.isOk() && !userFoundResult.value) {
      return err(new UserNotFoundException());
    }

    if (userFoundResult.isErr()) {
      return err(userFoundResult.error);
    }

    return ok(userFoundResult.value);
  }
}
