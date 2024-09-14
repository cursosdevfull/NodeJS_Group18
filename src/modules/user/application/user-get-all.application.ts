import { err, ok } from "neverthrow";

import { UserRepository } from "../domain/repositories/user.repository";
import { FindAllUserResult } from "../infrastructure/user.infrastructure";

export class UserGetAllApplication {
  constructor(private readonly repository: UserRepository) {}

  async execute(): Promise<FindAllUserResult> {
    const usersFoundResult = await this.repository.findAll();

    if (usersFoundResult.isErr()) {
      return err(usersFoundResult.error);
    }

    return ok(usersFoundResult.value);
  }
}
