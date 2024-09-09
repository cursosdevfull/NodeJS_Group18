import { err, ok, Result } from "neverthrow";

import {
  UserRoleIdInvalidException,
  UserRolesLengthException,
} from "../exceptions/user.exception";

export type RolesVOResult = Result<
  RolesVO,
  UserRolesLengthException | UserRoleIdInvalidException
>;

export class RolesVO {
  private readonly _value: number[];

  private constructor(value: number[]) {
    this._value = value;
  }

  static create(value: number[]): RolesVOResult {
    if (value.length < 1) {
      return err(new UserRolesLengthException());
    }

    for (const role of value) {
      if (role < 1) {
        return err(new UserRoleIdInvalidException());
      }
    }

    return ok(new RolesVO(value));
  }

  get value(): number[] {
    return this._value;
  }
}
