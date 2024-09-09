import { err, ok, Result } from "neverthrow";

import { UserFirstnameLengthException } from "../exceptions/user.exception";

export type FirstnameVOResult = Result<
  FirstnameVO,
  UserFirstnameLengthException
>;

export class FirstnameVO {
  private readonly _value: string;

  private constructor(value: string) {
    this._value = value;
  }

  static create(value: string): FirstnameVOResult {
    if (value.length < 3) {
      return err(new UserFirstnameLengthException());
    }

    return ok(new FirstnameVO(value));
  }

  get value(): string {
    return this._value;
  }
}
