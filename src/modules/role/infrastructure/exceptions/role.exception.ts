import {
  InfrastructureException,
  InfrastructureExceptionCode,
} from "./infrastructure.exception";

export class RoleFindAllDatabaseException extends InfrastructureException {
  constructor(message: string = "Error finding all user in database") {
    super(message);
    this.name = InfrastructureExceptionCode.RoleFindAllDatabaseException;
  }
}
