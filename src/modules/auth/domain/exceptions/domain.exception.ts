export enum DomainExceptionCode {
  Default = "DEFAULT_DOMAIN_EXCEPTION",
  AuthEmailInvalidException = "AUTH_EMAIL_INVALID_EXCEPTION",
  AuthPasswordStructureInvalidException = "AUTH_PASSWORD_STRUCTURE_INVALID_EXCEPTION",
  AuthPasswordInvalidException = "AUTH_PASSWORD_INVALID_EXCEPTION",
}

export abstract class DomainException extends Error {
  constructor(message?: string) {
    super(message);
    Object.setPrototypeOf(this, DomainException.prototype);

    this.name = DomainExceptionCode.Default;
  }
}
