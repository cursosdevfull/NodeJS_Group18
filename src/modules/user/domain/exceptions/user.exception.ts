import { DomainException, DomainExceptionCode } from "./domain.exception";

export class UserFirstnameLengthException extends DomainException {
  constructor(message?: string) {
    super(message || UserFirstnameLengthException.getMessage());

    this.name = DomainExceptionCode.UserFirstnameLengthException;
  }

  static getMessage() {
    return "Firstname must have at least 3 characters";
  }
}

export class UserLastnameLengthException extends DomainException {
  constructor(message?: string) {
    super(message || UserLastnameLengthException.getMessage());

    this.name = DomainExceptionCode.UserLastnameLengthException;
  }

  static getMessage() {
    return "Lastname must have at least 3 characters";
  }
}

export class UserEmailInvalidException extends DomainException {
  constructor(message?: string) {
    super(message || UserEmailInvalidException.getMessage());

    this.name = DomainExceptionCode.UserEmailInvalidException;
  }

  static getMessage() {
    return "Email is invalid";
  }
}

export class UserPasswordInvalidException extends DomainException {
  constructor(message?: string) {
    super(message || UserPasswordInvalidException.getMessage());

    this.name = DomainExceptionCode.UserPasswordInvalidException;
  }

  static getMessage() {
    return "Password must be between 8 and 20 characters, contain at least one numeric digit, one uppercase and one lowercase letter";
  }
}

export class UserRefreshTokenInvalidException extends DomainException {
  constructor(message?: string) {
    super(message || UserRefreshTokenInvalidException.getMessage());

    this.name = DomainExceptionCode.UserRefreshTokenInvalidException;
  }

  static getMessage() {
    return "Refresh token is invalid";
  }
}

export class UserRolesLengthException extends DomainException {
  constructor(message?: string) {
    super(message || UserRolesLengthException.getMessage());

    this.name = DomainExceptionCode.UserRolesLengthException;
  }

  static getMessage() {
    return "Roles must have at least one role";
  }
}

export class UserRoleIdInvalidException extends DomainException {
  constructor(message?: string) {
    super(message || UserRoleIdInvalidException.getMessage());

    this.name = DomainExceptionCode.UserRoleIdInvalidException;
  }

  static getMessage() {
    return "Role ID is invalid";
  }
}
