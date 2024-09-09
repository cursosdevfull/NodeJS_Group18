export enum DomainExceptionCode {
  Default = "DEFAULT_DOMAIN_EXCEPTION",
  UserFirstnameLengthException = "USER_FIRSTNAME_LENGTH_EXCEPTION",
  UserLastnameLengthException = "USER_LASTNAME_LENGTH_EXCEPTION",
  UserEmailInvalidException = "USER_EMAIL_INVALID_EXCEPTION",
  UserPasswordInvalidException = "USER_PASSWORD_INVALID_EXCEPTION",
  UserRefreshTokenInvalidException = "USER_REFRESH_TOKEN_INVALID_EXCEPTION",
  UserRolesLengthException = "USER_ROLES_LENGTH_EXCEPTION",
  UserRoleIdInvalidException = "USER_ROLE_ID_INVALID_EXCEPTION",
}

export abstract class DomainException extends Error {
  constructor(message?: string) {
    super(message);
    Object.setPrototypeOf(this, DomainException.prototype);

    this.name = DomainExceptionCode.Default;
  }
}
