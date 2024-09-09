export enum ApplicationExceptionCode {
  Default = "DEFAULT_APPLICATION_EXCEPTION",
  UserEmailExistsException = "USER_EMAIL_EXISTS_EXCEPTION",
  UserNotFoundException = "USER_NOT_FOUND_EXCEPTION",
}

export abstract class ApplicationException extends Error {
  constructor(message?: string) {
    super(message);
    Object.setPrototypeOf(this, ApplicationException.prototype);

    this.name = ApplicationExceptionCode.Default;
  }
}
