import { err, ok, Result } from "neverthrow";
import { validate } from "uuid";

import { DomainException } from "../exceptions/domain.exception";
import {
  UserEmailInvalidException,
  UserFirstnameLengthException,
  UserRefreshTokenInvalidException,
} from "../exceptions/user.exception";
import { User, UserProps } from "./user";

//export type UserCreateResult = User | DomainException;
export type UserCreateResult = Result<User, DomainException>;

export class UserFactory {
  static create(props: UserProps): UserCreateResult {
    if (props.lastname.length < 3) {
      return err(new UserFirstnameLengthException());
    }

    if (
      props.email.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/) ===
      null
    ) {
      return err(new UserEmailInvalidException());
    }

    if (!validate(props.refreshToken)) {
      return err(new UserRefreshTokenInvalidException());
    }

    if (!props.createdAt) props.createdAt = new Date();

    return ok(new User(props));
  }
}
