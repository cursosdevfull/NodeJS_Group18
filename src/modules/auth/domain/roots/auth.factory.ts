import { err, ok, Result } from "neverthrow";

import { AuthEmailInvalidException } from "../exceptions/auth.exception";
import { DomainException } from "../exceptions/domain.exception";
import { Auth } from "./auth";

export type AuthCreateResult = Result<Auth, DomainException>;

export class AuthFactory {
  static create(email: string, password: string): AuthCreateResult {
    if (
      email.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/) === null
    ) {
      return err(new AuthEmailInvalidException());
    }

    return ok(new Auth(email, password));
  }
}
