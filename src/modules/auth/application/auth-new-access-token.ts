import { err, ok } from "neverthrow";

import { TokenService } from "../../../core/tokens/token.service";
import { UserRefreshTokenNotExistsException } from "../../user/application/exceptions/user.exception";
import { UserFindByEmailResult } from "../../user/application/user-find-email.application";
import { UserFindByRefreshTokenApplication } from "../../user/application/user-find-refreshtoken.application";
import { UserUpdateApplication } from "../../user/application/user-update.application";
import { AuthTokens } from "./responses/auth-tokens";

export class AuthNewAccessTokenApplication {
  constructor(
    private readonly userFindByRefreshTokenApplication: UserFindByRefreshTokenApplication,
    private readonly userUpdateApplication: UserUpdateApplication
  ) {}

  async execute(refreshToken: string) {
    const userFoundResult: UserFindByEmailResult =
      await this.userFindByRefreshTokenApplication.execute(refreshToken);

    if (userFoundResult.isOk() && !userFoundResult.value) {
      return err(new UserRefreshTokenNotExistsException());
    }

    if (userFoundResult.isErr()) {
      return err(userFoundResult.error);
    }

    const { firstname, roles, userId } = userFoundResult.value.properties;
    const accessToken = TokenService.generateAccessToken(firstname, roles);
    const newRefreshToken = TokenService.generateNewRefreshToken();

    const userUpdateResult = await this.userUpdateApplication.execute(userId, {
      refreshToken: newRefreshToken,
    });

    if (userUpdateResult.isErr()) {
      return err(userUpdateResult.error);
    }

    return ok(new AuthTokens(accessToken, newRefreshToken));
  }
}
