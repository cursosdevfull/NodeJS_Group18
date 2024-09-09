import { err, ok, Result } from "neverthrow";

import { UserRepository } from "../domain/repositories/user.repository";
import { User } from "../domain/roots/user";
import { InfrastructureException } from "../infrastructure/exceptions/infrastructure.exception";
import { FindUserResult } from "../infrastructure/user.infrastructure";
import { ApplicationException } from "./exceptions/application.exception";
import { UserEmailExistsException } from "./exceptions/user.exception";

export type UserAddResult = Result<
  User,
  ApplicationException | InfrastructureException
>;

export class UserAddApplication {
  constructor(private readonly repository: UserRepository) {}

  private async existsUser(email: string): Promise<FindUserResult> {
    return this.repository.findByEmail(email);
  }

  async execute(user: User): Promise<UserAddResult> {
    const userExists = await this.existsUser(user.properties.email);

    if (userExists.isOk() && userExists.value) {
      return err(new UserEmailExistsException());
    }

    if (userExists.isErr()) {
      return err(userExists.error);
    }

    const userCreated = await this.repository.save(user);

    if (userCreated.isErr()) {
      return err(userCreated.error);
    }

    return ok(userCreated.value);
  }
}
