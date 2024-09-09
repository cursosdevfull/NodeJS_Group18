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
