import {
  ApplicationException,
  ApplicationExceptionCode,
} from "./application.exception";

export class UserEmailExistsException extends ApplicationException {
  constructor(message: string = "Email already exists") {
    super(message);
    this.name = ApplicationExceptionCode.UserEmailExistsException;
  }
}

export class UserNotFoundException extends ApplicationException {
  constructor(message: string = "User not found") {
    super(message);
    this.name = ApplicationExceptionCode.UserNotFoundException;
  }
}

export class UserRefreshTokenNotExistsException extends ApplicationException {
  constructor(message: string = "Refresh token invalid") {
    super(message);
    this.name = ApplicationExceptionCode.UserRefreshTokenNotExistsException;
  }
}
