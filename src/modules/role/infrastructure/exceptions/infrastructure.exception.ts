export enum InfrastructureExceptionCode {
  Default = "DEFAULT_INFRASTRUCTURE_EXCEPTION",
  RoleFindAllDatabaseException = "ROLE_FIND_ALL_DATABASE_EXCEPTION",
}

export abstract class InfrastructureException extends Error {
  constructor(message?: string) {
    super(message);
    Object.setPrototypeOf(this, InfrastructureException.prototype);

    this.name = InfrastructureExceptionCode.Default;
  }
}
