import {
  InfrastructureException,
  InfrastructureExceptionCode,
} from "./infrastructure.exception";

export class UserSaveDatabaseException extends InfrastructureException {
  constructor(message: string = "Error saving user in database") {
    super(message);
    this.name = InfrastructureExceptionCode.UserSaveDatabaseException;
  }
}

export class UserFindDatabaseException extends InfrastructureException {
  constructor(message: string = "Error finding user in database") {
    super(message);
    this.name = InfrastructureExceptionCode.UserFindDatabaseException;
  }
}

export class UserFindAllDatabaseException extends InfrastructureException {
  constructor(message: string = "Error finding all user in database") {
    super(message);
    this.name = InfrastructureExceptionCode.UserFindAllDatabaseException;
  }
}

export class UserGetByPageDatabaseException extends InfrastructureException {
  constructor(message: string = "Error getting users by page in database") {
    super(message);
    this.name = InfrastructureExceptionCode.UserGetByPageDatabaseException;
  }
}
