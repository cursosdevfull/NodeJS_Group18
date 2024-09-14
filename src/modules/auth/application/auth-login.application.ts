import { err, ok } from "neverthrow";

import { Crypt } from "../../../core/crypt/crypt";
import { TokenService } from "../../../core/tokens/token.service";
import {
  UserFindByEmailApplication,
  UserFindByEmailResult,
} from "../../user/application/user-find-email.application";
import { AuthPasswordInvalidException } from "../domain/exceptions/auth.exception";
import { Auth } from "../domain/roots/auth";
import { AuthTokens } from "./responses/auth-tokens";

export class AuthLoginApplication {
  constructor(
    private readonly userFindByEmailApplication: UserFindByEmailApplication
  ) {}

  async execute(auth: Auth) {
    const userFoundResult: UserFindByEmailResult =
      await this.userFindByEmailApplication.execute(auth.properties.email);

    if (userFoundResult.isErr()) {
      return err(userFoundResult.error);
    }

    const passwordCrypted = userFoundResult.value.properties.password;
    const password = auth.properties.password;
    const isPasswordValid = await Crypt.compare(password, passwordCrypted);

    if (!isPasswordValid) {
      return err(new AuthPasswordInvalidException());
    }

    const { refreshToken, firstname, roles } = userFoundResult.value.properties;
    const accessToken = TokenService.generateAccessToken(firstname, roles);

    return ok(new AuthTokens(accessToken, refreshToken));
  }
}
