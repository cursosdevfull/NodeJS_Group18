import { err, ok, Result } from "neverthrow";

import { UserRepository } from "../domain/repositories/user.repository";
import { User } from "../domain/roots/user";
import { InfrastructureException } from "../infrastructure/exceptions/infrastructure.exception";
import { ApplicationException } from "./exceptions/application.exception";

export type UserFindByRefreshTokenResult = Result<
  User,
  ApplicationException | InfrastructureException
>;

export class UserFindByRefreshTokenApplication {
  constructor(private readonly repository: UserRepository) {}

  async execute(email: string): Promise<UserFindByRefreshTokenResult> {
    const userFoundResult = await this.repository.findByRefreshToken(email);

    if (userFoundResult.isErr()) {
      return err(userFoundResult.error);
    }

    return ok(userFoundResult.value);
  }
}
