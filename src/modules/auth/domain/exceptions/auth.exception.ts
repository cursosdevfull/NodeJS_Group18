import { DomainException, DomainExceptionCode } from "./domain.exception";

export class AuthEmailInvalidException extends DomainException {
  constructor(message?: string) {
    super(message || AuthEmailInvalidException.getMessage());

    this.name = DomainExceptionCode.AuthEmailInvalidException;
  }

  static getMessage() {
    return "Email is invalid";
  }
}

export class AuthPasswordStructureInvalidException extends DomainException {
  constructor(message?: string) {
    super(message || AuthPasswordStructureInvalidException.getMessage());

    this.name = DomainExceptionCode.AuthPasswordStructureInvalidException;
  }

  static getMessage() {
    return "Password must be between 8 and 20 characters, contain at least one numeric digit, one uppercase and one lowercase letter";
  }
}

export class AuthPasswordInvalidException extends DomainException {
  constructor(message?: string) {
    super(message || AuthPasswordInvalidException.getMessage());

    this.name = DomainExceptionCode.AuthPasswordInvalidException;
  }

  static getMessage() {
    return "Password is invalid";
  }
}
