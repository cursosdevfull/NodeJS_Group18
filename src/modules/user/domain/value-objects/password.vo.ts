import { err, ok, Result } from "neverthrow";

import { UserPasswordInvalidException } from "../exceptions/user.exception";

export type PasswordVOResult = Result<PasswordVO, UserPasswordInvalidException>;

export class PasswordVO {
  private readonly _value: string;

  private constructor(value: string) {
    this._value = value;
  }

  static create(value: string): PasswordVOResult {
    if (
      value.match(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z])(?=.*#@?).{8,20}$/
      ) === null
    ) {
      return err(new UserPasswordInvalidException());
    }

    return ok(new PasswordVO(value));
  }

  get value(): string {
    return this._value;
  }
}
