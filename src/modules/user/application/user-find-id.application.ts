import { err, ok, Result } from "neverthrow";

import { UserRepository } from "../domain/repositories/user.repository";
import { User } from "../domain/roots/user";
import { InfrastructureException } from "../infrastructure/exceptions/infrastructure.exception";
import { ApplicationException } from "./exceptions/application.exception";

export type UserFindByIdResult = Result<
  User,
  ApplicationException | InfrastructureException
>;

export class UserFindByIdApplication {
  constructor(private readonly repository: UserRepository) {}

  async execute(userId: number): Promise<UserFindByIdResult> {
    const userFoundResult = await this.repository.findById(userId);

    if (userFoundResult.isErr()) {
      return err(userFoundResult.error);
    }

    return ok(userFoundResult.value);
  }
}
