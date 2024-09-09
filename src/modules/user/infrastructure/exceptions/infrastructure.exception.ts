export enum InfrastructureExceptionCode {
  Default = "DEFAULT_INFRASTRUCTURE_EXCEPTION",
  UserSaveDatabaseException = "USER_SAVE_DATABASE_EXCEPTION",
  UserFindDatabaseException = "USER_FIND_DATABASE_EXCEPTION",
  UserFindAllDatabaseException = "USER_FIND_ALL_DATABASE_EXCEPTION",
  UserGetByPageDatabaseException = "USER_GET_BY_PAGE_DATABASE_EXCEPTION",
}

export abstract class InfrastructureException extends Error {
  constructor(message?: string) {
    super(message);
    Object.setPrototypeOf(this, InfrastructureException.prototype);

    this.name = InfrastructureExceptionCode.Default;
  }
}
