import { err, ok } from "neverthrow";

import { UserRepository } from "../domain/repositories/user.repository";
import { GetByPageResult } from "../infrastructure/user.infrastructure";

export class UserGetByPageApplication {
  constructor(private readonly repository: UserRepository) {}

  async execute(page: number, pageSize: number): Promise<GetByPageResult> {
    const usersByPageResult = await this.repository.getByPage(page, pageSize);

    if (usersByPageResult.isErr()) {
      return err(usersByPageResult.error);
    }

    return ok(usersByPageResult.value);
  }
}
